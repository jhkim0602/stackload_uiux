'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Users, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import Link from 'next/link';

export function CategorySelection() {
  const categories = [
    {
      id: 'qna',
      title: '기술 질문 (Q&A)',
      desc: '해결되지 않는 에러나 구현 문제가 있나요? 상세한 정보와 함께 질문해보세요.',
      icon: HelpCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      border: 'hover:border-rose-200',
      ring: 'hover:ring-rose-50'
    },
    {
      id: 'connect',
      title: '팀원 모집 (Connect)',
      desc: '사이드 프로젝트나 스터디를 함께할 열정적인 동료를 찾아보세요.',
      icon: Users,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'hover:border-indigo-200',
      ring: 'hover:ring-indigo-50'
    },
    {
      id: 'tips',
      title: '꿀팁 공유 (Tips)',
      desc: '나만의 개발 노하우나 최신 기술 트렌드를 아티클로 공유해주세요.',
      icon: Lightbulb,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'hover:border-amber-200',
      ring: 'hover:ring-amber-50'
    },
    {
      id: 'free',
      title: '커리어 / 자유',
      desc: '커리어 고민이나 개발자의 소소한 일상을 자유롭게 나눠보세요.',
      icon: MessageSquare,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'hover:border-emerald-200',
      ring: 'hover:ring-emerald-50'
    }
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-base-900 mb-4 tracking-tight">어떤 이야기를 나누고 싶으신가요?</h1>
        <p className="text-base-500 font-medium text-lg">작성하려는 글의 주제를 선택해주세요. 가장 알맞은 에디터를 준비해드릴게요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/community/write/${cat.id}`}
            className={cn(
              "text-left group relative p-8 rounded-3xl bg-white ring-4 ring-base-50 border border-base-200 transition-all duration-300 hover:-translate-y-1 block",
              cat.border,
              cat.ring
            )}
          >
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
            >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors", cat.bg)}>
                <cat.icon className={cn("w-7 h-7", cat.color)} />
                </div>

                <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-black text-base-900 group-hover:text-base-900/90 flex items-center gap-2">
                    {cat.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-base-400" />
                </h3>
                <p className="text-base-500 font-medium leading-relaxed">
                    {cat.desc}
                </p>
                </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
