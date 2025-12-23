import { MOCK_USER } from '@/mocks/user';
import Link from 'next/link';
import { ContributionGraph } from '@/components/features/profile/ContributionGraph';
import { BadgeCheck, Github, Link as LinkIcon, MapPin, Edit3, Award } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          {/* User Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
            <div className="relative mx-auto mb-6 h-32 w-32">
                 <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-slate-100">
                    <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="h-full w-full object-cover" />
                 </div>
                 <button className="absolute bottom-0 right-0 rounded-full bg-slate-900 p-2 text-white shadow hover:bg-slate-700 transition-colors">
                     <Edit3 className="h-4 w-4" />
                 </button>
            </div>

            <div className="mb-6 flex justify-center">
                <Link href="/profile/portfolio" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit3 className="w-4 h-4" /> Manage Portfolio
                </Link>
            </div>

            <h1 className="text-xl font-bold text-slate-900 mb-1">{MOCK_USER.name}</h1>
            <p className="text-slate-500 mb-6 font-medium">@{MOCK_USER.role}</p>

            <div className="flex flex-col gap-3 text-sm text-slate-500 mb-8">
               <div className="flex items-center justify-center gap-2 py-1.5 px-3 bg-slate-50 rounded-lg border border-slate-100">
                 <BadgeCheck className="h-4 w-4 text-indigo-600" />
                 <span className="font-semibold text-slate-700">레벨 {MOCK_USER.stats.level}</span>
               </div>
               <div className="flex items-center justify-center gap-2">
                 <MapPin className="h-4 w-4" />
                 <span>서울, 대한민국</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                <div>
                    <div className="text-2xl font-bold text-slate-900">{MOCK_USER.stats.totalActivities}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Contributions</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900">{MOCK_USER.stats.streak}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Daily Streak</div>
                </div>
            </div>
          </div>

          {/* Socials */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="mb-4 text-xs font-bold uppercase text-slate-400 tracking-wider">소셜 링크</h3>
            <div className="space-y-2 text-sm">
                <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
                    <Github className="h-4 w-4" />
                    <span>github.com/junghwan</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
                    <LinkIcon className="h-4 w-4" />
                    <span>junghwan.dev</span>
                </a>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
             {/* Bio Section */}
             <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">소개</h2>
                <p className="mb-8 text-slate-600 leading-relaxed">
                    안녕하세요! 끊임없이 성장하는 풀스택 개발자입니다. 사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 좋아합니다. 현재는 Next.js와 Serverless 아키텍처에 깊은 관심을 가지고 있습니다.
                </p>

                <h3 className="mb-3 text-sm font-bold text-slate-900">기술 스택</h3>
                <div className="flex flex-wrap gap-2">
                    {MOCK_USER.skills.map(skill => (
                        <span key={skill} className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
                            {skill}
                        </span>
                    ))}
                </div>
             </div>

             {/* Activity Graph */}
             <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                 <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900">StackLoad 활동 내역</h2>
                    <p className="text-sm text-slate-500">커뮤니티 글 작성, 문제 풀이, 면접 연습 등 플랫폼 내 활동 기록입니다.</p>
                 </div>
                 <ContributionGraph data={MOCK_USER.activities} />
             </div>

             {/* Achievements / Recent */}
             <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                 <h2 className="mb-6 text-lg font-bold text-slate-900">최근 달성</h2>
                 <div className="space-y-6">
                     {[1, 2, 3].map((_, i) => (
                         <div key={i} className="flex gap-4 items-start pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                             <div className="mt-1 h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                 <Award className="h-4 w-4" />
                             </div>
                             <div>
                                 <h4 className="text-base font-bold text-slate-900 mb-1">'Next.js 마스터' 뱃지 획득</h4>
                                 <p className="text-sm text-slate-600 mb-1">고급 라우팅 및 렌더링 패턴 과정을 수료하여 뱃지를 획득했습니다.</p>
                                 <p className="text-xs text-slate-400">2일 전</p>
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
