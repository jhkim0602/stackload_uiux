'use client';

import { useState } from 'react';
import { MOCK_BLOGS, BLOG_CATEGORIES, SUB_CATEGORIES } from '@/mocks/blogs';
import { Search, Grid, List as ListIcon, TrendingUp, Clock, Eye, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<typeof BLOG_CATEGORIES[number]>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredBlogs = MOCK_BLOGS.filter(blog => {
    // 1. Check Category
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    // 2. Check Tag (only if a tag is selected)
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;

    // 3. Check Search Query
    const query = searchQuery.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(query) ||
                          blog.excerpt.toLowerCase().includes(query) ||
                          blog.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesTag && matchesSearch;
  });

  const sortedByViews = [...MOCK_BLOGS].sort((a, b) => b.views - a.views).slice(0, 5);

  const availableTags = selectedCategory !== 'All' && SUB_CATEGORIES[selectedCategory] ? SUB_CATEGORIES[selectedCategory] : [];

  return (
    <div className="bg-[#fcfdfd] min-h-screen pt-16 pb-20 font-sans">
      {/* Filters Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-20 backdrop-blur-xl bg-white/90">
        <div className="container max-w-7xl mx-auto px-4 py-4 space-y-4">

            {/* Top Row: Main Categories & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Main Categories */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                    {BLOG_CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                setSelectedTag(null); // Reset tag when category changes
                            }}
                            className={cn(
                                "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200",
                                selectedCategory === category
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105"
                                    : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search & View Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="블로그 검색..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2.5 rounded-full bg-slate-50 border border-transparent outline-none text-sm font-medium w-40 md:w-64 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all"
                        />
                    </div>
                    <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-md transition-all",
                                viewMode === 'grid' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-2 rounded-md transition-all",
                                viewMode === 'list' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <ListIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub Categories (Tags) - Conditional Render */}
            <AnimatePresence>
                {availableTags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar pt-1 border-t border-slate-50">
                            <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-wide">Filter by:</span>
                            {availableTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border",
                                        selectedTag === tag
                                            ? "bg-blue-50 border-blue-200 text-blue-700"
                                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <main>
               <h1 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                   {selectedCategory === 'All' ? '전체 큐레이션' : selectedCategory}
                   <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{filteredBlogs.length}</span>
               </h1>

               {filteredBlogs.length === 0 ? (
                   <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                       <p className="text-slate-400 font-medium">검색 결과가 없습니다.</p>
                       <button onClick={() => {setSelectedCategory('All'); setSearchQuery(''); setSelectedTag(null)}} className="mt-4 text-sm text-blue-600 font-bold hover:underline">필터 초기화</button>
                   </div>
               ) : (
                   <div className={cn(
                       "grid gap-6",
                       viewMode === 'grid' ? "md:grid-cols-2" : "grid-cols-1"
                   )}>
                       {filteredBlogs.map(blog => (
                           <Link key={blog.id} href={`/blogs/${blog.id}`} className="group block h-full">
                               <div className={cn(
                                   "bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 h-full flex",
                                   viewMode === 'grid' ? "flex-col" : "flex-row items-stretch"
                               )}>
                                   {/* Thumbnail */}
                                   <div className={cn(
                                       "bg-slate-100 overflow-hidden relative shrink-0",
                                       viewMode === 'grid' ? "aspect-[16/9] w-full" : "w-48 md:w-64"
                                   )}>
                                       <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                       <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                           {blog.source}
                                       </div>
                                   </div>

                                   {/* Content */}
                                   <div className="p-5 flex flex-col flex-1">
                                       <div className="flex flex-wrap items-center gap-2 mb-3">
                                           <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{blog.category}</span>
                                           {blog.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">#{tag}</span>
                                           ))}
                                       </div>

                                       <h2 className={cn(
                                           "font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug",
                                           viewMode === 'grid' ? "text-lg" : "text-xl"
                                       )}>
                                           {blog.title}
                                       </h2>

                                       <p className={cn(
                                           "text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2",
                                           viewMode === 'list' && "hidden md:block"
                                       )}>
                                           {blog.excerpt}
                                       </p>

                                       <div className="mt-auto flex items-center justify-between text-xs font-medium text-slate-400 pt-4 border-t border-dashed border-slate-100">
                                           <div className="flex items-center gap-3">
                                                <span className="text-slate-600">{blog.author}</span>
                                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime}</span>
                                           </div>
                                           <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {blog.views.toLocaleString()}</span>
                                       </div>
                                   </div>
                               </div>
                           </Link>
                       ))}
                   </div>
               )}
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8">
              {/* Top 5 Ranking */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-36">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                      <div className="bg-red-50 p-2 rounded-lg text-red-500">
                          <TrendingUp className="h-5 w-5" />
                      </div>
                      <h3 className="font-black text-lg text-slate-900">주간 인기글 TOP 5</h3>
                  </div>

                  <div className="space-y-5">
                      {sortedByViews.map((blog, index) => (
                          <Link key={blog.id} href={`/blogs/${blog.id}`} className="flex gap-4 group items-start">
                              <span className={cn(
                                  "text-2xl font-black italic",
                                  index < 3 ? "text-blue-600" : "text-slate-200"
                              )}>
                                  {index + 1}
                              </span>
                              <div>
                                  <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                      {blog.title}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-slate-400">
                                      <span className="font-semibold">{blog.source}</span>
                                      <span>•</span>
                                      <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {blog.views.toLocaleString()}</span>
                                  </div>
                              </div>
                          </Link>
                      ))}
                  </div>
              </div>


          </aside>
      </div>
    </div>
  );
}
