
export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  vizType?: 'generic' | 'routing-tree' | 'server-component' | 'data-flow' | 'virtual-dom' | 'di-graph' | 'sorting';
  readTime?: string;
}

export interface TechStack {
  id: string;
  slug: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'CS' | 'Algorithm';
  logo: string;
  description: string;
  popularity: number;
  docsUrl?: string;
  tags: string[];
  chapters: Chapter[];
  qna: { user: string; question: string; answer: string; date: string; likes: number }[];
}

export const TECH_CATEGORIES = ['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'CS', 'Algorithm'];

export const MOCK_STACKS: TechStack[] = [
  // Frontend - Next.js
  {
    id: 'nextjs',
    slug: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
    description: 'React 기반의 풀스택 웹 프레임워크.',
    popularity: 98,
    docsUrl: 'https://nextjs.org/docs',
    tags: ['React', 'Framework', 'Fullstack'],
    chapters: [
      {
        id: 'ch1',
        title: 'Introduction to Next.js',
        description: 'Next.js의 핵심 철학 및 React와의 차이점',
        readTime: '5 min read',
        vizType: 'generic',
        content: `
## Next.js란 무엇인가?

Next.js는 React를 기반으로 구축된 **풀스택 웹 프레임워크**입니다. React가 "라이브러리"로서 UI 구성에 집중한다면, Next.js는 라우팅, 최적화, 서버 사이드 로직을 포함한 "프레임워크" 역할을 합니다.

### 핵심 이점

- **Zero Configuration:** 복잡한 설정 없이 즉시 개발 시작
- **Automatic Optimization:** 이미지, 폰트, 스크립트 자동 최적화
- **Fullstack Capabilities:** API Routes를 통한 백엔드 로직 구현

이 챕터에서는 Next.js가 왜 현대 웹 개발의 표준이 되었는지 알아봅니다.
        `
      },
      {
        id: 'ch2',
        title: 'App Router & Routing',
        description: 'App Router의 디렉토리 구조 및 라우팅 방식',
        readTime: '15 min read',
        vizType: 'routing-tree',
        content: `
## File System Based Routing

Next.js 13+ 버전부터 도입된 **App Router**는 파일 시스템을 그대로 라우팅 구조로 사용합니다.

### 디렉토리 구조 규칙

폴더는 **URL Segment**가 되며, \`page.tsx\` 파일이 해당 경로의 UI가 됩니다.

\`\`\`bash
app/
├── page.tsx        # /
├── about/
│   └── page.tsx    # /about
└── dashboard/
    ├── layout.tsx  # Dashboard layout
    └── page.tsx    # /dashboard
\`\`\`

위의 시각화 도구(Interactive Mode)를 통해 어떻게 트리 구조가 실제 URL로 매핑되는지 확인해보세요. 폴더 구조가 깊어질수록 URL path도 깊어집니다 (Nested Routes).
        `
      },
      {
        id: 'ch3',
        title: 'Rendering Patterns',
        description: 'CSR, SSR, SSG, ISR의 완벽 이해',
        readTime: '20 min read',
        vizType: 'server-component',
        content: `
## Rendering on the Web

Next.js는 페이지 단위로 렌더링 방식을 선택할 수 있는 유연성을 제공합니다.

### 1. Server Side Rendering (SSR)
매 요청마다 서버에서 HTML을 생성하여 클라이언트로 전송합니다. 데이터가 실시간으로 변하는 페이지에 적합합니다.

### 2. Static Site Generation (SSG)
빌드 시점에 HTML을 미리 생성해둡니다. 블로그 포스트나 문서처럼 내용이 자주 변하지 않는 경우에 최적입니다.

> **💡 언제 무엇을 써야 할까?**
> 기본적으로는 SSG(Static)를 지향하되, 사용자별 맞춤 정보나 실시간 데이터가 필요한 경우 SSR(Dynamic)을 사용하세요.
        `
      }
    ],
    qna: [
      {
        user: "KimDev",
        question: "App Router에서 getStaticProps는 어떻게 대체되나요?",
        answer: "App Router에서는 별도의 함수 없이, 컴포넌트 내부에서 fetch() 함수를 사용하며 cache 옵션을 주어 SSG처럼 동작하게 할 수 있습니다.",
        date: "2023.10.15",
        likes: 12
      },
      {
        user: "FrontendNewbie",
        question: "서버 컴포넌트에서 onClick 이벤트를 쓸 수 없나요?",
        answer: "네, 서버 컴포넌트는 브라우저로 JS 코드가 전송되지 않으므로 인터랙션이 불가능합니다. 'use client' 지시어를 사용하여 클라이언트 컴포넌트로 분리해야 합니다.",
        date: "2023.11.02",
        likes: 8
      }
    ]
  },
  // React
  {
    id: 'react',
    slug: 'react',
    name: 'React',
    category: 'Frontend',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    description: '사용자 인터페이스를 만들기 위한 JavaScript 라이브러리.',
    popularity: 100,
    docsUrl: 'https://react.dev',
    tags: ['Library', 'UI'],
    chapters: [
        {
          id: 'r_intro',
          title: 'Thinking in React',
          description: '컴포넌트 중심의 사고방식과 선언적 UI',
          readTime: '8 min read',
          vizType: 'generic',
          content: `
## 리액트적으로 사고하기

React는 UI를 독립적이고 재사용 가능한 **컴포넌트(Component)** 단위로 쪼개어 생각하도록 유도합니다.

> **선언형(Declarative) vs 명령형(Imperative)**
> React는 '어떻게(How)'가 아니라 '무엇을(What)' 보여줄지에 집중합니다. 상태(State)가 변하면 UI는 자동으로 업데이트됩니다.

### Atomic Design Pattern
가장 작은 단위인 Atom부터 Molecule, Organism, Template, Page로 확장해 나가는 설계 방식을 시각적으로 이해해 보세요.
          `
        },
        {
          id: 'r_vdom',
          title: 'Virtual DOM & Reconciliation',
          description: '리액트의 고성능 비결, 가상 돔 완벽 해부',
          readTime: '15 min read',
          vizType: 'virtual-dom',
          content: `
## Virtual DOM은 무엇인가요?

실제 DOM 조작은 비용이 많이 듭니다. React는 메모리에 **가상 DOM(Virtual DOM)**을 유지하고, 변경된 부분만 실제 DOM에 반영하는 **Reconciliation(재조정)** 과정을 거칩니다.

### Diffing Algorithm

React는 두 트리를 비교(Diffing)할 때 휴리스틱 알고리즘을 사용하여 O(n) 복잡도로 변경 사항을 감지합니다.

- 서로 다른 타입의 엘리먼트는 완전히 새로운 트리로 간주합니다.
- key prop을 사용하여 자식 엘리먼트의 변경을 효율적으로 감지합니다.

위의 시각화에서 왼쪽의 가상 돔(Blue)과 오른쪽의 실제 돔(Red) 사이의 동기화 과정을 확인하세요.
          `
        }
    ],
    qna: [
        { user: "DanA", question: "Virtual DOM이 Svelte 같은 컴파일러 방식보다 항상 빠른가요?", answer: "항상 그렇지는 않습니다. Svelte는 빌드 타임에 DOM 조작 코드를 생성하여 런타임 오버헤드가 없습니다. 하지만 React의 V-DOM은 대규모 앱에서 충분히 빠르고 안정적인 성능을 보장하는 범용적인 솔루션입니다.", date: "2024.01.20", likes: 88 },
        { user: "HookMaster", question: "useEffect가 두 번 실행돼요!", answer: "React.StrictMode에서는 부수 효과(Side Effect)를 찾기 위해 의도적으로 두 번 실행됩니다. 프로덕션 빌드에서는 한 번만 실행되니 안심하세요.", date: "2024.02.15", likes: 45 }
    ]
  },
  // Backend - NestJS
  {
    id: 'nestjs',
    slug: 'nestjs',
    name: 'NestJS',
    category: 'Backend',
    logo: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png',
    description: '효율적이고 확장 가능한 Node.js 서버 측 애플리케이션 프레임워크.',
    popularity: 85,
    docsUrl: 'https://docs.nestjs.com',
    tags: ['Node.js', 'TypeScript', 'Framework'],
    chapters: [
        {
            id: 'n_module',
            title: 'Modules & Dependency Injection',
            description: 'NestJS 아키텍처의 핵심, DI 시스템 이해하기',
            readTime: '12 min read',
            vizType: 'di-graph',
            content: `
## 의존성 주입 (Dependency Injection)

NestJS는 Angular에서 영감을 받은 강력한 **DI(Dependency Injection) 컨테이너**를 내장하고 있습니다.

### Inversion of Control (IoC)
개발자가 직접 객체를 생성하고 관리하는 대신, 프레임워크(NestJS Runtime)가 의존성 관계를 분석하여 필요한 객체를 주입해 줍니다.

\`\`\`typescript
@Injectable()
export class CatsService {
  findAll() { return 'This action returns all cats'; }
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {} // DI 발생!
}
\`\`\`

위의 시각화는 IoC 컨테이너(중앙 구체)가 여러 서비스 모듈(주변 큐브)들을 어떻게 연결하고 관리하는지 추상적으로 보여줍니다.
            `
        },
        {
            id: 'n_interceptor',
            title: 'Interceptors & Guards',
            description: '요청 생명주기와 AOP(관점 지향 프로그래밍)',
            readTime: '10 min read',
            vizType: 'generic',
            content: `
## Interceptors & Guards

요청이 컨트롤러에 도달하기 전/후에 로직을 추가하는 강력한 기능들입니다.
            `
        }
    ],
    qna: []
  },
  // Algorithm
  {
    id: 'algorithm-sorting',
    slug: 'sorting-algorithms',
    name: '정렬 알고리즘',
    category: 'Algorithm',
    logo: 'https://cdn-icons-png.flaticon.com/512/10051/10051283.png',
    description: '데이터를 순서대로 나열하는 다양한 알고리즘.',
    popularity: 88,
    tags: ['CS', 'Algorithm'],
    chapters: [
        {
            id: 'alg_bubble',
            title: 'Bubble Sort Visualized',
            description: '가장 기초적인 정렬 알고리즘의 동작 원리',
            readTime: '5 min read',
            vizType: 'sorting',
            content: `
## 오름차순 정렬의 기초

버블 정렬은 인접한 두 원소를 비교하여 큰 값을 뒤로 보냅니다. 마치 거품이 수면 위로 올라오는 듯한 모습이라 하여 Bubble Sort라 불립니다.

### Time Complexity

평균 및 최악의 경우 **O(n^2)**의 시간 복잡도를 가집니다.

위의 3D 막대 그래프가 정렬되는 과정을 지켜보세요. 높이가 다른 막대들이 서로 자리를 바꾸며 정렬됩니다.
            `
        }
    ],
    qna: []
  },
  {
    id: 'data-structure',
    slug: 'data-structure',
    name: '자료구조',
    category: 'CS',
    logo: 'https://cdn-icons-png.flaticon.com/512/9057/9057053.png',
    description: '효율적인 데이터 관리를 위한 핵심 구조.',
    popularity: 90,
    tags: ['CS', 'Basics'],
    chapters: [],
    qna: []
  },
  {
    id: 'system-design',
    slug: 'system-design',
    name: '시스템 설계',
    category: 'CS',
    logo: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    description: '대규모 분산 시스템 아키텍처.',
    popularity: 92,
    tags: ['Architecture', 'Scalability'],
    chapters: [],
    qna: []
  }
];
