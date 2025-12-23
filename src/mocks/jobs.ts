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
}

export const MOCK_JOBS: Job[] = [
  {
    id: 'job1',
    title: 'Senior Frontend Engineer (React)',
    company: 'Toss',
    logo: 'https://static.toss.im/assets/toss-logo/blue.png',
    location: 'Seoul, Gangnam',
    tags: ['Frontend', 'React', 'Fintech'],
    postedAt: '2 days ago',
    salary: '₩80,000,000 - ₩120,000,000',
    experience: '5+ years',
    skills: ['React', 'TypeScript', 'Next.js', 'Recoil'],
    description: `
      <h3>Change Finance with Technology</h3>
      <p>토스 프론트엔드 챕터는 금융의 불편함을 기술로 해결합니다.</p>
      <ul>
        <li>토스 앱 내의 다양한 웹 서비스 개발 및 운영</li>
        <li>프론트엔드 생산성 향상을 위한 라이브러리 및 도구 개발</li>
        <li>UX 개선을 위한 A/B 테스트 및 데이터 분석</li>
      </ul>
    `,
    perks: ['Best Gear', 'Unlimited Books', 'Global Conference Support'],
    isRecommended: true,
    recommendationReason: 'Perfect Skill Match',

  },
  {
    id: 'job2',
    title: 'Backend Engineer (Python/Django)',
    company: 'Karrot (Danggeun)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Daangn_Market_logo.png',
    location: 'Seoul, Seocho',
    tags: ['Backend', 'Python', 'Hyper-local'],
    postedAt: '1 day ago',
    salary: '₩60,000,000 - ₩100,000,000',
    experience: '3+ years',
    skills: ['Python', 'Django', 'AWS', 'PostgreSQL'],
    description: `
      <h3>Connect Your Neighborhood</h3>
      <p>당근마켓은 동네 이웃 간의 연결을 돕는 지역 생활 커뮤니티입니다.</p>
      <ul>
        <li>대규모 트래픽을 처리하는 백엔드 시스템 설계 및 구현</li>
        <li>위치 기반 서비스 고도화 및 검색 엔진 최적화</li>
        <li>안정적인 서비스를 위한 모니터링 및 장애 대응</li>
      </ul>
    `,
    perks: ['Remote Work Hybrid', 'Lunch Allowance', 'Growth Support'],
    isRecommended: false,

  },
  {
    id: 'job3',
    title: 'iOS Developer',
    company: 'Kakao',
    logo: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png',
    location: 'Pangyo, Gyeonggi',
    tags: ['Mobile', 'iOS', 'Platform'],
    postedAt: '3 days ago',
    salary: '₩50,000,000 - ₩90,000,000',
    experience: '2+ years',
    skills: ['Swift', 'SwiftUI', 'Design System'],
    description: `
      <h3>Better World with People & Technology</h3>
      <p>카카오는 사람과 사람, 사람과 기술을 연결하여 더 나은 세상을 만듭니다.</p>
      <ul>
        <li>국민 메신저 카카오톡 iOS 앱 개발 및 유지보수</li>
        <li>새로운 서비스 기획 및 프로토타이핑</li>
        <li>iOS 최신 기술 기술 및 적용</li>
      </ul>
    `,
    perks: ['Kakao Family Benefits', 'Sabbatical Leave', 'In-house Cafe'],
    isRecommended: true,
    recommendationReason: 'High Growth Potential',

  },
  {
    id: 'job4',
    title: 'DevOps Engineer',
    company: 'Coupang',
    logo: 'https://image10.coupangcdn.com/image/coupang/common/logo_coupang_w350.png',
    location: 'Seoul, Songpa',
    tags: ['DevOps', 'Infrastructure', 'E-commerce'],
    postedAt: 'Just now',
    salary: '₩90,000,000 - ₩150,000,000',
    experience: '5+ years',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Go'],
    description: `
      <h3>Rocket Delivery Innovation</h3>
      <p>쿠팡은 고객의 삶을 혁신적으로 변화시키는 이커머스 기업입니다.</p>
      <ul>
        <li>대규모 클라우드 인프라 자동화 및 관리</li>
        <li>안정적인 배포 파이프라인(CI/CD) 구축 및 운영</li>
        <li>시스템 성능 모니터링 및 최적화</li>
      </ul>
    `,
    perks: ['Rocket Growth', 'Global Team', 'Stock Options'],
    isRecommended: false,

  },
  {
    id: 'job5',
    title: 'Product Designer',
    company: 'Line',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png',
    location: 'Seoul, Mapo',
    tags: ['Design', 'UX/UI', 'Global'],
    postedAt: '1 week ago',
    salary: '₩55,000,000 - ₩95,000,000',
    experience: '3+ years',
    skills: ['Figma', 'Prototyping', 'User Research'],
    description: `
      <h3>Closing the Distance</h3>
      <p>라인은 전 세계 사용바를 연결하는 글로벌 메신저 플랫폼입니다.</p>
      <ul>
        <li>글로벌 사용자 경험을 위한 UX/UI 디자인</li>
        <li>디자인 시스템 구축 및 가이드라인 제작</li>
        <li>사용자 리서치 및 데이터 기반 디자인 개선</li>
      </ul>
    `,
    perks: ['Global Rotation', 'Flexible Hours', 'Welfare Point'],
    isRecommended: false,

  }
];
