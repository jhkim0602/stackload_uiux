'use client';

import { MOCK_POSTS } from '@/mocks/community';
import { MOCK_BLOGS } from '@/mocks/blogs';
import Link from 'next/link';
import { MessageSquare, Heart, Eye, Search, PenSquare, Share2, Star, Coffee, FileText, MessageCircle, ChevronRight, Hash, ImageIcon, Zap, Filter, Users, Laptop, Briefcase, GraduationCap } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/mocks/user';

interface CommunityTemplateProps {
    category?: 'all' | 'qna' | 'tips' | 'career' | 'free' | 'connect';
}

const CATEGORY_MAP = {
    'all': { label: '전체 글', icon: Hash, desc: '모든 커뮤니티 글을 모아봅니다' },
    'qna': { label: '기술 Q&A', icon: MessageSquare, desc: '에러 해결과 기술 질문' },
    'tips': { label: '정보 & 팁', icon: Share2, desc: '개발 꿀팁과 아티클 공유' },
    'career': { label: '커리어 & 이직', icon: Briefcase, desc: '이직, 연봉, 회사 생활' },
    'free': { label: '사는 얘기', icon: Coffee, desc: '개발자들의 소소한 잡담' },
    'connect': { label: '모임 & 스터디', icon: Users, desc: '사이드 프로젝트와 스터디' },
};

export default function CommunityTemplate({ category = 'all' }: CommunityTemplateProps) {
  /* const [activeTab, setActiveTab] = useState<'All' | 'QnA' | 'Feed'>('All'); */ // Removed as per request

  const currentCategoryInfo = CATEGORY_MAP[category];

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
        if (category === 'all') return true;
        return post.category === category;
    });
  }, [category]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-20 pb-20 font-sans">
      <div className="container max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar: Navigation & Personal */}
              <div className="hidden lg:block col-span-3 space-y-4">
                  {/* User Mini Profile */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 text-center">
                      <div className="w-16 h-16 mx-auto rounded-full p-1 border border-dashed border-gray-300 mb-3">
                          <img src={MOCK_USER.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{MOCK_USER.name}</h3>
                      <p className="text-gray-500 text-xs mb-4">Lv.{MOCK_USER.stats.level} Developer</p>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 rounded-md p-2 mb-4 border border-gray-100">
                          <div className="text-center">
                              <span className="block font-bold text-gray-900">12</span>
                              <span className="text-[10px] text-gray-500">Posts</span>
                          </div>
                          <div className="text-center border-l border-gray-200">
                              <span className="block font-bold text-gray-900">850</span>
                              <span className="text-[10px] text-gray-500">Activity</span>
                          </div>
                      </div>

                      {/* Level Progress */}
                      <div className="text-left mb-4">
                          <div className="flex justify-between text-[10px] font-bold mb-1">
                              <span className="text-gray-500">Exp</span>
                              <span className="text-blue-600">850/1000</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                      </div>

                      <Link href="/community/write" className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md transition-all shadow-sm text-sm">
                          <PenSquare className="w-3.5 h-3.5" /> 글쓰기
                      </Link>
                  </div>

                  {/* Menu */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <nav className="space-y-0.5">
                          {Object.entries(CATEGORY_MAP).map(([key, info]) => (
                              <Link
                                key={key}
                                href={key === 'all' ? '/community' : `/community/${key}`}
                                className={cn(
                                    "flex items-center gap-3 w-full p-2.5 rounded-md text-sm font-medium transition-colors text-left",
                                    category === key ? "bg-gray-100 text-gray-900 font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                              >
                                  <info.icon className={cn("w-4 h-4", category === key ? "text-gray-900" : "text-gray-400")} /> {info.label}
                              </Link>
                          ))}
                      </nav>
                  </div>

                   {/* Tags */}
                   <div className="bg-white rounded-lg p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wide">Trending Tags</h4>
                        <div className="flex flex-wrap gap-1.5">
                             {['#React', '#이직', '#연봉', '#회고', '#부트캠프', '#사이드프로젝트'].map(tag => (
                                 <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-100 hover:border-gray-300 cursor-pointer transition-colors">{tag}</span>
                             ))}
                        </div>
                   </div>
              </div>

              {/* Center: Main Feed */}
              <div className="col-span-12 lg:col-span-6 space-y-6">

                  {/* Category Header */}
                  <div className="mb-2 px-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-0.5">{currentCategoryInfo.label}</h2>
                      <p className="text-xs text-gray-500">{currentCategoryInfo.desc}</p>
                  </div>


                  {/* Posts List Header */}
                   <div className="flex items-center justify-between pb-2 border-b border-gray-200 mb-4 px-1">
                       <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                           Feed
                           <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium">{filteredPosts.length}</span>
                       </h3>
                       <Link href="/community/write" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors">
                           <PenSquare className="w-3.5 h-3.5" />
                           글쓰기
                       </Link>
                   </div>

                  {/* Dynamic Layout Renderer */}
                  <div className={cn(
                      "space-y-3",
                      (category === 'tips' || category === 'connect') ? "grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0" : ""
                  )}>
                      {filteredPosts.length > 0 ? (
                        <>
                        {filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((post, idx) => {
                          // --- Layout: TIPS (Card Grid) ---
                          if (category === 'tips') {
                              return (
                                  <Link key={post.id} href={`/community/post/${post.id}`} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-200 flex flex-col h-full">
                                      <div className="h-36 bg-gray-100 relative overflow-hidden border-b border-gray-100">
                                          {post.thumbnail ? (
                                              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                          ) : (
                                              <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                                  <Share2 className="w-6 h-6 text-gray-300" />
                                              </div>
                                          )}
                                      </div>
                                      <div className="p-4 flex-1 flex flex-col">
                                          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                          <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{post.content}</p>
                                          <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-[10px] text-gray-400 font-medium">
                                              <span className="flex items-center gap-1 hover:text-red-500"><Heart className="w-3 h-3" /> {post.likes}</span>
                                              <span>{post.date}</span>
                                          </div>
                                      </div>
                                  </Link>
                              );
                          }

                          // --- Layout: CONNECT (Recruit Card) ---
                          if (category === 'connect') {
                              return (
                                  <Link key={post.id} href={`/community/post/${post.id}`} className="group bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-all duration-200 flex flex-col h-full relative overflow-hidden">
                                      <div className="flex justify-between items-start mb-3">
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border border-gray-200 px-1.5 py-0.5 rounded">{post.projectType || 'Project'}</span>
                                          {post.recruitStatus === 'open' ? (
                                              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                  Recruiting
                                              </span>
                                          ) : (
                                              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                  Closed
                                              </span>
                                          )}
                                      </div>

                                      <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{post.title}</h3>

                                      <div className="flex-1">
                                           <div className="flex flex-wrap gap-1 mb-3">
                                              {post.tags.slice(0, 3).map(tag => (
                                                  <span key={tag} className="px-1.5 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-100">#{tag}</span>
                                              ))}
                                           </div>
                                      </div>

                                      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-50">
                                          <img src={post.avatar} alt={post.author} className="w-5 h-5 rounded-full border border-gray-100" />
                                          <span className="text-xs text-gray-600">{post.author}</span>
                                      </div>
                                  </Link>
                              );
                          }

                          // --- Layout: QnA (StackOverflow Style - Refined) ---
                          if (category === 'qna') {
                              return (
                                  <Link key={post.id} href={`/community/post/${post.id}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-400 transition-all group flex gap-4">
                                      <div className="flex flex-col items-end gap-1 min-w-[60px] text-xs text-gray-500 pt-0.5">
                                          <div className="group-hover:text-black font-medium">{post.likes} votes</div>
                                          <div className={cn(
                                              "px-2 py-0.5 rounded border text-[10px] font-bold",
                                              post.isSolved ? "bg-green-600 text-white border-green-600" : "bg-white border-green-600 text-green-600"
                                          )}>
                                              {post.isSolved ? "Solved" : "Answers"}
                                          </div>
                                      </div>

                                      <div className="flex-1 min-w-0">
                                          <h3 className="text-base font-bold text-blue-600 mb-1 truncate hover:underline decoration-2 underline-offset-2">{post.title}</h3>
                                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">{post.content}</p>

                                          <div className="flex items-center gap-2 text-[10px]">
                                              {post.tags.map(tag => (
                                                  <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">#{tag}</span>
                                              ))}
                                              <div className="flex-1" />
                                              <span className="text-gray-400">{post.author}</span>
                                              <span className="text-gray-300">|</span>
                                              <span className="text-gray-400">{post.date}</span>
                                          </div>
                                      </div>
                                  </Link>
                              );
                          }

                          // --- Layout: Default / Feed / Career (Compact List - Refined) ---
                          return (
                              <Link key={post.id} href={`/community/post/${post.id}`} className="block bg-white p-4 rounded-lg border border-gray-200 transition-all hover:bg-gray-50/50 hover:border-gray-300 flex gap-4 group">
                                  <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                          <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                          {post.type === 'QnA' && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded font-medium">Q</span>}
                                      </div>
                                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">{post.content}</p>

                                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                                          <span className="text-gray-500">{post.author}</span>
                                          <span className="w-px h-2 bg-gray-200"></span>
                                          <span className="flex items-center gap-1 group-hover:text-gray-600"><Heart className="w-3 h-3" /> {post.likes}</span>
                                          <span className="flex items-center gap-1 group-hover:text-gray-600"><MessageSquare className="w-3 h-3" /> {post.comments.length}</span>
                                          <span className="w-px h-2 bg-gray-200"></span>
                                          <span>{post.date}</span>
                                      </div>
                                  </div>
                                  {post.images && post.images.length > 0 && (
                                       <div className="w-16 h-16 rounded border border-gray-200 overflow-hidden shrink-0">
                                           <img src={post.images[0]} alt="Thumbnail" className="w-full h-full object-cover" />
                                       </div>
                                   )}
                              </Link>
                          );
                      })}

                      {/* Load More Button */}
                      {/* Numbered Pagination */}
                      {totalPages > 1 && (
                          <div className={cn(
                              "flex justify-center items-center gap-2 pt-6 pb-2",
                              (category === 'tips' || category === 'connect') ? "col-span-1 md:col-span-2" : ""
                          )}>
                              <button
                                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                  disabled={currentPage === 1}
                                  className="p-2 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                  <ChevronRight className="w-5 h-5 rotate-180" />
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                  <button
                                      key={page}
                                      onClick={() => setCurrentPage(page)}
                                      className={cn(
                                          "w-9 h-9 rounded-lg text-sm font-bold transition-all flex items-center justify-center",
                                          currentPage === page
                                              ? "bg-gray-900 text-white shadow-sm"
                                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                      )}
                                  >
                                      {page}
                                  </button>
                              ))}

                              <button
                                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                  disabled={currentPage === totalPages}
                                  className="p-2 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                  <ChevronRight className="w-5 h-5" />
                              </button>
                          </div>
                      )}
                      </>
                      ) : (
                          <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                              <p className="font-medium text-sm">아직 작성된 글이 없습니다.</p>
                          </div>
                      )}
                  </div>
              </div>

              {/* Right Sidebar: Real-time & Hot */}
              <div className="hidden lg:block col-span-3 space-y-4">
                   {/* Search */}
                  <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                       <input
                          type="text"
                          placeholder="Search community..."
                          className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-gray-400 outline-none text-xs transition-all placeholder-gray-400"
                       />
                  </div>

                   {/* Tech Knowledge (Relocated) */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
                          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">Tech Knowledge</h3>
                      </div>
                      <div className="space-y-3">
                          {MOCK_BLOGS.slice(0, 3).map(blog => (
                              <Link href={`/blogs/${blog.id}`} key={blog.id} className="flex gap-3 group">
                                   <div className="w-16 h-16 rounded-md border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                                       <img src={blog.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                   </div>
                                   <div className="flex-1 min-w-0 flex flex-col justify-center">
                                       <span className="text-[10px] text-blue-600 font-bold mb-0.5">{blog.category}</span>
                                       <h4 className="font-bold text-gray-900 text-xs leading-snug mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{blog.title}</h4>
                                       <span className="text-[10px] text-gray-400">{blog.date}</span>
                                   </div>
                              </Link>
                          ))}
                      </div>
                  </div>

                  {/* Real-time Popular */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Real-time Top</h4>
                          <span className="text-[10px] text-gray-400">Update 13:00</span>
                      </div>
                      <div className="space-y-2.5">
                          {[
                              { title: '오늘자 판교 점심 메뉴 추천', board: '자유', votes: 42 },
                              { title: '넥스트js 14버전 질문있습니다.', board: 'Q&A', votes: 12 },
                              { title: '연봉 협상 팁 공유합니다', board: '커리어', votes: 156 },
                          ].map((item, i) => (
                              <Link href="#" key={i} className="block group">
                                  <p className="text-xs font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors mb-0.5">{item.title}</p>
                                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                                      <span>{item.board}</span>
                                      <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5" /> {item.votes}</span>
                                  </div>
                              </Link>
                          ))}
                      </div>
                  </div>

                  {/* Hot Keywords */}
                   <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide mb-3">Hot Keywords</h4>
                      <div className="flex flex-wrap gap-1">
                          {['#취업', '#이직', '#React', '#연봉', '#네카라쿠배', '#부트캠프'].map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-100 hover:border-gray-300 cursor-pointer transition-colors">
                                  {tag}
                              </span>
                          ))}
                      </div>
                   </div>

                   {/* Footer Links */}
                   <div className="flex gap-2 text-[10px] text-gray-400 px-1">
                       <span className="cursor-pointer hover:text-gray-600">Terms</span>
                       <span>•</span>
                       <span className="cursor-pointer hover:text-gray-600">Privacy</span>
                       <span>•</span>
                       <span className="cursor-pointer hover:text-gray-600">Contact</span>
                   </div>
              </div>
          </div>

      </div>
    </div>
  );
}
