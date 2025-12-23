'use client';

import { motion } from 'framer-motion';
import { Plus, Folder, File, Clock, MoreVertical, Users } from 'lucide-react';

export default function WorkspaceDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <div>
           <h2 className="text-2xl font-black text-slate-900 mb-1">반갑습니다, 정환님!</h2>
           <p className="text-slate-500 text-sm">부재중 업데이트된 소식을 확인하세요.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95">
            <Plus className="w-4 h-4" /> 새 프로젝트
        </button>
      </motion.div>

      {/* Stats / Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
              { label: '진행중인 프로젝트', value: '3', color: 'bg-blue-500' },
              { label: '대기중인 작업', value: '12', color: 'bg-amber-500' },
              { label: '팀 멤버', value: '8', color: 'bg-emerald-500' },
          ].map((stat, idx) => (
             <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer"
             >
                 <div>
                     <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                     <div className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{stat.value}</div>
                 </div>
                 <div className={`w-10 h-10 rounded-full ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
             </motion.div>
          ))}
      </div>

      {/* Recent Files */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">최근 파일</h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline">전체 보기</button>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                          <th className="px-6 py-3 font-semibold text-slate-500">파일명</th>
                          <th className="px-6 py-3 font-semibold text-slate-500">유형</th>
                          <th className="px-6 py-3 font-semibold text-slate-500">수정일</th>
                          <th className="px-6 py-3 font-semibold text-slate-500 text-right">관리</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {[
                          { name: 'StackLoad_Architecture_v2', type: 'ERD 스펙', date: '2시간 전', icon: File },
                          { name: 'Q1_Roadmap_Draft', type: '기획 문서', date: '5시간 전', icon: File },
                          { name: 'Meeting_Notes_Frontend', type: '회의록', date: '어제', icon: File },
                      ].map((file) => (
                          <tr key={file.name} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                          <file.icon className="w-4 h-4" />
                                      </div>
                                      <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{file.name}</span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 text-slate-500 font-medium">{file.type}</td>
                              <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5" /> {file.date}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <button className="text-slate-400 hover:text-slate-600">
                                      <MoreVertical className="w-4 h-4" />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </motion.div>
    </div>
  );
}
