import React from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, Zap, Droplets, Bug, ArrowDownCircle, 
  Key, Wind, Paintbrush, Square, Smartphone,
  Check, ChevronRight, ArrowLeft, Globe, Phone, MapPin, Eye, Upload, X, Home, Plus, Trash2, DollarSign, Maximize2, Bed
} from 'lucide-react';
import { NICHES } from '@/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  Wrench, Zap, Droplets, Bug, ArrowDownCircle, 
  Key, Wind, Paintbrush, Square, Smartphone, Home
};

const optimizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP for best performance
        resolve(canvas.toDataURL('image/webp', 0.8));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export const SiteWizard = ({ onComplete }: { onComplete: (data: any, isPreview?: boolean) => void }) => {
  const [step, setStep] = React.useState(1);
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nicheId: '',
    businessName: '',
    whatsapp: '',
    city: '',
    services: [] as string[],
    logoUrl: '',
    properties: [] as any[],
  });

  const isRealEstate = formData.nicheId === '11';
  const totalSteps = isRealEstate ? 4 : 3;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const addProperty = () => {
    const newProperty = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      price: '',
      type: 'venda',
      beds: 2,
      area: '',
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/300`
    };
    setFormData({ ...formData, properties: [...formData.properties, newProperty] });
  };

  const removeProperty = (id: string) => {
    setFormData({ ...formData, properties: formData.properties.filter(p => p.id !== id) });
  };

  const updateProperty = (id: string, field: string, value: any) => {
    setFormData({
      ...formData,
      properties: formData.properties.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsOptimizing(true);
      const optimized = await optimizeImage(file);
      setFormData({ ...formData, logoUrl: optimized });
    } catch (error) {
      console.error('Erro ao otimizar logo:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleNicheSelect = (id: string) => {
    setFormData({ ...formData, nicheId: id });
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const i = idx + 1;
            let label = '';
            if (i === 1) label = 'Nicho';
            else if (i === 2) label = 'Dados';
            else if (i === 3) label = isRealEstate ? 'Imóveis' : 'Gerar';
            else if (i === 4) label = 'Gerar';

            return (
              <div key={i} className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  step >= i ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"
                )}>
                  {step > i ? <Check size={20} /> : i}
                </div>
                <span className={cn(
                  "text-[10px] uppercase font-bold mt-2 tracking-widest",
                  step >= i ? "text-blue-600" : "text-slate-400"
                )}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {NICHES.map((niche) => {
            const Icon = iconMap[niche.icon];
            return (
              <button
                key={niche.id}
                onClick={() => handleNicheSelect(niche.id)}
                className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 mb-4 transition-colors">
                  <Icon size={24} />
                </div>
                <span className="text-sm font-bold text-center leading-tight">{niche.name}</span>
              </button>
            );
          })}
        </motion.div>
      )}

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6">Informações da Empresa</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Logo Upload */}
              <div className="space-y-2 shrink-0">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo da Empresa</label>
                <div className="relative group">
                  <div className={cn(
                    "w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 overflow-hidden transition-all",
                    formData.logoUrl ? "border-solid border-blue-500" : "hover:border-blue-400"
                  )}>
                    {formData.logoUrl ? (
                      <>
                        <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                        <button 
                          onClick={() => setFormData({ ...formData, logoUrl: '' })}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                        <Upload size={24} className={cn("text-slate-400 mb-2", isOptimizing && "animate-bounce")} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{isOptimizing ? 'Otimizando...' : 'Upload'}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={isOptimizing} />
                      </label>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">WebP Otimizado (Max 200px)</p>
                </div>
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Comercial</label>
                    <input 
                      type="text" 
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      placeholder="Ex: João Eletricista"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp</label>
                    <input 
                      type="text" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cidade Principal</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Ex: São Paulo - SP"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                <ArrowLeft size={18} /> Voltar
              </button>
              <button 
                onClick={nextStep}
                disabled={!formData.businessName || !formData.whatsapp || isOptimizing}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
              >
                Continuar <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && isRealEstate && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Catálogo de Imóveis</h2>
              <p className="text-slate-500 text-sm">Cadastre os imóveis que deseja destacar no site.</p>
            </div>
            <button 
              onClick={addProperty}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-all"
            >
              <Plus size={18} /> Adicionar Imóvel
            </button>
          </div>

          <div className="space-y-6 mb-8 max-h-[500px] overflow-y-auto pr-2">
            {formData.properties.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Home size={40} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Nenhum imóvel cadastrado ainda.</p>
              </div>
            ) : (
              formData.properties.map((prop) => (
                <div key={prop.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                  <button 
                    onClick={() => removeProperty(prop.id)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Título do Imóvel</label>
                        <input 
                          type="text" 
                          value={prop.title}
                          onChange={(e) => updateProperty(prop.id, 'title', e.target.value)}
                          placeholder="Ex: Casa Moderna com Piscina"
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Preço</label>
                          <div className="relative">
                            <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="text" 
                              value={prop.price}
                              onChange={(e) => updateProperty(prop.id, 'price', e.target.value)}
                              placeholder="Ex: 450.000"
                              className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tipo</label>
                          <select 
                            value={prop.type}
                            onChange={(e) => updateProperty(prop.id, 'type', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="venda">Venda</option>
                            <option value="locação">Locação</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quartos</label>
                        <div className="relative">
                          <Bed size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="number" 
                            value={prop.beds}
                            onChange={(e) => updateProperty(prop.id, 'beds', parseInt(e.target.value))}
                            className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Área (m²)</label>
                        <div className="relative">
                          <Maximize2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            value={prop.area}
                            onChange={(e) => updateProperty(prop.id, 'area', e.target.value)}
                            placeholder="Ex: 120"
                            className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between pt-6 border-t border-slate-100">
            <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:text-slate-900 transition-colors">
              <ArrowLeft size={18} /> Voltar
            </button>
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Continuar <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {step === (isRealEstate ? 4 : 3) && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-3xl border border-slate-200 shadow-sm"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            {formData.logoUrl ? (
              <img src={formData.logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
            ) : (
              <Globe size={40} />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-4">Tudo pronto para decolar!</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Vamos gerar seu site profissional para <strong>{formData.businessName}</strong> em <strong>{formData.city}</strong>.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Phone className="mx-auto mb-2 text-blue-600" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp</p>
              <p className="text-sm font-bold">{formData.whatsapp}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <MapPin className="mx-auto mb-2 text-blue-600" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Localização</p>
              <p className="text-sm font-bold">{formData.city}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Check className="mx-auto mb-2 text-blue-600" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
              <p className="text-sm font-bold text-green-600">Pronto</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={prevStep} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors">
              Revisar Dados
            </button>
            <button 
              onClick={() => onComplete(formData, true)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              <Eye size={20} /> Visualizar Preview
            </button>
            <button 
              onClick={() => onComplete(formData, false)}
              className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-lg"
            >
              Gerar Site Agora
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
