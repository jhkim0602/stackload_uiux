import { MOCK_VIRTUAL_COMPANIES } from '@/mocks/companies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, Circle, Clock, ArrowRight, Video, FileText, Code2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function ProcessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Find position
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

  // Define stages for the UI
  const stages = [
    { id: 'document', label: '서류 전형', status: 'completed', score: 92, date: '2024.12.01' },
    { id: 'assignment', label: '역량 테스트', status: 'completed', score: 88, date: '2024.12.05' },
    { id: 'interview', label: '면접 전형', status: 'current', score: null, date: null },
    { id: 'result', label: '최종 결과', status: 'locked', score: null, date: null },
  ];

  return (
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans text-base-900">
       <div className="container max-w-5xl mx-auto px-4">

           <div className="flex items-center gap-4 mb-8">
               <Link href="/interview" className="w-10 h-10 rounded-full bg-white border border-base-200 flex items-center justify-center hover:bg-base-50 transition-colors group">
                   <ChevronLeft className="w-5 h-5 text-base-600 group-hover:-translate-x-0.5 transition-transform" />
               </Link>
               <div>
                   <h1 className="text-xl font-black text-base-900 mb-0.5">{position.title}</h1>
                   <div className="flex items-center gap-2 text-sm text-base-500 font-medium">
                       <span className="font-bold text-base-700">{company.name}</span>
                       <span className="text-base-300">•</span>
                       <span>채용 프로세스 진행 중</span>
                   </div>
               </div>
           </div>

           <div className="grid lg:grid-cols-[300px_1fr] gap-8">

               {/* Sidebar: Progress Timeline */}
               <div className="space-y-6">
                   <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-6">
                       <h3 className="font-bold text-base-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wide">
                           <Clock className="w-4 h-4 text-accent-600" /> Timeline
                       </h3>
                       <div className="relative space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-base-100">
                           {stages.map((stage, idx) => (
                               <div key={stage.id} className="relative pl-10">
                                   <div className={cn(
                                       "absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center z-10 border-2 transition-colors",
                                       stage.status === 'completed' ? "bg-accent-600 border-accent-600 text-white" :
                                       stage.status === 'current' ? "bg-white border-accent-600 text-accent-600" :
                                       "bg-white border-base-200 text-base-200"
                                   )}>
                                       {stage.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 fill-current" />}
                                   </div>

                                   <div className={cn(
                                       "transition-opacity",
                                       stage.status === 'locked' ? "opacity-40" : "opacity-100"
                                   )}>
                                       <h4 className={cn("text-sm font-bold mb-0.5", stage.status === 'current' ? "text-accent-600" : "text-base-900")}>
                                           {stage.label}
                                       </h4>
                                       {stage.status === 'completed' && (
                                           <div className="text-xs text-base-500 flex flex-col gap-0.5 font-medium">
                                               <span>Completed on {stage.date}</span>
                                               <span className="font-bold text-green-600">Score: {stage.score}</span>
                                           </div>
                                       )}
                                       {stage.status === 'current' && (
                                           <span className="text-[10px] font-bold bg-accent-50 text-accent-600 px-2 py-0.5 rounded-sm inline-block mt-1">In Progress</span>
                                       )}
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>

                   {/* Quick Tips */}
                   <div className="bg-accent-50 rounded-2xl border border-accent-100 p-6">
                       <h3 className="font-bold text-accent-800 text-sm mb-3 flex items-center gap-2">
                           <AlertCircle className="w-4 h-4" /> Interview Tips
                       </h3>
                       <p className="text-xs text-accent-700 leading-relaxed font-medium">
                           이번 면접에서는 <strong>React 생명주기</strong>와 <strong>상태 관리 패턴</strong>에 대한 깊이 있는 질문이 예상됩니다. 프로젝트 경험을 중심으로 답변을 준비하세요.
                       </p>
                   </div>
               </div>

               {/* Main Content: Current Stage Action */}
               <div className="space-y-6">

                   {/* Results of Previous Stages */}
                   <div className="grid md:grid-cols-2 gap-4">
                       <div className="bg-white p-5 rounded-3xl ring-4 ring-base-50 border border-base-200 flex items-center gap-4 hover:border-accent-200 transition-all cursor-pointer group">
                           <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                               <FileText className="w-6 h-6" />
                           </div>
                           <div>
                               <div className="text-[10px] font-bold text-base-400 uppercase tracking-wide">Document</div>
                               <div className="text-lg font-black text-base-900 group-hover:text-green-600 transition-colors">Passed</div>
                               <div className="text-xs text-base-400 font-bold group-hover:text-base-600 transition-colors">Analysis Report &gt;</div>
                           </div>
                       </div>
                       <div className="bg-white p-5 rounded-3xl ring-4 ring-base-50 border border-base-200 flex items-center gap-4 hover:border-accent-200 transition-all cursor-pointer group">
                           <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                               <Code2 className="w-6 h-6" />
                           </div>
                           <div>
                               <div className="text-[10px] font-bold text-base-400 uppercase tracking-wide">Tech Test</div>
                               <div className="text-lg font-black text-base-900 group-hover:text-purple-600 transition-colors">Passed (Top 10%)</div>
                               <div className="text-xs text-base-400 font-bold group-hover:text-base-600 transition-colors">View Solution &gt;</div>
                           </div>
                       </div>
                   </div>

                   {/* Current Stage: Interview */}
                   <div className="bg-white rounded-3xl border border-base-200 ring-4 ring-base-50 p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-50"></div>

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-[10px] font-bold mb-6">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                                </span>
                                Action Required
                            </div>

                            <h2 className="text-3xl font-black text-base-900 mb-3 leading-tight">실전 AI 면접 시작하기</h2>
                            <p className="text-base-500 mb-8 max-w-lg leading-relaxed font-medium text-sm">
                                서류와 역량 테스트 결과를 바탕으로 생성된 맞춤형 질문입니다.<br/>
                                실제 면접관과 대화하듯 편안하게 대답해주세요. (소요시간: 약 20분)
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/interview/room" className="group flex-1 bg-base-900 hover:bg-black text-white px-6 py-4 rounded-md font-bold flex items-center justify-center gap-3 transition-all text-sm">
                                    <Video className="w-5 h-5 group-hover:text-accent-400 transition-colors" />
                                    면접 입장하기
                                </Link>
                                <button className="flex-1 bg-white border border-base-200 hover:bg-base-50 text-base-900 px-6 py-4 rounded-md font-bold flex items-center justify-center gap-2 transition-all text-sm">
                                    환경 설정 가이드
                                </button>
                            </div>
                        </div>
                   </div>

                   {/* Upcoming */}
                   <div className="bg-base-50 rounded-2xl border border-base-200 border-dashed p-6 text-center text-base-400">
                       <h4 className="font-bold text-base-500 mb-1 text-sm uppercase">Final Result</h4>
                       <p className="text-xs font-medium">면접 완료 후 24시간 이내에 결과가 발표됩니다.</p>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}
