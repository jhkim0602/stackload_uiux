'use client';

import { useState, useEffect } from 'react';
import { MOCK_QUESTIONS } from '@/mocks/interview';
import { Mic, Video, VideoOff, PhoneOff, MessageSquare, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function InterviewSessionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState('');

  // Auto-advance mock (optional interaction)
  const nextQuestion = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer('');
      setIsRecording(false);
    } else {
      alert("Interview Completed! Redirecting to feedback...");
      // In real app, redirect
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-base-950 font-sans text-white">
      {/* Video Area */}
      <div className="relative flex-1 p-6 flex gap-6 overflow-hidden">

        {/* Main View (AI Interviewer) */}
        <div className="flex-1 relative rounded-3xl bg-base-900 border border-base-800 ring-4 ring-base-900 flex items-center justify-center overflow-hidden shadow-2xl">
             {/* Mock AI Avatar */}
             <div className="text-center z-10">
                 <div className="mx-auto h-32 w-32 rounded-full bg-accent-500/10 flex items-center justify-center animate-pulse border border-accent-500/20">
                     <div className="h-24 w-24 rounded-full bg-accent-500/20 flex items-center justify-center border border-accent-500/40">
                         <div className="h-4 w-4 rounded-full bg-accent-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                     </div>
                 </div>
                 <p className="mt-6 text-base-400 font-bold text-sm tracking-widest uppercase">AI Interviewer is listening...</p>
             </div>

             {/* Background Gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-base-900 via-base-900 to-base-950 opacity-50 pointer-events-none"></div>

             {/* Question Overlay */}
             <div className="absolute bottom-10 left-10 right-10 bg-base-950/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl">
                 <h2 className="text-2xl font-black text-white leading-snug">
                     {MOCK_QUESTIONS[currentQuestionIndex]}
                 </h2>
             </div>
        </div>

        {/* Self View */}
        <div className="absolute top-10 right-10 h-48 w-64 rounded-2xl bg-black border border-base-700 shadow-2xl overflow-hidden flex items-center justify-center z-20 group">
             <div className="text-base-500 text-xs flex flex-col items-center gap-2 font-bold group-hover:text-base-300 transition-colors">
                 <Video className="h-6 w-6" />
                 <span>Camera Preview</span>
             </div>
             <div className="absolute bottom-3 left-3 flex gap-1.5 px-2 py-1 bg-black/50 rounded-md backdrop-blur-md">
                 <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div> {/* Mic Active */}
             </div>
        </div>

      </div>

      {/* Controls */}
      <div className="h-24 border-t border-base-800 bg-base-900 flex items-center justify-center gap-8 relative z-30">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
                "h-14 w-14 flex items-center justify-center rounded-2xl transition-all shadow-lg",
                isRecording ? "bg-red-500 text-white animate-pulse shadow-red-500/30" : "bg-base-800 text-base-400 hover:bg-base-700 hover:text-white border border-base-700"
            )}
          >
              <Mic className="h-6 w-6" />
          </button>

          <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-base-800 text-base-400 hover:bg-base-700 hover:text-white border border-base-700 transition-all">
              <Video className="h-6 w-6" />
          </button>

          <button
            onClick={nextQuestion}
            className="h-14 px-8 rounded-2xl bg-white text-base-900 font-black hover:bg-base-100 flex items-center gap-3 transition-all shadow-xl shadow-white/5 active:scale-95"
          >
              <span>Next Question</span>
              <ChevronRight className="h-5 w-5" />
          </button>

          <Link href="/interview" className="h-14 w-14 flex items-center justify-center rounded-2xl bg-base-800 text-base-400 hover:bg-red-500/10 hover:text-red-500 transition-all border border-base-700 hover:border-red-500/30 ml-4">
              <PhoneOff className="h-6 w-6" />
          </Link>
      </div>
    </div>
  );
}
