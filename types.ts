export interface Project {
  title: string;
  description: string;
  icon? : string;
  technologies?: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  role: string;
  company: string;
  startDate: string; // ISO format for sorting (e.g. 2026-05)
  endDate?: string; // Optional for current roles.69996.302.
  location?: string;
  description?: string;
  technologies?: string[];
}
