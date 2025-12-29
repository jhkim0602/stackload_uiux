'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Briefcase, LayoutDashboard, MessageSquare, Video, Search, BookOpen, Menu, ChevronDown, UserPlus, Users, Bookmark, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/mocks/user';
import { useState, useRef } from 'react';

const NAV_ITEMS = [
  {
    label: '인싸이트',
    href: '/insights', // Note: This might need a redirect or just be a parent
    icon: BookOpen,
    children: [
        { label: '기술 블로그', href: '/blogs', desc: '최신 기술 트렌드와 아티클' },
        { label: '테크 허브', href: '/tech-hub', desc: '라이브러리와 프레임워크 탐색' },
        { label: '개발자 로드맵', href: '/roadmap', desc: '커리어 성장을 위한 가이드' },
    ]
  },
  {
    label: '커리어',
    href: '/career',
    icon: Briefcase,
    children: [
        { label: '대외활동', href: '/activities', desc: '해커톤, 경진대회, 동아리' },
        { label: '채용 공고', href: '/jobs', desc: '엄선된 개발자 포지션' },
    ]
  },
  {
    label: '커뮤니티',
    href: '/community',
    icon: MessageSquare,
    children: [
        { label: '자유 게시판', href: '/community', desc: '개발자들의 소통 공간' },
        { label: '스터디 & 모임', href: '/community/connect', desc: '함께 성장하는 동료 찾기' },
        { label: '팀원 모집', href: '/community/write?tag=TeamRecruit', desc: '사이드 프로젝트 팀원 구하기' },
    ]
  },
  {
    label: '워크스페이스',
    href: '/workspace',
    icon: LayoutDashboard,
    children: [
        { label: '프로젝트 관리', href: '/workspace', desc: '내 프로젝트 한눈에 보기' },
        { label: '협업 도구', href: '/workspace/tools', desc: '생산성을 높이는 도구들' },
    ]
  },
  {
    label: 'AI 면접',
    href: '/interview',
    icon: Video,
    children: [
        { label: 'AI 모의 면접', href: '/interview', desc: '실전 같은 AI 면접 연습' },
        { label: '면접 분석', href: '/interview/analysis', desc: '나의 면접 실력 분석' },
        { label: '면접 대기실', href: '/interview/room', desc: '면접 시작하기' },
    ]
  },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-base-200 transition-all duration-300" onMouseLeave={handleMouseLeave}>
      <div className="container max-w-7xl mx-auto h-14 flex items-center justify-between px-4 relative">
        {/* Brand */}
        <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-base-900 text-white p-1 rounded-md font-bold text-xs group-hover:bg-black transition-colors">SL</div>
              <span className="font-bold text-lg tracking-tight text-base-900">StackLoad</span>
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
                                ? "text-base-900 bg-base-100 font-semibold"
                                : "text-base-600 hover:text-base-900 hover:bg-base-50"
                        )}
                      >
                        {item.label}
                        {item.children && <ChevronDown className={cn("w-3 h-3 transition-transform text-base-400", hoveredNav === item.label ? "rotate-180" : "")} />}
                      </Link>
                  </div>
                );
              })}
            </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-base-50 rounded-md px-3 py-1.5 w-60 border border-gray-200 focus-within:border-base-400 focus-within:bg-white transition-all">
            <Search className="h-3.5 w-3.5 text-base-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-full ml-2 placeholder-gray-400 text-base-900"
            />
          </div>

          <div className="h-4 w-px bg-gray-200 hidden md:block mx-1"></div>

          <Link href="/profile" className="flex items-center gap-2 group">
            <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-base-900 leading-none mb-0.5">{MOCK_USER.name}</p>
            </div>
            <div className="h-8 w-8 overflow-hidden rounded-md border border-gray-200 group-hover:border-base-400 transition-colors">
               <img src={MOCK_USER.avatar} alt="User" className="h-full w-full object-cover" />
            </div>
          </Link>

          <button className="lg:hidden p-2 text-base-600">
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
                  <div className="grid grid-cols-2 gap-2 max-w-lg">
                          {(NAV_ITEMS.find(i => i.label === hoveredNav)?.children as any[]).map((sub: any) => (
                              <Link key={sub.label} href={sub.href} className="flex flex-col group p-3 hover:bg-base-50 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                                  <span className="text-sm font-bold text-base-900 group-hover:text-black">{sub.label}</span>
                                  <span className="text-xs text-base-500 mt-1 font-medium">{sub.desc}</span>
                              </Link>
                          ))}
                      </div>
              </div>
          </div>
      )}
    </header>
  );
}
