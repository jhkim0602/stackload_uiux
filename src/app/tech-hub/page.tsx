'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_STACKS, TECH_CATEGORIES } from '@/mocks/stacks';
import { cn } from '@/lib/utils';
import { BookOpen, Star, TrendingUp, ArrowRight } from 'lucide-react';

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
    <div className="bg-white min-h-screen pb-20 pt-16 font-sans text-base-900">
      <div className="container max-w-7xl mx-auto px-4 py-16">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-8 scrollbar-hide mb-8">
                <button
                    onClick={() => setSelectedCategory('All')}
                    className={cn(
                        "px-5 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-all border",
                        selectedCategory === 'All'
                            ? "bg-base-900 text-white border-base-900 shadow-none"
                            : "bg-white text-base-500 border-base-200 hover:bg-base-50 hover:text-base-900"
                    )}
                >
                    All Stacks
                </button>
                {TECH_CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                            "px-5 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-all border",
                            selectedCategory === category
                                ? "bg-base-900 text-white border-base-900 shadow-none"
                                : "bg-white text-base-500 border-base-200 hover:bg-base-50 hover:text-base-900"
                        )}
                    >
                        {category}
                    </button>
                ))}
           </div>

          {/* Featured Section (Only when All) */}
          {selectedCategory === 'All' && !searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  <Link href={`/tech-hub/${featuredStack.slug}`} className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-auto ring-4 ring-base-50 border border-base-200">
                      <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/20 to-transparent z-10" />
                      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-base-900" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                          <span className="px-3 py-1 bg-accent-600 text-white rounded-md text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">Featured</span>
                          <h2 className="text-4xl font-black text-white mb-2">Next.js 14 Handbook</h2>
                          <p className="text-base-200 line-clamp-2 mb-6 font-medium">App Router, Server Actions 등 최신 기능을 마스터하세요.</p>
                          <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                              Start Reading <ArrowRight className="w-4 h-4" />
                          </div>
                      </div>
                  </Link>
                  <div className="space-y-4">
                      <div className="p-6 rounded-3xl bg-white ring-4 ring-base-50 border border-base-200 h-full flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-base-900 mb-4 flex items-center gap-2">
                             <TrendingUp className="w-5 h-5 text-red-500" /> Trending Topics
                          </h3>
                          <ul className="space-y-4">
                              {[
                                  { title: 'React 19 Hooks Guide', views: '2.4k' },
                                  { title: 'Docker Optimization Secrets', views: '1.8k' },
                                  { title: 'Spring Boot 3.2 Migration', views: '1.5k' }
                              ].map((item, i) => (
                                  <li key={i} className="flex items-center justify-between group cursor-pointer hover:bg-base-50 p-2 rounded-lg -mx-2 transition-colors">
                                      <span className="text-base-600 group-hover:text-accent-600 transition-colors font-medium">{item.title}</span>
                                      <span className="text-xs font-bold text-base-400">{item.views} views</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="p-6 rounded-3xl bg-gradient-to-r from-accent-50 to-purple-50 border border-accent-100 flex items-center justify-between ring-4 ring-white">
                          <div>
                              <h3 className="text-lg font-bold text-base-900 mb-1">Join the Wiki Team</h3>
                              <p className="text-sm text-base-500 font-medium">Contribute to the knowledge base.</p>
                          </div>
                          <button className="px-4 py-2 bg-white text-base-900 border border-base-200 rounded-md font-bold text-sm hover:bg-accent-50 hover:text-accent-600 transition-colors h-9">Apply</button>
                      </div>
                  </div>
              </div>
          )}

          {/* Grid View */}
          <h2 className="text-2xl font-black text-base-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-base-400" />
              {selectedCategory === 'All' ? 'Browse All Stacks' : `${selectedCategory} Stacks`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStacks.map(stack => (
                  <Link
                      key={stack.id}
                      href={`/tech-hub/${stack.slug}`}
                      className="group bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-1 overflow-hidden hover:ring-accent-100 hover:border-accent-200 transition-all duration-300"
                  >
                      <div className="bg-base-50 rounded-[20px] p-6 h-full flex flex-col group-hover:bg-white transition-colors">
                          <div className="flex items-start justify-between mb-6">
                               <div className="h-14 w-14 rounded-xl bg-white p-2.5 ring-1 ring-base-200 group-hover:scale-110 transition-transform">
                                   <img src={stack.logo} alt={stack.name} className="h-full w-full object-contain" />
                               </div>
                               <button className="text-base-300 hover:text-yellow-400 transition-colors">
                                   <Star className="w-5 h-5" />
                               </button>
                          </div>

                          <h3 className="text-xl font-bold text-base-900 mb-2 group-hover:text-accent-600 transition-colors">{stack.name}</h3>
                          <p className="text-sm text-base-500 line-clamp-2 mb-6 leading-relaxed flex-1 font-medium">{stack.description}</p>

                          <div className="flex items-center gap-2 mt-auto">
                              <span className="px-2.5 py-1 rounded-md bg-white border border-base-200 text-[10px] font-bold text-base-500 uppercase">
                                  {stack.chapters.length} docs
                              </span>
                              <span className="px-2.5 py-1 rounded-md bg-white border border-base-200 text-[10px] font-bold text-base-500 uppercase">
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
