export interface Activity {
  id: string;
  type: 'Hackathon' | 'Conference' | 'Bootcamp' | 'Study';
  title: string;
  organizer: string;
  date: string;
  deadline: string;
  dDay: string;
  location: string;
  tags: string[];
  imageUrl: string;
  status: 'Open' | 'Closed' | 'Imminent';
  description: string;

  // Enhanced fields
  reward?: string;
  participants?: number;
  recruitmentCount?: number;
  myStatus?: 'Applied' | 'Bookmarked' | null;
}
