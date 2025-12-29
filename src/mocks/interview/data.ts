import { InterviewSession } from './types';

export const MOCK_INTERVIEW_SESSIONS: InterviewSession[] = [
  {
    id: 's1',
    role: 'Frontend Engineer',
    category: 'Frontend',
    date: '2025.04.10',
    score: 85,
    duration: '25:00',
    technicalAccuracy: 90,
    keywordUsage: [
        { word: 'Virtual DOM', count: 12 },
        { word: 'Rehydration', count: 5 },
        { word: 'useEffect', count: 8 },
        { word: 'Critical Rendering Path', count: 3 }
    ],
    logicScore: 82,
    feedback: '전반적으로 React 동작 원리에 대한 이해도가 높습니다. 답변 시 "결과" 중심보다는 "문제 해결 과정"을 조금 더 구체적으로 설명하면 좋겠습니다. 특히 최적화 관련 질문에서 실제 경험을 근거로 제시한 점이 인상적이었습니다.',
    strengths: ['Core Concept 이해도 우수', '명확한 두괄식 답변', '실무 관련 예시 활용'],
    weaknesses: ['답변 속도가 다소 빠름', '깊이 있는 아키텍처 관점 부족']
  },
  {
    id: 's2',
    role: 'Backend Engineer',
    category: 'Backend',
    date: '2025.04.05',
    score: 72,
    duration: '30:00',
    technicalAccuracy: 75,
    keywordUsage: [
        { word: 'ACID', count: 2 },
        { word: 'Index', count: 15 },
        { word: 'N+1 Problem', count: 6 }
    ],
    logicScore: 70,
    feedback: '데이터베이스 쿼리 최적화 부분에서 약간의 개념 혼동이 있습니다. Index Scan 방식에 대해 다시 정리해보세요. 트랜잭션 격리 수준에 대한 설명은 매우 훌륭했습니다.',
    strengths: ['데이터베이스 기초 지식', '솔직한 태도'],
    weaknesses: ['복잡한 시나리오 응용력 부족', '전문 용어의 모호한 사용']
  },
  {
    id: 's3',
    role: 'Product Manager',
    category: 'Behavioral',
    date: '2025.03.28',
    score: 92,
    duration: '45:00',
    technicalAccuracy: 88,
    keywordUsage: [
        { word: 'User Centric', count: 10 },
        { word: 'Data Driven', count: 8 },
        { word: 'Prioritization', count: 5 }
    ],
    logicScore: 95,
    feedback: '매우 논리적이고 설득력 있는 답변이었습니다. 갈등 해결 상황에서의 접근 방식이 매우 성숙하며, 팀을 리드하는 역량이 돋보입니다.',
    strengths: ['탁월한 커뮤니케이션 스킬', '논리적인 문제 해결 접근', '풍부한 실제 사례'],
    weaknesses: ['가끔 답변이 너무 길어짐']
  }
];

export const MOCK_QUESTIONS = [
  "자신을 한 문장으로 소개해 주세요.",
  "가장 도전적이었던 프로젝트 경험을 말씀해 주세요.",
  "우리 회사에 지원하게 된 동기는 무엇인가요?",
  "갈등 상황을 해결한 경험이 있나요?",
  "입사 후 3년 뒤 본인의 모습을 그려보세요."
];

export const MOCK_JOB_ANALYSIS = {
    analyzing: false,
    jobInfo: {
        title: 'Senior Frontend Developer',
        company: 'Toss',
        responsibilities: [
            'Toss App 내의 웹 서비스 개발 및 운영',
            'React/Next.js 기반의 프론트엔드 아키텍처 설계',
            '사용자 경험(UX) 중심의 UI 인터랙션 구현',
            'Design System 구축 및 고도화'
        ],
        requirements: [
            'HTML/CSS/JS에 대한 깊은 이해',
            'React 등 Modern Framework 사용 경험 5년 이상',
            '웹 성능 최적화 경험 (Lighthouse, Web Vitals)',
            '대규모 트래픽 처리 경험'
        ],
        preferences: [
            '모바일 웹 환경에 대한 이해도가 높으신 분',
            '테스트 코드 작성(Jest, Cypress) 습관을 가지신 분',
            'Serverless 환경 경험 (AWS Lambda, Cloudflare Workers)'
        ]
    },
    generatedQuestions: [
        {
            id: 1,
            type: 'Technical',
            question: 'React의 Reconciliation(재조정) 과정에 대해 설명하고, 이를 최적화하기 위해 사용해본 전략이 있다면 구체적으로 말씀해주세요.',
            context: '핵심 역량: React Deep Dive & Performance'
        },
        {
            id: 2,
            type: 'Experience',
            question: '복잡한 비즈니스 로직을 프론트엔드에서 관리하기 위해 사용했던 상태 관리 패턴(State Management Pattern)은 무엇이며, 왜 그 방식을 선택했나요?',
            context: '실무 경험: 아키텍처 설계 능력 검증'
        },
        {
            id: 3,
            type: 'Soft Skill',
            question: '디자이너가 기술적으로 구현하기 어려운 UI를 요구했을 때, 어떻게 커뮤니케이션하고 문제를 해결했는지 경험을 공유해주세요.',
            context: '협업 능력: 커뮤니케이션 스킬'
        },
        {
            id: 4,
            type: 'Problem Solving',
            question: '운영 중인 서비스에서 원인을 알 수 없는 메모리 누수(Memory Leak)가 발생했다고 가정해봅시다. 어떻게 원인을 파악하고 디버깅하시겠습니까?',
            context: '문제 해결 능력: 트러블슈팅'
        }
    ]
};
