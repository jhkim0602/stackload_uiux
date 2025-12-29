export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  tags: string[];
  postedAt: string;
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  perks: string[];
  isRecommended?: boolean;
  recommendationReason?: string;
  applyLink?: string;
}
