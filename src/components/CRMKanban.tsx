import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  Tag,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Lead } from '@/types';
import { cn } from '@/lib/utils';

const STAGES = [
  { id: 'new', label: 'Novos Leads', color: 'bg-blue-500' },
  { id: 'contact', label: 'Em Contato', color: 'bg-amber-500' },
  { id: 'qualified', label: 'Qualificados', color: 'bg-indigo-500' },
  { id: 'closed', label: 'Fechados', color: 'bg-emerald-500' },
  { id: 'lost', label: 'Perdidos', color: 'bg-slate-400' },
];

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Carlos Silva', email: 'carlos@email.com', phone: '(11) 98888-7777', status: 'new', created_at: '2024-03-07T10:00:00Z', source: 'Site Principal' },
  { id: '2', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 97777-6666', status: 'contact', created_at: '2024-03-06T14:30:00Z', source: 'Landing Page Ar' },
  { id: '3', name: 'Roberto Santos', email: 'roberto@email.com', phone: '(11) 96666-5555', status: 'qualified', created_at: '2024-03-05T09:15:00Z', source: 'Google Ads' },
  { id: '4', name: 'Maria Ferreira', email: 'maria@email.com', phone: '(11) 95555-4444', status: 'new', created_at: '2024-03-07T11:20:00Z', source: 'WhatsApp' },
];

export const CRMKanban = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Pipeline de Vendas</h2>
          <p className="text-slate-500 text-sm">Gerencie seus leads e converta mais clientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Filter size={16} /> Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20">
            <Plus size={16} /> Novo Lead
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 min-h-0 flex-1 scrollbar-hide">
        {STAGES.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-600">{stage.label}</span>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {MOCK_LEADS.filter(l => l.status === stage.id).length}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="flex-1 bg-slate-100/50 rounded-2xl p-3 space-y-3 overflow-y-auto border border-slate-200/50">
              {MOCK_LEADS.filter(l => l.status === stage.id).map((lead) => (
                <div 
                  key={lead.id} 
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lead.name}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{lead.source}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={12} /> {lead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail size={12} /> {lead.email}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                      <Calendar size={12} /> 2h atrás
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">JS</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-slate-300 hover:text-slate-500 transition-all">
                + Adicionar Lead
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
