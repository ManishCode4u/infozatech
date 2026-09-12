import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ArrowRight, Award, Users, Cpu, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import ScrollReveal from '../ui/scroll-reveal';
import logoImg from '../../assets/images/logo/infozatech-logo.png';
import { useNavigate } from 'react-router-dom';
import { getInternshipSettings } from '../../services/settingsData';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = String(value).match(/^\d+/);
    const numericPart = numericMatch ? parseInt(numericMatch[0], 10) : NaN;
    if (isNaN(numericPart)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = numericPart;
    const totalFrames = Math.min(Math.floor(duration * 60), 100);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  const numericMatch = String(value).match(/^\d+/);
  const nonNumericPart = numericMatch ? String(value).substring(numericMatch[0].length) : String(value);

  return (
    <span ref={ref} className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
      {count}{nonNumericPart}
    </span>
  );
};


const WhyFounders = () => {
  const navigate = useNavigate();
  const [applyUrl, setApplyUrl] = useState(() => getInternshipSettings().applyUrl);

  useEffect(() => {
    const handleUpdate = () => {
      setApplyUrl(getInternshipSettings().applyUrl);
    };
    window.addEventListener('internship_settings_updated', handleUpdate);
    return () => window.removeEventListener('internship_settings_updated', handleUpdate);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate background floating particles
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 4,
        animX: (Math.random() - 0.5) * 30,
      }))
    );
  }, []);

  const typicalAgencies = [
    "Generic template-based solutions",
    "Slow project delivery",
    "Limited scalability",
    "Poor communication",
    "Basic support after launch",
    "No startup growth strategy"
  ];

  const infozaTechBenefits = [
    "Custom-built digital products",
    "Fast development cycles",
    "Startup-ready scalable architecture",
    "Direct founder communication",
    "Long-term maintenance & support",
    "Technology + business growth guidance"
  ];

  const stats = [
    { label: "Projects Delivered", value: "100+", icon: Award },
    { label: "Happy Clients", value: "50+", icon: Users },
    { label: "Technologies", value: "20+", icon: Cpu },
    { label: "Support", value: "24/7", icon: ShieldCheck }
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFFFFF] text-[#0F0F0F] overflow-hidden font-sans border-b border-slate-200">
      {/* Background Floating Particles (Soft slate-blue colors for light theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-400/10 blur-[0.5px]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              y: [-10, -90],
              x: [0, p.animX],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}

        {/* Ambient Subtle Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[400px] h-[400px] bg-blue-50/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-cyan-50/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Grid Pattern Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 0H0v40h40V0zM1 39V1h38v28H1z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#2563EB] bg-white px-6 py-1.5 rounded-full mb-6 border border-slate-200 shadow-sm">
              Why InfozaTech
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-medium text-[#1E293B] mb-4 tracking-tight">
              The Development Partner Built For <span className="text-[#2563EB]">Modern Startups</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto">
              We don't just build websites and apps. We help founders launch, scale and grow digital products faster.
            </p>
          </ScrollReveal>
        </div>

        {/* Two-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-24 md:mb-32 max-w-5xl mx-auto">
          
          {/* Left Column: Other Agencies */}
          <ScrollReveal direction="left" delay={0.1} className="flex">
            <div className="w-full rounded-3xl p-6 md:p-8 bg-slate-50/80 border border-slate-200 shadow-sm hover:shadow transition-all duration-500 flex flex-col justify-between group">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-500 mb-5 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-[0_0_8px_#94a3b8]"></span>
                  Other Agencies
                </h3>
                
                <div className="space-y-2.5">
                  {typicalAgencies.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-2.5 px-3.5 rounded-xl bg-slate-100/40 border border-slate-200/40 hover:bg-red-50/20 hover:border-red-100/30 transition-all duration-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <X size={14} strokeWidth={2.5} />
                      </span>
                      <p className="text-slate-400 text-sm md:text-base font-medium leading-normal">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: InfozaTech */}
          <ScrollReveal direction="right" delay={0.2} className="flex">
            <div className="w-full rounded-3xl p-6 md:p-8 bg-white border-2 border-blue-500 shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:border-blue-600 hover:shadow-[0_12px_45px_rgba(37,99,235,0.12)] transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
              {/* Subtle top brand color accent line */}
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-blue-600 to-cyan-500"></div>
              
              <div>
                <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563EB]"></span>
                    InfozaTech
                  </h3>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-sm">
                    Recommended Choice
                  </span>
                </div>
                
                <div className="space-y-2.5">
                  {infozaTechBenefits.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-2.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-50/30 to-cyan-50/10 border border-blue-100/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/20 hover:border-blue-200 hover:shadow-sm transition-all duration-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 border border-blue-600 flex items-center justify-center text-white shadow-sm">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <p className="text-[#0F0F0F] text-sm md:text-base font-semibold leading-normal">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Premium Stats Row */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-8 md:p-10 rounded-3xl bg-white border border-slate-150 shadow-[0_4px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm mb-24 md:mb-32">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/15 flex items-center justify-center mb-4 text-[#2563EB] shadow-sm">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* CTA Section (Matching 1st Image Exact Design) */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl p-8 sm:p-10 md:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
              {/* Ambient decorative glow inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="max-w-xl relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/25 px-3.5 py-1 text-xs font-bold !text-white text-white backdrop-blur-sm mb-4 shadow-sm">
                  <Sparkles className="size-3.5 text-blue-200" />
                  <span className="!text-white text-white font-semibold tracking-wide">Custom Digital Solutions</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold !text-white text-white tracking-tight mb-3 leading-tight">
                  Ready To Build Something Amazing?
                </h3>
                <p className="text-xs sm:text-sm !text-blue-100 text-blue-100 leading-relaxed font-normal">
                  Launch your next website, mobile app, SaaS platform or AI solution with InfozaTech.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto relative z-10 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="/contact"
                  onClick={handleContactClick}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 text-center text-sm sm:text-base shadow-lg shadow-black/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="font-bold text-blue-600">Start Your Project</span>
                  <ArrowRight className="size-4.5 text-blue-600" />
                </a>

                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 text-white font-semibold px-6 py-4 text-center text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm shadow-sm"
                >
                  <span>Apply Internship</span>
                  <ExternalLink className="size-4.5 text-blue-100" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default WhyFounders;
