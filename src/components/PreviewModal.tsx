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
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Preview:</span>
              <span className="text-sm text-slate-500">{projectData.businessName || 'Novo Site'}</span>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setDevice('desktop')}
              className={cn(
                "p-2 rounded-lg transition-all",
                device === 'desktop' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Monitor size={18} />
            </button>
            <button 
              onClick={() => setDevice('tablet')}
              className={cn(
                "p-2 rounded-lg transition-all",
                device === 'tablet' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Tablet size={18} />
            </button>
            <button 
              onClick={() => setDevice('mobile')}
              className={cn(
                "p-2 rounded-lg transition-all",
                device === 'mobile' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Smartphone size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {onConfirm && (
              <button 
                onClick={onConfirm}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                <Check size={16} /> Confirmar e Publicar
              </button>
            )}
          </div>
        </div>

        {/* Viewport Area */}
        <div className="flex-1 overflow-hidden p-4 md:p-8 flex justify-center bg-slate-800/50">
          <motion.div 
            layout
            className={cn(
              "bg-white shadow-2xl overflow-hidden transition-all duration-500 rounded-t-2xl border-x-8 border-t-8 border-slate-900",
              device === 'desktop' ? "w-full" : device === 'tablet' ? "w-[768px]" : "w-[375px]"
            )}
          >
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
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
