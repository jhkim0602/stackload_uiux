import { MOCK_ACTIVITIES } from '@/mocks/activities';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users, ExternalLink, Share2, Heart, ArrowLeft, Clock, Info, Layout, MessagesSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return MOCK_ACTIVITIES.map((activity) => ({
    id: activity.id,
  }));
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activity = MOCK_ACTIVITIES.find(a => a.id === id);

  if (!activity) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">

      {/* Hero Header */}
      <div className="relative h-[400px] bg-gray-900 overflow-hidden">
        <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        <div className="absolute top-0 left-0 right-0 p-6">
            <div className="container max-w-7xl mx-auto">
                <Link href="/activities" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to List
                </Link>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase rounded-full tracking-wider shadow-lg shadow-blue-900/50">
                                {activity.type}
                            </span>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20",
                                activity.status === 'Open' ? "text-emerald-300 bg-emerald-900/40" :
                                activity.status === 'Imminent' ? "text-amber-300 bg-amber-900/40" : "text-gray-400 bg-gray-800/40"
                            )}>
                                {activity.status === 'Open' ? '참가자 모집중' : activity.status === 'Imminent' ? '마감 임박' : '모집 마감'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-md">
                            {activity.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm font-medium">
                            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {activity.organizer}</span>
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {activity.date}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {activity.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-12 gap-8">

              {/* Main Content (Left) */}
              <div className="col-span-12 lg:col-span-8">
                  <div className="bg-white rounded-3xl shadow-xl w-full border border-gray-100 overflow-hidden min-h-[500px]">

                      {/* Tabs */}
                      <div className="flex border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
                          {['상세 정보', '일정 / 커리큘럼', '팀 빌딩', 'Q&A'].map((tab, i) => (
                              <button
                                key={tab}
                                className={cn(
                                    "flex-1 py-5 text-sm font-bold text-center border-b-2 transition-colors",
                                    i === 0 ? "border-black text-black" : "border-transparent text-gray-400 hover:text-gray-600"
                                )}
                              >
                                  {tab}
                              </button>
                          ))}
                      </div>

                      {/* Content Area */}
                      <div className="p-8 md:p-12 space-y-12">

                          {/* Description Section */}
                          <section>
                              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                  <Info className="w-5 h-5 text-blue-600" />
                                  활동 소개
                              </h3>
                              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                                  <div dangerouslySetInnerHTML={{ __html: activity.description }} />
                              </div>
                          </section>

                          {/* Team Building Preview Section */}
                          <section className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                  <Users className="w-5 h-5 text-blue-600" />
                                  팀원 모집 현황
                              </h3>
                              <p className="text-gray-500 text-sm mb-6">
                                  현재 <strong>{activity.recruitmentCount}개의 팀</strong>이 이 활동을 함께할 동료를 찾고 있습니다.
                              </p>

                              {/* Recruitment Cards (Mock) */}
                              <div className="space-y-3 mb-6">
                                  {[1, 2].map(i => (
                                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer group">
                                          <div>
                                              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-1 inline-block">프론트엔드</span>
                                              <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{activity.title} 해커톤 나가실 분 구합니다!</h4>
                                          </div>
                                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                                      </div>
                                  ))}
                              </div>

                              <Link href={`/community?tag=${encodeURIComponent(activity.title)}`} className="block w-full py-3 bg-white border border-blue-200 text-blue-600 font-bold rounded-xl text-sm text-center hover:bg-blue-50 transition-colors">
                                  모든 모집글 보기
                              </Link>
                          </section>

                      </div>

                  </div>
              </div>

              {/* Sidebar (Right) - Sticky */}
              <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-8 h-fit space-y-6">

                  {/* Action Card */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl shadow-gray-200/50">
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                          <div>
                              <p className="text-xs font-bold text-gray-400 uppercase mb-1">D-Day</p>
                              <p className="text-3xl font-black text-gray-900 tracking-tight text-red-500">{activity.dDay}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-xs font-bold text-gray-400 uppercase mb-1">접수 마감</p>
                              <p className="text-lg font-bold text-gray-900">{activity.deadline}</p>
                          </div>
                      </div>

                      <div className="space-y-3">
                          <button className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]">
                              공식 홈페이지 지원하기
                          </button>
                          <Link href={`/community/write?tag=${encodeURIComponent(activity.title)}`} className="block w-full">
                              <button className="w-full py-4 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl font-bold border border-blue-200 transition-all flex items-center justify-center gap-2">
                                  <Users className="w-4 h-4" /> 이 활동으로 팀원 모집하기
                              </button>
                          </Link>
                          <div className="grid grid-cols-2 gap-3">
                             <button className="py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                                 <Heart className="w-4 h-4" /> 관심 등록
                             </button>
                             <button className="py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                                 <Share2 className="w-4 h-4" /> 공유하기
                             </button>
                          </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                          <div className="flex -space-x-2 justify-center mb-3">
                              {[1, 2, 3, 4].map(i => (
                                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                  +120
                              </div>
                           </div>
                           <p className="text-xs text-gray-400 font-medium">124명이 현재 관심을 갖고 있습니다.</p>
                      </div>
                  </div>

                  {/* Collaboration Hub Promo Card (Mock) */}
                  <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                      <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                              <Layout className="w-5 h-5 text-violet-300" />
                              <span className="text-xs font-bold text-violet-200 uppercase tracking-widest">Collab Hub</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">팀 빌딩이 끝났나요?</h3>
                          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                              StackLoad 내부 협업 툴을 사용하여<br/>
                              팀원들과 바로 프로젝트를 시작하세요.
                          </p>
                          <Link href="/workspace" className="block w-full">
                              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold backdrop-blur-sm transition-all flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-indigo-900">
                                  <MessagesSquare className="w-4 h-4" /> 협업 스페이스 만들기
                              </button>
                          </Link>
                      </div>
                  </div>

              </div>

          </div>
      </div>
    </div>
  );
}
