import React, { useState, useEffect } from 'react';
import { DashboardShell } from './components/DashboardShell';
import { SiteWizard } from './components/SiteWizard';
import { CRMKanban } from './components/CRMKanban';
import { SiteRenderer } from './components/SiteRenderer';
import { 
  Plus, 
  Globe, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  Search,
  Layout,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

import { PreviewModal } from './components/PreviewModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [createdSites, setCreatedSites] = useState<any[]>([]);
  const [viewingSiteId, setViewingSiteId] = useState<string | null>(null);
  
  // Preview states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  // Check for URL params to simulate routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const siteId = params.get('site');
    if (siteId) {
      setViewingSiteId(siteId);
    }
  }, []);

  // If viewing a public site, render only the SiteRenderer
  if (viewingSiteId) {
    const site = createdSites.find(s => s.id === viewingSiteId) || 
                 (createdSites.length > 0 ? createdSites[0] : null);
    
    if (site) {
      return <SiteRenderer project={site} />;
    }
    
    // Fallback if site not found in state (simulating a real DB fetch)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Globe size={48} className="mx-auto text-slate-300 mb-4" />
          <h1 className="text-2xl font-bold">Site não encontrado</h1>
          <p className="text-slate-500 mb-6">O site que você está procurando não existe ou foi removido.</p>
          <button onClick={() => window.location.href = window.location.origin} className="text-blue-600 font-bold">Voltar ao Painel</button>
        </div>
      </div>
    );
  }

  const handleCreateSite = (data: any, isPreview: boolean = false) => {
    if (isPreview) {
      setPreviewData(data);
      setIsPreviewOpen(true);
      return;
    }

    const newSite = {
      id: Math.random().toString(36).substr(2, 9),
      nicheId: data.nicheId,
      name: data.businessName,
      domain: `${data.businessName.toLowerCase().replace(/\s+/g, '')}.localsites.os`,
      status: 'published',
      leads: 0,
      businessData: data,
      created_at: new Date().toISOString()
    };
    setCreatedSites([newSite, ...createdSites]);
    setIsWizardOpen(false);
    setIsPreviewOpen(false);
    setActiveTab('sites');
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-2xl", color)}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
          <TrendingUp size={16} /> {change}
        </div>
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bem-vindo, <span className="text-blue-600">Admin</span></h2>
          <p className="text-slate-500">Aqui está o que está acontecendo com seus sites hoje.</p>
        </div>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
        >
          <Plus size={20} /> Novo Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Leads" value="128" change="+12%" icon={Users} color="bg-blue-600" />
        <StatCard title="Sites Ativos" value={createdSites.length || 12} change="+2" icon={Globe} color="bg-indigo-600" />
        <StatCard title="Taxa de Conversão" value="4.2%" change="+0.5%" icon={TrendingUp} color="bg-emerald-600" />
        <StatCard title="Tempo Médio" value="15m" change="-2m" icon={Clock} color="bg-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-lg">Sites Recentes</h3>
            <button onClick={() => setActiveTab('sites')} className="text-blue-600 text-sm font-bold hover:underline">Ver todos</button>
          </div>
          <div className="divide-y divide-slate-100">
            {(createdSites.length > 0 ? createdSites : [
              { id: '1', name: 'João Eletricista', domain: 'eletricistajoao.com.br', nicheId: '2', status: 'published', leads: 45 },
              { id: '2', name: 'SOS Desentupidora', domain: 'sosdesentupidora.com.br', nicheId: '5', status: 'published', leads: 82 },
            ]).map((site, i) => (
              <div key={site.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">{site.name}</h4>
                    <p className="text-xs text-slate-500">{site.domain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <a 
                      href={`?site=${site.id}`}
                      target="_blank"
                      className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-6">Atividade Recente</h3>
          <div className="space-y-6">
            {[
              { type: 'lead', user: 'Carlos Silva', action: 'novo lead capturado', time: '2m atrás' },
              { type: 'site', user: 'Admin', action: 'site "Chaveiro 24h" criado', time: '1h atrás' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 shrink-0",
                  item.type === 'lead' ? "bg-blue-500" : item.type === 'site' ? "bg-purple-500" : "bg-slate-300"
                )} />
                <div>
                  <p className="text-sm">
                    <span className="font-bold">{item.user}</span> {item.action}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {isWizardOpen ? (
        <div className="py-8">
          <div className="flex items-center justify-between mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold">Gerador de Site Inteligente</h2>
            <button onClick={() => setIsWizardOpen(false)} className="text-slate-500 font-bold hover:text-slate-900">Cancelar</button>
          </div>
          <SiteWizard onComplete={handleCreateSite} />
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'crm' && <CRMKanban />}
          {activeTab === 'sites' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Meus Projetos</h2>
                  <p className="text-slate-500 text-sm">Gerencie e visualize seus sites publicados.</p>
                </div>
                <button 
                  onClick={() => setIsWizardOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                >
                  <Plus size={16} /> Novo Projeto
                </button>
              </div>

              {createdSites.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
                  <Globe size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold">Nenhum site criado</h3>
                  <p className="text-slate-500 mb-8">Comece agora mesmo a gerar sites para seus clientes.</p>
                  <button 
                    onClick={() => setIsWizardOpen(true)}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
                  >
                    Criar Primeiro Site
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {createdSites.map((site) => (
                    <div key={site.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-blue-500 transition-all">
                      <div className="aspect-video bg-slate-100 relative overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${site.nicheId}/600/400`} 
                          alt={site.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button 
                            onClick={() => {
                              setPreviewData(site.businessData);
                              setIsPreviewOpen(true);
                            }}
                            className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-50 transition-all shadow-xl"
                            title="Preview"
                          >
                            <Eye size={20} />
                          </button>
                          <a 
                            href={`?site=${site.id}`}
                            target="_blank"
                            className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all shadow-xl"
                            title="Ver Site"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase rounded-full shadow-sm">
                            {site.status === 'published' ? 'Publicado' : 'Rascunho'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-lg mb-1">{site.name}</h4>
                        <p className="text-xs text-slate-500 mb-4">{site.domain}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-slate-400" />
                            <span className="text-xs font-bold">{site.leads} leads</span>
                          </div>
                          <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                            Configurações <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Configurações da Conta</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome da Agência</label>
                  <input type="text" defaultValue="LocalSites Agência" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail de Notificação</label>
                  <input type="email" defaultValue="admin@localsites.os" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div className="pt-4">
                  <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">Salvar Alterações</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        projectData={previewData || {}} 
        onConfirm={isWizardOpen ? () => handleCreateSite(previewData, false) : undefined}
      />
    </DashboardShell>
  );
}

