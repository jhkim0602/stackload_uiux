export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  isAccepted?: boolean; // For Q&A
}

export type CategoryType = 'qna' | 'tips' | 'career' | 'free' | 'connect';

export interface Post {
  id: string;
  type: 'QnA' | 'Feed'; // Keeping for backward compatibility or general type
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
  isSolved?: boolean; // QnA
  images?: string[]; // Feed, Tips
  thumbnail?: string; // Tips
  recruitStatus?: 'open' | 'closed'; // Connect
  projectType?: 'Side Project' | 'Study' | 'Hackathon'; // Connect
}

export const MOCK_POSTS: Post[] = [
  // --- Q&A (Technical Questions) ---
  {
    id: 'q1',
    type: 'QnA',
    category: 'qna',
    title: 'Next.js 14 Server Actions에서 에러 핸들링 어떻게 하시나요? ㅠㅠ',
    author: '코딩하는감자',
    authorLevel: 2,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Potato',
    content: 'Server Actions을 사용하는데 try-catch 블록 내부에서 리다이렉트가 안되는 문제가 있습니다.',
    tags: ['Next.js', 'React', 'ErrorHandling'],
    likes: 12,
    views: 450,
    date: '방금 전',
    isSolved: false,
    comments: []
  },
  {
    id: 'q2',
    type: 'QnA',
    category: 'qna',
    title: 'React Query v5 useSuspenseQuery 폭포수 현상 해결법',
    author: '프론트꿈나무',
    authorLevel: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Precious',
    content: '부모/자식 컴포넌트에서 각각 useSuspenseQuery를 썼더니 네트워크 탭에서 요청이 직렬로 나가네요;;',
    tags: ['React', 'Performance', 'TanStackQuery'],
    likes: 8,
    views: 210,
    date: '어제',
    isSolved: true,
    comments: []
  },
  {
    id: 'q3',
    type: 'QnA',
    category: 'qna',
    title: 'Spring Boot JPA N+1 문제, EntityGraph로 해결 안되는 경우?',
    author: '자바칩프라푸치노',
    authorLevel: 10,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Java',
    content: '분명 EntityGraph 설정했는데 쿼리가 계속 나갑니다. 혹시 FetchJoin이랑 같이 쓰면 안되나요?',
    tags: ['Spring', 'JPA', 'Backend'],
    likes: 24,
    views: 1100,
    date: '2시간 전',
    isSolved: true,
    comments: []
  },
  {
    id: 'q4',
    type: 'QnA',
    category: 'qna',
    title: 'Docker Compose로 DB 띄우는데 연결 거부 에러가 뜹니다',
    author: '데브옵스꿈나무',
    authorLevel: 3,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Docker',
    content: 'Connection refused 에러가 계속 뜨는데 포트 포워딩은 3306:3306으로 잘 했습니다.',
    tags: ['Docker', 'Database', 'Infrastructure'],
    likes: 5,
    views: 156,
    date: '2일 전',
    isSolved: false,
    comments: []
  },
  {
    id: 'q5',
    type: 'QnA',
    category: 'qna',
    title: 'Flutter vs React Native 신규 프로젝트 기술 선정 조언 부탁드려요',
    author: '스타트업CTO',
    authorLevel: 40,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CTO',
    content: '빠르게 MVP 나와야 하고 2명 개발자 붙을 예정입니다. 둘 다 경험이 전무하다면 어느쪽이 러닝커브가 낮을까요?',
    tags: ['Flutter', 'RN', 'Mobile'],
    likes: 45,
    views: 2300,
    date: '3일 전',
    isSolved: false,
    comments: []
  },

  // --- Tips (Information & Articles) - Featured Images ---
  {
    id: 't1',
    type: 'Feed',
    category: 'tips',
    title: 'CSS-in-JS vs Tailwind CSS, 2024년엔 뭘 배워야 할까요?',
    author: '퍼블리셔',
    authorLevel: 1,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
    content: '이제 막 프론트엔드 시작하는 취준생입니다. styled-components는 좀 지는 해 같고...',
    tags: ['CSS', 'Tailwind', 'Trend'],
    likes: 24,
    views: 800,
    date: '2일 전',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60',
    comments: []
  },
  {
    id: 't2',
    type: 'Feed',
    category: 'tips',
    title: '개발자 필독서 선정해준다 (반박 환영)',
    author: 'BookWorm',
    authorLevel: 30,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    content: '1. Clean Code (근본)\n2. 리팩터링 2판 (필수)\n3. 실용주의 프로그래머...',
    tags: ['책추천', '공부', 'Basic'],
    likes: 112,
    views: 2800,
    date: '1주일 전',
    thumbnail: 'https://images.unsplash.com/photo-1513475303629-156375056a09?w=800&auto=format&fit=crop&q=60',
    comments: []
  },
  {
    id: 't3',
    type: 'Feed',
    category: 'tips',
    title: '주니어 개발자가 꼭 알아야 할 Git 명령어 모음 💡',
    author: '깃허브마스터',
    authorLevel: 12,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Git',
    content: 'cherry-pick, rebase, stash... 이 정도만 알아도 1인분은 합니다.',
    tags: ['Git', 'HoneyTip', 'Junior'],
    likes: 231,
    views: 5200,
    date: '3일 전',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
    comments: []
  },
  {
    id: 't4',
    type: 'Feed',
    category: 'tips',
    title: '크롬 개발자 도구 숨겨진 기능 5가지',
    author: 'DebugKing',
    authorLevel: 18,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bug',
    content: 'console.log만 쓰시나요? 디버거 활용법부터 네트워크 스로틀링까지 알려드립니다.',
    tags: ['Chrome', 'Debugging', 'Web'],
    likes: 89,
    views: 1900,
    date: '4일 전',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    comments: []
  },
  {
    id: 't5',
    type: 'Feed',
    category: 'tips',
    title: '알고리즘 코딩테스트, 파이썬 vs C++ 뭘로 준비할까?',
    author: '알고리즘깎는노인',
    authorLevel: 55,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Old',
    content: '시간 복잡도와 구현 편의성, 두 마리 토끼를 잡는 전략적 선택 가이드.',
    tags: ['Algorithm', 'CodingTest', 'Python'],
    likes: 156,
    views: 3300,
    date: '1주 전',
    comments: []
  },

  // --- Career (Discussions) ---
  {
    id: 'c1',
    type: 'Feed',
    category: 'career',
    title: '3년차 백엔드 이직 고민입니다 (네카라쿠배 vs 스타트업)',
    author: '익명_82d1',
    authorLevel: 15,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    content: '현재 시리즈B 스타트업에서 리드급으로 일하고 있는데...',
    tags: ['이직', '커리어', '고민상담'],
    likes: 156,
    views: 3200,
    date: '13:42',
    comments: []
  },
  {
    id: 'c2',
    type: 'Feed',
    category: 'career',
    title: '[후기] 우아한형제들 최종 면접 탈락 후기...',
    author: '배고픈개발자',
    authorLevel: 10,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Buster',
    content: '기술 면접까지는 분위기 좋았는데 임원 면접에서 너무 긴장해서 말린 것 같습니다 ㅜㅜ',
    tags: ['면접후기', '우아한형제들', '회고'],
    likes: 230,
    views: 5600,
    date: '3일 전',
    comments: []
  },
  {
    id: 'c3',
    type: 'QnA',
    category: 'career',
    title: '신입 연봉 3500이면 적정한가요?',
    author: '취준생123',
    authorLevel: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ginger',
    content: '지방 4년제 컴공 졸, 정보처리기사 있고 포트폴리오 프로젝트 2개 있습니다.',
    tags: ['연봉', '신입', '취업'],
    likes: 56,
    views: 1200,
    date: '5일 전',
    isSolved: false,
    comments: []
  },
  {
    id: 'c4',
    type: 'Feed',
    category: 'career',
    title: '개발자 번아웃, 어떻게 극복하시나요?',
    author: '지친영혼',
    authorLevel: 22,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Soul',
    content: '3년동안 쉬지않고 달렸더니 키보드만 봐도 토할 것 같습니다. 휴직이 답일까요?',
    tags: ['번아웃', '멘탈관리', '휴식'],
    likes: 88,
    views: 2100,
    date: '어제',
    comments: []
  },
  {
    id: 'c5',
    type: 'Feed',
    category: 'career',
    title: '비전공자 국비지원 부트캠프 현실적인 조언 부탁드립니다',
    author: '새로운시작',
    authorLevel: 1,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boot',
    content: '6개월 과정으로 취업이 가능할까요? 현실을 알고 싶습니다.',
    tags: ['부트캠프', '비전공자', '취업'],
    likes: 34,
    views: 1800,
    date: '2일 전',
    comments: []
  },

  // --- Free (Lifestyle/Chat) ---
  {
    id: 'f1',
    type: 'Feed',
    category: 'free',
    title: '오늘자 판교 점심 물가 실화냐... 💸',
    author: '판교직장인',
    authorLevel: 8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    content: '제육볶음 먹었는데 13,000원 나옴. 내 월급 빼고 다 오르는 듯.',
    tags: ['일상', '판교', '점심'],
    likes: 45,
    views: 890,
    date: '12:30',
    comments: []
  },
  {
    id: 'f2',
    type: 'Feed',
    category: 'free',
    title: '개발자가 맥북을 써야 하는 이유 (반박 시 님 말이 맞음)',
    author: 'AppleLover',
    authorLevel: 25,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
    content: '1. 터미널 환경이 리눅스랑 비슷해서 서버 배포랑 환경 맞추기 편함...',
    tags: ['개발장비', 'MacBook', '토론'],
    likes: 89,
    views: 1500,
    date: '2일 전',
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60'],
    comments: []
  },
  {
    id: 'f3',
    type: 'Feed',
    category: 'free',
    title: '허먼밀러 의자 샀는데 허리가 더 아픈건 기분 탓인가요?',
    author: '장비병환자',
    authorLevel: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chair',
    content: '200만원 태웠는데... 자세 교정되는 과정이라고 믿고 싶네요 ㅠㅠ',
    tags: ['의자', '허먼밀러', '장비'],
    likes: 22,
    views: 600,
    date: '1시간 전',
    comments: []
  },
  {
    id: 'f4',
    type: 'Feed',
    category: 'free',
    title: '재택근무 하니까 살이 너무 찌네요',
    author: '확찐자',
    authorLevel: 9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pig',
    content: '출퇴근이 없으니 활동량이 0에 수렴합니다. 집에서 할만한 운동 추천좀요.',
    tags: ['재택', '다이어트', '일상'],
    likes: 56,
    views: 1200,
    date: '3시간 전',
    comments: []
  },
  {
    id: 'f5',
    type: 'Feed',
    category: 'free',
    title: '오늘 월요일... 출근 실화인가',
    author: '월요병환자',
    authorLevel: 4,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sad',
    content: '주말이 순삭되었습니다. 살려주세요.',
    tags: ['월요병', '직장인', '살려줘'],
    likes: 120,
    views: 1500,
    date: '아침',
    comments: []
  },

  // --- Connect (Recruiting/Study) ---
  {
    id: 'co1',
    type: 'Feed',
    category: 'connect',
    title: '깃헙 스타 3k 찍은 오픈소스 프로젝트 홍보합니다! 🚀',
    author: 'OpenSourceMan',
    authorLevel: 42,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rocky',
    content: '약 1년간 주말 갈아넣어서 만든 리액트 폼 라이브러리입니다.',
    tags: ['오픈소스', '홍보', 'React', 'SideProject'],
    likes: 412,
    views: 8900,
    date: '4일 전',
    projectType: 'Side Project',
    recruitStatus: 'open',
    comments: []
  },
  {
    id: 'co2',
    type: 'Feed',
    category: 'connect',
    title: '[사이드프로젝트] 프론트엔드 개발자 1분 모십니다 (React/Next.js)',
    author: '사이드매니아',
    authorLevel: 15,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Side',
    content: '현재 기획, 디자인, 백엔드2, 프론트1 구성입니다. 1월 런칭 목표로 불태우실 분!',
    tags: ['구인', '사이드프로젝트', 'React'],
    likes: 15,
    views: 450,
    date: '1일 전',
    projectType: 'Side Project',
    recruitStatus: 'open',
    comments: []
  },
  {
    id: 'co3',
    type: 'Feed',
    category: 'connect',
    title: '강남역 주말 알고리즘 스터디원 모집 (Python)',
    author: '코테뿌셔',
    authorLevel: 7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Algo',
    content: '매주 토요일 오전 10시-12시, 백준 골드 목표로 달립니다. 보증금 3만원 있습니다.',
    tags: ['스터디', '알고리즘', '강남'],
    likes: 8,
    views: 200,
    date: '2일 전',
    projectType: 'Study',
    recruitStatus: 'open',
    comments: []
  },
  {
    id: 'co4',
    type: 'Feed',
    category: 'connect',
    title: '[마감] 해커톤 같이 나가실 디자이너님 구해요',
    author: '해커톤중독',
    authorLevel: 20,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Design',
    content: '이번주 주말 구름톤 나갑니다. 개발자는 다 모였는데 디자이너님이 급합니다!',
    tags: ['해커톤', '디자이너', '급구'],
    likes: 22,
    views: 670,
    date: '1주일 전',
    projectType: 'Hackathon',
    recruitStatus: 'closed',
    comments: []
  },
  {
    id: 'co5',
    type: 'Feed',
    category: 'connect',
    title: 'Nest.js 공식문서 뽀개기 스터디 (온라인)',
    author: 'NestJS',
    authorLevel: 30,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nest',
    content: '매일 1챕터씩 읽고 정리해서 공유하는 인증방입니다. 부담없이 참여하세요.',
    tags: ['스터디', 'NestJS', 'Backend'],
    likes: 45,
    views: 1200,
    date: '3일 전',
    projectType: 'Study',
    recruitStatus: 'open',
    comments: []
  }
];
