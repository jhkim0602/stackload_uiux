export interface Position {
  id: string;
  title: string;
  level: string;
  deadline: string;
  applicants: number;
  stack: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  positions: Position[];
}

export const MOCK_VIRTUAL_COMPANIES: Company[] = [
  {
    id: 'toss',
    name: 'Toss',
    logo: 'https://static.toss.im/assets/toss-logo/blue.png',
    industry: 'Fintech',
    location: '서울 강남구',
    description: '금융의 모든 순간을 혁신합니다.',
    positions: [
      {
        id: 'job1', // Matches MOCK_JOBS id if possible
        title: 'Senior Frontend Engineer',
        level: 'Senior',
        deadline: '상시 채용',
        applicants: 154,
        stack: ['React', 'TypeScript', 'Next.js']
      },
      {
        id: 'job_toss_2',
        title: 'Backend Platform Engineer',
        level: 'Mid-Senior',
        deadline: '2025.04.30',
        applicants: 89,
        stack: ['Kotlin', 'Spring Boot', 'Kafka']
      }
    ]
  },
  {
    id: 'kakao',
    name: 'Kakao',
    logo: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png',
    industry: 'IT Platform',
    location: '경기 성남시 판교',
    description: '기술과 사람으로 더 나은 세상을 만듭니다.',
    positions: [
        {
            id: 'job3',
            title: 'iOS Developer',
            level: 'Junior',
            deadline: '2025.05.15',
            applicants: 230,
            stack: ['Swift', 'SwiftUI', 'Combine']
        }
    ]
  },
  {
    id: 'naver',
    name: 'Naver',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/800px-Naver_Logotype.svg.png',
    industry: 'Search Engine',
    location: '경기 성남시 분당',
    description: '기술로 일상의 문제를 해결합니다.',
    positions: [
        {
            id: 'job6',
            title: 'Search Recommendation ML Engineer',
            level: 'Senior',
            deadline: '2025.04.20',
            applicants: 45,
            stack: ['Python', 'PyTorch', 'TensorFlow']
        }
    ]
  }
];
