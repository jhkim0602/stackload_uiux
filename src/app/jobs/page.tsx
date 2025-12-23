'use client';

import { MOCK_JOBS } from '@/mocks/jobs';
import { MapPin, Search, Filter, LayoutGrid, List as ListIcon, Heart, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<'Grid' | 'List'>('Grid');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-24 font-sans"> {/* Increased top padding for fixed header clearance */}
      <div className="container max-w-7xl mx-auto px-4">

        {/* Hero / Banner Area */}
        <div className="mb-12 relative">
             <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between mb-8">
                 <div>
                     <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                         <span className="text-blue-600">적극 채용 중</span>인 포지션
                     </h1>
                     <p className="text-gray-500 text-lg">
                         상위 1% 개발자들이 선택한 기업들을 만나보세요.
                     </p>
                 </div>

                 {/* View Toggle */}
                 <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200 shrink-0 self-start md:self-end">
                     <button
                        onClick={() => setViewMode('Grid')}
                        className={cn("p-2.5 rounded-lg transition-all flex items-center gap-2 text-sm font-bold", viewMode === 'Grid' ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600")}
                     >
                         <LayoutGrid className="w-4 h-4" /> <span className="hidden sm:inline">Grid</span>
                     </button>
                     <button
                        onClick={() => setViewMode('List')}
                        className={cn("p-2.5 rounded-lg transition-all flex items-center gap-2 text-sm font-bold", viewMode === 'List' ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600")}
                     >
                         <ListIcon className="w-4 h-4" /> <span className="hidden sm:inline">List</span>
                     </button>
                 </div>
             </div>

             {/* Filter Bar */}
             <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30 bg-[#fcfdfd]/95 backdrop-blur-sm py-4 border-b border-gray-100">
                 {/* Chip Filters (Tech Stack) */}
                 <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-2 md:pb-0">
                    {['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Data', 'AI/ML'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={cn(
                                "whitespace-nowrap px-5 py-2.5 rounded-full border text-sm font-bold transition-all transform active:scale-95",
                                activeFilter === tag
                                    ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                 </div>

                 {/* Dropdown Filters */}
                 <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                     <div className="relative group">
                         <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                             Location <ChevronDown className="w-3 h-3 ml-1" />
                         </button>
                         {/* Mock Dropdown - implementing logic would require more state */}
                     </div>
                     <div className="relative group">
                         <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                             Experience <ChevronDown className="w-3 h-3 ml-1" />
                         </button>
                     </div>
                     <div className="relative group">
                         <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                             Salary <ChevronDown className="w-3 h-3 ml-1" />
                         </button>
                     </div>
                 </div>
             </div>
        </div>

        {/* Content Area */}
        {viewMode === 'Grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {MOCK_JOBS.map(job => (
                    <Link href={`/jobs/${job.id}`} key={job.id} className="group flex flex-col cursor-pointer">
                        <div className="relative aspect-[1.6/1] rounded-xl overflow-hidden mb-4 border border-gray-100 bg-white shadow-sm group-hover:shadow-md transition-all">
                             {/* Realistic Image Placeholder using Company Logo or Generic Office */}
                             <img
                                src={
                                    job.logo.includes('toss') ? 'https://static.toss.im/assets/homepage/new/og.png' :
                                    job.logo.includes('kakao') ? 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/news/2d904318018500001.jpg' :
                                    job.logo.includes('coupang') ? 'https://news.coupang.com/wp-content/uploads/2022/09/Coupang-Daegu-FC-Opening-3.jpg' :
                                    job.logo.includes('line') ? 'https://d2.line-scdn.net/lcp-prod-photo/2019/07/26/Cg3_1564121406859_789.jpg' :
                                    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80'
                                }
                                alt={job.company}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                             />
                             <div className="absolute top-3 right-3 z-10">
                                 <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
                                     <Heart className="w-4 h-4" />
                                 </button>
                             </div>
                             {/* Recommendation Badge */}
                             {job.isRecommended && (
                                 <div className="absolute top-3 left-3 z-10">
                                     <span className="px-2 py-1 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-lg">
                                         AI 추천
                                     </span>
                                 </div>
                             )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                                {job.title}
                            </h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-800">{job.company}</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex -space-x-1">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></div>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">+12명</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                                <span>{job.location.split(',')[1] || job.location}</span>
                                <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                                <span>{job.experience}</span>
                            </div>

                            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-sm font-black text-gray-900">
                                </div>
                                {/* Tech Logo (Mini) */}
                                <div className="w-6 h-6 rounded-full bg-gray-50 p-1">
                                    <img src={`https://cdn.simpleicons.org/${job.tags[0].toLowerCase()}`} alt="" className="w-full h-full opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="flex flex-col gap-4">
                 {MOCK_JOBS.map(job => (
                    <Link href={`/jobs/${job.id}`} key={job.id} className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer">
                        <div className="flex items-center gap-6 w-full sm:w-auto">
                            <div className="w-16 h-16 rounded-xl border border-gray-100 p-2 shrink-0 flex items-center justify-center bg-white shadow-sm group-hover:scale-105 transition-transform">
                                <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                    <span className="font-bold text-gray-900">{job.company}</span>
                                    <span className="text-gray-300">|</span>
                                    <span>{job.location}</span>
                                    <span className="text-gray-300">|</span>
                                    <span>{job.experience}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 mt-4 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between">
                            <div className="flex gap-2 justify-end">
                                {job.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-1 rounded-md font-medium">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Link>
                 ))}
            </div>
        )}
      </div>
    </div>
  );
}
