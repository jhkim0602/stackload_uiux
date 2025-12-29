export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  isAccepted?: boolean;
}

export type CategoryType = 'qna' | 'tips' | 'career' | 'free' | 'connect';

export interface Post {
  id: string;
  type: 'QnA' | 'Feed';
  category: CategoryType;
  title: string;
  author: string;
  authorLevel: number;
  avatar: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  views: number;
  date: string;

  // Specific fields
  isSolved?: boolean;
  images?: string[];
  thumbnail?: string;
  recruitStatus?: 'open' | 'closed';
  projectType?: 'Side Project' | 'Study' | 'Hackathon';
}
