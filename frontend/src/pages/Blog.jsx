import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import blogImg from "../assets/images/ai-blog-cover.png";

export const BLOG_DATA = [
  {
    slug: "ai-beginners-guide",
    tag: "Artificial Intelligence",
    title: "Understanding Artificial Intelligence (2026)",
    author: "Manish Gupta",
    date: "Tue Jun 23 2026",
    views: 256,
    img: blogImg,
    excerpt: "Artificial Intelligence, commonly called AI, is a technology that allows machines and computer systems to think, learn, and take decisions in a human-like manner.",
    content: `Artificial Intelligence, commonly called AI, is a technology that allows machines and computer systems to think, learn, and take decisions in a human-like manner. Unlike traditional programs that work only on fixed instructions, AI systems analyze large amounts of data, recognize patterns, and improve their performance over time. Artificial Intelligence is no longer a concept of the future; it is already deeply integrated into our everyday lives, often without us realizing it.

Artificial Intelligence in Simple Terms

In simple words, Artificial Intelligence means making computers smart enough to perform tasks that usually need human intelligence. These tasks include understanding language, recognizing images, predicting outcomes, solving problems, and learning from experience. Whenever Google predicts the next word while typing or Netflix suggests movies based on your interests, AI is working quietly in the background to make these features possible.

Real-Life Applications of Artificial Intelligence

Artificial Intelligence is present all around us in daily technology. Search suggestions on Google, ChatGPT answering questions, face unlock features in smartphones, content recommendations on YouTube and Instagram, email spam filtering, and traffic predictions on Google Maps all rely on AI. These systems continuously learn from user data so that their accuracy and performance improve over time.

How Artificial Intelligence Works

Artificial Intelligence mainly functions through data-driven learning. AI systems first collect large volumes of data such as text, images, videos, or numerical information. Using algorithms, this data is analyzed to find patterns and relationships. Based on what the system learns, it can then make predictions or take decisions automatically. The effectiveness of AI depends largely on the quality and quantity of data it receives.

Types of Artificial Intelligence

There are different levels of Artificial Intelligence. Narrow AI is the most commonly used type today and is designed to perform specific tasks such as voice assistants, recommendation engines, or image recognition. General AI refers to machines that can perform any intellectual task that a human can do, but this level of AI does not yet exist. Super AI is a theoretical concept where machines surpass human intelligence in every field and is mostly discussed in research and science fiction.

Artificial Intelligence, Machine Learning, and Deep Learning

Artificial Intelligence is the broader concept focused on creating intelligent machines. Machine Learning is a part of AI that enables systems to learn from data without being explicitly programmed. Deep Learning is a more advanced form of Machine Learning that uses neural networks to process complex information. In simple terms, Machine Learning comes under AI, and Deep Learning comes under Machine Learning.

Is Artificial Intelligence Dangerous?

Artificial Intelligence itself is not harmful, but its misuse can lead to serious issues. Concerns such as data privacy, job automation, and the spread of fake or misleading content are often linked to irresponsible use of AI. This is why ethical guidelines and responsible development of AI are extremely important.

Can Beginners Learn Artificial Intelligence?

Yes, beginners can definitely start learning Artificial Intelligence without needing advanced mathematics or a computer science degree. Understanding basic AI concepts, exploring tools like ChatGPT, and gradually learning programming languages such as Python can help beginners enter the field. Learning AI has become much more accessible in recent years.

Should You Learn Artificial Intelligence in 2026?

Learning Artificial Intelligence is a smart choice for anyone interested in technology, automation, and future-ready skills. Even basic knowledge of AI can provide a strong advantage in the tech industry and help people work more efficiently.

Final Thoughts

Artificial Intelligence is not meant to replace humans but to enhance human capabilities. By understanding the fundamentals of AI, you prepare yourself for future opportunities and innovations. Starting small, staying consistent, and continuing to learn can help you grow along with this rapidly evolving technology.`
  },
  {
    slug: "web-development-future",
    tag: "Web Development",
    title: "The Future of Web Development: What to Expect",
    author: "InfozaTech Team",
    date: "Mon Jun 22 2026",
    views: 189,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
    excerpt: "The web development landscape is evolving faster than ever. As we enter 2026, technologies like AI-driven coding assistants and WebAssembly are transforming how we build apps.",
    content: `The web development landscape is evolving faster than ever. As we enter 2026, technologies like AI-driven coding assistants, WebAssembly (Wasm), and Edge Computing are transforming how we build and deploy applications.

The Rise of Serverless and Edge

Serverless computing has already changed backend development, but edge computing takes it a step further by running code incredibly close to the user. This reduces latency significantly, leading to near-instant page loads.

AI Integration in Development

We are seeing AI tools that not only assist in writing code but also help in architecting complete systems, debugging complex state issues, and writing robust test suites automatically. This makes single developers much more productive.

The Shift towards Full-Stack Frameworks

Frameworks like Next.js and Remix have blurred the lines between frontend and backend. Developing modern web apps is shifting towards truly full-stack setups inside a single repository, lowering the barrier to entry for building robust platforms.

Why Stay Updated?

As the tech stack consolidates, sticking to old paradigms might leave you behind. Embracing these new architectures allows businesses to scale effortlessly while cutting down on server costs and development time.`
  },
  {
    slug: "ui-ux-design-principles",
    tag: "UI/UX Design",
    title: "Essential UI/UX Principles for Modern Apps",
    author: "Creative Team",
    date: "Fri Jun 19 2026",
    views: 312,
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    excerpt: "Good design is invisible. Let's explore the core principles that make applications not just functional, but an absolute joy to use.",
    content: `Good design is invisible. Let's explore the core principles that make applications not just functional, but an absolute joy to use.

Hierarchy and Focus

A user shouldn't have to think about where to look. By utilizing scale, contrast, and spacing, we guide the user's eye naturally to the most important actions on the page.

Whitespace is Your Friend

Cramming too much information onto a single screen overwhelms the user. Generous whitespace allows the interface to breathe and makes digesting content significantly easier.

Consistency Across the Board

Using standard patterns and consistent spacing/coloring reduces the cognitive load on your users. If a button looks a certain way on the home page, it should look identical on the settings page.

Accessibility Matters

Design should be inclusive. Ensuring proper color contrast, legible text sizes, and screen-reader compatibility shouldn't be an afterthought—it should be part of the foundation.

Interactive Feedback

Whenever a user interacts with your application—be it clicking a button, submitting a form, or toggling a switch—there should be immediate, subtle visual feedback. This reassures the user that the system is responding.`
  },
  {
    slug: "seo-best-practices-2026",
    tag: "Digital Marketing",
    title: "SEO Best Practices Every Startup Needs to Know in 2026",
    author: "Priya Sharma",
    date: "Tue Jun 16 2026",
    views: 415,
    img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800",
    excerpt: "The rules of SEO are constantly changing. From voice search optimization to core web vitals, here is what your startup needs to rank high this year.",
    content: `The rules of SEO are constantly changing. From voice search optimization to core web vitals, here is what your startup needs to rank high this year.

Focus on User Intent
Google's algorithms are smarter than ever at understanding what users actually want. Stuffing keywords is a thing of the past. If your content doesn't directly answer a user's problem, it won't rank.

Core Web Vitals are Mandatory
Speed is a massive ranking factor. Ensure your TTFB (Time to First Byte) is low, and your LCP (Largest Contentful Paint) happens in under 2.5 seconds. Optimize images using Next-Gen formats like WebP or AVIF.

Voice Search is Here to Stay
With the proliferation of smart speakers, optimizing for conversational queries is essential. Structure your content into clear QA formats and use long-tail keywords that mimic natural speech patterns.

Quality Over Quantity
Google's Helpful Content Update proved that generating thousands of low-quality AI articles will get you penalized. Publish less frequently if needed, but ensure every post has unique value and expert perspective.`
  },
  {
    slug: "scaling-startups-aws",
    tag: "Cloud Computing",
    title: "Scaling Your Startup's Backend on AWS: A Roadmap",
    author: "Karan Singh",
    date: "Thu Jun 11 2026",
    views: 520,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    excerpt: "Moving from an MVP to a cloud architecture that handles millions of users can be daunting. We break down the AWS services that matter.",
    content: `Moving from an MVP to a cloud architecture that handles millions of users can be daunting. We break down the AWS services that matter for growing startups.

Start with Managed Services
Don't spin up EC2 instances if you don't have to. Use managed services like AWS Lambda, Fargate, and RDS to reduce your operational overhead. Focus on building your product, not managing servers.

Database Scaling Strategies
As your user base grows, your database will become the bottleneck. Implement caching early using Amazon ElastiCache (Redis). When read loads increase, spin up read replicas for your RDS instances to distribute the traffic.

Decouple Your Architecture
Monoliths are great for MVPs. But as you scale, breaking out complex long-running processes using Amazon SQS and SNS ensures that your main application remains responsive even during heavy traffic spikes.

Monitor Everything
You can't fix what you don't know is broken. Set up CloudWatch alarms with automated SNS emails. Catch 500 errors before your customers complain about them on Twitter.`
  },
  {
    slug: "flutter-vs-react-native",
    tag: "Mobile Development",
    title: "Flutter vs React Native: Choosing the Right Tool",
    author: "InfozaTech Team",
    date: "Mon Jun 08 2026",
    views: 890,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800",
    excerpt: "Choosing a cross-platform framework is a big decision for any product. Let's compare the performance, ecosystem, and developer experience of the top two contenders.",
    content: `Choosing a cross-platform framework is a big decision for any product. Let's compare the performance, ecosystem, and developer experience of the top two contenders: Flutter and React Native.

Performance
Flutter compiles directly to native ARM code, which gives it a slight edge in raw performance and complex animations. React Native uses a JavaScript bridge (though the new Fabric architecture minimizes this), so while it is extremely fast, Flutter usually wins the benchmark wars.

Developer Ecosystem
React Native has the massive advantage of the JavaScript ecosystem. If your team already knows React for the web, the transition to React Native is almost seamless. Finding React developers is generally easier than finding Dart/Flutter experts.

UI Components
Flutter provides a comprehensive set of pre-built widgets that look identical on both iOS and Android. React Native relies more on native components, meaning a button will look like an iOS button on an iPhone and an Android button on an Android device.

Conclusion
If you need highly customized, complex, identical UI across all platforms, Flutter is fantastic. If you want to reuse code between your website and mobile app, and have a team skilled in JavaScript, React Native is the undisputed king.`
  }
];

const Blog = () => {
  const [likes, setLikes] = useState(() => {
    const initialLikes = {};
    BLOG_DATA.forEach(blog => {
      initialLikes[blog.slug] = {
        count: Math.floor(blog.views / 3),
        isLiked: false
      };
    });
    return initialLikes;
  });

  const handleLike = (e, slug) => {
    e.preventDefault();
    setLikes(prev => {
      const current = prev[slug];
      return {
        ...prev,
        [slug]: {
          count: current.isLiked ? current.count - 1 : current.count + 1,
          isLiked: !current.isLiked
        }
      };
    });
  };

  return (
    <section className="bg-slate-50 pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Our Latest Insights</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Stay updated with the latest trends in technology, design, and software development.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_DATA.map((blog) => (
            <div key={blog.slug} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="relative h-56 overflow-hidden block">
                <Link to={`/blog/${blog.slug}`}>
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <button
                  onClick={(e) => handleLike(e, blog.slug)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 opacity-100 hover:bg-white z-10"
                >
                  <Heart size={16} className={`transition-colors ${likes[blog.slug]?.isLiked ? "fill-red-500 text-red-500" : "text-slate-500"}`} />
                  <span className={`text-sm font-semibold ${likes[blog.slug]?.isLiked ? "text-red-500" : "text-slate-700"}`}>
                    {likes[blog.slug]?.count}
                  </span>
                </button>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold px-3 py-1.5 rounded-full">
                    {blog.tag}
                  </span>
                </div>

                <Link to={`/blog/${blog.slug}`} className="block mb-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400 font-medium">{blog.date}</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-sm text-[#2563EB] font-bold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;
