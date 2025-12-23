'use client';

import { useState, useEffect } from 'react';
import { MOCK_QUESTIONS } from '@/mocks/interview';
import { Mic, Video, VideoOff, PhoneOff, MessageSquare } from 'lucide-react';
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
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-black">
      {/* Video Area */}
      <div className="relative flex-1 bg-[var(--surface)] p-4 flex gap-4 overflow-hidden">

        {/* Main View (AI Interviewer) */}
        <div className="flex-1 relative rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-[var(--border)] flex items-center justify-center overflow-hidden">
             {/* Mock AI Avatar */}
             <div className="text-center">
                 <div className="mx-auto h-32 w-32 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
                     <div className="h-24 w-24 rounded-full bg-indigo-500/40 flex items-center justify-center">
                         <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                     </div>
                 </div>
                 <p className="mt-4 text-[var(--muted-foreground)] font-mono text-sm">AI Interviewer is listening...</p>
             </div>

             {/* Question Overlay */}
             <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
                 <h2 className="text-xl font-medium text-white">
                     {MOCK_QUESTIONS[currentQuestionIndex]}
                 </h2>
             </div>
        </div>

        {/* Self View */}
        <div className="absolute top-8 right-8 h-48 w-64 rounded-xl bg-black border border-[var(--border)] shadow-2xl overflow-hidden flex items-center justify-center">
             <div className="text-[var(--muted-foreground)] text-xs flex flex-col items-center gap-2">
                 <Video className="h-6 w-6" />
                 <span>Camera Preview</span>
             </div>
             <div className="absolute bottom-2 left-2 flex gap-1">
                 <div className="h-2 w-2 rounded-full bg-green-500"></div> {/* Mic Active */}
             </div>
        </div>

      </div>

      {/* Controls */}
      <div className="h-24 border-t border-[var(--border)] bg-[var(--background)] flex items-center justify-center gap-6">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
                "h-12 w-12 flex items-center justify-center rounded-full transition-all",
                isRecording ? "bg-red-500 text-white animate-pulse" : "bg-[var(--surface-hover)] text-white hover:bg-[var(--border)]"
            )}
          >
              <Mic className="h-5 w-5" />
          </button>

          <button className="h-12 w-12 flex items-center justify-center rounded-full bg-[var(--surface-hover)] text-white hover:bg-[var(--border)]">
              <Video className="h-5 w-5" />
          </button>

          <button
            onClick={nextQuestion}
            className="h-12 px-6 rounded-full bg-[var(--primary)] text-white font-bold hover:opacity-90 flex items-center gap-2"
          >
              <span>Next Question</span>
              <MessageSquare className="h-4 w-4" />
          </button>

          <Link href="/interview" className="h-12 w-12 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors ml-4">
              <PhoneOff className="h-5 w-5" />
          </Link>
      </div>
    </div>
  );
}
