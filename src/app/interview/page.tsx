'use client';

import { MOCK_VIRTUAL_COMPANIES, VirtualCompany, VirtualPosition } from '@/mocks/virtual_companies';
import { MOCK_USER } from '@/mocks/user';
import Link from 'next/link';
import { Building2, Search, MapPin, Users, ArrowRight, FileText, CheckCircle2, Clock, XCircle, ChevronRight, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function VirtualRecruitmentPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all positions from all companies
  const allPositions = MOCK_VIRTUAL_COMPANIES.flatMap(company =>
    company.positions.map(position => ({ ...position, company }))
  );

  // Filter positions based on search
  const filteredPositions = allPositions.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get active applications (mock logic: positions with status)
  const activeApplications = allPositions.filter(p => p.status !== null);

  const getStatusBadge = (status: string | null) => {
      switch(status) {
          case 'applying': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">작성 중</span>;
          case 'document_passed': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-600">서류 합격</span>;
          case 'assignment_test': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600">과제 전형 중</span>;
          case 'interview_pending': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600">면접 대기</span>;
          case 'interview_completed': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-600">면접 완료</span>;
          case 'final_pass': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">최종 합격</span>;
          default: return null;
      }
  };

  const getProgressWidth = (process: number) => {
      return `${process}%`;
  }

  return (
    <div className="bg-white min-h-screen pt-14 pb-20 font-sans">

      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
          <div className="container max-w-6xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">가상 기업 채용관</h1>
                      <p className="text-sm text-gray-500">
                          실제 기업의 채용 프로세스를 시뮬레이션하고, 합격 가능성을 예측해보세요.<br/>
                          서류부터 면접까지, AI 면접관이 상세하게 피드백합니다.
                      </p>
                  </div>
                  <div className="flex gap-2">
                       <div className="text-right hidden md:block">
                           <div className="text-xs font-bold text-gray-500">현재 진행 중인 지원</div>
                           <div className="text-xl font-black text-blue-600">{activeApplications.length}건</div>
                       </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-10">

          {/* Section 1: My Applications Status */}
          {activeApplications.length > 0 && (
              <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gray-400" /> 나의 지원 현황
                  </h2>
                  <div className="grid gap-4">
                      {activeApplications.map((app) => (
                           <div key={app.id} className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
                               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                   {/* Company Info */}
                                   <div className="flex items-center gap-4 min-w-[240px]">
                                       <div className="w-12 h-12 rounded-lg border border-gray-100 overflow-hidden bg-white p-1">
                                           <img src={app.company.logo} alt={app.company.name} className="w-full h-full object-contain" />
                                       </div>
                                       <div>
                                           <h3 className="font-bold text-gray-900 text-base">{app.company.name}</h3>
                                           <p className="text-xs text-gray-500">{app.title}</p>
                                       </div>
                                   </div>

                                   {/* Progress Bar */}
                                   <div className="flex-1 w-full space-y-2">
                                       <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                                           <span className={cn(app.processProgress >= 20 ? "text-blue-600" : "")}>서류제출</span>
                                           <span className={cn(app.processProgress >= 40 ? "text-blue-600" : "")}>서류합격</span>
                                           <span className={cn(app.processProgress >= 60 ? "text-blue-600" : "")}>과제/TEST</span>
                                           <span className={cn(app.processProgress >= 80 ? "text-blue-600" : "")}>면접진행</span>
                                           <span className={cn(app.processProgress >= 100 ? "text-blue-600" : "")}>최종합격</span>
                                       </div>
                                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden relative">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: getProgressWidth(app.processProgress) }}
                                            />
                                       </div>
                                   </div>

                                   {/* Status Badge & Action */}
                                   <div className="min-w-[140px] flex flex-col items-end gap-2">
                                       {getStatusBadge(app.status)}
                                       <Link href={`/interview/process/${app.id}`} className="text-xs font-bold text-gray-400 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                           상세 보기 <ChevronRight className="w-3 h-3" />
                                       </Link>
                                   </div>
                               </div>
                           </div>
                      ))}
                  </div>
              </section>
          )}

          {/* Section 2: Virtual Openings */}
          <section>
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-400" /> 가상 채용 공고
                  </h2>
                  <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input
                          type="text"
                          placeholder="포지션, 회사명 검색"
                          className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-gray-900 outline-none w-64 bg-gray-50 focus:bg-white transition-all"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                       />
                  </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPositions.map((position) => (
                      <Link href={`/interview/apply/${position.id}`} key={position.id} className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-900 transition-all hover:shadow-sm flex flex-col h-full">
                           <div className="flex items-start justify-between mb-4">
                               <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded border border-gray-100 p-1 flex items-center justify-center bg-white">
                                       <img src={position.company.logo} alt={position.company.name} className="w-full h-full object-contain" />
                                   </div>
                                   <div>
                                       <h3 className="font-bold text-gray-900 text-sm">{position.company.name}</h3>
                                       <span className="text-xs text-gray-500">{position.company.industry}</span>
                                   </div>
                               </div>
                               {position.status ? (
                                   <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">지원완료</span>
                               ) : (
                                   <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">채용중</span>
                               )}
                           </div>

                           <div className="mb-4 flex-1">
                               <h4 className="font-bold text-gray-900 text-base mb-2 group-hover:underline decoration-2 underline-offset-2">{position.title}</h4>
                               <div className="flex flex-wrap gap-1.5 mb-3">
                                   {position.stack.slice(0, 4).map(s => (
                                       <span key={s} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium border border-gray-200">{s}</span>
                                   ))}
                               </div>
                               <div className="flex items-center gap-3 text-xs text-gray-500">
                                   <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {position.company.location}</span>
                                   <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {position.company.employees}명</span>
                               </div>
                           </div>

                           <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                               <span className="font-bold text-gray-900">{position.salary}</span>
                               <span className="text-gray-400">~{position.deadline}</span>
                           </div>
                      </Link>
                  ))}
              </div>
          </section>

      </div>
    </div>
  );
}
