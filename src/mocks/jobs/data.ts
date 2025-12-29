import { Job } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: 'job1',
    title: 'Senior Frontend Engineer (React/Next.js)',
    company: 'Toss',
    logo: 'https://static.toss.im/assets/toss-logo/blue.png',
    location: '서울 강남구',
    tags: ['Frontend', 'Fintech', 'Design System'],
    postedAt: '방금 전',
    salary: '8,000만원 - 1.2억원',
    experience: '경력 5년 이상',
    skills: ['React', 'TypeScript', 'Next.js', 'Recoil', 'D3.js'],
    description: `
      <h3>금융의 모든 순간을 혁신합니다</h3>
      <p>토스 프론트엔드 챕터는 사용자에게 가장 직관적이고 아름다운 금융 경험을 제공하기 위해 기술적 한계에 도전합니다.</p>
      <ul>
        <li>토스 슈퍼앱 내의 송금, 결제, 주식 등 핵심 서비스 개발</li>
        <li>개발자 생산성 향상을 위한 TDS(Toss Design System) 고도화</li>
        <li>서버 사이드 렌더링(SSR) 및 성능 최적화를 통한 UX 개선</li>
      </ul>
    `,
    perks: ['최고급 장비 지원', '도서 구입비 무제한', '통신비 지원', '사내 카페 무료'],
    isRecommended: true,
    recommendationReason: 'Tech Stack 일치도 95%',
    applyLink: '#'
  },
  {
    id: 'job2',
    title: 'Backend Engineer (Python/Django)',
    company: 'Danggeun',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Daangn_Market_logo.png',
    location: '서울 서초구',
    tags: ['Backend', 'Python', 'Geospatial', 'High Traffic'],
    postedAt: '1일 전',
    salary: '6,000만원 - 1억원',
    experience: '경력 3년 이상',
    skills: ['Python', 'Django', 'AWS', 'PostgreSQL', 'Redis', 'Kubernetes'],
    description: `
      <h3>당신 근처의 따뜻한 연결을 만듭니다</h3>
      <p>당근마켓은 지역 기반 중고 거래를 넘어, 하이퍼로컬 커뮤니티로 나아가고 있습니다.</p>
      <ul>
        <li>월 1,800만 사용자가 이용하는 대규모 백엔드 시스템 설계 및 운영</li>
        <li>위치 기반 알고리즘 고도화 및 검색 엔진 최적화</li>
        <li>MSA 전환 및 안정적인 인프라 구축</li>
      </ul>
    `,
    perks: ['리모트 워크 혼합', '식비 지원', '전세 자금 대출 지원', '자율 휴가제'],
    isRecommended: false,
    applyLink: '#'
  },
  {
    id: 'job3',
    title: 'iOS Developer (SwiftUI)',
    company: 'Kakao',
    logo: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png',
    location: '경기 성남시 판교',
    tags: ['Mobile', 'iOS', 'Messenger'],
    postedAt: '3일 전',
    salary: '5,000만원 - 9,000만원',
    experience: '경력 2년 이상',
    skills: ['Swift', 'SwiftUI', 'Combine', 'Tuist'],
    description: `
      <h3>기술과 사람으로 더 나은 세상을 만듭니다</h3>
      <p>전 국민이 사용하는 카카오톡 메신저 앱을 함께 만들어갈 iOS 개발자를 찾습니다.</p>
      <ul>
        <li>카카오톡 채팅, 친구, 오픈채팅 등 주요 기능 개발</li>
        <li>SwiftUI 도입 및 레거시 코드 리팩토링</li>
        <li>대규모 사용자 트래픽을 고려한 앱 성능 최적화</li>
      </ul>
    `,
    perks: ['안식 휴가', '사내 어린이집', '의료비 지원', '카카오 패밀리 혜택'],
    isRecommended: true,
    recommendationReason: '높은 성장 가능성',
    applyLink: '#'
  },
  {
    id: 'job4',
    title: 'Platform DevOps Engineer',
    company: 'Coupang',
    logo: 'https://image10.coupangcdn.com/image/coupang/common/logo_coupang_w350.png',
    location: '서울 송파구',
    tags: ['DevOps', 'E-commerce', 'Cloud Native'],
    postedAt: '1주일 전',
    salary: '9,000만원 - 1.5억원',
    experience: '경력 5년 이상',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Go', 'Prometheus'],
    description: `
      <h3>미래의 이커머스를 정의합니다</h3>
      <p>쿠팡은 "쿠팡 없이 어떻게 살았을까?"라고 묻는 세상을 만들기 위해 혁신합니다.</p>
      <ul>
        <li>전 세계적 규모의 클라우드 인프라 자동화 및 관리</li>
        <li>안정적인 배포 파이프라인(CI/CD) 구축 및 카나리 배포 운영</li>
        <li>대규모 트래픽 처리를 위한 오토스케일링 및 고가용성 아키텍처 설계</li>
      </ul>
    `,
    perks: ['쿠팡캐시 지급', '글로벌 오피스 근무 기회', '스톡옵션', '상호 존중 문화'],
    isRecommended: false,
    applyLink: '#'
  },
  {
    id: 'job5',
    title: 'Product Designer (UX/UI)',
    company: 'Line',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png',
    location: '서울 마포구',
    tags: ['Design', 'Global', 'Mobile'],
    postedAt: '2주일 전',
    salary: '5,500만원 - 9,500만원',
    experience: '경력 3년 이상',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design System'],
    description: `
      <h3>전 세계를 연결하는 디자인</h3>
      <p>라인은 아시아를 넘어 전 세계 사용자를 연결하는 글로벌 플랫폼입니다.</p>
      <ul>
        <li>글로벌 사용자 경험을 고려한 UX/UI 디자인</li>
        <li>라인 디자인 시스템(LDS) 구축 및 가이드라인 제작</li>
        <li>데이터 기반의 사용자 행동 분석 및 UI 개선</li>
      </ul>
    `,
    perks: ['하이브리드 근무', '어학 지원', '복지 포인트', '유연 근무제'],
    isRecommended: false,
    applyLink: '#'
  },
  {
    id: 'job6',
    title: 'Data Scientist (Recommendation)',
    company: 'Naver',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/800px-Naver_Logotype.svg.png',
    location: '경기 성남시 분당',
    tags: ['AI', 'Data', 'Search'],
    postedAt: '3일 전',
    salary: '7,000만원 - 1.1억원',
    experience: '경력 4년 이상',
    skills: ['Python', 'PyTorch', 'SQL', 'Hadoop'],
    description: `
      <h3>기술로 일상의 문제를 해결합니다</h3>
      <p>네이버의 방대한 데이터를 바탕으로 사용자에게 최적의 콘텐츠를 추천합니다.</p>
      <ul>
        <li>쇼핑, 뉴스, 웹툰 등 서비스 전반의 추천 알고리즘 개발</li>
        <li>대규모 사용자 로그 데이터 분석 및 모델링</li>
        <li>최신 딥러닝 기술 연구 및 서비스 적용</li>
      </ul>
    `,
    perks: ['사내 병원', '대출 이자 지원', '조식/중식/석식 무료', '자기계발비'],
    isRecommended: true,
    recommendationReason: 'AI 관심분야 일치',
    applyLink: '#'
  }
];
