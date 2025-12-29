export const MOCK_USER = {
  id: 'u1',
  name: 'JungHwan',
  email: 'junghwan@example.com',
  avatar: 'https://i.pravatar.cc/150?u=junghwan',
  role: 'user',
  bio: '성장을 즐기는 풀스택 개발자입니다.',
  stats: {
    streak: 12,
    totalActivities: 405,
    level: 5,
  },
  skills: ['React', 'Next.js', 'Node.js', 'Tus', 'PostgreSQL', 'Docker'],
  activities: generateMockActivities(365),
};

function generateMockActivities(days: number) {
  const activities = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Random count between 0 and 10, weighted towards 0
    const count = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
    activities.push({ date: date.toISOString().split('T')[0], count });
  }
  return activities.reverse();
}
