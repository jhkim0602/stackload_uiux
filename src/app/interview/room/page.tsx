'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_JOB_ANALYSIS } from '@/mocks/interview';
import Link from 'next/link';
import { Mic, MicOff, Video as VideoIcon, VideoOff, Layout, Clock, Activity, PhoneOff, AlertCircle, ChevronRight, X, MessageSquare, List, Play, Square, ChevronLeft, User, BarChart2, Eye, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function InterviewRoomContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'video';

  // Phases: 'intro' -> 'reading'(AI reads q) -> 'thinking'(user preps) -> 'answering'(recording) -> 'feedback'
  const [phase, setPhase] = useState<'intro' | 'reading' | 'thinking' | 'answering' | 'feedback'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const question = MOCK_JOB_ANALYSIS.generatedQuestions[currentQuestionIdx];
  const totalQuestions = MOCK_JOB_ANALYSIS.generatedQuestions.length;

  // Simulate Timer
  useEffect(() => {
    let interval: any;
    if (phase === 'thinking' || phase === 'answering') {
        interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
        setTimer(0);
    }
    return () => clearInterval(interval);
  }, [phase]);

  // Auto-progress Simulation
  useEffect(() => {
      if (phase === 'intro') {
          setTimeout(() => setPhase('reading'), 1500);
      }
      if (phase === 'reading') {
          // AI Reading question...
          setTimeout(() => setPhase('thinking'), 3000);
      }
      if (phase === 'thinking') {
          // 30s prep time limit (shortened to 5s for demo)
          if (timer > 5) {
              // setPhase('answering'); // Auto start or wait for user? Let's wait for user usually, but auto for flow check
          }
      }
  }, [phase, timer]);

  const handleStartAnswer = () => {
      setPhase('answering');
      setTimer(0);
  };

  const handleStopAnswer = () => {
      setPhase('feedback');
      setTimer(0);
      // Simulate moving to next question after brief feedback
      setTimeout(() => {
          if (currentQuestionIdx < totalQuestions - 1) {
              setCurrentQuestionIdx(prev => prev + 1);
              setPhase('reading');
          }
      }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-base-50 min-h-screen text-base-900 flex flex-col font-sans overflow-hidden">

      {/* 1. Header (Clean Light) */}
      <header className="h-16 bg-white border-b border-base-200 flex items-center justify-between px-6 z-50 shadow-sm">
           <div className="flex items-center gap-4">
               <Link href="/interview" className="w-8 h-8 rounded-full bg-base-100 flex items-center justify-center hover:bg-base-200 transition-colors">
                   <ChevronLeft className="w-5 h-5 text-base-600" />
               </Link>
               <div>
                   <h1 className="text-sm font-black text-base-900 leading-tight">실전 모의 면접 (Frontend)</h1>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-base-500">
                       <span className="bg-accent-50 text-accent-700 px-1.5 py-0.5 rounded">Q{currentQuestionIdx + 1}/{totalQuestions}</span>
                       <span>{question.type} 면접 진행 중</span>
                   </div>
               </div>
           </div>

           <div className="flex items-center gap-4">
               {/* Progress Steps */}
               <div className="hidden md:flex items-center gap-8 mr-8">
                   <div className={cn("flex flex-col items-center gap-1 transition-colors", phase === 'reading' ? "text-accent-600" : "text-base-300")}>
                       <span className={cn("w-2 h-2 rounded-full", phase === 'reading' ? "bg-accent-600 ring-4 ring-accent-50" : "bg-base-200")}></span>
                       <span className="text-[10px] font-bold uppercase">질문</span>
                   </div>
                   <div className="w-8 h-[2px] bg-base-100"></div>
                   <div className={cn("flex flex-col items-center gap-1 transition-colors", phase === 'thinking' ? "text-accent-600" : "text-base-300")}>
                       <span className={cn("w-2 h-2 rounded-full", phase === 'thinking' ? "bg-accent-600 ring-4 ring-accent-50" : "bg-base-200")}></span>
                       <span className="text-[10px] font-bold uppercase">준비</span>
                   </div>
                   <div className="w-8 h-[2px] bg-base-100"></div>
                   <div className={cn("flex flex-col items-center gap-1 transition-colors", phase === 'answering' ? "text-red-500" : "text-base-300")}>
                       <span className={cn("w-2 h-2 rounded-full", phase === 'answering' ? "bg-red-500 ring-4 ring-red-50 animate-pulse" : "bg-base-200")}></span>
                       <span className="text-[10px] font-bold uppercase">답변</span>
                   </div>
               </div>

               <div className="h-6 w-[1px] bg-base-200 mx-2"></div>

               <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={cn("p-2 rounded-md transition-colors", isSidebarOpen ? "bg-base-100 text-base-900" : "text-base-400 hover:text-base-900")}>
                   <BarChart2 className="w-5 h-5" />
               </button>
           </div>
      </header>

      {/* 2. Main Workspace */}
      <div className="flex-1 flex overflow-hidden">

          <main className="flex-1 flex flex-col p-6 relative">

              {/* Question Banner (Top Center) */}
              <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentQuestionIdx}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="w-full max-w-4xl mx-auto mb-6 bg-white rounded-2xl shadow-sm border border-base-200 p-6 flex flex-col items-center text-center relative z-10"
                  >
                      <span className="text-[10px] font-black text-accent-600 bg-accent-50 px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                          Question {currentQuestionIdx + 1}
                      </span>
                      <h2 className="text-xl md:text-2xl font-black text-base-900 leading-snug">
                          {question.question}
                      </h2>
                      {phase === 'reading' && (
                          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-accent-600">
                             <div className="w-2 h-2 bg-accent-600 rounded-full animate-bounce"></div>
                             AI 면접관이 질문을 읽고 있습니다...
                          </div>
                      )}
                  </motion.div>
              </AnimatePresence>

              {/* Grid Layout (Split View) */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-w-7xl mx-auto w-full">

                  {/* Left: AI Interviewer */}
                  <div className="relative rounded-3xl overflow-hidden bg-white ring-4 ring-base-50 border border-base-200 shadow-sm flex flex-col">
                       {/* Avatar Area */}
                       <div className="flex-1 relative bg-base-100 overflow-hidden">
                           <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                                className={cn("w-full h-full object-cover transition-all duration-700", phase === 'answering' ? "scale-105 opacity-90" : "scale-100 opacity-100")}
                           />

                           {/* AI Status Overlay */}
                           <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-base-900">Sarah</div>
                                        <div className="text-[10px] font-medium text-base-500">AI Interviewer</div>
                                    </div>
                                </div>
                                {phase === 'answering' && (
                                    <div className="bg-green-500/90 backdrop-blur px-3 py-1.5 rounded-lg text-white text-[10px] font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                        Listening...
                                    </div>
                                )}
                           </div>
                       </div>
                  </div>

                  {/* Right: Candidate (User) */}
                  <div className="relative rounded-3xl overflow-hidden bg-base-900 ring-4 ring-base-200 border border-base-300 shadow-md">
                       {/* Camera Feed Mock */}
                       {cameraOn ? (
                           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover scale-x-[-1] opacity-90" />
                       ) : (
                           <div className="w-full h-full flex items-center justify-center bg-base-800 text-base-500 flex-col gap-2">
                               <VideoOff className="w-10 h-10" />
                               <span className="text-xs font-bold">Camera Off</span>
                           </div>
                       )}

                       {/* Face Guide Overlay */}
                       {cameraOn && (
                           <div className="absolute inset-0 pointer-events-none opacity-30">
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-white/50 rounded-[3rem]"></div>
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-white/20"></div>
                           </div>
                       )}

                       {/* User Status Overlay */}
                       <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-3 text-white">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Smile className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold">나 (YOU)</div>
                                    <div className={cn("text-[10px] font-medium flex items-center gap-1", micOn ? "text-green-400" : "text-red-400")}>
                                        {micOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                                        {micOn ? "Audio On" : "Muted"}
                                    </div>
                                </div>
                            </div>
                       </div>

                       {/* Recording Indicator */}
                       {phase === 'answering' && (
                           <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-black shadow-lg animate-pulse">
                               <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                               REC {formatTime(timer)}
                           </div>
                       )}

                       {/* Think Timer */}
                       {phase === 'thinking' && (
                           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                               <div className="text-center text-white">
                                   <div className="text-4xl font-black mb-2 tabular-nums">{30 - timer}</div>
                                   <div className="text-sm font-bold opacity-80">답변 준비 시간</div>
                               </div>
                           </div>
                       )}
                  </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg z-30">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-base-200 ring-4 ring-base-50/50 flex items-center justify-between gap-4">

                      <div className="flex items-center gap-2">
                          <button onClick={() => setMicOn(!micOn)} className={cn("p-3 rounded-xl transition-all", micOn ? "bg-base-100 text-base-600 hover:bg-base-200" : "bg-red-50 text-red-500 ring-1 ring-red-100")}>
                              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                          </button>
                          <button onClick={() => setCameraOn(!cameraOn)} className={cn("p-3 rounded-xl transition-all", cameraOn ? "bg-base-100 text-base-600 hover:bg-base-200" : "bg-red-50 text-red-500 ring-1 ring-red-100")}>
                              {cameraOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                          </button>
                      </div>

                      {phase === 'thinking' && (
                          <button onClick={handleStartAnswer} className="flex-1 bg-accent-600 hover:bg-accent-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent-600/20 transition-all">
                              <Play className="w-4 h-4 fill-current" /> 답변 바로 시작
                          </button>
                      )}

                      {phase === 'answering' && (
                          <button onClick={handleStopAnswer} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all">
                              <Square className="w-4 h-4 fill-current" /> 답변 완료
                          </button>
                      )}

                      {(phase === 'reading' || phase === 'intro' || phase === 'feedback') && (
                         <div className="flex-1 text-center text-xs font-bold text-base-400 py-3">
                             {phase === 'feedback' ? "분석 중..." : "진행 중..."}
                         </div>
                      )}

                  </div>
              </div>

          </main>

          {/* 3. Right Sidebar (Analysis) */}
          <AnimatePresence>
              {isSidebarOpen && (
                  <motion.aside
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="bg-white border-l border-base-200 flex flex-col z-20 shadow-xl"
                  >
                      <div className="p-5 border-b border-base-100">
                          <h3 className="font-black text-base-900 flex items-center gap-2">
                              <Activity className="w-4 h-4 text-accent-600" /> 실시간 분석
                          </h3>
                      </div>

                      <div className="flex-1 overflow-y-auto p-5 space-y-6">

                            {/* Analysis Card 1: Gaze */}
                            <div className="bg-base-50 p-4 rounded-2xl border border-base-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-base-600 flex items-center gap-1.5">
                                        <Eye className="w-3.5 h-3.5" /> 시선 처리
                                    </span>
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Good</span>
                                </div>
                                <div className="h-2 w-full bg-base-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[85%] rounded-full transition-all duration-300"></div>
                                </div>
                                <p className="text-[10px] text-base-400 mt-2 font-medium">카메라를 안정적으로 응시하고 있습니다.</p>
                            </div>

                            {/* Analysis Card 2: Voice */}
                            <div className="bg-base-50 p-4 rounded-2xl border border-base-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-base-600 flex items-center gap-1.5">
                                        <Activity className="w-3.5 h-3.5" /> 목소리 톤
                                    </span>
                                    <span className="text-[10px] bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-bold">Confident</span>
                                </div>
                                <div className="flex items-end gap-1 h-8 justify-between px-2">
                                     {[40, 60, 45, 70, 50, 65, 55, 40].map((h, i) => (
                                         <div key={i} className="w-1.5 bg-accent-400 rounded-full transition-all duration-200" style={{ height: `${phase === 'answering' ? h : 20}%`}}></div>
                                     ))}
                                </div>
                            </div>

                            {/* Memo / Guide */}
                            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                                <div className="flex items-center gap-2 mb-2 text-yellow-700 font-bold text-xs">
                                    <AlertCircle className="w-4 h-4" /> 가이드
                                </div>
                                <p className="text-xs text-yellow-800/80 leading-relaxed font-medium">
                                    답변할 때 두괄식으로 핵심을 먼저 말하는 것이 좋습니다. "제 결론은..." 과 같은 표현을 사용해보세요.
                                </p>
                            </div>
                      </div>
                  </motion.aside>
              )}
          </AnimatePresence>

      </div>
    </div>
  );
}

export default function InterviewRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <InterviewRoomContent />
    </Suspense>
  );
}
