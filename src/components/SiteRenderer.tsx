import React from 'react';
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Star,
  Bed,
  Maximize2
} from 'lucide-react';
import { Project, Niche } from '@/types';
import { NICHES } from '@/constants';
import { cn, formatWhatsApp } from '@/lib/utils';

export const SiteRenderer = ({ project }: { project: any }) => {
  const niche = NICHES.find(n => n.id === project.nicheId) || NICHES[0];
  const data = project.businessData;

  // Check for service in URL
  const params = new URLSearchParams(window.location.search);
  const currentServiceSlug = params.get('servico');
  
  const isRealEstate = niche.slug === 'imobiliaria';
  const serviceLabel = isRealEstate ? 'Imóveis' : 'Serviços';
  const serviceLabelSingular = isRealEstate ? 'Imóvel' : 'Serviço';

  const services = data.services && data.services.length > 0 
    ? data.services 
    : isRealEstate 
      ? ['Casas para Venda', 'Apartamentos para Locação', 'Terrenos e Lotes']
      : ['Manutenção Preventiva', 'Reparos de Emergência', 'Instalações Novas'];

  const currentService = services.find((s: string) => 
    s.toLowerCase().replace(/\s+/g, '-') === currentServiceSlug
  );

  // SEO Optimization
  const pageTitle = currentService 
    ? `${currentService} em ${data.city} | ${data.businessName}`
    : `${niche.name} em ${data.city} | ${data.businessName}`;
  
  const pageDescription = currentService
    ? `Procurando por ${currentService.toLowerCase()} em ${data.city}? A ${data.businessName} é especialista em ${niche.name.toLowerCase()} com atendimento rápido e garantia.`
    : `Melhor serviço de ${niche.name.toLowerCase()} em ${data.city}. Atendimento 24h, profissionais qualificados e o melhor preço da região. Solicite seu orçamento!`;

  // Update document metadata
  React.useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription]);

  const Section = ({ children, className, id }: any) => (
    <section id={id} className={cn("py-12 md:py-24 px-6 md:px-12 lg:px-24", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href={`?site=${project.id}`} className="flex items-center gap-2">
            {data.logoUrl ? (
              <img src={data.logoUrl} alt={data.businessName} className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shrink-0">
                {data.businessName.charAt(0)}
              </div>
            )}
            <span className="font-extrabold text-lg md:text-xl tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none">{data.businessName}</span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <a href={`?site=${project.id}#servicos`} className="hover:text-blue-600 transition-colors">{serviceLabel}</a>
          <a href={`?site=${project.id}#sobre`} className="hover:text-blue-600 transition-colors">Sobre</a>
          <a href={`?site=${project.id}#contato`} className="hover:text-blue-600 transition-colors">Contato</a>
        </div>
        <a 
          href={formatWhatsApp(data.whatsapp)}
          target="_blank"
          className="bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all shadow-lg shadow-green-500/20 flex items-center gap-2 shrink-0"
        >
          <MessageSquare size={16} className="md:w-[18px] md:h-[18px]" /> <span className="hidden xs:inline">WhatsApp</span><span className="xs:hidden">Zap</span>
        </a>
      </div>
    </nav>
  );

  if (currentService) {
    return (
      <div className="bg-white font-sans text-slate-900 selection:bg-blue-100 overflow-x-hidden">
        <Navbar />
        
        {/* Service Hero */}
        <Section className="bg-slate-50 pt-16 pb-20 md:pt-24 md:pb-32 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={14} /> {serviceLabelSingular} Especializado
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tighter break-words">
              {pageTitle.split('|')[0].trim()}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              A {data.businessName} é referência em {currentService.toLowerCase()} em toda a região de {data.city}. 
              Garantimos {isRealEstate ? 'as melhores oportunidades' : 'um serviço impecável'}, rápido e com o melhor preço.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={formatWhatsApp(data.whatsapp)}
                className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 text-center"
              >
                {isRealEstate ? 'Ver Detalhes do Imóvel' : `Solicitar Orçamento de ${currentService}`}
              </a>
            </div>
          </div>
        </Section>

        {/* Service Details */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-slate-100">
              <img 
                src={`https://picsum.photos/seed/${currentServiceSlug}/800/600`} 
                alt={currentService}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">Por que escolher a {data.businessName}?</h2>
              <ul className="space-y-4">
                {[
                  'Profissionais altamente qualificados e treinados',
                  'Equipamentos de última geração para diagnóstico preciso',
                  'Atendimento emergencial em todos os bairros',
                  'Garantia por escrito em todos os serviços realizados',
                  'Orçamento transparente e sem compromisso'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Other Services */}
        <Section className="bg-slate-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Outras {serviceLabel} em {data.city}</h2>
            <p className="text-slate-500">{isRealEstate ? 'Confira nossas melhores ofertas:' : 'Também somos especialistas em:'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s: string) => s !== currentService).map((service: string, i: number) => (
              <a 
                key={i} 
                href={`?site=${project.id}&servico=${service.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all group"
              >
                <h3 className="font-bold group-hover:text-blue-600 transition-colors">{service}</h3>
                <p className="text-xs text-slate-400 mt-2">Clique para ver detalhes</p>
              </a>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} {data.businessName}. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <Section className="bg-slate-50 pt-16 pb-20 md:pt-32 md:pb-40 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="text-center lg:text-left w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 max-w-full">
              <ShieldCheck size={14} className="shrink-0" /> 
              <span className="whitespace-normal">Especialista em {niche.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] lg:leading-[0.9] mb-6 tracking-tighter break-words w-full">
              {pageTitle.split('|')[0].trim()}
            </h1>
            <p className="text-base md:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
              Atendimento rápido, limpo e com garantia. Resolvemos seus problemas de {niche.slug.replace('-', ' ')} hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <a 
                href={formatWhatsApp(data.whatsapp)}
                className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 text-center"
              >
                Solicitar Orçamento Grátis
              </a>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-slate-50" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500">+500 Clientes Satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-12 lg:mt-0">
            <div className="aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl rotate-2 lg:rotate-3 bg-blue-600 max-w-md mx-auto">
              <img 
                src={`https://picsum.photos/seed/${niche.slug}/800/800`} 
                alt={niche.name}
                className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 max-w-[200px] md:max-w-xs animate-bounce-slow">
              <div className="flex items-center gap-3 md:gap-4 mb-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="md:w-5 md:h-5" />
                </div>
                <p className="font-bold text-xs md:text-sm">Atendimento 24h</p>
              </div>
              <p className="text-[10px] md:text-xs text-slate-500">Estamos prontos para te atender em qualquer bairro de {data.city}.</p>
            </div>
          </div>
        </div>
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/4"></div>
      </Section>

      {/* Featured Properties (Real Estate Only) */}
      {isRealEstate && data.properties && data.properties.length > 0 && (
        <Section className="bg-slate-50">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Imóveis em Destaque</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Confira as melhores oportunidades selecionadas para você em {data.city}.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.properties.map((prop: any) => (
              <div key={prop.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={prop.imageUrl} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">
                      {prop.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{prop.title}</h3>
                  <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                    <div className="flex items-center gap-1">
                      <Bed size={14} /> {prop.beds} Quartos
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 size={14} /> {prop.area} m²
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xl font-black text-blue-600">R$ {prop.price}</span>
                    <a 
                      href={formatWhatsApp(data.whatsapp)}
                      target="_blank"
                      className="p-2 bg-slate-50 text-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <MessageSquare size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Services */}
      <Section id="servicos">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Nossos {serviceLabel} em {data.city}</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            {isRealEstate 
              ? 'As melhores opções de imóveis para você e sua família com total segurança jurídica.'
              : 'Soluções completas para sua residência ou empresa com o melhor custo-benefício.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service: string, i: number) => (
            <div key={i} className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck size={24} className="md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">{service}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {isRealEstate 
                  ? `Encontre ${service.toLowerCase()} em ${data.city} com as melhores condições do mercado imobiliário.`
                  : `Realizamos ${service.toLowerCase()} em ${data.city} com equipamentos de ponta e profissionais treinados.`}
              </p>
              <a 
                href={`?site=${project.id}&servico=${service.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              >
                Ver Detalhes <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="px-4 md:px-6 mb-12 md:mb-20">
        <div className="bg-blue-600 text-white rounded-[32px] md:rounded-[60px] p-8 md:p-20 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight">Precisa de um {niche.name} em {data.city} agora?</h2>
            <p className="text-blue-100 text-base md:text-lg mb-8 md:mb-12">
              Não perca tempo com amadores em {data.city}. Chame quem entende do assunto e tenha seu problema resolvido com garantia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={formatWhatsApp(data.whatsapp)}
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-blue-600 rounded-2xl font-black text-lg md:text-xl hover:bg-blue-50 transition-all shadow-xl"
              >
                Chamar no WhatsApp
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} className="md:w-5 md:h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-blue-200 uppercase">Ligue Agora</p>
                  <p className="text-base md:text-lg font-bold">{data.whatsapp}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {data.logoUrl ? (
                <img src={data.logoUrl} alt={data.businessName} className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl">
                  {data.businessName.charAt(0)}
                </div>
              )}
              <span className="font-extrabold text-xl md:text-2xl tracking-tight">{data.businessName}</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 text-sm md:text-base">
              Sua melhor escolha para serviços de {niche.name.toLowerCase()} em {data.city}. Qualidade e confiança acima de tudo.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Phone size={18} />
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <MapPin size={18} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] md:text-xs tracking-widest text-slate-500">Links Rápidos</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">{serviceLabel}</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] md:text-xs tracking-widest text-slate-500">Atendimento</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-2"><Clock size={16} /> Segunda a Sábado</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> Garantia de 90 dias</li>
              <li className="flex items-center gap-2"><MapPin size={16} /> {data.city}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 md:mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px] md:text-xs">
          © {new Date().getFullYear()} {data.businessName}. Todos os direitos reservados. Gerado por LocalSites OS.
        </div>
      </footer>
    </div>
  );
};
