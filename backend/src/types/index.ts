export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'inspector' | 'corrector';
  company_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address?: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Unit {
  id: string;
  company_id: string;
  name: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  created_at: Date;
  updated_at: Date;
}

export interface ChecklistTemplate {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  icon?: string;
  type: 'standard' | 'custom';
  items: ChecklistItem[];
  created_at: Date;
  updated_at: Date;
}

export interface ChecklistItem {
  id: string;
  template_id: string;
  question: string;
  category: string;
  required: boolean;
  requires_photo: boolean;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Inspection {
  id: string;
  company_id: string;
  unit_id: string;
  template_id: string;
  inspector_id: string;
  status: 'draft' | 'in_progress' | 'completed';
  started_at: Date;
  completed_at?: Date;
  items: InspectionItem[];
  created_at: Date;
  updated_at: Date;
}

export interface InspectionItem {
  id: string;
  inspection_id: string;
  item_id: string;
  status: 'pending' | 'compliant' | 'non_compliant' | 'not_applicable';
  photos: string[];
  observations?: string;
  corrector_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Report {
  id: string;
  inspection_id: string;
  company_id: string;
  unit_id: string;
  title: string;
  status: 'draft' | 'generated' | 'sent';
  conformity_percentage: number;
  total_items: number;
  compliant_items: number;
  non_compliant_items: number;
  not_applicable_items: number;
  pending_items: number;
  pdf_path?: string;
  sent_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: string;
}
