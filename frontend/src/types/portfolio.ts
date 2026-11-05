export interface ProfileConfig {
  id: number;
  name: string;
  professional_identity: string;
  headline: string;
  subheadline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin_url: string;
  github_url: string;
  education_degree: string;
  education_institution: string;
  education_duration: string;
  education_focus: string;
  availability_status: string;
  availability_active: boolean;
  certifications_drive_url?: string;
}
export interface Skill {
  id: number;
  name: string;
  category: string;
  icon_name: string;
  description?: string;
  featured: boolean;
  display_order: number;
}

export interface Experience {
  id: number;
  role: string;
  organization: string;
  collaboration?: string;
  duration: string;
  mode: string;
  summary: string;
  highlights: string[];
  skills_applied: string[];
  certificate_url?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  layer: string;
}

export interface ArchitectureEdge {
  source: string;
  target: string;
  label?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  short_description: string;
  overview: string;
  problem_statement: string;
  proposed_solution: string;
  architecture_nodes: ArchitectureNode[];
  architecture_edges: ArchitectureEdge[];
  technical_workflow: string[];
  tech_stack: string[];
  key_features: string[];
  implementation_details: string[];
  challenges: string[];
  future_improvements: string[];
  github_url?: string;
  disclaimer?: string | null;
  accent_color: string;
  featured: boolean;
  display_order: number;
}

export interface Certification {
  id: number;
  title: string;
  domain: string;
  description: string;
  verification_url?: string;
  skills_covered: string[];
  display_order: number;
}

export interface PortfolioStats {
  flagship_projects: number;
  technical_domains: number;
  programming_languages: number;
  total_skills: number;
  certifications_count: number;
  internship_weeks: number;
}

export interface PortfolioData {
  profile: ProfileConfig;
  stats: PortfolioStats;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  language: string;
  topics: string[];
  stargazers_count?: number | null;
  forks_count?: number | null;
  updated_at?: string;
}

export interface GitHubProfileData {
  source: string;
  cached: boolean;
  profile: {
    username: string;
    name: string;
    avatar_url?: string;
    html_url: string;
    bio: string;
    location: string;
    public_repos?: number | null;
    followers?: number | null;
    following?: number | null;
  };
  repositories: GitHubRepo[];
  languages: Record<string, number>;
}

export interface ContactSubmissionItem {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  delivery_method: string;
  created_at: string;
}
