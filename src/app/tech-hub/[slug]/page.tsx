'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_STACKS } from '@/mocks/stacks';
import { ChevronLeft, BookOpen, Bookmark, Share2 } from 'lucide-react';
import { DocNavigation, DocViewer, OnThisPage } from '@/components/tech-hub/TriadicLayout';
import { useState } from 'react';

export default function TechStackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const stack = MOCK_STACKS.find(s => s.slug === params.slug);

  // Initialize with the first chapter
  const [activeChapterId, setActiveChapterId] = useState(stack?.chapters[0]?.id || '');

  if (!stack) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-[#fcfdfd] min-h-screen font-sans">
      {/* 1. Cinematic Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-20 bg-white/80 backdrop-blur-xl">
        <div className="container max-w-[1600px] mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-3">
                    <img src={stack.logo} alt={stack.name} className="w-8 h-8 object-contain" />
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">{stack.name}</h1>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">
                        {stack.category}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <a href={stack.docsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                    <BookOpen className="w-4 h-4" />
                    Official Docs
                 </a>
            </div>
        </div>
      </div>

      {/* 2. Textbook Layout */}
        <div className="container mx-auto px-4 lg:px-6 max-w-[1600px]">
          {/* Main Layout: 3 Columns - items-stretch to ensure full height tracking */}
          <div className="flex items-stretch gap-8">
             {/* Left Sidebar */}
             <DocNavigation
                chapters={stack.chapters}
                activeChapterId={activeChapterId}
                onSelectChapter={setActiveChapterId}
             />

             {/* Center Content */}
             <DocViewer stack={stack} activeChapterId={activeChapterId} />

             {/* Right Sidebar */}
             <OnThisPage content={stack.chapters.find(c => c.id === activeChapterId)?.content || ""} />
          </div>
        </div>
    </div>
  );
}
