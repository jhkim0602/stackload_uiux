'use client';

import { MOCK_JOBS } from '@/mocks/jobs';
import { LayoutGrid, List as ListIcon, Heart, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<'Grid' | 'List'>('Grid');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="bg-white min-h-screen py-24 font-sans text-base-900"> {/* Increased top padding for fixed header clearance */}
      <div className="container max-w-7xl mx-auto px-4">

        {/* Hero / Banner Area */}
        <div className="mb-12 relative">
             <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between mb-8">
                 <div>
                     <h1 className="text-3xl md:text-4xl font-black text-base-900 mb-3 tracking-tight">
                         <span className="text-accent-600">적극 채용 중</span>인 포지션
                     </h1>
                     <p className="text-base-500 text-lg font-medium">
                         상위 1% 개발자들이 선택한 기업들을 만나보세요.
                     </p>
                 </div>

                 {/* View Toggle */}
                 <div className="flex bg-base-50 p-1 rounded-md border border-base-200 shrink-0 self-start md:self-end">
                     <button
                        onClick={() => setViewMode('Grid')}
                        className={cn("p-2 rounded-sm transition-all flex items-center gap-2 text-sm font-bold h-7", viewMode === 'Grid' ? "bg-white text-base-900 shadow-sm" : "text-base-400 hover:text-base-600")}
                     >
                         <LayoutGrid className="w-4 h-4" /> <span className="hidden sm:inline">Grid</span>
                     </button>
                     <button
                        onClick={() => setViewMode('List')}
                        className={cn("p-2 rounded-sm transition-all flex items-center gap-2 text-sm font-bold h-7", viewMode === 'List' ? "bg-white text-base-900 shadow-sm" : "text-base-400 hover:text-base-600")}
                     >
                         <ListIcon className="w-4 h-4" /> <span className="hidden sm:inline">List</span>
                     </button>
                 </div>
             </div>

             {/* Filter Bar */}
             <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30 bg-white/95 backdrop-blur-sm py-4 border-b border-base-100">
                 {/* Chip Filters (Tech Stack) */}
                 <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-2 md:pb-0">
                    {['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Data', 'AI/ML'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={cn(
                                "whitespace-nowrap px-5 py-2 rounded-full border text-sm font-bold transition-all transform active:scale-95 h-9",
                                activeFilter === tag
                                    ? "bg-base-900 text-white border-base-900 shadow-none"
                                    : "bg-white text-base-600 border-base-200 hover:border-base-900 hover:text-base-900"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                 </div>

                 {/* Dropdown Filters */}
                 <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                     <div className="relative group">
                         <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-base-200 bg-white text-sm font-bold text-base-700 hover:bg-base-50 whitespace-nowrap h-9">
                             Location <ChevronDown className="w-3 h-3 ml-1" />
                         </button>
                         {/* Mock Dropdown - implementing logic would require more state */}
                     </div>
                     <div className="relative group">
                         <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-base-200 bg-white text-sm font-bold text-base-700 hover:bg-base-50 whitespace-nowrap h-9">
                             Experience <ChevronDown className="w-3 h-3 ml-1" />
                         </button>
                     </div>
                     <div className="relative group">
                         <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-base-200 bg-white text-sm font-bold text-base-700 hover:bg-base-50 whitespace-nowrap h-9">
                             Salary <ChevronDown className="w-3 h-3 ml-1" />
                         </button>
                     </div>
                 </div>
             </div>
        </div>

        {/* Content Area */}
        {viewMode === 'Grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_JOBS.map(job => (
                    <Link href={`/jobs/${job.id}`} key={job.id} className="group flex flex-col cursor-pointer bg-white rounded-3xl p-4 ring-4 ring-base-50 border border-base-200 hover:ring-accent-100 hover:border-accent-200 transition-all duration-300">
                        <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden mb-4 border border-base-100 bg-white">
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
                                     <span className="px-2 py-1 bg-accent-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow-sm">
                                         AI 추천
                                     </span>
                                 </div>
                             )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <h3 className="font-bold text-lg text-base-900 leading-tight mb-2 group-hover:text-accent-600 transition-colors line-clamp-2 min-h-[3rem]">
                                {job.title}
                            </h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-base-800">{job.company}</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex -space-x-1">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-4 h-4 rounded-full bg-base-200 border-2 border-white"></div>
                                        ))}
                                    </div>
                                    <span className="text-xs text-base-400 font-medium">+12명</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-base-500 font-medium mb-3">
                                <span>{job.location.split(',')[1] || job.location}</span>
                                <span className="w-0.5 h-0.5 bg-base-300 rounded-full" />
                                <span>{job.experience}</span>
                            </div>

                            <div className="mt-auto pt-3 border-t border-base-100 flex items-center justify-between">
                                <div className="text-sm font-black text-base-900">
                                </div>
                                {/* Tech Logo (Mini) */}
                                <div className="w-6 h-6 rounded-full bg-base-50 p-1">
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
                    <Link href={`/jobs/${job.id}`} key={job.id} className="group bg-white p-6 rounded-3xl ring-4 ring-base-50 border border-base-200 hover:ring-accent-100 hover:border-accent-400 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer">
                        <div className="flex items-center gap-6 w-full sm:w-auto">
                            <div className="w-16 h-16 rounded-xl border border-base-100 p-2 shrink-0 flex items-center justify-center bg-white shadow-sm group-hover:scale-105 transition-transform">
                                <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-xl text-base-900 mb-1 group-hover:text-accent-600 transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-base-600">
                                    <span className="font-bold text-base-900">{job.company}</span>
                                    <span className="text-base-300">|</span>
                                    <span>{job.location}</span>
                                    <span className="text-base-300">|</span>
                                    <span>{job.experience}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right w-full sm:w-auto border-t sm:border-t-0 border-base-100 pt-4 sm:pt-0 mt-4 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between">
                            <div className="flex gap-2 justify-end">
                                {job.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-xs bg-base-50 text-base-600 border border-base-200 px-2 py-1 rounded-md font-medium">{tag}</span>
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
