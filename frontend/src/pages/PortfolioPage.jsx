import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import projectImage1 from '../assets/images/project_image1.png';
import zerodhaImage from '../assets/images/zerodha.png';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const handleContactClick = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDarkMode] = useState(false);


  const categories = ['all', 'fintech', 'ai-ml', 'cloud', 'cyber', 'healthcare'];
  const categoryLabels = {
    all: 'All Projects',
    fintech: 'FinTech',
    'ai-ml': 'AI/ML',
    cloud: 'Cloud',
    cyber: 'Cyber',
    healthcare: 'Healthcare',
  };

  const projects = [
    {
      id: 1,
      title: 'BuildoraCraft',
      description:
        'Building intelligent digital solutions for the future. Partnering with global enterprises to drive scalable impact.',
      category: 'fintech',
      tags: ['Website', 'Digital Solutions'],
      imageUrl: projectImage1,
      link: "https://buildoracraft.in/"
    },
    {
      id: 2,
      title: 'Apollo Dental Care',
      description:
        'A modern, professional dental clinic website designed for seamless appointment booking and patient care.',
      category: 'healthcare',
      tags: ['Healthcare', 'Clinic Website'],
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&h=800&q=80",
      link: "https://apollodentalcare.in/"
    },
    {
      id: 3,
      title: 'Zerodha Trading Clone',
      description:
        'A high-performance trading dashboard clone featuring real-time market data, portfolio tracking, and seamless order execution UI.',
      category: 'fintech',
      tags: ['FinTech', 'Trading Dashboard'],
      imageUrl: zerodhaImage,
      link: "https://zerodha-himanshu.onrender.com/"
    },
  ];


  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {/* Header Section */}
        <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-[700] mb-2 text-[#0F0F0F]">
               <span>Innovation in </span>
               <span className="text-[#2563EB]">Action.</span>
         </h1>

          <p className="text-slate-500">
            Showcasing technical excellence across industries.
          </p>
        </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal direction="up" delay={0.2}>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                activeCategory === category
                  ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
            <div 
              className="group cursor-pointer"
              onClick={() => {
                if(project.link) window.open(project.link, '_blank');
              }}
            >
              <div
                className="relative w-full rounded-xl overflow-hidden mb-4 bg-white flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-300"></div>
                
                {/* External Link Icon */}
                {project.link && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-3 py-1 rounded text-xs font-[700] uppercase ${
                          tagIndex === 0 ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-[700] text-white">{project.title}</h3>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-[#0F0F0F] transition-colors">
                {project.description}
              </p>
            </div>
            </ScrollReveal>
          ))}
        </div>


        {/* CTA Section */}
        <ScrollReveal direction="up" delay={0.2}>
        <div className="bg-[#0F0F0F] rounded-2xl p-8 text-center text-white shadow-xl border border-slate-800">
          <h3 className="text-2xl md:text-3xl font-[700] mb-4">
            Ready to scale your next big idea?
          </h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Join the 50+ enterprise clients who trust InfozaTech for technical excellence.
          </p>
          <a 
            href="tel:+919155596712" 
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-[700] px-8 py-4 rounded-xl shadow-sm transition-all duration-300 inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Book a Call
          </a>
        </div>
        </ScrollReveal>
      </main>
    </div>
  );
};

export default PortfolioPage;