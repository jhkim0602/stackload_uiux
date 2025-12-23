'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_JOB_ANALYSIS } from '@/mocks/interview';
import Link from 'next/link';
import { Mic, MicOff, Video as VideoIcon, VideoOff, MessageSquare, Send, X, Clock, Sparkles, Layout, MoreVertical, Settings, PhoneOff, User, Activity, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function InterviewRoomContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'video';
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'analysis' | 'transcript'>('analysis');

  const question = MOCK_JOB_ANALYSIS.generatedQuestions[currentQuestionIdx];
  const isLast = currentQuestionIdx === MOCK_JOB_ANALYSIS.generatedQuestions.length - 1;

  useEffect(() => {
    let interval: any;
    if (isRecording) {
        interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
        setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#1c1c1e] min-h-screen text-white flex flex-col font-sans overflow-hidden">

      {/* 1. Professional Header */}
      <header className="h-14 bg-[#1c1c1e] border-b border-[#2c2c2e] flex items-center justify-between px-4 z-50">
           <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-sm">SL</div>
                   <div className="flex flex-col">
                       <span className="text-sm font-bold leading-tight">Mock Interview Session</span>
                       <span className="text-[10px] text-gray-400">Frontend Developer • Toss Lab</span>
                   </div>
               </div>
               <div className="h-4 w-[1px] bg-gray-600 mx-2"></div>
               <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#2c2c2e] text-xs font-medium text-gray-300">
                   <Clock className="w-3 h-3" /> {formatTime(timer)}
               </div>
           </div>

           <div className="flex items-center gap-3">
               {isRecording && (
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold ring-1 ring-red-500/50 animate-pulse">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                       REC
                   </div>
               )}
               <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={cn("p-2 rounded-lg transition-colors", isSidebarOpen ? "bg-blue-600 text-white" : "hover:bg-[#2c2c2e] text-gray-400")}>
                   <Layout className="w-5 h-5" />
               </button>
           </div>
      </header>

      {/* 2. Main Workspace */}
      <div className="flex-1 flex overflow-hidden">

          {/* Video Area */}
          <main className="flex-1 flex flex-col p-4 relative bg-black">

              {/* Question Overlay (Draggable-like look) */}
              <motion.div
                key={question.id}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-20 bg-[#1c1c1e]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl"
              >
                  <div className="flex items-center justify-between mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
                      <span>Question {currentQuestionIdx + 1} of {MOCK_JOB_ANALYSIS.generatedQuestions.length}</span>
                      <span className="text-blue-500">Technical</span>
                  </div>
                  <h2 className="text-xl font-bold leading-snug">{question.question}</h2>
              </motion.div>

              {/* Grid Layout */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative">
                  {/* AI Interviewer */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#2c2c2e] border border-[#3a3a3c]">
                       <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                       <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                           Sarah (AI Interviewer)
                       </div>
                       <div className="absolute top-4 right-4 bg-black/60 p-1.5 rounded-lg text-blue-400">
                           <Activity className="w-4 h-4 animate-pulse" />
                       </div>
                  </div>

                  {/* User */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#2c2c2e] border border-[#3a3a3c]">
                       {cameraOn ? (
                           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover scale-x-[-1]" />
                       ) : (
                           <div className="w-full h-full flex items-center justify-center">
                               <div className="w-24 h-24 rounded-full bg-[#3a3a3c] flex items-center justify-center text-2xl font-bold text-gray-500">JH</div>
                           </div>
                       )}
                       <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                           <div className={cn("w-2 h-2 rounded-full", micOn ? "bg-green-500" : "bg-red-500")}></div>
                           You
                       </div>
                       {!micOn && (
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 p-4 rounded-full backdrop-blur-sm">
                               <MicOff className="w-8 h-8 text-red-500" />
                           </div>
                       )}
                  </div>
              </div>

              {/* Control Bar (Floating) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#1c1c1e] border border-[#3a3a3c] p-2 rounded-2xl shadow-2xl backdrop-blur-xl">
                  <button
                      onClick={() => setMicOn(!micOn)}
                      className={cn("p-4 rounded-xl transition-all", micOn ? "bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white" : "bg-red-500 hover:bg-red-600 text-white")}
                  >
                      {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <button
                      onClick={() => setCameraOn(!cameraOn)}
                      className={cn("p-4 rounded-xl transition-all", cameraOn ? "bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white" : "bg-red-500 hover:bg-red-600 text-white")}
                  >
                      {cameraOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>

                  <div className="w-[1px] h-8 bg-[#3a3a3c] mx-2"></div>

                  <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={cn("px-6 rounded-xl font-bold flex items-center gap-2 transition-all", isRecording ? "bg-red-500/20 text-red-500" : "bg-blue-600 hover:bg-blue-700 text-white")}
                  >
                      {isRecording ? "Stop Interview" : "Start Answer"}
                  </button>

                  <div className="w-[1px] h-8 bg-[#3a3a3c] mx-2"></div>

                  <Link href="/interview" className="p-4 rounded-xl bg-[#2c2c2e] hover:bg-red-500/20 hover:text-red-500 text-gray-400 transition-colors">
                      <PhoneOff className="w-5 h-5" />
                  </Link>
              </div>

          </main>

          {/* 3. Right Sidebar (Analysis) */}
          <AnimatePresence>
              {isSidebarOpen && (
                  <motion.aside
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="bg-[#1c1c1e] border-l border-[#2c2c2e] flex flex-col"
                  >
                      <div className="flex items-center p-2 border-b border-[#2c2c2e]">
                          <button
                            onClick={() => setSidebarTab('analysis')}
                            className={cn("flex-1 py-2 text-sm font-bold rounded-lg transition-colors", sidebarTab === 'analysis' ? "bg-[#2c2c2e] text-white" : "text-gray-500 hover:text-gray-300")}
                          >
                              Real-time Analysis
                          </button>
                          <button
                            onClick={() => setSidebarTab('transcript')}
                            className={cn("flex-1 py-2 text-sm font-bold rounded-lg transition-colors", sidebarTab === 'transcript' ? "bg-[#2c2c2e] text-white" : "text-gray-500 hover:text-gray-300")}
                          >
                              Transcript
                          </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Real-time Feedback Items */}
                            <div className="space-y-4">
                                <div className="bg-[#2c2c2e] p-4 rounded-xl border border-[#3a3a3c]">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-between">
                                        Voice Analysis
                                        <span className="text-green-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Good</span>
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1 text-gray-300">
                                                <span>Pacing</span>
                                                <span>120 wpm</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-[#1c1c1e] rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 w-[60%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1 text-gray-300">
                                                <span>Tone Confidence</span>
                                                <span>High</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-[#1c1c1e] rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-[85%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#2c2c2e] p-4 rounded-xl border border-[#3a3a3c]">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 text-left">Keyword Detection</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">React</span>
                                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">Optimization</span>
                                        <span className="px-2 py-1 rounded bg-[#3a3a3c] text-gray-400 text-xs font-medium border border-white/5">DOM</span>
                                    </div>
                                </div>

                                <div className="bg-[#2c2c2e] p-4 rounded-xl border border-yellow-500/30">
                                    <h4 className="text-xs font-bold text-yellow-500 uppercase mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3" /> Improvement Tip
                                    </h4>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                        Try to provide more concrete examples when explaining "Optimization". Mention specific metrics if possible.
                                    </p>
                                </div>
                            </div>
                      </div>

                      <div className="p-4 border-t border-[#2c2c2e] bg-[#1c1c1e]">
                          <div className="text-xs text-center text-gray-500">
                              AI Analysis is active and private to you.
                          </div>
                      </div>
                  </motion.aside>
              )}
          </AnimatePresence>

      </div>
    </div>
  );
}

function AlertCircle({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
    );
}

export default function InterviewRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center text-white">Loading...</div>}>
      <InterviewRoomContent />
    </Suspense>
  );
}
