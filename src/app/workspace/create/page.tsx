'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, User, ArrowRight, Check, Target, Rocket } from 'lucide-react';
import { Layout } from 'lucide-react';

export default function CreateWorkspacePage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string | null>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
               <Link href="/workspace" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold">
                   <ArrowRight className="w-4 h-4 rotate-180" /> 취소하고 나가기
               </Link>
           </div>
           <div className="flex items-center gap-2">
               <span className="text-sm font-bold text-slate-500">Step {step} of 2</span>
               <div className="flex gap-1">
                   <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                   <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
               </div>
           </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-2xl w-full"
        >
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-slate-900 mb-3">새로운 워크스페이스 시작하기</h1>
                <p className="text-slate-500 font-medium text-lg">어떤 프로젝트를 계획하고 계신가요?</p>
            </div>

            {/* Step 1: Project Type Selection */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 'hackathon', icon: Target, title: '해커톤 / 공모전', desc: '단기간 집중 개발을 위한 최적의 환경' },
                        { id: 'side', icon: Rocket, title: '사이드 프로젝트', desc: '지속적인 서비스 개발 및 유지보수' },
                        { id: 'study', icon: Users, title: '스터디 / 모임', desc: '지식 공유와 학습 기록을 위한 공간' },
                    ].map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                setProjectType(type.id);
                                setStep(2);
                            }}
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                                <type.icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{type.title}</h3>
                            <p className="text-slate-500 text-sm">{type.desc}</p>
                        </button>
                    ))}
                </div>
            )}

            {/* Step 2: Team Building Decision */}
            {step === 2 && (
                <div className="space-y-6">
                    <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-4">
                        <ArrowRight className="w-4 h-4 rotate-180" /> 이전 단계
                    </button>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">팀원은 모두 모이셨나요?</h2>
                        <p className="text-slate-500 mb-8">워크스페이스는 팀 단위로 운영됩니다. 팀원을 먼저 모집하시겠습니까?</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/community/write?tag=TeamRecruit&from=workspace" className="block">
                                <div className="h-full bg-indigo-50/50 border-2 border-indigo-100 hover:border-indigo-500 rounded-xl p-6 transition-all group cursor-pointer relative overflow-hidden">
                                     <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">추천</div>
                                     <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                         <Users className="w-6 h-6 text-indigo-600" />
                                     </div>
                                     <h3 className="font-bold text-indigo-900 mb-1">팀원 모집하기</h3>
                                     <p className="text-xs text-indigo-700/70 font-medium">커뮤니티에 모집글을 올리고<br/>팀원을 구하면 자동으로 생성됩니다.</p>
                                </div>
                            </Link>

                            <Link href={`/workspace/new-team?type=${projectType}`} className="block">
                                <div className="h-full bg-slate-50 border-2 border-slate-100 hover:border-slate-400 rounded-xl p-6 transition-all group cursor-pointer">
                                     <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                         <User className="w-6 h-6 text-slate-500" />
                                     </div>
                                     <h3 className="font-bold text-slate-900 mb-1">바로 시작하기</h3>
                                     <p className="text-xs text-slate-500 font-medium">이미 팀이 있거나<br/>혼자서 먼저 시작할게요.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
      </main>
    </div>
  );
}
