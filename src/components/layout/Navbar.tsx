'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Briefcase, LayoutDashboard, MessageSquare, Video, Search, BookOpen, Menu, ChevronDown, UserPlus, Users, Bookmark, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/mocks/user';
import { useState, useRef } from 'react';

const NAV_ITEMS = [
  { label: '홈', href: '/', icon: LayoutDashboard },
  { label: '블로그', href: '/blogs', icon: BookOpen },
  {
    label: '테크 허브',
    href: '/tech-hub',
    icon: Layers,
    children: [
        { label: '기술 스택 탐색', href: '/tech-hub', desc: '최신 라이브러리와 프레임워크' },
        { label: '개발자 로드맵', href: '/tech-hub?tab=roadmap', desc: '커리어 성장을 위한 가이드' },
    ]
  },
  {
    label: '채용',
    href: '/jobs',
    icon: Briefcase,
    children: [
        { label: '채용 공고', href: '/jobs', desc: '엄선된 개발자 포지션' },
        { label: '기업 분석', href: '/jobs/companies', desc: '기술 중심 기업 디렉토리' },
    ]
  },
  {
    label: '활동',
    href: '/activities',
    icon: LayoutDashboard,
    isMega: true,
    children: [
        {
            title: '카테고리 탐색',
            items: [
                { label: '전체 활동', href: '/activities' },
                { label: '경진대회', href: '/activities?type=Competition' },
                { label: '해커톤', href: '/activities?type=Hackathon' },
                { label: '스터디 & 모임', href: '/activities?type=Study' },
            ]
        },
        {
            title: '팀 & 프로젝트',
            items: [
                { label: '팀원 모집하기', href: '/community/write?tag=TeamRecruit', icon: UserPlus },
                { label: '내 프로젝트 관리', href: '/profile/projects', icon: FileText },
            ]
        },
        {
            title: '협업 워크스페이스',
            items: [
                { label: '내 워크스페이스', href: '/workspace', icon: Layers },
                { label: '문서 & 칸반', href: '/workspace/docs', icon: FileText },
                { label: '라이브 챗/보이스', href: '/workspace/chat', icon: Video },
                { label: 'AI ERD 설계', href: '/workspace/erd', icon: Zap },
            ]
        }
    ]
  },
  {
    label: '커뮤니티',
    href: '/community',
    icon: MessageSquare,
    children: [
        { label: '기술 Q&A', href: '/community/qna', desc: '에러 해결과 기술 질문' },
        { label: '정보 & 팁', href: '/community/tips', desc: '개발 꿀팁과 아티클 공유' },
        { label: '커리어 & 이직', href: '/community/career', desc: '이직, 연봉, 회사 생활' },
        { label: '사는 얘기', href: '/community/free', desc: '개발자들의 소소한 잡담' },
        { label: '모임 & 스터디', href: '/community/connect', desc: '사이드 프로젝트와 스터디' },
    ]
  },
  { label: 'AI 면접', href: '/interview', icon: Video },
];

export function Navbar() {
  const pathname = usePathname();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredNav(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
        setHoveredNav(null);
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200" onMouseLeave={handleMouseLeave}>
      <div className="container max-w-7xl mx-auto h-14 flex items-center justify-between px-4 relative">
        {/* Brand */}
        <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gray-900 text-white p-1 rounded-md font-bold text-xs group-hover:bg-black transition-colors">SL</div>
              <span className="font-bold text-lg tracking-tight text-gray-900">StackLoad</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <div key={item.label} onMouseEnter={() => handleMouseEnter(item.label)} className="h-14 flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                            "px-3 py-1.5 text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 mx-0.5",
                            isActive || hoveredNav === item.label
                                ? "text-gray-900 bg-gray-100 font-semibold"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        {item.label}
                        {item.children && <ChevronDown className={cn("w-3 h-3 transition-transform text-gray-400", hoveredNav === item.label ? "rotate-180" : "")} />}
                      </Link>
                  </div>
                );
              })}
            </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 w-60 border border-gray-200 focus-within:border-gray-400 focus-within:bg-white transition-all">
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-full ml-2 placeholder-gray-400 text-gray-900"
            />
          </div>

          <div className="h-4 w-px bg-gray-200 hidden md:block mx-1"></div>

          <Link href="/profile" className="flex items-center gap-2 group">
            <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-gray-900 leading-none mb-0.5">{MOCK_USER.name}</p>
            </div>
            <div className="h-8 w-8 overflow-hidden rounded-md border border-gray-200 group-hover:border-gray-400 transition-colors">
               <img src={MOCK_USER.avatar} alt="User" className="h-full w-full object-cover" />
            </div>
          </Link>

          <button className="lg:hidden p-2 text-gray-600">
              <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {hoveredNav && NAV_ITEMS.find(i => i.label === hoveredNav)?.children && (
          <div
            className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 animate-in fade-in slide-in-from-top-1 duration-150 shadow-sm"
            onMouseEnter={() => handleMouseEnter(hoveredNav)}
            onMouseLeave={handleMouseLeave}
          >
              <div className="container max-w-7xl mx-auto py-6 px-4">
                  {NAV_ITEMS.find(i => i.label === hoveredNav)?.isMega ? (
                      // Complex Mega Menu (Activities)
                      <div className="grid grid-cols-4 gap-8">
                          <div className="col-span-1 bg-gray-50 rounded-lg p-5 border border-gray-100">
                              <h3 className="font-bold text-lg text-gray-900 mb-2">{hoveredNav}</h3>
                              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                  새로운 기회를 발견하고<br/>
                                  동료와 함께 성장하세요.
                              </p>
                              <div className="flex items-center text-[10px] font-bold text-gray-600 gap-1 uppercase tracking-wide">
                                  <Zap className="w-3 h-3" /> Trending: Hackathon
                              </div>
                          </div>
                          {(NAV_ITEMS.find(i => i.label === hoveredNav)?.children as any[]).map((group: any, idx) => (
                              <div key={idx} className="col-span-1">
                                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">{group.title}</h4>
                                  <ul className="space-y-1">
                                      {group.items.map((sub: any) => (
                                          <li key={sub.label}>
                                              <Link href={sub.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors group/link">
                                                  {sub.icon && <sub.icon className="w-3.5 h-3.5 text-gray-400 group-hover/link:text-gray-900" />}
                                                  {sub.label}
                                              </Link>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          ))}
                      </div>
                  ) : (
                      // Simple Dropdown (Tech Hub, Jobs)
                      <div className="grid grid-cols-2 gap-2 max-w-sm ml-4">
                          {(NAV_ITEMS.find(i => i.label === hoveredNav)?.children as any[]).map((sub: any) => (
                              <Link key={sub.label} href={sub.href} className="flex flex-col group p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                                  <span className="text-sm font-bold text-gray-900 group-hover:text-black">{sub.label}</span>
                                  <span className="text-xs text-gray-500 mt-1 font-medium">{sub.desc}</span>
                              </Link>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      )}
    </header>
  );
}
