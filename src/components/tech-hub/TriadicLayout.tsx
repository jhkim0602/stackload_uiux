'use client';

import { cn } from '@/lib/utils';
import { Chapter, TechStack } from '@/mocks/stacks';
import { ChevronRight, Filter, Search, ExternalLink, MessageSquare, PlayCircle, Book } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // distinct light theme if available, otherwise custom
import TechViz3D from '@/components/TechViz3D';

// --- Left Rail: Documentation Navigation ---
export function DocNavigation({
  chapters,
  activeChapterId,
  onSelectChapter
}: {
  chapters: Chapter[],
  activeChapterId: string,
  onSelectChapter: (id: string) => void
}) {
  return (
    <nav className="w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-base-200 mr-8 overflow-y-auto h-[calc(100vh-160px)] sticky top-40">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-base-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full bg-base-50 border border-base-200 rounded-md py-2 pl-9 pr-4 text-sm text-base-900 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all placeholder:text-base-400"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-bold text-base-900 uppercase tracking-wider mb-3 px-2">Getting Started</h4>
          <ul className="space-y-1">
            {chapters.slice(0, 3).map((chapter, idx) => (
              <li key={chapter.id}>
                <button
                  onClick={() => onSelectChapter(chapter.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium",
                    chapter.id === activeChapterId
                      ? "bg-accent-50 text-accent-700"
                      : "text-base-600 hover:text-base-900 hover:bg-base-50"
                  )}
                >
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

         <div>
          <h4 className="text-xs font-bold text-base-900 uppercase tracking-wider mb-3 px-2">Core Concepts</h4>
          <ul className="space-y-1">
             {chapters.slice(3).map((chapter) => (
               <li key={chapter.id}>
                <button
                  onClick={() => onSelectChapter(chapter.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium",
                    chapter.id === activeChapterId
                      ? "bg-accent-50 text-accent-700"
                      : "text-base-600 hover:text-base-900 hover:bg-base-50"
                  )}
                >
                  {chapter.title}
                </button>
               </li>
             ))}
             {/* Fallback if no more chapters */}
             {chapters.length <= 3 && (
                 <li className="px-3 py-2 text-sm text-base-400 italic">No additional chapters</li>
             )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// --- Markdown Rendering Logic ---
function MarkdownContent({ content }: { content: string }) {
    // Simple Regex Parser for the Mock Data style
    const sections = content.split(/\n(?=## |### )/g);

    return (
        <div className="space-y-8 text-base-600 leading-relaxed font-medium">
            {sections.map((section, idx) => {
                const headerMatch = section.match(/^(#{2,3}) (.*)/);
                if (headerMatch) {
                    const level = headerMatch[1].length;
                    const title = headerMatch[2].trim();
                     // Generate ID for TOC
                    const id = title.replace(/\s+/g, '-').toLowerCase();
                    const body = section.replace(/^(#{2,3}) (.*)/, '').trim();

                    return (
                        <div key={idx} id={id} className="scroll-mt-32">
                            {level === 2 ? (
                                <h2 className="text-2xl font-bold text-base-900 mt-12 mb-6 pb-4 border-b border-base-100 tracking-tight">{title}</h2>
                            ) : (
                                <h3 className="text-xl font-bold text-base-900 mb-4 mt-8 flex items-center gap-2">
                                    <span className="text-accent-600">#</span> {title}
                                </h3>
                            )}
                            <div className="prose prose-base prose-lg max-w-none">
                                {body.split(/\n(?=```|[-*] |> )/g).map((block, bIdx) => {
                                    // Code Block
                                    const codeMatch = block.match(/```(\w+)\n([\s\S]*?)```/);
                                    if (codeMatch) {
                                        return (
                                            <div key={bIdx} className="my-6 rounded-lg overflow-hidden bg-base-900 border border-base-800 ring-4 ring-base-50">
                                                <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-white/5">
                                                    <span className="text-xs font-bold text-base-400 uppercase">{codeMatch[1]}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <SyntaxHighlighter
                                                        language={codeMatch[1]}
                                                        style={vscDarkPlus}
                                                        customStyle={{ margin: 0, borderRadius: 0, padding: '1.5rem', background: 'transparent' }}
                                                        wrapLongLines={true}
                                                    >
                                                        {codeMatch[2].trim()}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // List Item
                                    if (block.trim().startsWith('- ')) {
                                        return (
                                            <ul key={bIdx} className="list-disc pl-5 my-4 space-y-2 text-base-600 font-medium">
                                                {block.split('\n').filter(l => l.trim().startsWith('- ')).map((item, i) => (
                                                    <li key={i} dangerouslySetInnerHTML={{
                                                        __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-base-900 font-bold">$1</strong>')
                                                    }} />
                                                ))}
                                            </ul>
                                        )
                                    }

                                    // Blockquote
                                    if (block.trim().startsWith('> ')) {
                                         return (
                                            <blockquote key={bIdx} className="border-l-4 border-accent-500 bg-accent-50 p-6 rounded-r-md my-6 text-base-700 font-medium whitespace-pre-line">
                                                {block.replace(/> /g, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-base-900">$1</strong>')}
                                            </blockquote>
                                         )
                                    }

                                    // Valid clean paragraph
                                    if (block.trim().length > 0) {
                                        return (
                                            <p key={bIdx} className="mb-4 whitespace-pre-line text-base-600 font-medium" dangerouslySetInnerHTML={{
                                                __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-base-900 font-bold">$1</strong>')
                                                            .replace(/`([^`]+)`/g, '<code class="bg-base-100 text-base-900 border border-base-200 px-1.5 py-0.5 rounded text-sm font-bold font-mono">$1</code>')
                                            }} />
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    );
                } else {
                    // Intro text that precedes the first header
                     if (section.trim().length === 0) return null;
                     return (
                         <div key={idx} className="prose prose-base prose-lg max-w-none mb-8">
                             <p className="whitespace-pre-line text-base-600 font-medium" dangerouslySetInnerHTML={{
                                __html: section.replace(/\*\*(.*?)\*\*/g, '<strong class="text-base-900 font-bold">$1</strong>')
                             }} />
                         </div>
                     );
                }
            })}
        </div>
    );
}

// --- Right Rail: On This Page ---
export function OnThisPage({ content }: { content: string }) {
  const headings = (content.match(/^#{2,3} .*/gm) || []).map(h => {
      const level = h.startsWith('###') ? 3 : 2;
      const text = h.replace(/^#{2,3} /, '').trim();
      const id = text.replace(/\s+/g, '-').toLowerCase();
      return { id, text, level };
  });

  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    const headingElements = document.querySelectorAll('h2, h3');
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="w-64 flex-shrink-0 hidden xl:block pl-8 border-l border-base-200 ml-8 overflow-y-auto h-[calc(100vh-160px)] sticky top-40">
      <h4 className="text-sm font-bold text-base-900 mb-4 pl-4 border-l-2 border-transparent">On this page</h4>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
             <a
               href={`#${heading.id}`}
               onClick={(e) => {
                   e.preventDefault();
                   document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                   setActiveId(heading.id);
               }}
               className={cn(
                 "block py-1.5 transition-all duration-200 border-l-2 truncate font-medium",
                 heading.level === 3 ? "pl-6" : "pl-4",
                 activeId === heading.id
                    ? "border-accent-600 text-accent-700 bg-accent-50"
                    : "border-transparent text-base-500 hover:text-base-800 hover:border-base-300"
               )}
             >
               {heading.text}
             </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-8 border-t border-base-200">
          <button className="flex items-center gap-2 text-xs font-bold text-base-500 hover:text-accent-600 cursor-pointer transition-colors mb-3">
             <MessageSquare className="w-3 h-3" /> Provide Feedback
          </button>
          <button className="flex items-center gap-2 text-xs font-bold text-base-500 hover:text-accent-600 cursor-pointer transition-colors">
             <ExternalLink className="w-3 h-3" /> Edit this page
          </button>
      </div>
    </aside>
  );
}

// --- Center Stage: Doc Viewer ---
export function DocViewer({ stack, activeChapterId }: { stack: TechStack, activeChapterId: string }) {
  const activeChapter = stack.chapters.find(c => c.id === activeChapterId) || stack.chapters[0] || { title: 'No Content', description: '', content: '' };

  return (
    <main className="flex-1 min-w-0 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-base-500 mb-6 font-medium">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span>{stack.name}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent-600 font-bold">{activeChapter.title}</span>
        </div>

        {/* Title & Meta */}
        <div className="mb-10 pb-8 border-b border-base-100">
            <h1 className="text-4xl font-extrabold text-base-900 mb-4 tracking-tight leading-tight">{activeChapter.title}</h1>
            <p className="text-xl text-base-600 leading-relaxed font-light">{activeChapter.description}</p>
        </div>

        {/* Dynamic 3D Visualization */}
        {activeChapter.vizType ? (
            <div className="my-10 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 id="viz" className="text-lg font-bold text-base-900">Interactive Concept</h3>
                    <span className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-full font-bold uppercase tracking-wide">3D Mode</span>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-50 overflow-hidden ring-4 ring-base-50 h-[400px]">
                    <TechViz3D type={activeChapter.vizType || 'generic'} />
                </div>
                <p className="text-sm text-base-500 text-center font-medium">
                    Click and drag to explore the concept visualization.
                </p>
            </div>
        ) : null}

        {/* Markdown Content */}
        <MarkdownContent content={activeChapter.content} />

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-base-200 flex justify-between">
            <button className="text-left group">
                <div className="text-xs font-bold text-base-400 mb-1 uppercase tracking-wider">Previous</div>
                <div className="text-base-700 font-bold text-lg group-hover:text-accent-600 transition-colors">Introduction</div>
            </button>
            <button className="text-right group">
                <div className="text-xs font-bold text-base-400 mb-1 uppercase tracking-wider">Next</div>
                <div className="text-base-700 font-bold text-lg group-hover:text-accent-600 transition-colors">See next chapter</div>
            </button>
        </div>

        {/* Discussion Area */}
        <div className="mt-20 pt-10 border-t border-base-200">
            <h3 className="text-xl font-bold text-base-900 mb-6">Discussion</h3>
            <div className="w-full">
                 <textarea
                    className="w-full bg-white border border-base-200 rounded-md p-4 text-base-900 focus:ring-2 focus:ring-accent-500/20 focus:border-transparent transition-all min-h-[100px] resize-none placeholder:text-base-400 font-medium"
                    placeholder="Ask a question or share your insight..."
                 />
                 <div className="flex justify-between items-center mt-3">
                     <span className="text-xs font-bold text-base-400">Markdown supported</span>
                     <button className="px-5 py-2.5 bg-base-900 hover:bg-base-800 text-white text-sm font-bold rounded-md transition-all shadow-none h-9">
                         Post Comment
                     </button>
                 </div>
            </div>
        </div>
    </main>
  );
}
