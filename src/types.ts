export type Role = 'admin' | 'tenant_admin' | 'editor';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  primary_color: string;
}

export interface Niche {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  tenant_id: string;
  niche_id: string;
  name: string;
  status: 'draft' | 'published';
  business_data: {
    whatsapp: string;
    address: string;
    services: string[];
    cities: string[];
    logoUrl?: string;
    properties?: {
      id: string;
      title: string;
      price: string;
      type: 'venda' | 'locação';
      beds: number;
      area: string;
      imageUrl: string;
    }[];
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contact' | 'qualified' | 'closed' | 'lost';
  created_at: string;
  source: string;
}
