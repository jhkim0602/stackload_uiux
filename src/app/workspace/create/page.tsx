'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, User, ArrowRight, Check, Target, Rocket, ChevronLeft } from 'lucide-react';
import { Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CreateWorkspacePage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string | null>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-base-900">
      {/* Header */}
      <header className="bg-white border-b border-base-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
               <Link href="/workspace" className="flex items-center gap-2 text-base-400 hover:text-base-900 transition-colors text-sm font-bold group">
                   <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 취소하고 나가기
               </Link>
           </div>
           <div className="flex items-center gap-3 bg-base-50 px-3 py-1.5 rounded-full border border-base-100">
               <span className="text-xs font-bold text-base-500">Step {step} of 2</span>
               <div className="flex gap-1.5">
                   <div className={cn("w-2 h-2 rounded-full transition-colors", step >= 1 ? 'bg-accent-600' : 'bg-base-200')} />
                   <div className={cn("w-2 h-2 rounded-full transition-colors", step >= 2 ? 'bg-accent-600' : 'bg-base-200')} />
               </div>
           </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl w-full"
        >
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-black text-base-900 mb-4 tracking-tight">새로운 워크스페이스 시작하기</h1>
                <p className="text-base-500 font-medium text-lg">어떤 프로젝트를 계획하고 계신가요?</p>
            </div>

            {/* Step 1: Project Type Selection */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className="bg-white p-8 rounded-3xl ring-4 ring-base-50 border border-base-200 hover:border-accent-400 hover:ring-accent-50 transition-all text-left group hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 bg-base-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent-50 transition-colors">
                                <type.icon className="w-7 h-7 text-base-400 group-hover:text-accent-600 transition-colors" />
                            </div>
                            <h3 className="text-xl font-black text-base-900 mb-2 group-hover:text-accent-700 transition-colors">{type.title}</h3>
                            <p className="text-base-500 text-sm font-medium leading-relaxed">{type.desc}</p>
                        </button>
                    ))}
                </div>
            )}

            {/* Step 2: Team Building Decision */}
            {step === 2 && (
                <div className="space-y-8">
                    <button onClick={() => setStep(1)} className="text-sm font-bold text-base-400 hover:text-base-600 flex items-center gap-1 mb-4 group px-2 py-1">
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 이전 단계
                    </button>

                    <div className="bg-white p-10 rounded-3xl ring-4 ring-base-50 border border-base-200 text-center">
                        <h2 className="text-2xl font-black text-base-900 mb-3">팀원은 모두 모이셨나요?</h2>
                        <p className="text-base-500 mb-10 font-medium text-lg">워크스페이스는 팀 단위로 운영됩니다. 팀원을 먼저 모집하시겠습니까?</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link href="/community/write?tag=TeamRecruit&from=workspace" className="block">
                                <div className="h-full bg-indigo-50/50 border-2 border-indigo-100 hover:border-indigo-500 rounded-2xl p-8 transition-all group cursor-pointer relative overflow-hidden text-center hover:shadow-lg hover:shadow-indigo-500/10">
                                     <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">Recommended</div>
                                     <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                         <Users className="w-8 h-8 text-indigo-600" />
                                     </div>
                                     <h3 className="text-lg font-black text-indigo-900 mb-2">팀원 모집하기</h3>
                                     <p className="text-sm text-indigo-700/70 font-bold leading-relaxed">커뮤니티에 모집글을 올리고<br/>팀원을 구하면 자동으로 생성됩니다.</p>
                                </div>
                            </Link>

                            <Link href={`/workspace/new-team?type=${projectType}`} className="block">
                                <div className="h-full bg-white border-2 border-base-200 hover:border-base-400 hover:bg-base-50 rounded-2xl p-8 transition-all group cursor-pointer text-center">
                                     <div className="w-16 h-16 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                         <User className="w-8 h-8 text-base-500" />
                                     </div>
                                     <h3 className="text-lg font-black text-base-900 mb-2">바로 시작하기</h3>
                                     <p className="text-sm text-base-500 font-bold leading-relaxed">이미 팀이 있거나<br/>혼자서 먼저 시작할게요.</p>
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
