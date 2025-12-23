'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, ArrowRight, Clock, Users, Layout, Search, Bell, Briefcase, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/mocks/user';

// Mock Data for User's Workspaces
const MY_WORKSPACES = [
  {
    id: 'samsung-hack',
    title: 'Samsung SDS 해커톤 팀',
    description: '알고리즘 트랙 본선 준비 및 API 연동 프로젝트',
    members: ['Junghwan', 'Kim', 'Lee', 'Park'],
    lastActive: '2시간 전',
    status: 'Active',
    color: 'bg-accent-600',
    type: 'Hackathon'
  },
  {
    id: 'stackload-side',
    title: 'StackLoad 사이드 프로젝트',
    description: '개발자 커리어 플랫폼 클론 코딩 및 기능 확장',
    members: ['Junghwan', 'Designer_A'],
    lastActive: '5시간 전',
    status: 'Active',
    color: 'bg-indigo-600',
    type: 'Project'
  },
  {
    id: 'feconf-study',
    title: 'FEConf 2025 후기 공유회',
    description: '컨퍼런스 내용 정리 및 사내 세미나 발표 자료 준비',
    members: ['Junghwan', 'Choi'],
    lastActive: '3일 전',
    status: 'Finished',
    color: 'bg-base-600',
    type: 'Study'
  }
];

export default function WorkspaceLobby() {
  return (
    <div className="min-h-screen bg-white font-sans text-base-900 flex flex-col">

       {/* Simple Header for Lobby */}
       <header className="bg-white/80 backdrop-blur-xl border-b border-base-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10 h-16">
           <div className="flex items-center gap-6">
               <Link href="/" className="flex items-center gap-2 text-base-500 hover:text-base-900 transition-colors text-sm font-bold group">
                   <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> StackLoad 홈
               </Link>
               <div className="w-px h-4 bg-base-200" />
               <div className="flex items-center gap-2.5">
                   <div className="w-8 h-8 bg-base-900 rounded-lg text-white flex items-center justify-center font-black text-xs">SL</div>
                   <span className="font-extrabold text-lg tracking-tight text-base-900">My Workspaces</span>
               </div>
           </div>
           <div className="flex items-center gap-4">
                <button className="p-2 text-base-400 hover:text-base-600 rounded-full hover:bg-base-50 relative transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
               <div className="w-9 h-9 rounded-full bg-base-100 overflow-hidden ring-2 ring-base-50">
                    <img src={MOCK_USER.avatar} alt="User" className="w-full h-full object-cover" />
               </div>
           </div>
       </header>

       <main className="flex-1 container max-w-6xl mx-auto px-6 py-16">

            <div className="flex items-end justify-between mb-12">
                <div>
                     <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black text-base-900 mb-3 tracking-tight"
                     >
                         워크스페이스
                     </motion.h1>
                     <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base-500 font-medium text-lg"
                     >
                         협업 중인 프로젝트를 한눈에 관리하세요.
                     </motion.p>
                </div>
                <Link href="/workspace/create" className="flex items-center gap-2 bg-base-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition-all hover:-translate-y-0.5">
                    <Plus className="w-5 h-5" /> 새 워크스페이스
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MY_WORKSPACES.map((workspace, idx) => (
                    <Link href={`/workspace/${workspace.id}`} key={workspace.id} className="group h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="bg-white rounded-3xl p-7 ring-4 ring-base-50 border border-base-200 hover:border-accent-200 transition-all h-full flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="w-5 h-5 text-accent-400 group-hover:translate-x-1 transition-transform" />
                            </div>

                            <div className="flex items-start justify-between mb-6">
                                <span className={cn(
                                    "px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white shadow-sm",
                                    workspace.color
                                )}>
                                    {workspace.type}
                                </span>
                                {workspace.status === 'Active' && (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-base-900 mb-3 leading-snug group-hover:text-accent-600 transition-colors line-clamp-2">
                                {workspace.title}
                            </h3>
                            <p className="text-base-500 text-sm leading-relaxed mb-8 flex-1 font-medium">
                                {workspace.description}
                            </p>

                            <div className="pt-6 border-t border-base-100 flex items-center justify-between mt-auto">
                                 <div className="flex -space-x-2">
                                     {workspace.members.map((member, i) => (
                                         <div key={i} className="w-9 h-9 rounded-full ring-2 ring-white bg-base-100 flex items-center justify-center text-[10px] font-bold text-base-500 overflow-hidden" title={member}>
                                             {member[0]}
                                         </div>
                                     ))}
                                     <div className="w-9 h-9 rounded-full ring-2 ring-white bg-base-50 flex items-center justify-center text-[10px] font-bold text-base-400">
                                         +
                                     </div>
                                 </div>
                                 <div className="text-xs font-bold text-base-400 flex items-center gap-1">
                                     <Clock className="w-3.5 h-3.5" /> {workspace.lastActive}
                                 </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}

                {/* Create New Placeholder */}
                <Link href="/workspace/create" className="block group h-full">
                    <div className="border-2 border-dashed border-base-200 rounded-3xl p-6 flex flex-col items-center justify-center text-base-400 hover:border-accent-300 hover:text-accent-500 hover:bg-accent-50/30 transition-all h-full min-h-[280px]">
                        <div className="w-16 h-16 rounded-2xl bg-base-50 flex items-center justify-center mb-5 text-base-300 group-hover:bg-white group-hover:text-accent-500 group-hover:scale-110 transition-all">
                            <Plus className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-sm">새로운 팀/프로젝트 시작하기</span>
                    </div>
                </Link>
            </div>

       </main>
    </div>
  );
}
