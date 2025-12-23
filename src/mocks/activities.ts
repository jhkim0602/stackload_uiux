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
  description: string; // HTML content supported

  // Community Integration Mock Data
  recruitmentCount: number; // Number of active team building posts in community

  // New Fields for Enhanced List
  reward?: string; // e.g. "상금 2,600만 원"
  participants?: number; // e.g. "280명"

  // User specific mock
  myStatus?: 'Applied' | 'Bookmarked' | null;
}

export const ACTIVITY_TYPES = ['All', 'Hackathon', 'Conference', 'Bootcamp', 'Study'];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act1',
    type: 'Hackathon',
    title: 'Samsung SDS Algorithm Hackathon',
    organizer: 'Samsung SDS',
    date: '2025.04.10 - 2025.04.12',
    deadline: '2025.03.31',
    dDay: 'D-12',
    location: 'Samsung R&D Center, Seoul',
    tags: ['Algorithm', 'AI', 'Offline', 'Prize 50M'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1000&auto=format&fit=crop',
    status: 'Open',
    recruitmentCount: 12,
    reward: '5,000만 원',
    participants: 1240,
    myStatus: 'Bookmarked',
    description: `
      <p>삼성 SDS와 함께하는 2025 알고리즘 해커톤에 도전하세요! 이번 해커톤은 실제 산업 현장에서 발생하는 문제들을 알고리즘으로 해결하는 대회입니다.</p>
      <ul>
        <li>총 상금 5,000만원 및 삼성전자 최신 기기 부상</li>
        <li>우수 수상자 대상 서류 전형 면제 혜택</li>
        <li>현직 개발자 멘토링 기회 제공</li>
      </ul>
      <p>알고리즘 역량을 검증하고 성장하고 싶은 모든 개발자 분들의 참여를 기다립니다.</p>
    `
  },
  {
    id: 'act2',
    type: 'Conference',
    title: 'FEConf 2025: The Future of React',
    organizer: 'FEConf Korea',
    date: '2025.05.05',
    deadline: '2025.04.20',
    dDay: 'D-25',
    location: 'COEX Grand Ballroom',
    tags: ['Frontend', 'React', 'Networking'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50935339?q=80&w=1000&auto=format&fit=crop',
    status: 'Open',
    recruitmentCount: 3,
    participants: 850,
    description: `
      <p>국내 최대 프론트엔드 컨퍼런스 FEConf 2025가 'The Future of React'를 주제로 돌아왔습니다.</p>
      <p>React Server Components, 리액트 컴파일러 등 최신 기술 트렌드부터 대규모 웹 서비스 성능 최적화 사례까지.</p>
      <ul>
        <li>토스, 카카오, 네이버 등 주요 테크 기업 세션</li>
        <li>스페셜 게스트: React Core Team 멤버 참여</li>
        <li>네트워킹 파티 및 굿즈 제공</li>
      </ul>
    `
  },
  {
    id: 'act3',
    type: 'Bootcamp',
    title: 'Woowa Tech Course 7th Gen',
    organizer: 'Woowahan Brothers',
    date: '2025.02.01 - 2025.11.30',
    deadline: '2024.12.31',
    dDay: 'Closed',
    location: 'Seoul / Online Hybrid',
    tags: ['Fullstack', 'Intensive', 'Mentoring'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
    status: 'Closed',
    participants: 3000,
    recruitmentCount: 0,
    description: `
      <p>우아한형제들이 주관하는 개발자 양성 교육, 우아한테크코스 7기 모집이 시작되었습니다.</p>
      <p>단순한 지식 전달이 아닌, 현장에서 통하는 소프트웨어 엔지니어를 양성하는 것을 목표로 합니다.</p>
      <ul>
        <li>10개월 전일제 몰입 교육</li>
        <li>자기주도 학습 및 페어 프로그래밍 위주 커리큘럼</li>
        <li>교육비 전액 무료</li>
      </ul>
    `
  },
  {
    id: 'act4',
    type: 'Study',
    title: 'NestJS Deep Dive Study',
    organizer: 'StackLoad Community',
    date: '2025.03.15 - 2025.05.15',
    deadline: '2025.03.10',
    dDay: 'D-3',
    location: 'Gangnam Station Workspace',
    tags: ['Backend', 'NestJS', 'Study Group'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    status: 'Imminent',
    recruitmentCount: 5,
    reward: '보증금 환급',
    participants: 12,
    myStatus: 'Applied',
    description: `
      <p>NestJS의 공식 문서를 처음부터 끝까지 정독하고, 실무에 적용 가능한 아키텍처를 함께 고민하는 스터디입니다.</p>
      <ul>
        <li>매주 화요일 저녁 8시 오프라인 모임</li>
        <li>각자 챕터 맡아 발표 및 코드 리뷰 진행</li>
        <li>보증금 5만원 (완주 시 환급)</li>
      </ul>
    `
  },
  {
    id: 'act5',
    type: 'Hackathon',
    title: 'Junction Asia 2025',
    organizer: 'Junction',
    date: '2025.08.18 - 2025.08.20',
    deadline: '2025.07.30',
    dDay: 'D-120',
    location: 'Busan BEXCO',
    tags: ['Global', 'English', 'Hackathon'],
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
    status: 'Open',
    reward: '1,000만 원',
    participants: 500,
    recruitmentCount: 8,
    description: `
      <p>유럽 최대 해커톤 Junction의 아시아 버전, Junction Asia 2025가 부산에서 열립니다.</p>
      <p>전 세계 개발자, 기획자, 디자이너와 함께 48시간 동안 혁신적인 서비스를 만들어보세요.</p>
      <ul>
        <li>글로벌 기업들의 트랙 과제 수행</li>
        <li>영어 커뮤니케이션 권장</li>
        <li>네트워킹 파티 및 애프터 파티</li>
      </ul>
    `
  }
];
