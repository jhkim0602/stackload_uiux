export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  source: 'Toss' | 'Woowahan' | 'Kakao' | 'Line' | 'Naver' | 'Danggeun' | 'Kurly' | 'OliveYoung' | 'Musinsa' | 'Bucketplace' | 'Yanolja';
  category: 'Frontend' | 'Backend' | 'AI' | 'DevOps' | 'Architecture' | 'Mobile' | 'Data' | 'Culture';
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  views: number;
  content: string;
}

export const BLOG_CATEGORIES = ['All', 'Frontend', 'Backend', 'AI', 'DevOps', 'Architecture', 'Mobile', 'Data', 'Culture'] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
