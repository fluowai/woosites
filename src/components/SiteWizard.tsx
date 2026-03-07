import React from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, Zap, Droplets, Bug, ArrowDownCircle, 
  Key, Wind, Paintbrush, Square, Smartphone,
  Check, ChevronRight, ArrowLeft, Globe, Phone, MapPin, Eye
} from 'lucide-react';
import { NICHES } from '@/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  Wrench, Zap, Droplets, Bug, ArrowDownCircle, 
  Key, Wind, Paintbrush, Square, Smartphone
};

export const SiteWizard = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    nicheId: '',
    businessName: '',
    whatsapp: '',
    city: '',
    services: [] as string[],
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleNicheSelect = (id: string) => {
    setFormData({ ...formData, nicheId: id });
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((i) => (
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
                {i === 1 ? 'Nicho' : i === 2 ? 'Dados' : 'Gerar'}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
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
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                <ArrowLeft size={18} /> Voltar
              </button>
              <button 
                onClick={nextStep}
                disabled={!formData.businessName || !formData.whatsapp}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
              >
                Continuar <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-3xl border border-slate-200 shadow-sm"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe size={40} />
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
