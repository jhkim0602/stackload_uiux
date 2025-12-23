import { MOCK_USER } from '@/mocks/user';
import Link from 'next/link';
import { ContributionGraph } from '@/components/features/profile/ContributionGraph';
import { BadgeCheck, Github, Link as LinkIcon, MapPin, Edit3, Award, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  return (
    <div className="bg-white min-h-screen py-16 font-sans text-base-900">
      <div className="container grid gap-10 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-8">
          {/* User Card */}
          <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-8 text-center relative overflow-hidden">
            <div className="relative mx-auto mb-6 h-36 w-36 group cursor-pointer">
                 <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white">
                    <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 </div>
                 <button className="absolute bottom-1 right-1 rounded-full bg-base-900 p-2.5 text-white hover:bg-black transition-colors hover:scale-105">
                     <Edit3 className="h-4 w-4" />
                 </button>
            </div>

            <div className="mb-8 flex justify-center">
                <Link href="/profile/portfolio" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-base-200 ring-4 ring-base-50 rounded-xl text-xs font-black text-base-700 hover:bg-base-50 hover:border-base-300 transition-all uppercase tracking-wide">
                    <Edit3 className="w-3.5 h-3.5" /> Manage Portfolio
                </Link>
            </div>

            <h1 className="text-2xl font-black text-base-900 mb-1">{MOCK_USER.name}</h1>
            <p className="text-base-500 mb-6 font-bold text-sm">@{MOCK_USER.role}</p>

            <div className="flex flex-col gap-3 text-sm text-base-500 mb-8 font-medium">
               <div className="flex items-center justify-center gap-2 py-2 px-4 bg-accent-50 rounded-lg border border-accent-100 text-accent-700 font-bold">
                 <BadgeCheck className="h-4 w-4" />
                 <span>레벨 {MOCK_USER.stats.level}</span>
               </div>
               <div className="flex items-center justify-center gap-2">
                 <MapPin className="h-4 w-4 text-base-400" />
                 <span>서울, 대한민국</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-base-100 pt-6">
                <div>
                    <div className="text-2xl font-black text-base-900">{MOCK_USER.stats.totalActivities}</div>
                    <div className="text-[10px] text-base-400 uppercase tracking-widest font-bold">Total Contributions</div>
                </div>
                <div>
                    <div className="text-2xl font-black text-base-900">{MOCK_USER.stats.streak}</div>
                    <div className="text-[10px] text-base-400 uppercase tracking-widest font-bold">Daily Streak</div>
                </div>
            </div>
          </div>

          {/* Socials */}
          <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-8">
            <h3 className="mb-5 text-xs font-black uppercase text-base-400 tracking-wider">소셜 링크</h3>
            <div className="space-y-3 text-sm font-bold">
                <a href="#" className="flex items-center gap-3 text-base-600 hover:text-base-900 hover:bg-base-50 p-3 rounded-xl -mx-3 transition-colors group">
                    <Github className="h-5 w-5 text-base-400 group-hover:text-black transition-colors" />
                    <span>github.com/junghwan</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-base-400" />
                </a>
                <a href="#" className="flex items-center gap-3 text-base-600 hover:text-base-900 hover:bg-base-50 p-3 rounded-xl -mx-3 transition-colors group">
                    <LinkIcon className="h-5 w-5 text-base-400 group-hover:text-blue-500 transition-colors" />
                    <span>junghwan.dev</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-base-400" />
                </a>
            </div>
          </div>
        </aside>

        <main className="space-y-8">
             {/* Bio Section */}
             <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-10">
                <h2 className="mb-6 text-xl font-black text-base-900">About Me</h2>
                <p className="mb-10 text-base-600 leading-loose font-medium text-lg">
                    안녕하세요! 끊임없이 성장하는 풀스택 개발자입니다. 사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 좋아합니다. 현재는 Next.js와 Serverless 아키텍처에 깊은 관심을 가지고 있습니다.
                </p>

                <h3 className="mb-4 text-sm font-bold text-base-900 uppercase tracking-wide">기술 스택</h3>
                <div className="flex flex-wrap gap-2.5">
                    {MOCK_USER.skills.map(skill => (
                        <span key={skill} className="rounded-lg bg-base-50 px-4 py-2 text-sm font-bold text-base-700 border border-base-200 hover:border-accent-200 hover:text-accent-700 hover:bg-accent-50 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
             </div>

             {/* Activity Graph */}
             <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-10">
                 <div className="mb-8">
                    <h2 className="text-xl font-black text-base-900 mb-1">StackLoad 활동 내역</h2>
                    <p className="text-sm text-base-500 font-medium">커뮤니티 글 작성, 문제 풀이, 면접 연습 등 플랫폼 내 활동 기록입니다.</p>
                 </div>
                 <ContributionGraph data={MOCK_USER.activities} />
             </div>

             {/* Achievements / Recent */}
             <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-10">
                 <h2 className="mb-8 text-xl font-black text-base-900">최근 달성 배지</h2>
                 <div className="space-y-8">
                     {[1, 2, 3].map((_, i) => (
                         <div key={i} className="flex gap-5 items-start group">
                             <div className="mt-1 h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                                 <Award className="h-6 w-6" />
                             </div>
                             <div>
                                 <h4 className="text-lg font-black text-base-900 mb-1 group-hover:text-indigo-600 transition-colors">'Next.js 마스터' 뱃지 획득</h4>
                                 <p className="text-sm text-base-600 mb-2 font-medium leading-relaxed">고급 라우팅 및 렌더링 패턴 과정을 수료하여 뱃지를 획득했습니다.</p>
                                 <p className="text-xs text-base-400 font-bold">2일 전</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </main>
      </div>
    </div>
  );
}
