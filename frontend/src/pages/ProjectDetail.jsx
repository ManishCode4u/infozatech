/* eslint-disable */
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projects";
import { ScrollReveal } from "../components/ui/scroll-reveal";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);


  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h2 className="text-4xl font-[700] text-[#0f172a] mb-6">Project Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-[700] hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-white pt-32 pb-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 lg:items-start">
        
        {/* LEFT: Massive Image Preview (Mockup Style) */}
        <div className="w-full lg:w-1/2 flex flex-col sticky top-32">
          <ScrollReveal direction="left" delay={0.1}>
          <div className="relative w-full bg-slate-50 border border-slate-200/50 p-4 sm:p-6 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex items-center justify-center group overflow-hidden">
            {/* The Image Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-200 bg-white">
              <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-100/50 flex transition-transform hover:scale-110 cursor-pointer">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={project.logo} />
                </svg>
              </div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
          </ScrollReveal>
        </div>

        {/* RIGHT: High-End Details & Features */}
        <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8 relative z-10">
          
          <ScrollReveal direction="up" delay={0.2}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8 w-fit shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-[700] text-slate-700 uppercase tracking-[0.2em]">{project.type}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-[700] text-[#0f172a] tracking-tight mb-8 leading-[1.1]">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-[#64748b] leading-relaxed mb-14 max-w-xl font-medium">
            {project.description}
          </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
          <div className="mb-16">
            <h3 className="text-lg font-[700] text-[#0f172a] uppercase tracking-widest mb-10 border-b-2 border-slate-100 pb-4">
              Core Architecture
            </h3>
            <ul className="space-y-8">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-6 group">
                  <span className="flex-shrink-0 text-sm font-[700] text-blue-500 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                  <span className="text-xl text-[#64748b] font-medium leading-snug group-hover:text-[#0f172a] transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal direction="up" delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-[700] shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              View {project.category === "Applications" ? "Live App" : "Live Website"}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-5 bg-white hover:bg-slate-50 text-[#0f172a] rounded-full font-[700] border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-300"
            >
              Back to Portfolios
            </button>
          </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
