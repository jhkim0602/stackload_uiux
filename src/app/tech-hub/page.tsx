'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_STACKS, TECH_CATEGORIES } from '@/mocks/stacks';
import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal, BookOpen, Star, TrendingUp, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TechHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStacks = MOCK_STACKS.filter(stack => {
    const matchesCategory = selectedCategory === 'All' || stack.category === selectedCategory;
    const matchesSearch = stack.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredStack = MOCK_STACKS[0]; // Next.js as featured

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-20 pt-16 font-sans text-slate-900">


      <div className="container max-w-7xl mx-auto px-4 py-16">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-8 scrollbar-hide mb-8">
                <button
                    onClick={() => setSelectedCategory('All')}
                    className={cn(
                        "px-5 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all border",
                        selectedCategory === 'All'
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                            : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    )}
                >
                    All Stacks
                </button>
                {TECH_CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                            "px-5 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all border",
                            selectedCategory === category
                                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        {category}
                    </button>
                ))}
           </div>

          {/* Featured Section (Only when All) */}
          {selectedCategory === 'All' && !searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  <Link href={`/tech-hub/${featuredStack.slug}`} className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-auto border border-slate-200 shadow-2xl shadow-slate-200/50">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
                      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-900" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider mb-4 inline-block shadow-lg shadow-blue-600/20">Featured</span>
                          <h2 className="text-4xl font-black text-white mb-2">Next.js 14 Handbook</h2>
                          <p className="text-slate-200 line-clamp-2 mb-6">App Router, Server Actions 등 최신 기능을 마스터하세요.</p>
                          <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                              Start Reading <ArrowRight className="w-4 h-4" />
                          </div>
                      </div>
                  </Link>
                  <div className="space-y-4">
                      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:border-blue-100 transition-colors h-full flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                             <TrendingUp className="w-5 h-5 text-red-500" /> Trending Topics
                          </h3>
                          <ul className="space-y-4">
                              {[
                                  { title: 'React 19 Hooks Guide', views: '2.4k' },
                                  { title: 'Docker Optimization Secrets', views: '1.8k' },
                                  { title: 'Spring Boot 3.2 Migration', views: '1.5k' }
                              ].map((item, i) => (
                                  <li key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
                                      <span className="text-slate-600 group-hover:text-blue-600 transition-colors font-medium">{item.title}</span>
                                      <span className="text-xs font-bold text-slate-400">{item.views} views</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 flex items-center justify-between">
                          <div>
                              <h3 className="text-lg font-bold text-slate-900 mb-1">Join the Wiki Team</h3>
                              <p className="text-sm text-slate-500">Contribute to the knowledge base.</p>
                          </div>
                          <button className="px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors">Apply</button>
                      </div>
                  </div>
              </div>
          )}

          {/* Grid View */}
          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-slate-400" />
              {selectedCategory === 'All' ? 'Browse All Stacks' : `${selectedCategory} Stacks`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStacks.map(stack => (
                  <Link
                      key={stack.id}
                      href={`/tech-hub/${stack.slug}`}
                      className="group bg-white rounded-3xl border border-slate-200 p-1 overflow-hidden hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300"
                  >
                      <div className="bg-slate-50 rounded-[20px] p-6 h-full flex flex-col group-hover:bg-white transition-colors">
                          <div className="flex items-start justify-between mb-6">
                               <div className="h-14 w-14 rounded-2xl bg-white p-2.5 border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                                   <img src={stack.logo} alt={stack.name} className="h-full w-full object-contain" />
                               </div>
                               <button className="text-slate-300 hover:text-yellow-400 transition-colors">
                                   <Star className="w-5 h-5" />
                               </button>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{stack.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed flex-1">{stack.description}</p>

                          <div className="flex items-center gap-2 mt-auto">
                              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                                  {stack.chapters.length} docs
                              </span>
                              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                                  {stack.qna.length} q&a
                              </span>
                          </div>
                      </div>
                  </Link>
              ))}
          </div>
      </div>
    </div>
  );
}
