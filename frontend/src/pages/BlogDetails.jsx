import { useParams, Navigate, Link } from "react-router-dom";
import { BLOG_DATA } from "./Blog";
import { ChevronLeft } from "lucide-react";

const BlogDetails = () => {
  const { slug } = useParams();
  
  // Find the blog from the exported data
  const blog = BLOG_DATA.find(b => b.slug === slug);

  // If blog doesn't exist, redirect or show 404
  if (!blog) {
    return <Navigate to="/blog" />;
  }

  return (
    <section className="bg-slate-50 pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2563EB] font-medium text-sm transition-colors mb-8">
          <ChevronLeft size={16} /> Back to Blogs
        </Link>
        <br/>
        <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          {blog.tag}
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">
          <span className="font-medium text-slate-700">{blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>👁 {blog.views} views</span>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg mb-12 bg-slate-100 aspect-video">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* FULL CONTENT */}
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          {blog.content.split('\n\n').map((paragraph, index) => {
            // Very simple markdown-like parsing for bold subheadings
            if (paragraph.trim().length > 0 && paragraph.split('\n').length === 1 && !paragraph.endsWith('.') && paragraph.length < 60) {
              return <h3 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{paragraph}</h3>;
            }
            return (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
