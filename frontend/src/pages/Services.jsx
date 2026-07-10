import React from 'react';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { Paintbrush, Layers, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aiSolutionsImg from '../assets/images/ai_solutions_service.png';

const Services = () => {
  const navigate = useNavigate();
  const handleContactClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  const services = [
    { 
      id: 1, 
      title: "AI & Automation", 
      description: "Cutting-edge neural networks, intelligent Chatbots, AI Calling Agents, and workflow automation tailored for your business.", 
      icon: "psychology", 
      image: aiSolutionsImg, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50" 
    },
    { 
      id: 2, 
      title: "App & Web Development", 
      description: "Scalable, robust, custom-built web applications and mobile apps for modern enterprises and startups.", 
      icon: "code", 
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50" 
    },
    { 
      id: 3, 
      title: "Academic Excellence", 
      description: "High-impact research assistance and academic tool development for institutions.", 
      icon: "school", 
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", 
      color: "text-green-600", 
      bgColor: "bg-green-50" 
    }
  ];


  const processSteps = [
    { number: "01", title: "Discovery", description: "We dive deep into your requirements and business goals." },
    { number: "02", title: "Architecture", description: "Planning the blueprint for a scalable and secure system." },
    { number: "03", title: "Development", description: "Our experts build your solution using modern tech stacks." },
    { number: "04", title: "Launch", description: "Rigorous testing followed by seamless deployment." }
  ];

  const getIconComponent = (iconName, color = "text-blue-600", size = "w-6 h-6") => {
    const classes = `${size} ${color}`;
    switch(iconName) {
      case 'psychology': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      case 'code': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
      case 'school': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
      case 'speed': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      case 'verified': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'support_agent': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
      case 'shield_lock': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
      case 'trending_up': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
      case 'monitoring': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
      case 'check': return <svg className={classes} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
      default: return null;
    }
  };

  return (
    <div
      id="services"
      className="min-h-screen bg-[#FFFFFF] text-[#0F0F0F] overflow-hidden pb-20"
    >

      {/* Header */}
      <ScrollReveal direction="up" delay={0.1}>
      <div className={`flex justify-center mt-12`}>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] bg-[#2563EB]/5 px-6 py-2 rounded-full mb-6 border border-[#2563EB]/15">
          ● Our Services
        </span>
      </div>
      </ScrollReveal>

      <section className="px-4 py-10 max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0.2}>
        <h2 className={`text-3xl md:text-4xl font-[700] mb-12 text-[#0F0F0F] text-center`}>
          Our Services
        </h2>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" delay={(index + 1) * 0.15}>
            <div 
              onClick={handleContactClick}
              className="relative h-96 rounded-2xl border border-slate-200 hover:border-[#2563EB]/60 transition-all duration-500 overflow-hidden group shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
            >
              {/* Vertical left accent line (one-sided border) */}
              <div className="absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-b from-[#2563EB] to-cyan-500 z-30"></div>

              {/* Background Image spanning full card */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${service.image})` }} 
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30 group-hover:from-black/95 group-hover:via-black/75 group-hover:to-black/40 transition-all duration-500 z-10" />

              {/* Content Card Overlay */}
              <div className="relative z-20 h-full p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg transition-colors duration-300 group-hover:bg-[#2563EB]/20 group-hover:border-[#2563EB]/30">
                    {getIconComponent(service.icon, "text-white", 'w-6 h-6')}
                  </div>
                  <h3 className="text-xl font-[700] text-white tracking-wide">{service.title}</h3>
                </div>
                <p className="text-slate-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Other Services Divider & Pills */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex items-center justify-center mt-20 mb-10 px-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow max-w-[120px] md:max-w-[200px]"></div>
            <span className="px-6 py-2.5 text-xs md:text-sm font-extrabold uppercase tracking-[3px] text-[#2563EB] bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full flex items-center gap-2 whitespace-nowrap shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping"></span>
              Other Services
            </span>
            <div className="h-[1px] bg-gradient-to-l from-transparent via-slate-300 to-transparent flex-grow max-w-[120px] md:max-w-[200px]"></div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 mb-16">
            <div 
              onClick={handleContactClick}
              className="relative p-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl border-y border-r border-slate-200 border-l-[5px] border-l-[#2563EB] bg-white hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-[#2563EB]/5 text-[#2563EB] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-inner">
                <Paintbrush size={24} className="transition-colors duration-300" />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-[15px] group-hover:text-[#2563EB] transition-colors leading-tight">Logo Design</span>
            </div>

            <div 
              onClick={handleContactClick}
              className="relative p-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl border-y border-r border-slate-200 border-l-[5px] border-l-[#2563EB] bg-white hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-[#2563EB]/5 text-[#2563EB] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-inner">
                <Layers size={24} className="transition-colors duration-300" />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-[15px] group-hover:text-[#2563EB] transition-colors leading-tight">Social Post Design</span>
            </div>

            <div 
              onClick={handleContactClick}
              className="relative p-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl border-y border-r border-slate-200 border-l-[5px] border-l-[#2563EB] bg-white hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-[#2563EB]/5 text-[#2563EB] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-inner">
                <Zap size={24} className="transition-colors duration-300" />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-[15px] group-hover:text-[#2563EB] transition-colors leading-tight">Branding</span>
            </div>

            <div 
              onClick={handleContactClick}
              className="relative p-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl border-y border-r border-slate-200 border-l-[5px] border-l-[#2563EB] bg-white hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-[#2563EB]/5 text-[#2563EB] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-inner">
                <Globe size={24} className="transition-colors duration-300" />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-[15px] group-hover:text-[#2563EB] transition-colors leading-tight">Social Media Management</span>
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* Process Section */}
      <section className="px-4 py-12 max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
        <h2 className={`text-3xl font-[700] mb-12 text-center text-[#0F0F0F]`}>Our Process</h2>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.number} direction="left" delay={index * 0.15}>
              <div 
                className={`relative pl-16 transition-all duration-300`}
              >
                <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center ${index === 3 ? 'bg-[#2563EB]' : 'bg-white border-2 border-[#2563EB]'} shadow-md`}>
                  {index === 3 ? getIconComponent('check', 'text-white w-6 h-6') : <span className="text-lg font-[700] text-[#2563EB]">{step.number}</span>}
                </div>
                <div>
                  <h4 className="text-xl font-[700] mb-2 text-[#0F0F0F]">{step.title}</h4>
                  <p className="text-[#64748b]">{step.description}</p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;