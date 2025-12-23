'use client';

import { useState, useEffect } from 'react';
import { MOCK_ACTIVITIES, ACTIVITY_TYPES, Activity } from '@/mocks/activities';
import { Calendar, Users, MapPin, ArrowRight, ChevronLeft, ChevronRight, AlertCircle, Sparkles, Filter, Search, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// --- Hero Carousel Component (Borderless) ---
function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const heroActivities = MOCK_ACTIVITIES.slice(0, 3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroActivities.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroActivities.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroActivities.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroActivities.length) % heroActivities.length);

    return (
        <div className="relative w-full h-[400px] mb-12 group overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <img
                        src={heroActivities[currentIndex].imageUrl}
                        alt={heroActivities[currentIndex].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />

                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="p-8 md:p-12 max-w-3xl">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-white uppercase tracking-wider bg-blue-600 rounded-md">
                                    {heroActivities[currentIndex].type}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                                    {heroActivities[currentIndex].title}
                                </h2>
                                <div className="flex items-center gap-6 text-gray-300 text-sm font-medium mb-8">
                                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {heroActivities[currentIndex].deadline} 마감</span>
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {heroActivities[currentIndex].location.split(' ')[0]}</span>
                                </div>
                                <Link
                                    href={`/activities/${heroActivities[currentIndex].id}`}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-none font-bold hover:bg-gray-100 transition-colors"
                                >
                                    자세히 보기 <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {heroActivities.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                            "w-20 h-1 transition-all",
                            idx === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

// --- Section 2: Team Recruiting & Notices ---

const MOCK_TEAM_POSTS = [
    { id: 1, title: '삼성 알고리즘 해커톤 백엔드 구합니다', role: 'Backend', activity: 'Samsung SDS Hackathon', members: '2/4' },
    { id: 2, title: 'FEConf 같이 가실 분? 네트워킹해요', role: 'Networking', activity: 'FEConf 2025', members: '1/3' },
    { id: 3, title: 'NestJS 스터디 충원(강남역)', role: 'Study', activity: 'NestJS Deep Dive', members: '5/6' },
    { id: 4, title: 'Junction Asia 디자이너 급구!!!', role: 'Designer', activity: 'Junction Asia 2025', members: '3/5' },
];

const MOCK_NOTICES = [
    { id: 1, title: '2025 해커톤 우승팀 인터뷰: "우리는 이렇게 준비했다"', date: '2025.03.15', tag: 'Interview' },
    { id: 2, title: '3월 이달의 우수 활동자 발표', date: '2025.03.01', tag: 'Awards' },
    { id: 3, title: '활동 등록 가이드라인 변경 안내', date: '2025.02.28', tag: 'Notice' },
];

function TeamRecruitingSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Team Recruiting - 3 Columns */}
            <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6 border-b border-gray-900 pb-4">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        <Users className="w-6 h-6" /> 팀원 모집 <span className="text-gray-400 font-normal text-sm ml-2">함께 도전할 동료를 찾아보세요</span>
                    </h2>
                    <Link href="/community" className="text-sm font-bold text-gray-500 hover:text-gray-900">더보기 +</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {MOCK_TEAM_POSTS.slice(0, 3).map(post => (
                        <div key={post.id} className="bg-white border border-gray-200 p-5 hover:border-black transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <span className={cn(
                                    "px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 group-hover:bg-black group-hover:text-white transition-colors",
                                )}>{post.role}</span>
                                <span className="text-xs font-medium text-gray-400">{post.members}명</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] text-lg leading-tight">{post.title}</h3>
                            <p className="text-xs text-gray-500 font-medium truncate">{post.activity}</p>
                        </div>
                    ))}
                </div>
                {/* Secondary Row for Community Notices aligned below Recruiting? Or Separate? User said 'Next is community notices in list format' */}
                {/* Let's put notices in the 4th column to balance the layout or below.
                    User: "밑는 3열 방식으로 리스트... 그다음 커뮤니티의 후기... 리스트 형식으로 넣는방법으로 넣고"
                    This implies vertically stacked or visually distinct. Let's try placing Notices in the right sidebar column for now as distinct list.
                */}
            </div>

            {/* Community Notices/Awards - 1 Column (Right side of the row) */}
            <div className="lg:col-span-1">
                 <div className="flex items-center justify-between mb-6 border-b border-gray-900 pb-4">
                    <h2 className="text-xl font-black text-gray-900">커뮤니티 소식</h2>
                </div>
                <div className="bg-gray-50 p-6 space-y-6">
                    {MOCK_NOTICES.map(notice => (
                        <div key={notice.id} className="group cursor-pointer">
                            <span className="inline-block text-[10px] font-bold text-blue-600 mb-1">{notice.tag}</span>
                            <h3 className="font-bold text-gray-900 text-sm leading-snug hover:underline mb-1">{notice.title}</h3>
                            <p className="text-xs text-gray-400">{notice.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- Section 3: Filter & List ---
function FilterBar({ activeType, onTypeChange, activeStatus, onStatusChange }: any) {
    return (
        <div className="space-y-6 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            {/* Top Row: Big Category Buttons */}
             <div className="flex flex-wrap gap-2">
                 {['대회', '데이터', '코드', '참가 방법', '학습', '강좌', '해커톤', '랭커특강', '로드맵'].map(filter => (
                     <button
                        key={filter}
                        onClick={() => onTypeChange(filter)}
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-bold transition-all",
                            activeType === filter
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
                        )}
                     >
                         {filter}
                     </button>
                 ))}
                 <div className="flex-1" />
                 <button className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full font-bold text-sm hover:bg-blue-100 transition-colors flex items-center gap-2">
                     상세필터 <ChevronRight className="w-4 h-4 rotate-90" />
                 </button>
             </div>

             {/* Bottom Row: Detail Filters (Simplified) */}
             <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
                 <div className="flex items-center gap-3">
                     <span className="font-bold text-gray-900 text-sm">상태</span>
                     <div className="flex gap-1.5 p-1 bg-gray-100 rounded-lg">
                        {['전체', '진행중', '종료', '연습'].map(status => (
                            <button
                                key={status}
                                onClick={() => onStatusChange(status)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                                    activeStatus === status
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                     </div>
                 </div>

                 <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block" />

                 <div className="flex items-center gap-3">
                     <span className="font-bold text-gray-900 text-sm">유형</span>
                     <div className="flex gap-2">
                        {['전체', '알고리즘', '프롬프트', '개발', '아이디어'].map(type => (
                             <button
                                key={type}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-bold rounded-lg border transition-all",
                                    type === '전체'
                                        ? "bg-blue-50 text-blue-600 border-blue-200"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900"
                                )}
                             >
                                 {type}
                             </button>
                        ))}
                     </div>
                 </div>

                 <div className="flex-1" />

                 <div className="flex gap-2">
                     <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900"><RotateCcw className="w-3 h-3" /> 초기화</button>
                 </div>
             </div>
        </div>
    );
}

function CompetitionListItem({ activity }: { activity: Activity }) {
    return (
        <Link href={`/activities/${activity.id}`} className="block group">
            <div className="flex flex-col md:flex-row items-center gap-5 py-4 border-b border-gray-100 hover:bg-gray-50/80 transition-all px-4 rounded-xl">
                 {/* Image (Compact Size) */}
                 <div className="w-full md:w-20 h-20 shrink-0 border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
                     <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                 </div>

                 {/* Content */}
                 <div className="flex-1 w-full md:w-auto text-left">
                     <div className="flex items-center gap-2 mb-1">
                         <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{activity.organizer}</span>
                         {activity.status === 'Imminent' && <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" /> 마감임박</span>}
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                         {activity.title}
                     </h3>
                     <div className="flex flex-wrap gap-2">
                         {activity.tags.slice(0, 3).map(tag => (
                             <span key={tag} className="bg-gray-100/80 px-2 py-0.5 rounded text-[10px] font-medium text-gray-500 border border-gray-200/50">{tag}</span>
                         ))}
                     </div>
                 </div>

                 {/* Right Side Info (Compact) */}
                 <div className="w-full md:w-auto flex md:flex-col justify-between md:items-end gap-1 text-right min-w-[120px]">
                     <div className="flex items-center gap-1.5 md:justify-end">
                         <span className={cn(
                             "w-1.5 h-1.5 rounded-full",
                             activity.status === 'Open' ? "bg-green-500" :
                             activity.status === 'Imminent' ? "bg-amber-500" : "bg-gray-300"
                         )} />
                         <span className={cn(
                             "text-xs font-bold",
                             activity.status === 'Open' ? "text-green-600" :
                             activity.status === 'Imminent' ? "text-amber-600" : "text-gray-400"
                         )}>{activity.dDay === 'Closed' ? '마감' : activity.dDay}</span>
                     </div>
                     <span className="text-xs text-gray-400 font-medium">{activity.participants?.toLocaleString() || 0}명 관심</span>
                     <div className="text-sm font-black text-gray-900">
                         {activity.reward || '상금 정보 없음'}
                     </div>
                 </div>
            </div>
        </Link>
    );
}

export default function ActivitiesPage() {
  const [activeType, setActiveType] = useState('대회');
  const [activeStatus, setActiveStatus] = useState('전체');

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-20 font-sans">
       {/* 1. Full Width Banner */}
       <HeroCarousel />

       <div className="container max-w-7xl mx-auto px-4">
           {/* 2. Team Recruiting & Notices */}
           <TeamRecruitingSection />

           {/* 3. Competition List Area */}
           <section className="mt-16">
               <div className="flex items-end justify-between mb-4 px-2">
                    <h2 className="text-xl font-black text-gray-900">대외활동 모음</h2>
                    <span className="text-xs font-bold text-gray-500">총 <span className="text-blue-600">{MOCK_ACTIVITIES.length}</span>개</span>
               </div>

               <FilterBar
                activeType={activeType}
                onTypeChange={setActiveType}
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
               />

               <div className="flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                   {MOCK_ACTIVITIES.map(activity => (
                       <CompetitionListItem key={activity.id} activity={activity} />
                   ))}
               </div>
           </section>
       </div>
    </div>
  );
}
