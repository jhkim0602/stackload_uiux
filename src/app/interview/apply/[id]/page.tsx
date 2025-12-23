import { MOCK_VIRTUAL_COMPANIES } from '@/mocks/virtual_companies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building2, MapPin, Users, Clock, Briefcase, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';

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
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans">
      <div className="container max-w-4xl mx-auto px-4">

        {/* Back Link */}
        <Link href="/interview" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors font-bold">
          <ChevronLeft className="w-4 h-4" /> 가상 채용관으로 돌아가기
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10 pb-10 border-b border-gray-100">
           <div className="w-24 h-24 rounded-2xl border border-gray-200 p-2 flex items-center justify-center bg-white shadow-sm shrink-0">
               <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
           </div>
           <div className="flex-1">
               <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2">
                   <span className="bg-gray-100 px-2 py-0.5 rounded">{company.industry}</span>
                   <span>•</span>
                   <span>{company.location}</span>
               </div>
               <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{position.title}</h1>

               <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                   <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                       <Briefcase className="w-4 h-4 text-gray-400" /> {position.level}
                   </div>
                   <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                       <Clock className="w-4 h-4 text-gray-400" /> {position.deadline}
                   </div>
                   <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                       <Users className="w-4 h-4 text-gray-400" /> {position.applicants}명 지원 중
                   </div>
               </div>
           </div>

           {/* Action Card (Desktop) */}
           <div className="hidden md:block min-w-[280px]">
               <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
                   <div className="font-bold text-gray-900 mb-1">지원 마감일</div>
                   <div className="text-sm text-gray-500 mb-6">{position.deadline}</div>

                   <Link href={`/interview/process/${position.id}`} className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-center py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 mb-3">
                       지원하기
                   </Link>
                   <p className="text-xs text-center text-gray-400">
                       이력서는 저장된 프로필로 자동 제출됩니다.
                   </p>
               </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">주요 업무</h2>
                    <ul className="space-y-2 text-gray-600 leading-relaxed list-disc list-inside marker:text-gray-300">
                        <li>대규모 트래픽 처리를 위한 코어 시스템 설계 및 개발</li>
                        <li>MSA(Microservices Architecture) 기반의 서비스 구축 및 운영</li>
                        <li>데이터 파이프라인 구축 및 성능 최적화</li>
                        <li>레거시 시스템 개선 및 신규 기술 도입</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">자격 요건</h2>
                    <ul className="space-y-2 text-gray-600 leading-relaxed list-disc list-inside marker:text-gray-300">
                        <li>Java/Kotlin 기반의 서버 개발 경력 3년 이상</li>
                        <li>Spring Boot, JPA 등을 활용한 웹 애플리케이션 개발 경험</li>
                        <li>RDBMS, NoSQL 등 다양한 데이터베이스 활용 경험</li>
                        <li>Restful API 설계 및 구현 능력</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">기술 스택</h2>
                    <div className="flex flex-wrap gap-2">
                        {position.stack.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-700">
                                {s}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">채용 절차</h2>
                    <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                        <div className="relative pl-10">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm z-10">1</div>
                            <h3 className="font-bold text-gray-900">서류 전형</h3>
                            <p className="text-sm text-gray-500 mt-1">이력서와 포트폴리오를 기반으로 평가합니다.</p>
                        </div>
                        <div className="relative pl-10">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm z-10">2</div>
                            <h3 className="font-bold text-gray-900">과제 / 코딩 테스트</h3>
                            <p className="text-sm text-gray-500 mt-1">직무 연관성이 높은 실무 과제를 수행합니다.</p>
                        </div>
                        <div className="relative pl-10">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm z-10">3</div>
                            <h3 className="font-bold text-gray-900">AI 면접 & 기술 면접</h3>
                            <p className="text-sm text-gray-500 mt-1">CS 지식과 문제 해결 능력을 검증합니다.</p>
                        </div>
                        <div className="relative pl-10">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm z-10">4</div>
                            <h3 className="font-bold text-gray-900">최종 합격</h3>
                            <p className="text-sm text-gray-500 mt-1">처우 협의 후 입사가 확정됩니다.</p>
                        </div>
                    </div>
                </section>

            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50">
                 <Link href={`/interview/process/${position.id}`} className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-center py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                   지원하기
                 </Link>
            </div>
        </div>

      </div>
    </div>
  );
}
