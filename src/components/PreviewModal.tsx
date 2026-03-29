import React, { useState } from 'react';
import { 
  X, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink,
  Eye,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteRenderer } from './SiteRenderer';
import { cn } from '@/lib/utils';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: any;
  onConfirm?: () => void;
}

export const PreviewModal = ({ isOpen, onClose, projectData, onConfirm }: PreviewModalProps) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex flex-col"
      >
        {/* Toolbar */}
        <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <div className="p-2 group-hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </div>
              <span className="text-sm font-bold">Fechar</span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Visualizando</span>
              <span className="text-sm font-bold text-slate-900">{projectData.businessName || 'Novo Projeto'}</span>
            </div>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setDevice('desktop')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs",
                device === 'desktop' ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Monitor size={16} /> <span className="hidden sm:inline">Desktop</span>
            </button>
            <button 
              onClick={() => setDevice('tablet')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs",
                device === 'tablet' ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Tablet size={16} /> <span className="hidden sm:inline">Tablet</span>
            </button>
            <button 
              onClick={() => setDevice('mobile')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs",
                device === 'mobile' ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Smartphone size={16} /> <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {onConfirm && (
              <button 
                onClick={onConfirm}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-xl text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95"
              >
                <Check size={18} /> Publicar Site
              </button>
            )}
          </div>
        </div>

        {/* Viewport Area */}
        <div className="flex-1 overflow-hidden p-4 md:p-12 flex justify-center bg-slate-900/50 relative">
          {/* Device Info Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Resolução: {device === 'desktop' ? '100% (Fluido)' : device === 'tablet' ? '768px' : '375px'}
          </div>

          <motion.div 
            layout
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 relative",
              device === 'desktop' ? "w-full rounded-t-xl" : 
              device === 'tablet' ? "w-[768px] rounded-[40px] border-[12px] border-slate-900 h-[90%]" : 
              "w-[375px] rounded-[60px] border-[16px] border-slate-900 h-[85%] mt-8"
            )}
          >
            {/* Mobile/Tablet Speaker/Camera Notch */}
            {(device === 'mobile' || device === 'tablet') && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center gap-2">
                <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
              </div>
            )}

            <div className="w-full h-full overflow-y-auto scrollbar-hide bg-white">
              <SiteRenderer project={{ 
                nicheId: projectData.nicheId, 
                businessData: projectData 
              }} />
            </div>
          </motion.div>
        </div>

        {/* Preview Badge */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl animate-pulse pointer-events-none">
          Modo de Visualização
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
