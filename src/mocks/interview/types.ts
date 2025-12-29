export interface InterviewSession {
  id: string;
  role: string;
  category: 'CS' | 'Frontend' | 'Backend' | 'Behavioral';
  date: string;
  score: number;
  duration: string;
  technicalAccuracy: number;
  keywordUsage: { word: string; count: number }[];
  logicScore: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
}
