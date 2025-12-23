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
    <div className="bg-white min-h-screen pt-20 pb-20 font-sans">
      {/* Article Header */}
      <article className="max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
            <button
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
            >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </div>
                Back to Blogs
            </button>

            <div className="flex items-center gap-3 mb-6">
                 <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide">
                     {blog.source} Tech Blog
                 </span>
                 <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                     {blog.category}
                 </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                {blog.title}
            </h1>

            <div className="flex items-center justify-between border-y border-gray-100 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${blog.author}&background=random`} alt={blog.author} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{blog.author}</div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime} read</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                        <Bookmark className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Body */}
        <div
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }} // Using mock HTML content
        />

        {/* Action Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                 <span><Eye className="h-4 w-4 inline mr-1" /> {blog.views.toLocaleString()} Reads</span>
             </div>
             <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-gray-900 font-bold hover:bg-gray-100 transition-colors">
                     <ThumbsUp className="h-4 w-4" /> 142
                 </button>
                 <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-gray-900 font-bold hover:bg-gray-100 transition-colors">
                     <MessageSquare className="h-4 w-4" /> Comment
                 </button>
             </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 mt-20 py-20">
          <div className="container max-w-7xl mx-auto px-4">
              <h3 className="text-2xl font-black text-gray-900 mb-8 max-w-3xl mx-auto">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  {relatedPosts.map(post => (
                      <div key={post.id} className="group cursor-pointer">
                          <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-200">
                              <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="text-xs font-bold text-blue-600 mb-2">{post.source}</div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
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
