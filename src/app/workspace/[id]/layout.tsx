'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  Home,
  FileText,
  MessageSquare,
  Database,
  Calendar,
  Settings,
  Search,
  Bell,
  PanelLeft,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Entry Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const navItems = [
    { label: '워크스페이스 홈', href: `/workspace/${id}`, icon: Home },
    { label: '캘린더', href: `/workspace/${id}/calendar`, icon: Calendar },
    { label: '문서 & 칸반', href: `/workspace/${id}/docs`, icon: FileText },
    { label: '라이브 챗', href: `/workspace/${id}/chat`, icon: MessageSquare },
    { label: 'ERD 설계', href: `/workspace/${id}/erd`, icon: Database },
    { label: '설정', href: `/workspace/${id}/settings`, icon: Settings },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed inset-0 bg-[#F4F5F7] flex overflow-hidden z-50 font-sans text-slate-800"
    >
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={cn(
            "bg-white border-r border-slate-200 flex flex-col transition-all duration-300 relative",
            isSidebarOpen ? "w-64" : "w-16"
          )}
        >
            <div className="h-14 flex items-center px-4 border-b border-slate-100">
                <div className={cn("flex items-center gap-2 overflow-hidden whitespace-nowrap", !isSidebarOpen && "justify-center w-full")}>
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 text-white font-bold">SL</div>
                    {isSidebarOpen && <span className="font-bold text-lg tracking-tight">Project {id}</span>}
                </div>
            </div>

            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    // Check if the current path starts with the link href (for sub-routes like /docs/edit)
                    // But for Home /workspace/[id], it should be exact or we need careful check.
                    // Let's use exact match for Home, startsWith for others?
                    // Home href is shortest, so startsWith would match all.
                    const isActive = item.href === `/workspace/${id}`
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative",
                                isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                                !isSidebarOpen && "justify-center px-0"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {isSidebarOpen && (
                                <span>{item.label}</span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-3 border-t border-slate-100 space-y-1">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors",
                         !isSidebarOpen && "justify-center px-0"
                    )}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {isSidebarOpen && <span>StackLoad 홈</span>}
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <PanelLeft className="w-5 h-5" />
                </button>
            </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white m-2 rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            {/* Top Bar inside the card effect */}
            <header className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-slate-900">내 프로젝트 / 대시보드</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="검색..."
                          className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium focus:outline-none focus:border-indigo-500 w-64 transition-all"
                        />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full border-2 border-white shadow-sm" />
                </div>
            </header>

            <main className="flex-1 overflow-auto p-6 bg-[#FDFDFD]">
                {children}
            </main>
        </div>
    </motion.div>
  );
}
