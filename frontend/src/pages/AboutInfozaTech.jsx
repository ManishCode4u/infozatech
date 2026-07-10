import React, { useEffect, useRef, useState } from 'react';
import OurTeam from '../components/sections/OurTeam';

const AboutInfozaTechPage = () => {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Trigger animation short delay after mount
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white text-slate-900" id="about">
      
      {/* SECTION 1: HERO */}
      <section 
        className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden" 
        ref={heroRef}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

        <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            About InfozaTech
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            We design and build powerful websites, applications, and startup solutions that help businesses grow faster.
          </p>
        </div>
      </section>

      {/* MOVING STRIP */}
      <div className="relative w-full overflow-hidden bg-[#0f172a] border-y border-slate-800 py-4 sm:py-5 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        {/* Shimmer Flash Effect */}
        <div className="absolute top-0 left-0 h-full w-[80px] md:w-[120px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 animate-shimmer-sweep pointer-events-none"></div>

        {/* Fade effect edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-marquee-left w-max items-center">
          {[...Array(2)].map((_, i) => (
             <div key={i} className="flex items-center text-slate-300" aria-hidden={i === 1}>
               <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default whitespace-nowrap">Develop it from Best</span>
               <span className="text-purple-500 mx-4 md:mx-6 text-lg">✦</span>
               <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default whitespace-nowrap">Build Smart</span>
               <span className="text-purple-500 mx-4 md:mx-6 text-lg">✦</span>
               <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default whitespace-nowrap">Launch Fast</span>
               <span className="text-purple-500 mx-4 md:mx-6 text-lg">✦</span>
               <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default whitespace-nowrap">Scale Easily</span>
               <span className="text-purple-500 mx-4 md:mx-6 text-lg">✦</span>
             </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ABOUT CONTENT */}
      <section className="pt-12 md:pt-16 pb-6 md:pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Building Digital Products That Matter</h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-600 font-normal leading-relaxed">
            <p>
              At InfozaTech, we focus on building high-quality digital products for startups and businesses. From idea validation to final launch, we handle everything with precision and modern design thinking.
            </p>
            <p>
              Whether it's a website, mobile application, or a complete startup solution, our goal is to deliver scalable, fast, and user-friendly products.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHO WE ARE */}
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Who We Are</h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-600 font-normal leading-relaxed">
            <p>
              We are a growing team focused on helping startups and businesses turn ideas into real products. We combine design, development, and strategy to create impactful digital solutions.
            </p>
            <p>
              Our core strength lies in simplicity, performance, and clean execution.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TEAM SECTION */}
      <div className="relative z-10">
        <OurTeam />
      </div>

    </div>
  );
};

export default AboutInfozaTechPage;