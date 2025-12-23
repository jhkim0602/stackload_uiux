'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Code, Terminal, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(() => import('@/components/editor/BlockNoteEditor'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-base-50 animate-pulse rounded-xl" />
});

import { useRouter } from 'next/navigation';

export function QnAEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [devEnv, setDevEnv] = useState('');
  const [tried, setTried] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => router.push('/community/write')} className="flex items-center gap-2 text-base-500 hover:text-base-900 font-bold text-sm transition-colors px-3 py-2 rounded-lg hover:bg-base-50">
          <ArrowLeft className="w-4 h-4" /> 카테고리 다시 선택
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Technical Q&A
        </span>
      </div>

      <div className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-base-900 mb-2">질문 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="어떤 문제가 발생했나요? 핵심을 요약해주세요."
            className="w-full text-2xl font-bold bg-transparent border-b-2 border-base-100 py-2 focus:border-rose-500 focus:outline-none placeholder:text-base-300 transition-colors"
          />
        </div>

        {/* Structured Inputs */}
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-3xl ring-4 ring-base-50 border border-base-200">
            <h3 className="text-lg font-black text-base-900 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-rose-500" /> 문제 상황 상세
            </h3>
            <div className="bg-base-50/50 rounded-xl p-4 min-h-[160px] border border-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-100 focus-within:border-rose-200 transition-all">
                <BlockNoteEditor
                    onChange={setContent}
                    initialContent={content}
                    className="min-h-[160px]"
                />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl ring-4 ring-base-50 border border-base-200">
            <h3 className="text-lg font-black text-base-900 mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-500" /> 개발 환경
            </h3>
            <input
              type="text"
              value={devEnv}
              onChange={(e) => setDevEnv(e.target.value)}
              placeholder="OS, 언어/프레임워크 버전 등을 입력해주세요 (예: macOS, Next.js 14, Node 18)"
              className="w-full bg-base-50/50 rounded-xl px-4 py-3 text-base-700 font-medium placeholder:text-base-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all border border-transparent focus:border-indigo-200"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl ring-4 ring-base-50 border border-base-200">
            <h3 className="text-lg font-black text-base-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" /> 시도해본 것
            </h3>
            <div className="bg-base-50/50 rounded-xl p-4 min-h-[128px] border border-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-100 focus-within:border-amber-200 transition-all">
                <BlockNoteEditor
                    onChange={setTried}
                    initialContent={tried}
                    className="min-h-[128px]"
                />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
           <label className="block text-sm font-bold text-base-900 mb-2">태그</label>
           <div className="flex flex-wrap items-center gap-2 min-h-[48px] bg-white rounded-xl border border-base-200 p-2 focus-within:border-base-400 transition-colors">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-base-900 text-white rounded-lg text-sm font-bold flex items-center gap-2">
                  #{tag}
                  <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-rose-300">×</button>
                </span>
              ))}
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="태그 입력 (Enter)"
                className="bg-transparent outline-none text-sm font-bold text-base-900 placeholder:text-base-400 px-2 py-1 flex-1"
              />
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-base-100">
          <button className="px-8 py-3.5 bg-base-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center gap-2">
            질문 등록하기 <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
