'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_BLOGS } from '@/mocks/blogs';
import { ChevronLeft, Calendar, User, Clock, Share2, Bookmark, MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const blog = MOCK_BLOGS.find(b => b.id === params.id);

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Random related posts (mock logic)
  const relatedPosts = MOCK_BLOGS.filter(b => b.id !== blog.id && b.source === blog.source).slice(0, 3);

  return (
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans text-base-900">
      {/* Article Header */}
      <article className="max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
            <button
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-sm text-base-500 hover:text-base-900 transition-colors mb-8"
            >
                <div className="w-8 h-8 rounded-full bg-base-50 flex items-center justify-center group-hover:bg-base-100 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </div>
                Back to Blogs
            </button>

            <div className="flex items-center gap-3 mb-6">
                 <span className="px-3 py-1 rounded-full bg-accent-50 text-accent-600 text-xs font-bold uppercase tracking-wide">
                     {blog.source} Tech Blog
                 </span>
                 <span className="px-3 py-1 rounded-full bg-base-100 text-base-600 text-xs font-bold">
                     {blog.category}
                 </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-base-900 leading-tight mb-8">
                {blog.title}
            </h1>

            <div className="flex items-center justify-between border-y border-base-100 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-base-100 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${blog.author}&background=random`} alt={blog.author} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <div className="font-bold text-base-900">{blog.author}</div>
                        <div className="flex items-center gap-3 text-xs text-base-500 mt-0.5">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime} read</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-base-100 text-base-400 hover:text-base-900 transition-colors">
                        <Bookmark className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-base-100 text-base-400 hover:text-base-900 transition-colors">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-sm ring-4 ring-base-50 border border-base-200">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Body */}
        <div
            className="prose prose-lg prose-base max-w-none prose-headings:font-bold prose-a:text-accent-600 hover:prose-a:text-accent-800 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }} // Using mock HTML content
        />

        {/* Action Bar */}
        <div className="mt-16 pt-8 border-t border-base-100 flex items-center justify-between">
             <div className="flex items-center gap-4 text-base-400 text-sm font-medium">
                 <span><Eye className="h-4 w-4 inline mr-1" /> {blog.views.toLocaleString()} Reads</span>
             </div>
             <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-6 py-3 rounded-md bg-base-50 text-base-900 font-bold hover:bg-base-100 transition-colors">
                     <ThumbsUp className="h-4 w-4" /> 142
                 </button>
                 <button className="flex items-center gap-2 px-6 py-3 rounded-md bg-base-50 text-base-900 font-bold hover:bg-base-100 transition-colors">
                     <MessageSquare className="h-4 w-4" /> Comment
                 </button>
             </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-base-50 mt-20 py-20">
          <div className="container max-w-7xl mx-auto px-4">
              <h3 className="text-2xl font-black text-base-900 mb-8 max-w-3xl mx-auto">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  {relatedPosts.map(post => (
                      <div key={post.id} className="group cursor-pointer">
                          <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-base-200 ring-4 ring-white border border-base-200">
                              <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="text-xs font-bold text-accent-600 mb-2">{post.source}</div>
                          <h4 className="font-bold text-base-900 group-hover:text-accent-600 transition-colors line-clamp-2">
                              {post.title}
                          </h4>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
}
