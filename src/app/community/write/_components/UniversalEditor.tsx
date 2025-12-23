'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WriteCategory } from './CategorySelection';
import { WriteCategory } from './CategorySelection';
import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(() => import('@/components/editor/BlockNoteEditor'), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-base-50 animate-pulse rounded-xl" />
});

import { useRouter } from 'next/navigation';

export type WriteCategory = 'qna' | 'connect' | 'tips' | 'free' | 'career' | 'all';

interface UniversalEditorProps {
  category: WriteCategory;
}

export function UniversalEditor({ category }: UniversalEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const isTips = category === 'tips';
  const themeColor = isTips ? 'text-amber-500 bg-amber-50 border-amber-100' : 'text-emerald-500 bg-emerald-50 border-emerald-100';
  const label = isTips ? 'Tips & Articles' : 'Career / Free';

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
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => router.push('/community/write')} className="flex items-center gap-2 text-base-500 hover:text-base-900 font-bold text-sm transition-colors px-3 py-2 rounded-lg hover:bg-base-50">
          <ArrowLeft className="w-4 h-4" /> 카테고리 다시 선택
        </button>
        <span className={cn("text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border", themeColor)}>
          {label}
        </span>
      </div>

      <div className="space-y-10">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full text-4xl md:text-5xl font-black bg-transparent border-none p-0 focus:ring-0 placeholder:text-base-200 text-base-900 tracking-tight leading-tight"
          />
        </div>

        {isTips && (
            <div className="h-40 bg-base-50 rounded-3xl border-2 border-dashed border-base-200 flex flex-col items-center justify-center text-base-400 font-bold gap-3 hover:bg-base-50/50 hover:border-base-300 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ImageIcon className="w-6 h-6 text-base-300" />
                </div>
                <span>커버 이미지 추가 (선택)</span>
            </div>
        )}

        <div>
            <BlockNoteEditor
                onChange={setContent}
                initialContent={content}
                className="mt-4 min-h-[500px]"
            />
        </div>

        {/* Tags */}
        <div className="border-t border-base-100 pt-8">
            <div className="flex flex-wrap items-center gap-3">
                {tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-base-100 text-base-700 rounded-lg text-sm font-bold flex items-center gap-2">
                        #{tag}
                        <button onClick={() => setTags(tags.filter(t => t !== tag))} className="text-base-400 hover:text-base-600">×</button>
                    </span>
                ))}
                <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="+ 태그 입력"
                    className="bg-transparent outline-none text-sm font-bold text-base-500 placeholder:text-base-300 min-w-[120px] px-2 py-1.5 hover:bg-base-50 rounded-md transition-colors"
                />
            </div>
        </div>

        <div className="flex justify-end pt-8">
          <button className="px-8 py-3.5 bg-base-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center gap-2">
            게시하기 <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
