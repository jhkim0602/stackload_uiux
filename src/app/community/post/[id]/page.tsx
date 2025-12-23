import { MOCK_POSTS, Post } from '@/mocks/community';
import { notFound } from 'next/navigation';
import { MessageSquare, Heart, Eye, ArrowLeft, MoreHorizontal, CheckCircle2, Trophy, Clock, Share2, Calendar, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({
    id: post.id,
  }));
}

// --- Specialized Components ---

function QnADetail({ post }: { post: Post }) {
    return (
        <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 overflow-hidden mb-6">
            <div className="p-8 border-b border-base-100">
                {/* Header Info */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full ring-2 ring-base-100 overflow-hidden">
                           <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-base-900 text-lg">{post.author}</p>
                                <span className="text-xs font-extrabold bg-base-100 text-base-500 px-2 py-0.5 rounded-md">Lv.{post.authorLevel}</span>
                            </div>
                            <p className="text-sm text-base-400 font-medium">{post.date}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-accent-50 text-accent-600 rounded-md text-xs font-black uppercase tracking-wide">Q&A</span>
                     <div className="flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-base-50 text-base-600 border border-base-100 rounded-md text-xs font-bold">#{tag}</span>
                        ))}
                     </div>
                </div>

                <h1 className="text-3xl md:text-3xl font-black text-base-900 leading-tight mb-6">
                    <span className="text-accent-600 mr-2">Q.</span>{post.title}
                </h1>

                <div className="flex items-center gap-3 mb-8">
                    {post.isSolved ? (
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-md text-sm font-bold border border-green-100">
                            <CheckCircle2 className="w-5 h-5" /> 해결됨
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-base-100 text-base-500 rounded-md text-sm font-bold">
                            <div className="w-2.5 h-2.5 rounded-full bg-base-400" /> 답변 대기중
                        </div>
                    )}
                </div>

                <div className="prose prose-lg prose-base max-w-none text-base-600 leading-relaxed bg-base-50 p-6 rounded-2xl border border-base-100">
                    <p>{post.content}</p>
                </div>
            </div>
             {/* Action Bar */}
            <div className="bg-base-50/50 px-8 py-4 flex items-center justify-between">
                 <div className="flex gap-6">
                     <button className="flex items-center gap-2 text-base-500 hover:text-pink-500 transition-colors font-bold group">
                         <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                             <Heart className="h-5 w-5" />
                         </div>
                         <span>{post.likes} 도움이 돼요</span>
                     </button>
                     <button className="flex items-center gap-2 text-base-500 hover:text-accent-500 transition-colors font-bold group">
                         <div className="p-2 rounded-full group-hover:bg-accent-50 transition-colors">
                             <MessageSquare className="h-5 w-5" />
                         </div>
                         <span>{post.comments.length} 댓글</span>
                     </button>
                 </div>
                 <div className="flex items-center gap-2 text-base-400 text-sm font-medium">
                     <Eye className="h-5 w-5" />
                     <span>{post.views} 조회</span>
                 </div>
            </div>
        </div>
    );
}

function ArticleDetail({ post }: { post: Post }) {
    return (
        <article className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 overflow-hidden mb-6">
            {post.thumbnail && (
                <div className="h-[400px] w-full relative overflow-hidden">
                     <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-base-900/60 to-transparent" />
                     <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                         <div className="flex items-center gap-2 mb-4">
                             <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-bold uppercase tracking-wide border border-white/10">
                                 {post.category}
                             </span>
                             <span className="flex items-center gap-1.5 text-xs font-medium text-base-200">
                                 <Clock className="w-3.5 h-3.5" /> 5 min read
                             </span>
                         </div>
                         <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{post.title}</h1>
                         <div className="flex items-center gap-4">
                             <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-white/30" />
                             <div>
                                 <p className="font-bold text-sm">{post.author}</p>
                                 <p className="text-xs text-base-300">{post.date}</p>
                             </div>
                         </div>
                     </div>
                </div>
            )}

            <div className="p-8 md:p-12 md:max-w-4xl md:mx-auto">
                {!post.thumbnail && (
                    <div className="mb-12 text-center border-b border-base-100 pb-12">
                        <span className="text-accent-600 font-bold tracking-widest uppercase text-xs mb-3 block">{post.category}</span>
                        <h1 className="text-4xl font-black text-base-900 leading-tight mb-6">{post.title}</h1>
                        <div className="flex items-center justify-center gap-4 text-base-500 text-sm">
                            <span className="font-bold text-base-900">{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                        </div>
                    </div>
                )}

                <div className="prose prose-lg prose-base max-w-none text-base-800 leading-relaxed">
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-base-900">
                        {post.content}
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h3>소제목 예시입니다</h3>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-base-100 flex items-center justify-between">
                     <div className="flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-base-100 text-base-600 rounded-full text-xs font-bold hover:bg-base-200 transition-colors cursor-pointer">#{tag}</span>
                        ))}
                     </div>
                     <div className="flex gap-2">
                         <button className="p-2 text-base-400 hover:text-accent-600 transition-colors border border-base-200 rounded-full hover:bg-accent-50">
                             <Share2 className="w-5 h-5" />
                         </button>
                         <button className="p-2 text-pink-500 bg-pink-50 border border-pink-100 rounded-full hover:bg-pink-100 transition-colors">
                             <Heart className="w-5 h-5 fill-pink-500" />
                         </button>
                     </div>
                </div>
            </div>
        </article>
    );
}

function ConnectDetail({ post }: { post: Post }) {
    return (
        <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-accent-500 to-indigo-600 p-8 text-white">
                 <div className="flex items-center justify-between mb-6">
                     <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-bold uppercase tracking-wide border border-white/10">
                         {post.projectType}
                     </span>
                     <span className={cn(
                         "px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-white text-accent-600 shadow-lg",
                         post.recruitStatus === 'closed' && "bg-base-800 text-base-300"
                     )}>
                         {post.recruitStatus === 'open' ? '모집중' : '마감됨'}
                     </span>
                 </div>
                 <h1 className="text-3xl font-black mb-4 leading-tight">{post.title}</h1>
                 <div className="flex flex-wrap gap-6 text-indigo-100 text-sm font-medium">
                     <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 4/6명 참여중</span>
                     <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 2개월 예상</span>
                     <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {post.author} 리딩</span>
                 </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h3 className="font-bold text-base-900 mb-3 text-lg">프로젝트 소개</h3>
                        <p className="text-base-600 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-base-900 mb-3 text-lg">모집 분야</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl border border-base-200 bg-base-50 flex justify-between items-center">
                                <span className="font-bold text-base-700">Frontend (React)</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">1명 남음</span>
                            </div>
                            <div className="p-4 rounded-xl border border-base-200 bg-base-50 flex justify-between items-center opacity-60">
                                <span className="font-bold text-base-700">Backend (Spring)</span>
                                <span className="text-xs font-bold text-base-500 bg-base-100 px-2 py-1 rounded">마감</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-4">
                    <div className="bg-base-50 p-6 rounded-2xl border border-base-100">
                        <h3 className="font-bold text-base-900 mb-4 text-sm uppercase tracking-wide">리더 프로필</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <img src={post.avatar} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold text-base-900">{post.author}</p>
                                <p className="text-xs text-base-500">Lv.{post.authorLevel} • Full Stack</p>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-white border border-base-200 rounded-md text-sm font-bold text-base-700 hover:bg-base-50 transition-colors">
                            프로필 보기
                        </button>
                    </div>

                    <button className="w-full py-4 bg-accent-600 text-white rounded-md font-bold shadow-sm hover:bg-accent-700 transition-colors active:scale-[0.98]">
                        프로젝트 지원하기
                    </button>
                    <button className="w-full py-3 bg-white border border-base-200 text-base-700 rounded-md font-bold hover:bg-base-50 transition-colors">
                        1:1 문의하기
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Main Page Component ---

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-24 font-sans text-base-900">
      <div className="container max-w-4xl mx-auto px-4">
        <Link href="/community" className="inline-flex items-center gap-2 text-sm font-bold text-base-500 hover:text-base-900 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Community
        </Link>

        {/* Conditional Rendering based on Post Type/Category */}
        {post.category === 'qna' ? (
            <QnADetail post={post} />
        ) : post.category === 'tips' || post.category === 'career' ? (
            <ArticleDetail post={post} />
        ) : post.category === 'connect' ? (
            <ConnectDetail post={post} />
        ) : (
            /* Fallback to Default (QnA Style for now or generic) */
             <QnADetail post={post} />
        )}

        {/* Comments Section (Common) */}
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-base-900 flex items-center gap-2">
                    답변 <span className="text-accent-600 text-lg">{post.comments.length}</span>
                </h3>
                <div className="flex gap-2">
                     <button className="text-xs font-bold text-base-500 hover:text-base-900">최신순</button>
                     <span className="text-base-300">|</span>
                     <button className="text-xs font-bold text-base-500 hover:text-base-900">좋아요순</button>
                </div>
            </div>

            {/* Editor placeholder */}
            <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-6 flex gap-4 focus-within:ring-4 focus-within:ring-accent-100 transition-all shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-base-100 shrink-0 overflow-hidden">
                     {/* Current User Avatar Placeholder */}
                     <div className="w-full h-full bg-base-200 animate-pulse" />
                 </div>
                 <div className="flex-1">
                     <textarea
                        placeholder="지식을 나눠주세요..."
                        className="w-full bg-transparent outline-none text-base-700 min-h-[80px] text-base resize-none placeholder:text-base-400 font-medium"
                     ></textarea>
                     <div className="flex justify-between items-center mt-2 pt-2 border-t border-base-100">
                         <button className="text-base-400 hover:text-base-600 p-2 rounded-lg hover:bg-base-50">
                             <MoreHorizontal className="w-5 h-5"/>
                         </button>
                         <button className="bg-base-900 text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-black transition-colors">
                             답변 등록
                         </button>
                     </div>
                 </div>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
                {post.comments.length > 0 ? post.comments.map(comment => (
                    <div key={comment.id} className={cn(
                        "bg-white rounded-3xl p-6 border transition-all",
                        comment.isAccepted ? "border-green-500 shadow-none ring-4 ring-green-500/5 relative overflow-hidden" : "ring-4 ring-base-50 border-base-200"
                    )}>
                        {comment.isAccepted && (
                           <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl flex items-center gap-1">
                               <CheckCircle2 className="w-3 h-3" /> 채택된 답변
                           </div>
                        )}

                        <div className="flex items-start gap-4 mb-4">
                            <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full bg-base-100" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-base-900">{comment.author}</span>
                                    <span className="text-xs text-base-400 font-medium">{comment.date}</span>
                                </div>
                                <p className="text-base-600 leading-relaxed font-medium">{comment.content}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pl-14">
                            <button className="text-xs font-bold text-base-400 hover:text-accent-600 flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5" /> 좋아요
                            </button>
                            <button className="text-xs font-bold text-base-400 hover:text-base-600">
                                대댓글 달기
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="py-12 text-center text-base-400">
                        <p className="text-sm font-medium">아직 등록된 답변이 없습니다.</p>
                        <p className="text-xs mt-1">첫 번째 지식공유자가 되어주세요!</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
