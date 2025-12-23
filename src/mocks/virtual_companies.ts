export interface VirtualCompany {
    id: string;
    name: string;
    logo: string;
    industry: string;
    description: string;
    location: string;
    employees: number;
    positions: VirtualPosition[];
}

export interface VirtualPosition {
    id: string;
    companyId: string;
    title: string;
    type: 'Frontend' | 'Backend' | 'Fullstack' | 'DevOps' | 'AI';
    level: 'Junior' | 'Middle' | 'Senior';
    stack: string[];
    salary: string;
    deadline: string;
    applicants: number;
    status: 'applying' | 'document_passed' | 'assignment_test' | 'interview_pending' | 'interview_completed' | 'final_pass' | null;
    processProgress: number; // 0 to 100
}

export const MOCK_VIRTUAL_COMPANIES: VirtualCompany[] = [
    {
        id: 'c1',
        name: 'Toss Lab',
        logo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
        industry: 'FinTech',
        description: '금융의 모든 것을 쉽고 간편하게, 토스팀입니다.',
        location: 'Gangnam, Seoul',
        employees: 1500,
        positions: [
            {
                id: 'p1',
                companyId: 'c1',
                title: 'Frontend Developer (Platform)',
                type: 'Frontend',
                level: 'Junior',
                stack: ['React', 'TypeScript', 'Next.js'],
                salary: '6,000 ~ 8,000',
                deadline: '2024.12.31',
                applicants: 124,
                status: 'interview_pending',
                processProgress: 60
            },
            {
                id: 'p2',
                companyId: 'c1',
                title: 'Core Banking Server Developer',
                type: 'Backend',
                level: 'Senior',
                stack: ['Java', 'Spring Boot', 'Kotlin'],
                salary: '8,000 ~ 12,000',
                deadline: '2025.01.15',
                applicants: 45,
                status: null,
                processProgress: 0
            }
        ]
    },
    {
        id: 'c2',
        name: 'Kakao Brain',
        logo: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png',
        industry: 'AI / Deep Learning',
        description: 'AI로 세상을 변화시키는 카카오브레인입니다.',
        location: 'Pangyo, Gyeonggi',
        employees: 400,
        positions: [
            {
                id: 'p3',
                companyId: 'c2',
                title: 'Large Scale Model Engineer',
                type: 'AI',
                level: 'Middle',
                stack: ['Python', 'PyTorch', 'CUDA'],
                salary: '7,000 ~ 10,000',
                deadline: 'Always',
                applicants: 89,
                status: 'document_passed',
                processProgress: 30
            }
        ]
    },
    {
        id: 'c3',
        name: 'Danggeun',
        logo: 'https://about.daangn.com/images/og_image.png',
        industry: 'Hyper-local Community',
        description: '당신 근처의 당근마켓',
        location: 'Gangnam, Seoul',
        employees: 600,
        positions: [
            {
                id: 'p4',
                companyId: 'c3',
                title: 'Service Reliability Engineer',
                type: 'DevOps',
                level: 'Junior',
                stack: ['AWS', 'Kubernetes', 'Terraform'],
                salary: '5,500 ~ 7,500',
                deadline: '2024.12.25',
                applicants: 62,
                status: null,
                processProgress: 0
            }
        ]
    }
];
