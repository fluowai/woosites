import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Settings, 
  BarChart3, 
  PlusCircle, 
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
      active 
        ? "bg-blue-50 text-blue-600" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <Icon size={20} />
    <span>{label}</span>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-auto" />}
  </button>
);

export const DashboardShell = ({ 
  children, 
  activeTab, 
  setActiveTab 
}: { 
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform lg:relative lg:translate-x-0",
        !isMobileMenuOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-bottom border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <h1 className="text-xl font-bold tracking-tight">LocalSites <span className="text-blue-600">OS</span></h1>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <div className="mb-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geral</div>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarItem icon={Globe} label="Meus Sites" active={activeTab === 'sites'} onClick={() => setActiveTab('sites')} />
            <SidebarItem icon={Users} label="CRM de Leads" active={activeTab === 'crm'} onClick={() => setActiveTab('crm')} />
            
            <div className="mt-8 mb-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configurações</div>
            <SidebarItem icon={Settings} label="Configurações" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            <SidebarItem icon={BarChart3} label="Métricas" active={activeTab === 'metrics'} onClick={() => setActiveTab('metrics')} />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg">
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500">
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar leads ou sites..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Admin Local</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Plano Pro</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
