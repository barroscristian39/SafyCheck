export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'inspector' | 'corrector';
  company_id: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address?: string;
  phone?: string;
}

export interface Unit {
  id: string;
  company_id: string;
  name: string;
  address: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  type: 'standard' | 'custom';
}

export interface InspectionSummary {
  total: number;
  compliant: number;
  non_compliant: number;
  not_applicable: number;
  pending: number;
}

export interface DashboardStats {
  companies: number;
  units: number;
  checklists: number;
  non_conformities: number;
  conformity_percentage: number;
}
