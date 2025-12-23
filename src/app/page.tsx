'use client';

import Link from 'next/link';
import { MOCK_BLOGS } from '@/mocks/blogs';
import { MOCK_JOBS } from '@/mocks/jobs';
import { ArrowRight, Sparkles, TrendingUp, Zap, Briefcase, ChevronRight, Video, Code2, Users, Rocket } from 'lucide-react';

export default function Home() {
  const topBlogs = MOCK_BLOGS.slice(0, 4); // Display 4 magazines
  const featuredJob = MOCK_JOBS.find(j => j.company === 'Toss') || MOCK_JOBS[0];

  return (
    <div className="bg-[#fcfdfd] min-h-screen pt-16 font-sans">
      {/* Brand Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

          <div className="container max-w-5xl mx-auto px-4 py-24 text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-xl shadow-slate-900/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                  No.1 Developer Career Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                  Code Your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Future Career</span>
              </h1>
              <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  StackLoad는 개발자의 성장을 돕는 올인원 플랫폼입니다.<br/>
                  기술 블로그 큐레이션부터 AI 면접 코칭까지, 당신의 커리어 여정을 함께합니다.
              </p>
          </div>
      </section>

      {/* Service Shortcuts (Cards) */}
      <section className="container max-w-6xl mx-auto px-4 -mt-16 relative z-20">
          <div className="grid md:grid-cols-3 gap-6">
              <Link href="/interview" className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-300 hover:border-blue-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <div className="relative">
                      <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                          <Video className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">AI Interview</h3>
                      <p className="text-slate-500 leading-relaxed mb-6">내 포트폴리오 기반 예상 질문과<br/>실전 같은 화상 모의 면접.</p>
                      <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                          Start Practice <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                  </div>
              </Link>

              <Link href="/tech-hub" className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-300 hover:border-indigo-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <div className="relative">
                      <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/30">
                          <Code2 className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Tech Hub</h3>
                      <p className="text-slate-500 leading-relaxed mb-6">최신 기술 스택 로드맵과<br/>엄선된 학습 자료 아카이브.</p>
                      <div className="flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
                          Explore Stacks <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                  </div>
              </Link>

              <Link href="/community" className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-300 hover:border-violet-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <div className="relative">
                      <div className="w-14 h-14 bg-violet-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-600/30">
                          <Users className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Community</h3>
                      <p className="text-slate-500 leading-relaxed mb-6">현직 개발자들과 나누는<br/>커리어 고민과 기술 토론.</p>
                      <div className="flex items-center text-violet-600 font-bold group-hover:gap-2 transition-all">
                          Join Discussion <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                  </div>
              </Link>
          </div>
      </section>

      {/* Weekly Magazine Section */}
      <section className="py-24 container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
              <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Weekly Best Magazine</h2>
                  <p className="text-slate-500">이번 주 개발자들이 가장 많이 읽은 아티클</p>
              </div>
              <Link href="/blogs" className="text-sm font-bold border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                  View All Articles
              </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Feature */}
              <Link href={`/blogs/${topBlogs[0].id}`} className="group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto">
                  <img src={topBlogs[0].coverImage} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 md:p-12">
                      <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">{topBlogs[0].source}</div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors">{topBlogs[0].title}</h3>
                      <p className="text-slate-300 line-clamp-2 mb-6 hidden md:block">{topBlogs[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                          <span>{topBlogs[0].author}</span>
                          <span>•</span>
                          <span>{topBlogs[0].date}</span>
                      </div>
                  </div>
              </Link>

              {/* Sub Grid */}
              <div className="flex flex-col gap-6">
                  {topBlogs.slice(1).map(blog => (
                      <Link key={blog.id} href={`/blogs/${blog.id}`} className="flex gap-6 group items-center bg-white p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                           <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0">
                               <img src={blog.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           </div>
                           <div className="flex-1">
                               <div className="text-xs font-bold text-blue-600 mb-1">{blog.source}</div>
                               <h4 className="font-bold text-lg text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{blog.title}</h4>
                               <div className="text-xs text-slate-400">{blog.date} • {blog.readTime} read</div>
                           </div>
                      </Link>
                  ))}

                  {/* Job Promo Box */}
                  <div className="mt-auto bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <div className="relative z-10 flex items-center justify-between">
                          <div>
                              <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wide">Featured Opportunity</div>
                              <h3 className="text-xl font-bold mb-1">{featuredJob.title}</h3>
                              <p className="text-slate-400 text-sm mb-4">at {featuredJob.company}</p>
                              <Link href="/jobs" className="text-sm font-bold underline decoration-blue-500 underline-offset-4 hover:text-blue-400">View Position</Link>
                          </div>
                          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                              <Briefcase className="h-6 w-6" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Ready to Level Up?</h2>
              <p className="text-lg text-slate-500 mb-10">지금 StackLoad와 함께 10만 개발자의 커리어 여정에 합류하세요.</p>
              <div className="flex justify-center gap-4">
                  <Link href="/profile" className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                       <Rocket className="h-5 w-5" /> Get Started
                  </Link>
                  <Link href="/tech-hub" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold hover:bg-white hover:shadow-lg transition-all">
                       Browse Stacks
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
}
