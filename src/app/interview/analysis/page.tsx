'use client';

import { useState } from 'react';
import { MOCK_JOB_ANALYSIS } from '@/mocks/interview';
import Link from 'next/link';
import { ArrowRight, Loader2, Sparkles, CheckCircle, Search, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InterviewAnalysisPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'ANALYZING' | 'COMPLETE'>('IDLE');

  const handleAnalyze = () => {
    if (!url) return;
    setStatus('ANALYZING');
    setTimeout(() => {
        setStatus('COMPLETE');
    }, 2500); // Fake delay
  };

  return (
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans text-base-900">
      <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[10px] font-black mb-6 border border-accent-100 uppercase tracking-wide">
                   <Sparkles className="h-3 w-3" /> AI Job Assistant
               </span>
               <h1 className="text-4xl md:text-5xl font-black text-base-900 mb-6 tracking-tight leading-tight">채용 공고 분석 & 면접 준비</h1>
               <p className="text-base-500 leading-relaxed text-lg font-medium max-w-2xl mx-auto">
                   채용 공고 링크를 입력하시면 AI가 직무 핵심과 예상 질문을 <br className="hidden md:block"/>
                   회원님의 포트폴리오와 대조하여 상세 분석 레포트를 제공합니다.
               </p>
          </div>

          {/* Input Section */}
          <div className="bg-white p-2.5 rounded-2xl ring-4 ring-base-50 border border-base-200 mb-16 max-w-2xl mx-auto shadow-sm">
               <div className="flex flex-col md:flex-row gap-2">
                   <div className="flex-1 relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-400" />
                       <input
                          type="text"
                          placeholder="채용 공고 URL을 입력하세요 (예: https://...)"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          disabled={status === 'ANALYZING'}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-0 outline-none text-base font-medium placeholder:text-base-400 focus:bg-base-50 transition-all font-medium"
                       />
                   </div>
                   <button
                      onClick={handleAnalyze}
                      disabled={!url || status === 'ANALYZING'}
                      className={cn(
                          "px-8 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-w-[140px]",
                          url && status !== 'ANALYZING'
                            ? "bg-base-900 text-white hover:bg-black shadow-lg shadow-base-900/10"
                            : "bg-base-100 text-base-400 cursor-not-allowed"
                      )}
                   >
                       {status === 'ANALYZING' ? <Loader2 className="h-5 w-5 animate-spin" /> : '분석하기'}
                       {status !== 'ANALYZING' && <ArrowRight className="h-5 w-5" />}
                   </button>
               </div>
          </div>

          {/* Analysis Result */}
          {status === 'COMPLETE' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  {/* Job Summary */}
                  <div className="bg-white rounded-3xl border border-base-200 ring-4 ring-base-50 p-8">
                      <div className="flex items-start justify-between mb-8">
                           <div>
                               <h2 className="text-2xl font-black text-base-900 mb-2">{MOCK_JOB_ANALYSIS.jobInfo.title}</h2>
                               <p className="text-sm text-base-500 font-bold flex items-center gap-2">
                                   <Building2 className="w-4 h-4" />
                                   {MOCK_JOB_ANALYSIS.jobInfo.company}
                               </p>
                           </div>
                           <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                               <CheckCircle className="h-6 w-6" />
                           </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10 pt-8 border-t border-base-100">
                          <div>
                               <h3 className="text-xs font-black text-base-400 uppercase mb-4 text-left tracking-wider">자격 요건 분석</h3>
                               <ul className="space-y-3">
                                   {MOCK_JOB_ANALYSIS.jobInfo.requirements.map((req, i) => (
                                       <li key={i} className="flex items-start gap-3 text-sm text-base-700 font-medium">
                                           <div className="mt-2 w-1.5 h-1.5 bg-accent-600 rounded-full shrink-0"></div>
                                           {req}
                                       </li>
                                   ))}
                               </ul>
                          </div>
                          <div>
                               <h3 className="text-xs font-black text-base-400 uppercase mb-4 text-left tracking-wider">우대 사항 분석</h3>
                               <ul className="space-y-3">
                                   {MOCK_JOB_ANALYSIS.jobInfo.preferences.map((pref, i) => (
                                       <li key={i} className="flex items-start gap-3 text-sm text-base-700 font-medium">
                                           <div className="mt-2 w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></div>
                                           {pref}
                                       </li>
                                   ))}
                               </ul>
                          </div>
                      </div>
                  </div>

                  {/* Generated Questions Preview */}
                  <div className="bg-base-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 pointer-events-none"></div>

                      <div className="relative">
                          <div className="flex items-center justify-between mb-8">
                              <h3 className="text-xl font-black flex items-center gap-3">
                                  <Sparkles className="h-6 w-6 text-yellow-400" /> AI 예상 질문
                              </h3>
                              <span className="text-[10px] font-bold text-base-400 bg-white/10 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-wide">
                                  4 Questions Generated
                              </span>
                          </div>

                          <div className="space-y-4 mb-10">
                              {MOCK_JOB_ANALYSIS.generatedQuestions.slice(0, 2).map((q, i) => (
                                  <div key={q.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                      <div className="flex items-center gap-3 mb-3">
                                          <span className="text-[10px] font-black text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded uppercase tracking-wider bg-yellow-500/10">
                                              {q.type}
                                          </span>
                                          <span className="text-xs text-base-400 font-bold">{q.context}</span>
                                      </div>
                                      <p className="font-bold text-lg leading-snug">"{q.question}"</p>
                                  </div>
                              ))}
                              <div className="text-center text-xs text-base-500 pt-4 font-medium flex items-center justify-center gap-2">
                                  <div className="w-1 h-1 bg-base-500 rounded-full"></div>
                                  + 2개의 심층 질문이 더 준비되어 있습니다 (인성, 포트폴리오 기반)
                                  <div className="w-1 h-1 bg-base-500 rounded-full"></div>
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-5">
                              <Link href="/interview/room?mode=text" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-4 font-bold text-sm text-center transition-colors flex items-center justify-center gap-2">
                                  <FileText className="w-4 h-4 text-base-400" />
                                  텍스트로 답변 준비
                              </Link>
                              <Link href="/interview/room?mode=video" className="bg-accent-600 hover:bg-accent-700 text-white rounded-xl py-4 font-bold text-sm text-center transition-colors shadow-lg shadow-accent-900/50 flex items-center justify-center gap-2">
                                  <Video className="w-4 h-4" />
                                  화상 실전 면접
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}

function Building2({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    );
}

function Video({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
        </svg>
    );
}
