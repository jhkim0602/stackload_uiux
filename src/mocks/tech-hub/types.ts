export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  vizType?: 'generic' | 'routing-tree' | 'server-component' | 'data-flow' | 'virtual-dom' | 'di-graph' | 'sorting';
  readTime?: string;
}

export interface TechStack {
  id: string;
  slug: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'CS' | 'Algorithm';
  logo: string;
  description: string;
  popularity: number;
  docsUrl?: string;
  tags: string[];
  chapters: Chapter[];
  qna: { user: string; question: string; answer: string; date: string; likes: number }[];
}

export const TECH_CATEGORIES = ['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'CS', 'Algorithm'] as const;
export type TechCategory = typeof TECH_CATEGORIES[number];
