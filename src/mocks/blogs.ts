export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  source: 'Toss' | 'Woowahan' | 'Kakao' | 'Line' | 'Naver' | 'Danggeun' | 'Kurly' | 'OliveYoung' | 'Musinsa';
  category: 'Frontend' | 'Backend' | 'AI' | 'DevOps' | 'Architecture' | 'Else';
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  views: number;
  content: string;
}

export const BLOG_CATEGORIES = ['All', 'Frontend', 'Backend', 'AI', 'DevOps', 'Architecture', 'Else'] as const;

export const SUB_CATEGORIES: Record<string, string[]> = {
  'Frontend': ['Web', 'Design', 'JavaScript', 'UI/UX', 'React', 'TypeScript', 'Next.js', 'CSS', 'Micro Frontend', 'Module Federation'],
  'Backend': ['Java', 'Spring', 'Node.js', 'Kotlin', 'Database', 'Distributed System', 'API'],
  'AI': ['AI', 'AI/ML', 'LLM', 'GenAI', 'MLOps'],
  'DevOps': ['Kubernetes', 'Docker', 'CI/CD', 'Monitoring', 'Cloud', 'AWS'],
  'Architecture': ['MSA', 'EDA', 'System Design', 'Refactoring', 'Patterns'],
  'Else': ['Productivity', 'Culture', 'Management', 'Agile', 'Career']
};

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Toss Slash 24 - No Code 로 생산성 300% 높이기',
    excerpt: '개발자 없이 운영팀이 직접 A/B 테스트를 셋팅하고 배포할 수 있는 환경을 구축한 이야기를 공유합니다.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Toss',
    category: 'Else',
    tags: ['Productivity', 'Culture'],
    author: '이준호',
    date: '2024.05.20',
    readTime: '8 min',
    views: 15420,
    content: "<h2>문제의 시작: 개발자 병목 현상</h2><p>토스는 매일 수십 개의 A/B 테스트가 돌아가는 조직입니다. 하지만 모든 실험을 개발자가 직접 코드에 심어야 한다면 어떻게 될까요?</p>"
  },
  {
    id: 'b2',
    title: '우아한형제들 마이크로서비스 아키텍처 전환기',
    excerpt: '모놀리식 아키텍처에서 MSA로 전환하며 겪었던 수많은 시행착오와 교훈들.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Woowahan',
    category: 'Architecture',
    tags: ['MSA', 'Refactoring'],
    author: '김배민',
    date: '2024.05.18',
    readTime: '12 min',
    views: 12300,
    content: "<h2>왜 MSA로 가야 했나?</h2><p>배달의민족 서비스 초기는 거대한 PHP 모놀리식 애플리케이션이었습니다. 트래픽 폭증을 감당하기 위해...</p>"
  },
  {
    id: 'b3',
    title: '카카오톡 메시지 서버의 대규모 트래픽 처리 전략',
    excerpt: '새해 첫날 0시, 폭주하는 메시지 트래픽을 어떻게 안정적으로 처리했는지에 대한 기술적 회고.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Kakao',
    category: 'Backend',
    tags: ['Distributed System', 'Java'],
    author: '박카카오',
    date: '2024.05.15',
    readTime: '10 min',
    views: 9800,
    content: "<h2>1월 1일 0시의 악몽</h2><p>대한민국 국민이라면 누구나 1월 1일 0시에 메시지를 보냅니다. 이때 발생하는 트래픽은 상상을 초월합니다.</p>"
  },
  {
    id: 'b4',
    title: 'LINE의 글로벌 서비스 성능 최적화 가이드',
    excerpt: '네트워크 환경이 좋지 않은 국가에서도 빠른 속도를 보장하기 위한 프론트엔드 최적화 기법.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Line',
    category: 'Frontend',
    tags: ['Performance', 'Web'],
    author: '최라인',
    date: '2024.05.10',
    readTime: '7 min',
    views: 8500,
    content: "<h2>동남아시아의 네트워크 환경</h2><p>LINE은 동남아시아 사용자가 많습니다. 느린 네트워크 환경에서도 빠른 로딩 속도를 유지하는 비결을 공개합니다.</p>"
  },
  {
    id: 'b5',
    title: '네이버 검색 랭킹 알고리즘의 진화 (AiRS)',
    excerpt: '사용자 의도를 파악하고 개인화된 검색 결과를 제공하기 위한 AI 모델의 발전 과정.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Naver',
    category: 'AI',
    tags: ['LLM', 'AI/ML'],
    author: '정네이버',
    date: '2024.05.08',
    readTime: '15 min',
    views: 11200,
    content: "<h2>검색의 패러다임 변화</h2><p>단순 키워드 매칭을 넘어, 사용자 의도를 파악하는 딥러닝 검색 추천 시스템 AiRS를 소개합니다.</p>"
  },
  {
    id: 'b6',
    title: '당근마켓의 지역 기반 데이터베이스 샤딩 전략',
    excerpt: '동네 인증 기반 서비스를 위한 효율적인 DB 파티셔닝과 쿼리 최적화 사례.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Danggeun',
    category: 'Backend',
    tags: ['Database', 'Distributed System'],
    author: '황당근',
    date: '2024.05.05',
    readTime: '9 min',
    views: 7600,
    content: "<h2>지역 기반 데이터의 특징</h2><p>당근마켓의 데이터는 지역적 격리성이 강합니다. 이를 활용한 효과적인 샤딩 전략을 공유합니다.</p>"
  },
  {
    id: 'b7',
    title: '컬리 물류 시스템의 자동화 여정',
    excerpt: '새벽 배송의 핵심, 물류 센터 자동화를 위해 도입한 로봇 제어 시스템과 소프트웨어 아키텍처.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Kurly',
    category: 'Else',
    tags: ['IoT', 'System Design'],
    author: '김컬리',
    date: '2024.05.01',
    readTime: '11 min',
    views: 6400,
    content: "<h2>새벽 배송의 시간 싸움</h2><p>주문 마감 후 새벽 7시까지 배송을 완료하기 위한 물류 자동화 기술의 핵심을 다룹니다.</p>"
  },
  {
    id: 'b8',
    title: '프론트엔드 상태 관리, 이제는 정착할 수 있을까?',
    excerpt: 'Redux, Recoil, Zustand, Jotai... 수많은 상태 관리 라이브러리 중 우리 팀에 맞는 도구 선택하기.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Woowahan',
    category: 'Frontend',
    tags: ['React', 'State Management', 'Web'],
    author: '이우아',
    date: '2024.04.28',
    readTime: '6 min',
    views: 18000,
    content: "<h2>상태 관리 춘추전국시대</h2><p>왜 이렇게 많은 상태 관리 라이브러리가 존재할까요? 우리 팀에 딱 맞는 도구를 찾는 기준을 제시합니다.</p>"
  },
  {
    id: 'b9',
    title: 'Server Driven UI로 앱 배포 없이 화면 수정하기',
    excerpt: '모바일 앱의 유연성을 극대화하기 위해 서버 주도 UI를 도입한 토스의 경험담.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Toss',
    category: 'Frontend',
    tags: ['Mobile', 'UI/UX', 'Module Federation'],
    author: '박토스',
    date: '2024.04.25',
    readTime: '8 min',
    views: 14500,
    content: "<h2>앱 배포의 제약을 넘어서</h2><p>서버에서 UI 구성을 내려주는 Server Driven UI 아키텍처를 통해 앱 배포 없이 기능을 수정하는 방법을 알아봅니다.</p>"
  },
  {
    id: 'b10',
    title: '쿠버네티스 클러스터 운영 자동화 (Operator Pattern)',
    excerpt: '복잡한 인프라 관리 비용을 줄이기 위해 자체 Operator를 개발하여 운영을 자동화한 사례.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Naver',
    category: 'DevOps',
    tags: ['Kubernetes', 'Cloud'],
    author: '최클라우드',
    date: '2024.04.20',
    readTime: '13 min',
    views: 5200,
    content: "<h2>인프라 운영의 자동화</h2><p>수천 개의 마이크로서비스를 효율적으로 관리하기 위해 Custom Operator를 개발한 경험을 공유합니다.</p>"
  },
  {
    id: 'b11',
    title: 'Next.js 14 App Router 도입기: 무엇이 좋았나?',
    excerpt: 'Pages Router에서 App Router로 마이그레이션하면서 경험한 성능 개선과 DX 향상.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'OliveYoung',
    category: 'Frontend',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: '김올영',
    date: '2024.04.15',
    readTime: '8 min',
    views: 8900,
    content: "<h2>App Router로의 여정</h2><p>Next.js 14 App Router를 도입하며 겪은 장단점과 성능 최적화 효과를 상세히 분석합니다.</p>"
  },
  {
    id: 'b12',
    title: '대규모 언어 모델(LLM)을 활용한 코드 리뷰 자동화',
    excerpt: 'GitHub Actions와 OpenAI API를 연동하여 PR 리뷰 비용을 50% 절감한 사례.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Musinsa',
    category: 'AI',
    tags: ['LLM', 'GenAI', 'CI/CD'],
    author: '박무신',
    date: '2024.04.10',
    readTime: '10 min',
    views: 10500,
    content: "<h2>AI가 코드를 리뷰해준다면?</h2><p>단순한 문법 오류부터 복잡한 로직 버그까지, LLM을 활용한 자동화된 코드 리뷰 시스템 구축기를 소개합니다.</p>"
  },
  {
    id: 'b13',
    title: '마이크로 프론트엔드(Micro Frontend) 적용 가이드',
    excerpt: 'Module Federation을 활용하여 거대한 프론트엔드 애플리케이션을 분리하고 배포 독립성을 확보하는 방법.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Line',
    category: 'Frontend',
    tags: ['Micro Frontend', 'Module Federation', 'Architecture'],
    author: '이프론트',
    date: '2024.04.05',
    readTime: '11 min',
    views: 7800,
    content: "<h2>거대해진 프론트엔드의 해법</h2><p>팀 단위로 독립적인 배포가 가능한 마이크로 프론트엔드 아키텍처의 설계 및 구현 방법을 알아봅니다.</p>"
  },
  {
    id: 'b14',
    title: 'CSS-in-JS vs CSS Modules: 성능 비교',
    excerpt: '런타임 오버헤드가 있는 CSS-in-JS와 제로 런타임 CSS Modules의 렌더링 성능 벤치마크 결과.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Danggeun',
    category: 'Frontend',
    tags: ['CSS', 'Performance', 'Web'],
    author: '박퍼블',
    date: '2024.04.01',
    readTime: '6 min',
    views: 6200,
    content: "<h2>스타일링 방식의 고민</h2><p>편리함과 성능 사이, 프론트엔드 개발자라면 한 번쯤 고민해봤을 스타일링 방식에 대한 정량적 비교 분석입니다.</p>"
  },
  {
    id: 'b15',
    title: 'MLOps 파이프라인 구축을 위한 오픈소스 도구 비교',
    excerpt: 'Kubeflow, MLflow, Airflow 등 주요 MLOps 도구들의 장단점과 우리 팀에 맞는 선택 가이드.',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    source: 'Kakao',
    category: 'AI',
    tags: ['MLOps', 'AI/ML', 'DevOps'],
    author: '김데이터',
    date: '2024.03.28',
    readTime: '9 min',
    views: 5400,
    content: "<h2>모델 개발에서 운영까지</h2><p>지속 가능한 AI 모델 서빙을 위한 MLOps 인프라 구축 경험과 도구 선정 기준을 공유합니다.</p>"
  }
];
