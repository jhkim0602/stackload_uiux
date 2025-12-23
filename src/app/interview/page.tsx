'use client';

import Link from 'next/link';
import { Sparkles, Video, ArrowRight, CheckCircle2, Mic, PlayCircle, BarChart3, Globe, Keyboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InterviewLandingPage() {
  return (
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans text-base-900">
      <div className="container max-w-6xl mx-auto px-4">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[10px] font-black border border-accent-100 uppercase tracking-wide"
            >
                <Sparkles className="h-3 w-3" /> AI Interview Coach
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-base-900 tracking-tight leading-tight"
            >
                합격으로 가는 가장 빠른 길, <br className="hidden md:block" />
                <span className="text-accent-600">AI 면접 코치</span>와 함께하세요.
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed"
            >
                채용 공고 분석부터 실전 화상 면접까지. <br />
                당신의 모든 합격 과정을 AI가 밀착 관리해드립니다.
            </motion.p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Feature 1: Job Analysis */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Link href="/interview/analysis" className="group block h-full bg-white rounded-[2.5rem] p-8 ring-4 ring-base-50 border border-base-200 hover:border-accent-200 hover:ring-accent-50 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-50 transition-opacity"></div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center text-accent-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Globe className="w-7 h-7" />
                        </div>

                        <h2 className="text-2xl font-black text-base-900 mb-3 group-hover:text-accent-600 transition-colors">채용 공고 분석</h2>
                        <p className="text-base-500 font-medium leading-relaxed mb-8 flex-1">
                            지원하려는 회사의 채용 공고 URL만 입력하세요. <br/>
                            AI가 핵심 역량을 분석하고 예상 질문을 생성합니다.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-sm font-bold text-base-700">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                                <span>직무 요건 및 우대사항 자동 분석</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-base-700">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                                <span>내 이력서 맞춤형 질문 생성</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-base-700">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                                <span>기술/인성/컬처핏 심층 질문</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-accent-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                            분석 시작하기 <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Feature 2: Mock Interview */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Link href="/interview/room" className="group block h-full bg-base-900 rounded-[2.5rem] p-8 ring-4 ring-base-50 border border-base-900 hover:ring-base-200 transition-all duration-300 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10 flex flex-col h-full text-white">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                            <Video className="w-7 h-7" />
                        </div>

                        <h2 className="text-2xl font-black mb-3">실전 모의 면접</h2>
                        <p className="text-base-400 font-medium leading-relaxed mb-8 flex-1">
                            실제 면접장과 동일한 환경에서 연습하세요. <br/>
                            AI 면접관이 실시간으로 표정, 목소리, 답변 내용을 코칭합니다.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                                <PlayCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
                                <span className="text-xs font-bold block">화상 면접</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                                <Keyboard className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                                <span className="text-xs font-bold block">채팅 면접</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                                <Mic className="w-6 h-6 mx-auto mb-2 text-green-400" />
                                <span className="text-xs font-bold block">음성 분석</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                                <BarChart3 className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                                <span className="text-xs font-bold block">결과 리포트</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform mt-auto">
                            면접장 입장하기 <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>



      </div>
    </div>
  );
}
