'use client';

import { useState } from 'react';
import { MOCK_JOB_ANALYSIS } from '@/mocks/interview';
import Link from 'next/link';
import { ArrowRight, FileText, Loader2, Sparkles, CheckCircle, AlertCircle, Search } from 'lucide-react';
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
    <div className="bg-white min-h-screen pt-16 pb-20 font-sans">
      <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10">
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100">
                   <Sparkles className="h-3 w-3" /> AI Job Analyzer
               </span>
               <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">채용 공고 분석 & 면접 준비</h1>
               <p className="text-gray-500 leading-relaxed">
                   채용 공고 링크를 입력하시면 AI가 직무 핵심과 예상 질문을 <br/>
                   회원님의 포트폴리오와 대조하여 상세 분석 레포트를 제공합니다.
               </p>
          </div>

          {/* Input Section */}
          <div className="bg-white p-2 rounded-xl border border-gray-200 mb-12 max-w-2xl mx-auto">
               <div className="flex flex-col md:flex-row gap-2">
                   <div className="flex-1 relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                       <input
                          type="text"
                          placeholder="채용 공고 URL을 입력하세요 (예: https://...)"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          disabled={status === 'ANALYZING'}
                          className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-medium"
                       />
                   </div>
                   <button
                      onClick={handleAnalyze}
                      disabled={!url || status === 'ANALYZING'}
                      className={cn(
                          "px-6 py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 min-w-[120px]",
                          url && status !== 'ANALYZING'
                            ? "bg-gray-900 text-white hover:bg-black"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                   >
                       {status === 'ANALYZING' ? <Loader2 className="h-4 w-4 animate-spin" /> : '분석하기'}
                       {status !== 'ANALYZING' && <ArrowRight className="h-4 w-4" />}
                   </button>
               </div>
          </div>

          {/* Analysis Result */}
          {status === 'COMPLETE' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Job Summary */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-6">
                           <div>
                               <h2 className="text-xl font-bold text-gray-900 mb-1">{MOCK_JOB_ANALYSIS.jobInfo.title}</h2>
                               <p className="text-sm text-gray-500 font-bold">{MOCK_JOB_ANALYSIS.jobInfo.company}</p>
                           </div>
                           <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                               <CheckCircle className="h-5 w-5" />
                           </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                          <div>
                               <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-left">자격 요건 분석</h3>
                               <ul className="space-y-2">
                                   {MOCK_JOB_ANALYSIS.jobInfo.requirements.map((req, i) => (
                                       <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                           <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                           {req}
                                       </li>
                                   ))}
                               </ul>
                          </div>
                          <div>
                               <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-left">우대 사항 분석</h3>
                               <ul className="space-y-2">
                                   {MOCK_JOB_ANALYSIS.jobInfo.preferences.map((pref, i) => (
                                       <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                           <span className="mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span>
                                           {pref}
                                       </li>
                                   ))}
                               </ul>
                          </div>
                      </div>
                  </div>

                  {/* Generated Questions Preview */}
                  <div className="bg-gray-900 rounded-xl p-8 text-white">
                      <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-yellow-400" /> AI 예상 질문
                          </h3>
                          <span className="text-xs font-bold text-gray-400 bg-white/10 px-2 py-1 rounded">
                              4개 문항 생성됨
                          </span>
                      </div>

                      <div className="space-y-4 mb-8">
                          {MOCK_JOB_ANALYSIS.generatedQuestions.slice(0, 2).map((q, i) => (
                              <div key={q.id} className="bg-white/5 rounded-lg p-5 border border-white/10">
                                  <div className="flex items-center gap-2 mb-2">
                                      <span className="text-[10px] font-bold text-yellow-400 border border-yellow-400/30 px-1.5 py-0.5 rounded">
                                          {q.type}
                                      </span>
                                      <span className="text-xs text-gray-400">{q.context}</span>
                                  </div>
                                  <p className="font-medium text-base leading-snug">"{q.question}"</p>
                              </div>
                          ))}
                          <div className="text-center text-xs text-gray-500 pt-2">
                              + 2개의 심층 질문이 더 준비되어 있습니다 (인성, 포트폴리오 기반)
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <Link href="/interview/room?mode=text" className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-lg py-3.5 font-bold text-sm text-center transition-colors">
                              ✍️ 텍스트로 답변 준비
                          </Link>
                          <Link href="/interview/room?mode=video" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3.5 font-bold text-sm text-center transition-colors shadow-lg shadow-blue-900/50">
                              📹 화상 실전 면접
                          </Link>
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}
