import Link from 'next/link';
import { ArrowRight, Briefcase, Calendar, Trophy, Users } from 'lucide-react';
import { MOCK_JOBS } from '@/mocks/jobs';
import { MOCK_ACTIVITIES } from '@/mocks/activities';

function JobCard({ job }: { job: any }) {
    return (
        <Link href={`/jobs/${job.id}`} className="group block bg-white border border-base-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100" />
                    <div>
                        <h3 className="font-bold text-base-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-sm text-base-500">{job.company} · {job.location}</p>
                    </div>
                </div>
                {job.isRecommended && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wide">Recommended</span>
                )}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
                {job.skills.slice(0, 3).map((skill: string) => (
                    <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
            <div className="text-xs text-base-400 font-medium">
                {job.postedAt}
            </div>
        </Link>
    );
}

function ActivityCard({ activity }: { activity: any }) {
   // Assuming simple activity structure from mocks, adapting if needed
   const isHackathon = activity.type === 'Hackathon';
   const icon = isHackathon ? Trophy : Calendar;
   const colorClass = isHackathon ? 'text-orange-500 bg-orange-50' : 'text-emerald-500 bg-emerald-50';

   return (
       <Link href={`/activities/${activity.id}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-base-200 hover:bg-base-50 transition-colors">
           <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
               <Calendar className="w-5 h-5" />
           </div>
           <div className="min-w-0 flex-1">
               <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${isHackathon ? 'border-orange-200 text-orange-600' : 'border-gray-200 text-gray-500'}`}>
                        {activity.type || 'Activity'}
                    </span>
                    <span className="text-xs text-base-400">{activity.dDay || 'D-Day'}</span>
               </div>
               <h4 className="font-bold text-base-900 truncate">{activity.title}</h4>
               <p className="text-xs text-base-500 truncate">{activity.host || activity.organizer}</p>
           </div>
       </Link>
   );
}

export default function CareerPage() {
    const featuredJobs = MOCK_JOBS.slice(0, 4);
    // Safety check if MOCK_ACTIVITIES is array
    const activities = Array.isArray(MOCK_ACTIVITIES) ? MOCK_ACTIVITIES.slice(0, 4) : [];

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-base-50/50 py-20 border-b border-base-200">
                <div className="container max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-base-900 mb-6">
                        커리어 <span className="text-blue-600">Level Up</span>
                    </h1>
                    <p className="text-xl text-base-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        더 넓은 세상으로 나아갈 준비가 되셨나요?<br/>
                        나에게 딱 맞는 채용 공고와 대외활동을 찾아보세요.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/jobs" className="px-6 py-3 bg-base-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-base-900/20">
                            채용 공고 보기
                        </Link>
                        <Link href="/activities" className="px-6 py-3 bg-white text-base-900 border border-base-200 rounded-xl font-bold hover:bg-gray-50 transition-all">
                            대외활동 탐색
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content: Jobs */}
                    <div className="lg:col-span-8">
                        <div className="flex items-end justify-between mb-8">
                             <div>
                                 <h2 className="text-2xl font-bold text-base-900 flex items-center gap-2">
                                     <Briefcase className="w-6 h-6 text-blue-600" />
                                     추천 채용 공고
                                 </h2>
                                 <p className="text-sm text-base-500 mt-1">회원님의 기술 스택과 일치하는 포지션입니다.</p>
                             </div>
                             <Link href="/jobs" className="text-sm font-bold text-blue-600 hover:underline">더보기</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {featuredJobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>

                        {/* Banner */}
                        <div className="mt-8 bg-indigo-600 rounded-2xl p-8 text-white flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">이력서 작성이 막막하신가요?</h3>
                                <p className="text-indigo-100 text-sm">AI가 분석해주는 내 포트폴리오 강점과 약점</p>
                            </div>
                            <Link href="/interview/analysis" className="px-5 py-2.5 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                                AI 분석 받기
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar: Activities */}
                    <div className="lg:col-span-4">
                        <div className="flex items-end justify-between mb-8">
                             <h2 className="text-xl font-bold text-base-900 flex items-center gap-2">
                                 <Trophy className="w-5 h-5 text-orange-500" />
                                 주목할만한 활동
                             </h2>
                             <Link href="/activities" className="text-xs font-bold text-gray-500 hover:text-base-900">전체보기</Link>
                        </div>
                        <div className="space-y-3">
                            {activities.map(activity => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                            {activities.length === 0 && (
                                <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    등록된 활동이 없습니다.
                                </div>
                            )}
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-br from-gray-100 to-white rounded-2xl border border-base-200">
                            <h3 className="font-bold text-base-900 mb-2">팀원을 찾고 계신가요?</h3>
                            <p className="text-xs text-base-500 mb-4 leading-relaxed">
                                사이드 프로젝트나 스터디를 함께할<br/>열정적인 동료를 만나보세요.
                            </p>
                            <Link href="/community/write?tag=TeamRecruit" className="flex items-center justify-center w-full py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-base-900 hover:bg-gray-50 transition-colors">
                                <Users className="w-4 h-4 mr-2" />
                                팀원 모집하기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
