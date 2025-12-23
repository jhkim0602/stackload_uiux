'use client';

import { MOCK_JOBS } from '@/mocks/jobs';
import { notFound, useParams } from 'next/navigation'; // Correct hook for client components
import { MapPin, Clock, Briefcase, DollarSign, Sparkles, Share2, Bookmark, ChevronLeft, Building, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function JobDetailPage() {
  const params = useParams();
  const job = MOCK_JOBS.find(j => j.id === params.id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
             <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
             <Link href="/jobs" className="text-blue-600 hover:underline">Return to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] min-h-screen pt-20 pb-20 font-sans">
       <div className="container max-w-5xl mx-auto px-4">
           {/* Breadcrumb / Back */}
           <div className="mb-8">
               <Link href="/jobs" className="inline-flex items-center text-gray-500 hover:text-black font-medium transition-colors">
                   <ChevronLeft className="w-4 h-4 mr-1" />
                   Back to Jobs
               </Link>
           </div>

           <div className="grid lg:grid-cols-[1fr_350px] gap-10">
               {/* Main Content */}
               <div className="space-y-8">
                   {/* Header Card */}
                   <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                       <div className="relative z-10">
                           <div className="flex items-start justify-between mb-6">
                               <div className="w-20 h-20 rounded-2xl border border-gray-100 p-2 bg-white shadow-sm flex items-center justify-center">
                                   <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                               </div>
                               <div className="flex gap-2">
                                   <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 bg-white">
                                       <Share2 className="w-5 h-5" />
                                   </button>
                                   <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 bg-white">
                                       <Bookmark className="w-5 h-5" />
                                   </button>
                               </div>
                           </div>

                           <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{job.title}</h1>

                           <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-6">
                               <Link href={`/jobs/companies/${job.company}`} className="text-gray-900 font-bold hover:underline flex items-center gap-1">
                                   <Building className="w-4 h-4" /> {job.company}
                               </Link>
                               <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                               <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                               <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs">
                                   적극 채용 중
                               </span>
                           </div>

                           <div className="flex flex-wrap gap-2">
                               {job.tags.map(tag => (
                                   <span key={tag} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-600">
                                       {tag}
                                   </span>
                               ))}
                           </div>
                       </div>
                   </div>

                   {/* Job Description */}
                   <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                       <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                           <FileTextIcon className="w-5 h-5 text-gray-400" />
                           상세 업무 내용
                       </h3>
                       <div
                          className="prose prose-lg prose-slate max-w-none
                                     prose-headings:font-bold prose-headings:text-gray-900
                                     prose-p:text-gray-600 prose-p:leading-relaxed
                                     prose-li:text-gray-600 prose-li:marker:text-blue-500"
                          dangerouslySetInnerHTML={{ __html: job.description }}
                       />
                   </div>

                   {/* Requirements */}
                   <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                       <h3 className="text-xl font-bold text-gray-900 mb-6">자격 요건 및 우대사항</h3>
                       <div className="flex flex-wrap gap-2 mb-8">
                           {job.skills.map(skill => (
                               <span key={skill} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default">
                                   {skill}
                               </span>
                           ))}
                       </div>
                       <div className="space-y-4">
                           <div className="bg-gray-50 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-3">혜택 및 복지</h4>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {job.perks.map(perk => (
                                        <li key={perk} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                           </div>
                       </div>
                   </div>
               </div>

               {/* Right Sidebar (Sticky Support Card) */}
               <div className="relative">
                   <div className="sticky top-24 space-y-6">
                       <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl shadow-gray-200/50">
                           <h3 className="text-lg font-bold text-gray-900 mb-6">지원하기</h3>

                           <div className="space-y-4 mb-8">
                               <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                   <span className="text-sm font-medium text-gray-500">연봉 정보</span>
                                   <span className="font-bold text-gray-900">{job.salary}</span>
                               </div>
                               <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                   <span className="text-sm font-medium text-gray-500">경력</span>
                                   <span className="font-bold text-gray-900">{job.experience}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                   <span className="text-sm font-medium text-gray-500">채용 형태</span>
                                   <span className="font-bold text-gray-900">정규직</span>
                               </div>
                           </div>

                           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-3">
                               지원하기
                           </button>
                           <button className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors">
                               이력서 자동 완성
                           </button>
                       </div>

                       {/* AI Analysis Card */}
                        {job.isRecommended && (
                           <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                               <div className="relative z-10">
                                   <div className="flex items-center gap-2 mb-3">
                                       <Sparkles className="w-5 h-5 text-yellow-300" />
                                       <span className="font-bold text-sm uppercase tracking-wide text-indigo-100">AI Match Analysis</span>
                                   </div>
                                   <p className="text-lg font-bold mb-2">98% Match Score!</p>
                                   <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                                       {job.recommendationReason || "Your skills in React and TypeScript align perfectly with this role."}
                                   </p>
                                   <Link href="/interview" className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                                       Prepare for Interview <ExternalLink className="w-3 h-3" />
                                   </Link>
                               </div>
                           </div>
                        )}
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}

function FileTextIcon(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
    )
}
