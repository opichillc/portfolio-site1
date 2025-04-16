export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  height: number;
  description?: string;
  client?: string;
  year?: string;
  timeline?: string;
  services?: string;
}

export interface NavItem {
  name: string;
  path: string;
}

export interface PageContent {
  id: string;
  page: string;
  section_key: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
}