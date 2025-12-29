import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Map, Sparkles } from 'lucide-react';
import { MOCK_BLOGS } from '@/mocks/blogs';

// Mini visual components for the hub
function SectionHeader({ title, href, icon: Icon, description }: { title: string, href: string, icon: any, description: string }) {
    return (
        <div className="flex items-end justify-between mb-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <h2 className="text-2xl font-bold text-base-900">{title}</h2>
                </div>
                <p className="text-sm text-base-500">{description}</p>
            </div>
            <Link href={href} className="group flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
                전체보기
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
}

export default function InsightsPage() {
    const latestBlogs = MOCK_BLOGS.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Hero Section */}
            <section className="bg-white border-b border-base-200 py-16">
                <div className="container max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-base-900 mb-4">
                        인싸이트 <span className="text-blue-600">Hub</span>
                    </h1>
                    <p className="text-lg text-base-600 max-w-2xl leading-relaxed">
                        최신 기술 트렌드부터 커리어 로드맵까지.<br/>
                        성장하는 개발자를 위해 엄선된 지식과 정보를 한곳에서 만나보세요.
                    </p>
                </div>
            </section>

            <div className="container max-w-7xl mx-auto px-4 -mt-8">
               {/* Quick Access Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                   <Link href="/blogs" className="group bg-white p-6 rounded-2xl shadow-sm border border-base-200 hover:shadow-md hover:border-blue-200 transition-all">
                       <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                           <BookOpen className="w-6 h-6 text-orange-600" />
                       </div>
                       <h3 className="text-lg font-bold text-base-900 mb-2">기술 블로그</h3>
                       <p className="text-sm text-base-500">네이버, 카카오 등 테크 기업들의 생생한 기술 경험담</p>
                   </Link>
                   <Link href="/tech-hub" className="group bg-white p-6 rounded-2xl shadow-sm border border-base-200 hover:shadow-md hover:border-blue-200 transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Layers className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-base-900 mb-2">테크 허브</h3>
                        <p className="text-sm text-base-500">최신 라이브러리와 프레임워크 정보 DB</p>
                   </Link>
                   <Link href="/roadmap" className="group bg-white p-6 rounded-2xl shadow-sm border border-base-200 hover:shadow-md hover:border-blue-200 transition-all">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Map className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-base-900 mb-2">로드맵</h3>
                        <p className="text-sm text-base-500">직무별 성장을 위한 학습 가이드라인</p>
                   </Link>
               </div>

               {/* Latest Blogs Preview */}
               <section className="mb-16">
                   <SectionHeader
                        title="최신 기술 아티클"
                        icon={Sparkles}
                        href="/blogs"
                        description="엄선된 양질의 기술 블로그 글을 확인해보세요."
                   />
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {latestBlogs.map(blog => (
                           <Link key={blog.id} href={`/blogs/${blog.id}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-base-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                               <div className="h-40 overflow-hidden">
                                   <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                               </div>
                               <div className="p-5 flex-1 flex flex-col">
                                   <div className="flex items-center gap-2 mb-3">
                                       <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">{blog.source}</span>
                                       <span className="text-xs text-gray-400">{blog.date}</span>
                                   </div>
                                   <h3 className="font-bold text-base-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                       {blog.title}
                                   </h3>
                                   <p className="text-sm text-base-500 line-clamp-2 mb-4 flex-1">
                                       {blog.excerpt}
                                   </p>
                                   <div className="flex items-center text-xs text-base-400 font-medium pt-4 border-t border-gray-100">
                                       by {blog.author}
                                   </div>
                               </div>
                           </Link>
                       ))}
                   </div>
               </section>

               {/* Tech & Roadmap Teaser */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">어떤 기술을<br/>배워야 할지 고민인가요?</h3>
                            <p className="text-gray-300 mb-8 max-w-xs leading-relaxed">
                                프론트엔드부터 AI까지, 각 직무별 필수 기술 스택과 학습 순서를 로드맵으로 정리했습니다.
                            </p>
                            <Link href="/roadmap" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                                로드맵 확인하기
                            </Link>
                        </div>
                        {/* Deco */}
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                             <Map className="w-64 h-64" />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-base-200 relative overflow-hidden group hover:border-blue-200 transition-colors">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-base-900 mb-4">기술 스택 탐색</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {['React', 'Next.js', 'TypeScript', 'Python', 'Docker', 'AWS'].map(tech => (
                                    <span key={tech} className="px-3 py-1.5 bg-base-50 text-base-600 rounded-lg text-sm font-medium border border-base-100">
                                        {tech}
                                    </span>
                                ))}
                                <span className="px-3 py-1.5 text-base-400 text-sm">+More</span>
                            </div>
                            <Link href="/tech-hub" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                                데이터베이스 전체보기 <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
