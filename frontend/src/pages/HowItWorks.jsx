/* eslint-disable */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    step: "1",
    title: "Share Your Requirement",
    subtitle: "Enter Your Idea",
    desc: "Tell us what you want to build — app, website, project, or training.",
    videoUrl: "", 
  },
  {
    step: "2",
    title: "Get Solution & Guidance",
    subtitle: "Instant Match",
    desc: "We analyze your requirement and suggest the best solution & roadmap.",
    videoUrl: "",
  },
  {
    step: "3",
    title: "Build, Deliver & Support",
    subtitle: "Best Outcome",
    desc: "We build, guide, and support you until your goal is achieved.",
    videoUrl: "",
  },
];

// Custom Typing Animation Component for the first card
const CardAnimation = () => {
  const [inputText, setInputText] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [key, setKey] = useState(0); 
  const fullInput = "I need a business website for my startup";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullInput.length) {
        setInputText(fullInput.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowResponse(true), 600);
        setTimeout(() => {
          setShowResponse(false);
          setInputText("");
          setKey(prev => prev + 1);
        }, 4000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [key]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-4 relative">
      <div className="absolute top-4 right-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
        InfozaTech
      </div>

      <div className="relative w-full max-w-[280px] bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3 flex items-center gap-3 transform -translate-y-2">
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-grow text-[12px] md:text-[13px] text-white font-medium min-h-[1.2rem]">
          {inputText}
          <span className="inline-block w-[2px] h-3 bg-white ml-0.5 animate-pulse" />
        </div>
      </div>

      <div className={`w-auto max-w-[240px] bg-white/15 backdrop-blur-xl rounded-xl border border-white/20 px-4 py-2 flex items-center gap-2 transform transition-all duration-700 ${showResponse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-white/80">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </div>
        <div className="text-[11px] md:text-[12px] text-white font-medium whitespace-nowrap">
          Got it! Let’s build your website
        </div>
      </div>
    </div>
  );
};

// Simple typewriter component for Framer Motion
const TypewriterText = ({ text, delay = 0 }) => {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + index * 0.04 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// --- COMPONENT FOR STEP 2: DESIGN ---
const DesignAnimation = () => {
  const [stage, setStage] = useState(0); 

  useEffect(() => {
    const cycle = async () => {
      setStage(1);
      await new Promise(r => setTimeout(r, 3000));
      setStage(2);
      await new Promise(r => setTimeout(r, 3500));
      cycle();
    };
    cycle();
    return () => {}; 
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-6">
      <div className="absolute top-4 right-4 text-[10px] font-bold text-white/40 uppercase tracking-widest z-20">
        InfozaTech
      </div>

      <div className="w-full max-w-[280px] bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3.5 shadow-2xl relative">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-[10px] font-bold text-white/80 uppercase tracking-wide">
            System Match
          </div>
          <div className="flex gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full ${stage === 1 ? 'bg-white/20 animate-pulse' : 'bg-green-400 shadow-[0_0_5px_#4ade80]'}`} />
            <div className={`h-1.5 w-1.5 rounded-full ${stage === 1 ? 'bg-white/20 animate-pulse delay-75' : 'bg-green-400 shadow-[0_0_5px_#4ade80]'}`} />
            <div className={`h-1.5 w-1.5 rounded-full ${stage === 1 ? 'bg-white/20 animate-pulse delay-150' : 'bg-green-400 shadow-[0_0_5px_#4ade80]'}`} />
          </div>
        </div>

        <div className="w-full h-16 rounded-xl mb-3 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-400/30 to-indigo-500/30 shadow-inner border border-blue-300/30">
          <AnimatePresence mode="wait">
            <motion.div 
              key={stage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="text-[12px] md:text-[13px] text-white font-medium z-10 min-h-[1.2rem]">
                {stage === 1 ? <TypewriterText key="analyzing" text="Analyzing Request..." /> : <TypewriterText key="match" text="Perfect Match Found!" />}
              </div>
              <div className="text-[9px] text-white/60 mt-1 z-10 min-h-[0.9rem]">
                {stage === 1 ? <TypewriterText key="finding" text="Finding the best roadmap" delay={0.4} /> : <TypewriterText key="expert" text="Expert team & solution ready" delay={0.4} />}
              </div>
            </motion.div>
          </AnimatePresence>

          {stage === 2 && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
              animate={{ x: [-280, 280] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>

        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-16 rounded-full bg-white/20" />
            <div className="h-1.5 w-10 rounded-full bg-white/10" />
          </div>
          <div className="relative">
            <div 
              className="h-6 px-3 rounded-lg flex items-center justify-center bg-white text-[10px] font-bold text-blue-600 shadow-lg transition-all duration-300 relative z-10"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {stage === 1 ? "Matching..." : "View Plan"}
                </motion.span>
              </AnimatePresence>
            </div>
            {/* Button click ripple */}
            {stage === 2 && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-white bg-white/40"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 1, 0], scale: [1, 1.4, 1.6] }}
                transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
              />
            )}
          </div>
        </div>

        {/* Animated Mouse Cursor */}
        {stage === 2 && (
          <motion.div
            className="absolute z-50 pointer-events-none drop-shadow-lg"
            style={{ bottom: "1rem", right: "2.5rem" }}
            initial={{ x: 60, y: 80, opacity: 0 }}
            animate={{ 
              x: [60, -5, -5, -5], 
              y: [80, 5, 5, 5], 
              opacity: [0, 1, 1, 0],
              scale: [1, 1, 0.8, 1]
            }}
            transition={{ duration: 2.2, delay: 1.2, ease: "easeInOut", times: [0, 0.27, 0.36, 1] }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 3L18.5 10L12 12.5L14 19L11 20.5L9 14L4 16.5V3Z" fill="#1e293b" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="absolute bottom-3 text-[10px] text-white/50 font-medium tracking-wide"
        animate={{ opacity: stage === 2 ? 1 : 0.4 }}
      >
        Designing your website layout and features...
      </motion.div>
    </div>
  );
};

// --- COMPONENT FOR STEP 3: DEPLOY & LAUNCH ---
const DeliveryAnimation = () => {
  const [stage, setStage] = useState(0); // 0: Preview, 1: Deploying, 2: Live/Success

  useEffect(() => {
    const cycle = async () => {
      setStage(0);
      await new Promise(r => setTimeout(r, 1200));
      setStage(1);
      await new Promise(r => setTimeout(r, 3000));
      setStage(2);
      await new Promise(r => setTimeout(r, 5000));
      cycle();
    };
    cycle();
    return () => {};
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-6 overflow-hidden">
      <div className="absolute top-4 right-4 text-[10px] font-bold text-white/40 uppercase tracking-widest z-20">
        InfozaTech
      </div>

      {/* BACKGROUND GLOW */}
      <motion.div 
        className="absolute w-44 h-44 bg-blue-600/20 blur-[80px] rounded-full"
        animate={{ scale: stage === 2 ? [1, 1.3, 1] : 1, opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        <motion.div 
          key={stage === 0 ? "preview" : "launch"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative w-full h-full flex flex-col items-center justify-center"
        >
          {/* THE WEBSITE PREVIEW CARD */}
          <div className="relative w-full max-w-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            {/* SaaS UI Elements */}
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <div className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
              <div className="h-2 w-16 bg-blue-100 rounded-full" />
            </div>
            
            <div className="p-4 bg-white relative">
              {/* Hero Section Mock */}
              <div className="flex flex-col gap-2 mb-4">
                 <div className="h-3 w-3/4 bg-blue-600 rounded-lg" />
                 <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="aspect-video bg-blue-50 rounded-lg border border-blue-100/50" />
                 <div className="aspect-video bg-blue-50 rounded-lg border border-blue-100/50" />
              </div>

              <div className="h-7 w-20 bg-blue-600 rounded-lg shadow-md" />

              {/* Light Shine Effect */}
              {stage === 2 && (
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "200%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                />
              )}
            </div>

            {/* PROGRESS BAR (Only in stage 1) */}
            {stage === 1 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100">
                <motion.div 
                  initial={{ width: "80%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "linear" }}
                  className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                />
              </div>
            )}
          </div>

          {/* LAUNCH DETAILS OVERLAY */}
          <div className="mt-8 flex flex-col items-center gap-3">
             <AnimatePresence mode="wait">
                {stage === 1 ? (
                  <motion.p 
                    key="deploying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/60 text-[12px] font-medium tracking-wide animate-pulse"
                  >
                    Deploying your website...
                  </motion.p>
                ) : stage === 2 ? (
                  <motion.div 
                    key="live"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-2"
                  >
                     <p className="text-white font-bold text-sm tracking-tight">Website is Live 🚀</p>
                     <p className="text-blue-200/60 text-[10px] font-mono tracking-wider">www.yourbusiness.com</p>
                  </motion.div>
                ) : (
                  <div className="h-6" /> // spacer
                )}
             </AnimatePresence>

             {/* Green Success Checkmark */}
             {stage === 2 && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-10 h-10 rounded-full bg-green-500 shadow-xl shadow-green-900/20 flex items-center justify-center text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                    <motion.path 
                       initial={{ pathLength: 0 }} 
                       animate={{ pathLength: 1 }} 
                       transition={{ duration: 0.4, delay: 0.7 }}
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                       d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </motion.div>
             )}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="absolute bottom-4 text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase"
        animate={{ opacity: stage === 2 ? 1 : 0.3 }}
      >
        Delivered & Supported
      </motion.div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-[#FFFFFF] py-24 md:py-32 px-6">
      <div className="text-center max-w-4xl mx-auto mb-20 text-balance">
        <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#2563EB] bg-[#2563EB]/5 px-4 py-1.5 rounded-full mb-6 border border-[#2563EB]/15">
          How It Works
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0F0F0F] leading-[1.1] mb-6 tracking-tight">
          Three simple steps to <br className="hidden md:block" />
          <span className="text-[#2563EB]">
            InfozaTech
          </span>
        </h2>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          No complex setup. Just share your idea and let InfozaTech do the heavy lifting to turn your vision into reality.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {steps.map((item, index) => (
          <div key={index} className="flex flex-col h-full group">
            <div className="relative aspect-[16/10] w-full bg-[#0F0F0F] rounded-[2rem] overflow-hidden mb-10 shadow-md">
              {item.videoUrl ? (
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
              ) : index === 0 ? (
                <CardAnimation />
              ) : index === 1 ? (
                <DesignAnimation />
              ) : (
                <DeliveryAnimation />
              )}
            </div>

            <div className="flex flex-col flex-grow mt-2">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#2563EB]/5 flex items-center justify-center text-[#2563EB] font-bold text-base transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:shadow-md">
                  {item.step}
                </div>

                <div className="flex flex-col text-balance">
                  <h3 className="text-lg md:text-xl md:text-2xl font-bold text-[#0F0F0F] leading-tight mb-3 transition-colors duration-300 group-hover:text-[#2563EB]">
                    {item.subtitle}
                  </h3>
                  
                  <p className="text-[#64748b] text-[15px] md:text-base leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
