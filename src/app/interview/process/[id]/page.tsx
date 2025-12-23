import { MOCK_VIRTUAL_COMPANIES } from '@/mocks/virtual_companies';
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
    <div className="bg-gray-50 min-h-screen pt-20 pb-20 font-sans">
       <div className="container max-w-5xl mx-auto px-4">

           <div className="flex items-center gap-4 mb-8">
               <Link href="/interview" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                   <ChevronLeft className="w-5 h-5 text-gray-600" />
               </Link>
               <div>
                   <h1 className="text-xl font-bold text-gray-900">{position.title}</h1>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                       <span className="font-bold text-gray-700">{company.name}</span>
                       <span>•</span>
                       <span>채용 프로세스 진행 중</span>
                   </div>
               </div>
           </div>

           <div className="grid lg:grid-cols-[300px_1fr] gap-8">

               {/* Sidebar: Progress Timeline */}
               <div className="space-y-6">
                   <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                       <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                           <Clock className="w-4 h-4 text-blue-600" /> Timeline
                       </h3>
                       <div className="relative space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                           {stages.map((stage, idx) => (
                               <div key={stage.id} className="relative pl-10">
                                   <div className={cn(
                                       "absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center z-10 border-2",
                                       stage.status === 'completed' ? "bg-blue-600 border-blue-600 text-white" :
                                       stage.status === 'current' ? "bg-white border-blue-600 text-blue-600 animate-pulse" :
                                       "bg-white border-gray-200 text-gray-300"
                                   )}>
                                       {stage.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 fill-current" />}
                                   </div>

                                   <div className={cn(
                                       "transition-opacity",
                                       stage.status === 'locked' ? "opacity-40" : "opacity-100"
                                   )}>
                                       <h4 className={cn("text-sm font-bold mb-0.5", stage.status === 'current' ? "text-blue-600" : "text-gray-900")}>
                                           {stage.label}
                                       </h4>
                                       {stage.status === 'completed' && (
                                           <div className="text-xs text-gray-500 flex flex-col gap-0.5">
                                               <span>Completed on {stage.date}</span>
                                               <span className="font-bold text-green-600">Score: {stage.score}</span>
                                           </div>
                                       )}
                                       {stage.status === 'current' && (
                                           <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">In Progress</span>
                                       )}
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>

                   {/* Quick Tips */}
                   <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                       <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
                           <AlertCircle className="w-4 h-4" /> Interview Tips
                       </h3>
                       <p className="text-xs text-blue-700 leading-relaxed">
                           이번 면접에서는 <strong>React 생명주기</strong>와 <strong>상태 관리 패턴</strong>에 대한 깊이 있는 질문이 예상됩니다. 프로젝트 경험을 중심으로 답변을 준비하세요.
                       </p>
                   </div>
               </div>

               {/* Main Content: Current Stage Action */}
               <div className="space-y-6">

                   {/* Results of Previous Stages */}
                   <div className="grid md:grid-cols-2 gap-4">
                       <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                           <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                               <FileText className="w-6 h-6" />
                           </div>
                           <div>
                               <div className="text-xs font-bold text-gray-500 uppercase">Document</div>
                               <div className="text-lg font-black text-gray-900">Passed</div>
                               <div className="text-xs text-gray-400">Analysis Report &gt;</div>
                           </div>
                       </div>
                       <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                           <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                               <Code2 className="w-6 h-6" />
                           </div>
                           <div>
                               <div className="text-xs font-bold text-gray-500 uppercase">Tech Test</div>
                               <div className="text-lg font-black text-gray-900">Passed (Top 10%)</div>
                               <div className="text-xs text-gray-400">View Solution &gt;</div>
                           </div>
                       </div>
                   </div>

                   {/* Current Stage: Interview */}
                   <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-6">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Action Required
                            </div>

                            <h2 className="text-2xl font-black text-gray-900 mb-2">실전 AI 면접 시작하기</h2>
                            <p className="text-gray-500 mb-8 max-w-lg leading-relaxed">
                                서류와 역량 테스트 결과를 바탕으로 생성된 맞춤형 질문입니다.<br/>
                                실제 면접관과 대화하듯 편안하게 대답해주세요. (소요시간: 약 20분)
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/interview/room" className="group flex-1 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-gray-900/20 hover:shadow-gray-900/30 hover:-translate-y-0.5">
                                    <Video className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                                    면접 입장하기
                                </Link>
                                <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    환경 설정 가이드
                                </button>
                            </div>
                        </div>
                   </div>

                   {/* Upcoming */}
                   <div className="bg-gray-100 rounded-xl border border-gray-200 border-dashed p-6 text-center text-gray-400">
                       <h4 className="font-bold text-gray-500 mb-1">Final Result</h4>
                       <p className="text-xs">면접 완료 후 24시간 이내에 결과가 발표됩니다.</p>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}
