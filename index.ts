export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'Air' | 'Ocean' | 'Specialised' | 'Land & Clearance';
  summary: string;
  description: string;
  capabilities: string[];
  equipment: string[];
  cargoHandled: string[];
  complianceNotes?: string;
  transitAdvantage: string;
  image: string;
}

export interface OfficeLocation {
  id: string;
  city: string;
  role: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  phoneFormatted: string;
  mobile?: string;
  mobileFormatted?: string;
  email: string;
  hours: string;
  portProximity: string;
  description: string;
}

export interface IndustryBulletin {
  id: string;
  date: string;
  category: 'Waterfront' | 'Biosecurity' | 'Trade Advisory' | 'Air Cargo';
  title: string;
  excerpt: string;
  readTime: string;
  content: string;
}
