/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projects";
import { ScrollReveal } from "../components/ui/scroll-reveal";
import { MeshGradient } from "@paper-design/shaders-react";

const Projects = ({ page = false }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Websites");

  const filteredProjects = projectsData.filter(p => {
    if (p.category !== activeCategory) return false;
    if (!page && p.hideOnHome) return false;
    return true;
  });



  return (
    <section 
      id="projects"
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        page ? "bg-slate-950 text-white pt-24 pb-20" : "bg-white text-[#0F0F0F] py-12 lg:py-14"
      } px-4 md:px-6`}
    >
      {/* Mesh Shader Background for Standalone Page */}
      {page && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
          <MeshGradient
            style={{ height: "100%", width: "100%" }}
            distortion={0.8}
            swirl={0.1}
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={0}
            speed={0.8}
            colors={["hsl(216, 90%, 27%)", "hsl(243, 68%, 36%)", "hsl(205, 91%, 64%)", "hsl(211, 61%, 57%)"]}
          />
        </div>
      )}

      {/* 6. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9Ii43NSIgZmlsbD0iI2NlZTRlNiIvPjwvc3ZnPg==')] opacity-[0.03] z-0 pointer-events-none"></div>

      {/* Soft abstract shapes (hidden on mobile to prevent overflow) */}
      {!page && (
        <>
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#60a5fa]/10 rounded-full mix-blend-multiply opacity-20 blur-[60px] pointer-events-none hidden md:block"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#a78bfa]/10 rounded-full mix-blend-multiply opacity-20 blur-[60px] pointer-events-none hidden md:block"></div>
        </>
      )}

      {/* Return Button for Standalone Page */}
      {page && (
        <button
          onClick={() => navigate(-1)}
          className="fixed top-20 md:top-24 left-4 md:left-6 bg-white/10 backdrop-blur-md text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl font-[700] shadow-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 z-50 border border-white/15"
        >
          ←
        </button>
      )}

      {/* Unified Section Header */}
      <ScrollReveal direction="up" delay={0.1}>
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center mb-10">
        <div className="text-center flex flex-col items-center">
          
          {/* 1. Badge */}
          <div 
            className="inline-block font-semibold mb-2"
            style={{
              fontSize: '12px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: page ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.05)',
              color: page ? '#fff' : '#2563EB',
              border: page ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(37,99,235,0.15)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
          >
            Projects
          </div>

          {/* 2. Heading */}
          <h2 
            className={`${page ? 'text-white' : 'text-[#0F0F0F]'} tracking-tight text-3xl md:text-[38px]`}
            style={{
              fontWeight: 700,
              marginTop: '10px',
              marginBottom: '20px'
            }}
          >
            Our Top Projects
          </h2>

          {/* 3. Toggle Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveCategory("Websites")}
              style={{
                padding: '10px 22px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeCategory === "Websites" ? (page ? '#fff' : '#0F0F0F') : (page ? 'rgba(255,255,255,0.08)' : '#f1f5f9'),
                color: activeCategory === "Websites" ? (page ? '#0F0F0F' : '#fff') : (page ? 'rgba(255,255,255,0.6)' : '#475569'),
                transition: 'all 0.3s ease'
              }}
            >
              Websites
            </button>
            <button
              onClick={() => setActiveCategory("Applications")}
              style={{
                padding: '10px 22px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeCategory === "Applications" ? (page ? '#fff' : '#0F0F0F') : (page ? 'rgba(255,255,255,0.08)' : '#f1f5f9'),
                color: activeCategory === "Applications" ? (page ? '#0F0F0F' : '#fff') : (page ? 'rgba(255,255,255,0.6)' : '#475569'),
                transition: 'all 0.3s ease'
              }}
            >
              Applications
            </button>
          </div>

        </div>
      </div>
      </ScrollReveal>

      {/* Zig-Zag Stacked Layout */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        {filteredProjects.map((project, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
            <div 
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16 group relative`}
            >
              {/* IMAGE COLUMN (Sticky Scroll preserved) */}
              <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex items-center justify-center">
                <div className={`w-full h-[280px] md:h-[340px] lg:h-[400px] rounded-[48px] ${
                  page 
                    ? 'bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm' 
                    : 'bg-slate-50 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'
                } flex items-center justify-center p-1.5 hover:shadow-md transition-shadow duration-500 overflow-hidden`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full rounded-[44px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform duration-700 ease-out ${
                      project.imagePosition || 'object-cover object-center'
                    }`}
                  />
                </div>
              </div>

              {/* CONTENT COLUMN */}
              <div className="w-full lg:w-1/2 flex flex-col items-start px-2 lg:pl-12 lg:pr-6 py-2">
                
                {/* 5. Top Control / Label */}
                <div 
                   className={`inline-block rounded-full font-bold ${
                     page 
                       ? 'bg-white/10 text-white border border-white/15' 
                       : 'bg-[#2563EB]/5 text-[#2563EB] border border-[#2563EB]/10'
                   }`}
                   style={{ fontSize: '13px', padding: '8px 18px' }}
                 >
                  🚀 {project.category === "Applications" ? "Our App" : "Our Work"}
                </div>

                <h3 
                  className={`font-[700] ${page ? 'text-white' : 'text-[#0F0F0F]'} leading-[1.1] text-2xl md:text-[34px]`}
                  style={{ 
                    letterSpacing: '-0.8px',
                    marginTop: '16px',
                    marginBottom: '18px'
                  }}
                >
                  {project.title}
                </h3>

                {/* 1. Paragraph Formatting & 2. Spacing Fix & 4. Content Width */}
                <p 
                  className={`${page ? 'text-slate-200' : 'text-slate-600'} leading-[1.6]`}
                  style={{ 
                    fontSize: '16px', 
                    marginBottom: '12px', 
                    maxWidth: '600px'
                  }}
                >
                  {project.description}
                </p>

                {/* Feature List */}
                <div className="flex flex-col w-full max-w-[600px] mt-6 mb-8" style={{ gap: '16px' }}>
                  {project.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-6">
                       {/* Numbered Style */}
                      <div className={`shrink-0 rounded-[10px] ${
                        page 
                          ? 'bg-white/10 text-white' 
                          : 'bg-[#2563EB]/5 text-[#2563EB]'
                      } font-[700] text-[12px] flex items-center justify-center mt-0.5`} style={{ width: '26px', height: '26px' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className={`${page ? 'text-slate-300' : 'text-slate-600'} font-[400] leading-[1.5]`} style={{ fontSize: '15.5px' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 8. Button Refinement */}
                <div className="mt-2">
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center ${
                      page 
                        ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-[0_4px_20px_rgba(255,255,255,0.1)]' 
                        : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
                    } rounded-[14px] font-[600] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
                    style={{ 
                      fontSize: '15px',
                      padding: '12px 28px'
                    }}
                  >
                    View {project.category === "Applications" ? "App" : "Website"}
                  </a>
                </div>
              </div>
            </div>
            </ScrollReveal>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <ScrollReveal direction="up">
          <div className="text-center text-slate-500 font-[500] py-12 relative z-10">
            No projects found in this category.
          </div>
        </ScrollReveal>
      )}

      {/* View All Button - Only on Home Page */}
      {!page && (
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex justify-center mt-16 md:mt-24 relative z-10">
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-10 py-5 rounded-2xl font-semibold shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span>View All Projects</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
};

export default Projects;
