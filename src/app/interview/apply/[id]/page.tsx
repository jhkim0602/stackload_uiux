import { MOCK_VIRTUAL_COMPANIES } from '@/mocks/virtual_companies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building2, MapPin, Users, Clock, Briefcase, CheckCircle2, ChevronLeft, ArrowRight, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Find the position and company
  let position = null;
  let company = null;

  for (const c of MOCK_VIRTUAL_COMPANIES) {
    const p = c.positions.find(pos => pos.id === id);
    if (p) {
      position = p;
      company = c;
      break;
    }
  }

  if (!position || !company) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans text-base-900">
      <div className="container max-w-5xl mx-auto px-4">

        {/* Back Link */}
        <Link href="/interview" className="inline-flex items-center gap-2 text-sm text-base-500 hover:text-base-900 mb-8 transition-colors font-bold group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 가상 채용관으로 돌아가기
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12 pb-12 border-b border-base-100">
           <div className="w-24 h-24 rounded-2xl border border-base-200 p-3 flex items-center justify-center bg-white ring-4 ring-base-50 shrink-0">
               <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
           </div>
           <div className="flex-1">
               <div className="flex items-center gap-2 text-sm font-bold text-base-500 mb-3">
                   <span className="bg-base-100 text-base-600 px-2 py-0.5 rounded-md">{company.industry}</span>
                   <span className="text-base-300">•</span>
                   <span>{company.location}</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-black text-base-900 mb-6 leading-tight tracking-tight">{position.title}</h1>

               <div className="flex flex-wrap gap-4 text-sm text-base-600 font-bold">
                   <div className="flex items-center gap-2 bg-base-50 px-3 py-1.5 rounded-md border border-base-100">
                       <Briefcase className="w-4 h-4 text-base-400" /> {position.level}
                   </div>
                   <div className="flex items-center gap-2 bg-base-50 px-3 py-1.5 rounded-md border border-base-100">
                       <Clock className="w-4 h-4 text-base-400" /> {position.deadline}
                   </div>
                   <div className="flex items-center gap-2 bg-base-50 px-3 py-1.5 rounded-md border border-base-100">
                       <Users className="w-4 h-4 text-base-400" /> {position.applicants}명 지원 중
                   </div>
               </div>
           </div>

           {/* Action Card (Desktop) */}
           <div className="hidden md:block min-w-[300px]">
               <div className="bg-white ring-4 ring-base-50 border border-base-200 rounded-3xl p-6 sticky top-24">
                   <div className="font-bold text-base-900 mb-1 text-sm uppercase tracking-wide">지원 마감일</div>
                   <div className="text-lg font-black text-base-900 mb-6">{position.deadline}</div>

                   <Link href={`/interview/process/${position.id}`} className="block w-full bg-accent-600 hover:bg-accent-700 text-white font-bold text-center py-3.5 rounded-md transition-all mb-3 text-sm">
                       지원하기
                   </Link>
                   <button className="flex w-full items-center justify-center gap-2 border border-base-200 bg-white hover:bg-base-50 text-base-600 font-bold py-3.5 rounded-md transition-all text-sm">
                       <Share2 className="w-4 h-4" /> 채용 공고 공유
                   </button>
                   <p className="text-[10px] text-center text-base-400 mt-4 leading-normal">
                       이력서는 프로필에 저장된 정보로 자동 제출됩니다.<br/>
                       제출 전 반드시 최신 정보를 확인해주세요.
                   </p>
               </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-16">

                <section>
                    <h2 className="text-2xl font-black text-base-900 mb-6">주요 업무</h2>
                    <ul className="space-y-3 text-base-600 font-medium leading-relaxed list-none pl-1">
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-2.5 shrink-0" />
                            대규모 트래픽 처리를 위한 코어 시스템 설계 및 개발
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-2.5 shrink-0" />
                            MSA(Microservices Architecture) 기반의 서비스 구축 및 운영
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-2.5 shrink-0" />
                            데이터 파이프라인 구축 및 성능 최적화
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-2.5 shrink-0" />
                            레거시 시스템 개선 및 신규 기술 도입
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-base-900 mb-6">자격 요건</h2>
                    <ul className="space-y-3 text-base-600 font-medium leading-relaxed list-none pl-1">
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-base-900 mt-2.5 shrink-0" />
                            Java/Kotlin 기반의 서버 개발 경력 3년 이상
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-base-900 mt-2.5 shrink-0" />
                            Spring Boot, JPA 등을 활용한 웹 애플리케이션 개발 경험
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-base-900 mt-2.5 shrink-0" />
                            RDBMS, NoSQL 등 다양한 데이터베이스 활용 경험
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-base-900 mt-2.5 shrink-0" />
                            Restful API 설계 및 구현 능력
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-base-900 mb-6">기술 스택</h2>
                    <div className="flex flex-wrap gap-2">
                        {position.stack.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-base-50 border border-base-200 rounded-md text-sm font-bold text-base-700">
                                {s}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-base-900 mb-8">채용 절차</h2>
                    <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-base-100">
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-accent-50 border-2 border-accent-100 text-accent-700 flex items-center justify-center font-black text-sm z-10 group-hover:bg-accent-600 group-hover:text-white group-hover:border-accent-600 transition-colors">1</div>
                            <h3 className="font-bold text-base-900 text-lg">서류 전형</h3>
                            <p className="text-sm text-base-500 font-medium mt-1">이력서와 포트폴리오를 기반으로 평가합니다.</p>
                        </div>
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border-2 border-base-200 text-base-400 flex items-center justify-center font-black text-sm z-10 group-hover:border-base-900 group-hover:text-base-900 transition-colors">2</div>
                            <h3 className="font-bold text-base-900 text-lg">과제 / 코딩 테스트</h3>
                            <p className="text-sm text-base-500 font-medium mt-1">직무 연관성이 높은 실무 과제를 수행합니다.</p>
                        </div>
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border-2 border-base-200 text-base-400 flex items-center justify-center font-black text-sm z-10 group-hover:border-base-900 group-hover:text-base-900 transition-colors">3</div>
                            <h3 className="font-bold text-base-900 text-lg">AI 면접 & 기술 면접</h3>
                            <p className="text-sm text-base-500 font-medium mt-1">CS 지식과 문제 해결 능력을 검증합니다.</p>
                        </div>
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border-2 border-base-200 text-base-400 flex items-center justify-center font-black text-sm z-10 group-hover:border-base-900 group-hover:text-base-900 transition-colors">4</div>
                            <h3 className="font-bold text-base-900 text-lg">최종 합격</h3>
                            <p className="text-sm text-base-500 font-medium mt-1">처우 협의 후 입사가 확정됩니다.</p>
                        </div>
                    </div>
                </section>

            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-base-200 z-50">
                 <Link href={`/interview/process/${position.id}`} className="block w-full bg-accent-600 hover:bg-accent-700 text-white font-bold text-center py-3.5 rounded-md transition-all shadow-lg text-sm">
                   지원하기
                 </Link>
            </div>
        </div>

      </div>
    </div>
  );
}
