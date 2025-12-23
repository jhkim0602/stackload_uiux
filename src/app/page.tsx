'use client';

import Link from 'next/link';
import { MOCK_BLOGS } from '@/mocks/blogs';
import { MOCK_JOBS } from '@/mocks/jobs';
import { ArrowRight, Sparkles, Video, Code2, Users, Rocket, Briefcase } from 'lucide-react';

export default function Home() {
  const topBlogs = MOCK_BLOGS.slice(0, 4); // Display 4 magazines
  const featuredJob = MOCK_JOBS.find(j => j.company === 'Toss') || MOCK_JOBS[0];

  return (
    <div className="bg-white min-h-screen pt-16 font-sans">
      {/* Brand Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-base-200">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

          <div className="container max-w-5xl mx-auto px-4 py-24 text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-base-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Sparkles className="h-3 w-3 text-accent-300" />
                  No.1 Developer Career Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-base-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                  StackLoad <br/>
                  <span className="text-accent-600">UIUX 구현 페이지 입니다.</span>
              </h1>
              <p className="text-xl text-base-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 font-medium">
                  모든 데이터는 mock데이터 기반으로 임시로 해당 기능은 이런식으로 배치 해야겠다.<br/> 레이아웃을 이런식으로,디자인은 이런식으로 해야겠다를 구현해놓은 예시 임

              </p>
          </div>
      </section>

      {/* Service Shortcuts (Cards) - Depth Strategy Applied */}
      <section className="container max-w-6xl mx-auto px-4 -mt-16 relative z-20">
          <div className="grid md:grid-cols-3 gap-6">
              <Link href="/interview" className="group bg-base-50 p-8 rounded-3xl ring-4 ring-base-50 border border-base-200 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 opacity-50"></div>
                  <div className="relative">
                      <div className="w-14 h-14 bg-accent-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-none">
                          <Video className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black text-base-900 mb-2">AI Interview</h3>
                      <p className="text-base-500 leading-relaxed mb-6 font-medium">내 포트폴리오 기반 예상 질문과<br/>실전 같은 화상 모의 면접.</p>
                      <div className="flex items-center text-accent-600 font-bold group-hover:gap-2 transition-all">
                          Start Practice <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                  </div>
              </Link>

              <Link href="/tech-hub" className="group bg-base-50 p-8 rounded-3xl ring-4 ring-base-50 border border-base-200 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 opacity-50"></div>
                  <div className="relative">
                      <div className="w-14 h-14 bg-accent-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-none">
                          <Code2 className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black text-base-900 mb-2">Tech Hub</h3>
                      <p className="text-base-500 leading-relaxed mb-6 font-medium">최신 기술 스택 로드맵과<br/>엄선된 학습 자료 아카이브.</p>
                      <div className="flex items-center text-accent-600 font-bold group-hover:gap-2 transition-all">
                          Explore Stacks <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                  </div>
              </Link>

              <Link href="/community" className="group bg-base-50 p-8 rounded-3xl ring-4 ring-base-50 border border-base-200 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 opacity-50"></div>
                  <div className="relative">
                      <div className="w-14 h-14 bg-accent-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-none">
                          <Users className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black text-base-900 mb-2">Community</h3>
                      <p className="text-base-500 leading-relaxed mb-6 font-medium">현직 개발자들과 나누는<br/>커리어 고민과 기술 토론.</p>
                      <div className="flex items-center text-accent-600 font-bold group-hover:gap-2 transition-all">
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
                  <h2 className="text-3xl font-black text-base-900 mb-2">Weekly Best Magazine</h2>
                  <p className="text-base-500 font-medium">이번 주 개발자들이 가장 많이 읽은 아티클</p>
              </div>
              <Link href="/blogs" className="text-sm font-bold border-b-2 border-base-900 pb-1 hover:text-accent-600 hover:border-accent-600 transition-colors">
                  View All Articles
              </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Feature */}
              <Link href={`/blogs/${topBlogs[0].id}`} className="group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto ring-4 ring-base-50 border border-base-200">
                  <img src={topBlogs[0].coverImage} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 md:p-12">
                      <div className="bg-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">{topBlogs[0].source}</div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-accent-200 transition-colors">{topBlogs[0].title}</h3>
                      <p className="text-base-300 line-clamp-2 mb-6 hidden md:block font-medium">{topBlogs[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-base-400 font-medium">
                          <span>{topBlogs[0].author}</span>
                          <span>•</span>
                          <span>{topBlogs[0].date}</span>
                      </div>
                  </div>
              </Link>

              {/* Sub Grid */}
              <div className="flex flex-col gap-6">
                  {topBlogs.slice(1).map(blog => (
                      <Link key={blog.id} href={`/blogs/${blog.id}`} className="flex gap-6 group items-center bg-white p-4 rounded-2xl hover:bg-base-50 transition-colors ring-1 ring-base-200 hover:ring-base-300">
                           <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 ring-1 ring-base-200">
                               <img src={blog.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           </div>
                           <div className="flex-1">
                               <div className="text-xs font-bold text-accent-600 mb-1">{blog.source}</div>
                               <h4 className="font-bold text-lg text-base-900 leading-snug mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{blog.title}</h4>
                               <div className="text-xs text-base-400 font-medium">{blog.date} • {blog.readTime} read</div>
                           </div>
                      </Link>
                  ))}

                  {/* Job Promo Box - Customized for Syntro */}
                  <div className="mt-auto bg-base-900 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer ring-4 ring-base-50">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-accent-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <div className="relative z-10 flex items-center justify-between">
                          <div>
                              <div className="text-xs font-bold text-accent-400 mb-2 uppercase tracking-wide">Featured Opportunity</div>
                              <h3 className="text-xl font-bold mb-1">{featuredJob.title}</h3>
                              <p className="text-base-400 text-sm mb-4 font-medium">at {featuredJob.company}</p>
                              <Link href="/jobs" className="text-sm font-bold underline decoration-accent-500 underline-offset-4 hover:text-accent-400">View Position</Link>
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
      <section className="py-24 bg-base-50 border-t border-base-200">
          <div className="container max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-base-900 mb-6">UIUX 구현 페이지 입니다.</h2>
              <p className="text-lg text-base-500 mb-10 font-medium">어디를 어떤 기술로 구현해야할지 고민, 추가할건 뭐가잇을까 고민.</p>
              <div className="flex justify-center gap-4">
                  <Link href="/profile" className="h-9 px-4 flex items-center justify-center bg-accent-600 text-white rounded-md font-medium hover:bg-accent-700 transition-all gap-2 text-sm shadow-none focus:ring-2 focus:ring-accent-700/50 focus:outline-none">
                       <Rocket className="h-4 w-4" /> Get Started
                  </Link>
                  <Link href="/tech-hub" className="h-9 px-4 flex items-center justify-center bg-white text-base-500 ring-1 ring-base-200 rounded-md font-medium hover:text-accent-500 focus:ring-accent-500 transition-all text-sm focus:outline-none">
                       Browse Stacks
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
}
