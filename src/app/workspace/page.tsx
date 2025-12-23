'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, ArrowRight, Clock, Users, Layout, Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for User's Workspaces
const MY_WORKSPACES = [
  {
    id: 'samsung-hack',
    title: 'Samsung SDS 해커톤 팀 (알고리즘)',
    description: '알고리즘 트랙 본선 준비 및 API 연동 프로젝트',
    members: ['Junghwan', 'Kim', 'Lee', 'Park'],
    lastActive: '2시간 전',
    status: 'Active',
    color: 'bg-blue-600',
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
    color: 'bg-slate-600',
    type: 'Study'
  }
];

export default function WorkspaceLobby() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] font-sans text-slate-900 flex flex-col">

       {/* Simple Header for Lobby */}
       <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
           <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold">
                   <ArrowRight className="w-4 h-4 rotate-180" /> StackLoad 홈
               </Link>
               <div className="w-px h-4 bg-slate-200" />
               <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-black rounded-lg text-white flex items-center justify-center font-bold">SL</div>
                   <span className="font-bold text-lg tracking-tight">My Workspaces</span>
               </div>
           </div>
           <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>
               <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-100">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Junghwan" alt="User" />
               </div>
           </div>
       </header>

       <main className="flex-1 container max-w-6xl mx-auto px-6 py-12">

            <div className="flex items-end justify-between mb-10">
                <div>
                     <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-black text-slate-900 mb-2"
                     >
                         워크스페이스
                     </motion.h1>
                     <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-medium"
                     >
                         참여 중인 프로젝트의 협업 공간으로 입장하세요.
                     </motion.p>
                </div>
                <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                    <Plus className="w-4 h-4" /> 새 워크스페이스
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MY_WORKSPACES.map((workspace, idx) => (
                    <Link href={`/workspace/${workspace.id}`} key={workspace.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group h-full flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white",
                                    workspace.color
                                )}>
                                    {workspace.type}
                                </span>
                                {workspace.status === 'Active' && (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                                {workspace.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                                {workspace.description}
                            </p>

                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                 <div className="flex -space-x-2">
                                     {workspace.members.map((member, i) => (
                                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden" title={member}>
                                             {member[0]}
                                         </div>
                                     ))}
                                     <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                         +
                                     </div>
                                 </div>
                                 <div className="text-xs font-bold text-slate-400 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                     입장하기 <ArrowRight className="w-3 h-3" />
                                 </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}

                {/* Create New Placeholder */}
                <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all min-h-[200px]">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-300">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-sm">새로운 팀/프로젝트 시작하기</span>
                </button>
            </div>

       </main>
    </div>
  );
}
