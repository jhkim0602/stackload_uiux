'use client';

import { motion } from 'framer-motion';
import { Plus, Folder, File, Clock, MoreVertical, Users, MessageSquare, Menu, Search, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function WorkspaceDashboard() {
  return (
    <div className="min-h-screen bg-white">
        {/* Workspace specific header (or assume global layout, but here we likely want a local layout look) */}
        {/* Ideally this page is children of a layout, but for now we build the view content */ }

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                   <h2 className="text-3xl font-black text-base-900 mb-2">반갑습니다, 정환님!</h2>
                   <p className="text-base-500 font-medium">부재중 업데이트된 소식을 확인하세요.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-base-200 text-base-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-base-50 transition-all">
                        <Users className="w-4 h-4" /> 팀원 초대
                    </button>
                    <button className="flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5">
                        <Plus className="w-4 h-4" /> 새 작업
                    </button>
                </div>
            </motion.div>

            {/* Stats / Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: '진행중인 프로젝트', value: '3', color: 'bg-accent-500', trend: '+1 this week' },
                    { label: '대기중인 작업', value: '12', color: 'bg-base-500', trend: 'Due today: 2' },
                    { label: '팀 멤버', value: '8', color: 'bg-green-500', trend: 'Online: 4' },
                ].map((stat, idx) => (
                   <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      className="bg-white p-6 rounded-3xl ring-4 ring-base-50 border border-base-200 flex items-start justify-between group hover:border-accent-200 transition-all cursor-pointer"
                   >
                       <div>
                           <div className="text-base-400 text-xs font-black uppercase tracking-wider mb-2">{stat.label}</div>
                           <div className="text-4xl font-black text-base-900 mb-2 group-hover:text-accent-600 transition-colors">{stat.value}</div>
                           <div className="text-xs font-bold text-base-500 bg-base-100 inline-block px-2 py-0.5 rounded text-base-600">{stat.trend}</div>
                       </div>
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center opacity-80", stat.color.replace('bg-', 'bg-').replace('500', '100'))}>
                            <div className={cn("w-3 h-3 rounded-full", stat.color)} />
                       </div>
                   </motion.div>
                ))}
            </div>

            {/* Recent Files */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid lg:grid-cols-3 gap-8"
            >
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-base-900">최근 파일</h3>
                        <button className="text-xs font-bold text-accent-600 hover:underline">전체 보기</button>
                    </div>
                    <div className="bg-white ring-4 ring-base-50 border border-base-200 rounded-3xl overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-base-50 border-b border-base-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-base-400 uppercase text-xs tracking-wider">File Name</th>
                                    <th className="px-6 py-4 font-bold text-base-400 uppercase text-xs tracking-wider">Type</th>
                                    <th className="px-6 py-4 font-bold text-base-400 uppercase text-xs tracking-wider">Edited</th>
                                    <th className="px-6 py-4 font-bold text-base-400 uppercase text-xs tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-100">
                                {[
                                    { name: 'StackLoad_Architecture_v2', type: 'ERD 스펙', date: '2시간 전', icon: File },
                                    { name: 'Q1_Roadmap_Draft', type: '기획 문서', date: '5시간 전', icon: File },
                                    { name: 'Meeting_Notes_Frontend', type: '회의록', date: '어제', icon: File },
                                    { name: 'System_Design_Review', type: '디자인', date: '2일 전', icon: File },
                                ].map((file) => (
                                    <tr key={file.name} className="hover:bg-base-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-accent-50 text-accent-600 rounded-lg group-hover:bg-accent-100 transition-colors">
                                                    <file.icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-base-700 group-hover:text-accent-600 transition-colors">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-base-500 font-medium">{file.type}</td>
                                        <td className="px-6 py-4 text-base-400 flex items-center gap-2 text-xs font-bold">
                                            <Clock className="w-3.5 h-3.5" /> {file.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-base-300 hover:text-base-600 p-1 hover:bg-base-100 rounded">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Activity */}
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-base-900">팀 활동</h3>
                    <div className="bg-white ring-4 ring-base-50 border border-base-200 rounded-3xl p-6 space-y-6">
                         {[
                             { user: 'Junghwan', action: 'uploaded a file', target: 'Design_v3.fig', time: '10m ago' },
                             { user: 'Sarah', action: 'commented on', target: 'API Spec', time: '1h ago' },
                             { user: 'Mike', action: 'created', target: 'Backend Repo', time: '3h ago' },
                         ].map((activity, i) => (
                             <div key={i} className="flex gap-3 items-start">
                                 <div className="w-8 h-8 rounded-full bg-base-100 flex items-center justify-center text-xs font-bold text-base-500 shrink-0">
                                     {activity.user[0]}
                                 </div>
                                 <div className="text-sm">
                                     <p className="text-base-700 font-medium">
                                         <span className="font-bold text-base-900">{activity.user}</span> {activity.action} <span className="text-accent-600 font-bold cursor-pointer hover:underline">{activity.target}</span>
                                     </p>
                                     <p className="text-xs text-base-400 font-bold mt-1">{activity.time}</p>
                                 </div>
                             </div>
                         ))}
                         <button className="w-full py-3 rounded-xl bg-base-50 text-base-500 font-bold text-xs hover:bg-base-100 transition-colors">
                             View All Activity
                         </button>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  );
}
