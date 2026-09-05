/* eslint-disable */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    step: "1",
    subtitle: "Enter Your Idea",
    desc: "Tell InfozaTech your startup idea. Get instant clarity on tech stack, roadmap, and what to build next.",
  },
  {
    step: "2",
    subtitle: "Get Instant Matches",
    desc: "InfozaTech finds the right dedicated developers, solutions, and architecture based on your project requirements.",
  },
  {
    step: "3",
    subtitle: "See Your Best Matches",
    desc: "View your customized development team and project blueprint ready to launch and scale rapidly.",
  },
];

// --- STEP 1: ENTER YOUR IDEA ANIMATION ---
const CardAnimation = () => {
  const [inputText, setInputText] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [key, setKey] = useState(0); 
  const fullInput = "I need a SaaS web app for my startup";

  useEffect(() => {
    let timeouts = [];
    let index = 0;
    setInputText("");
    setShowAnalysis(false);

    const interval = setInterval(() => {
      if (index <= fullInput.length) {
        setInputText(fullInput.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        timeouts.push(setTimeout(() => setShowAnalysis(true), 500));
        timeouts.push(setTimeout(() => {
          setKey(prev => prev + 1);
        }, 6000));
      }
    }, 55);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [key]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5 relative select-none">
      {/* Main Glass Input Pill */}
      <div className="w-full max-w-[280px] sm:max-w-[300px] h-12 bg-white/15 backdrop-blur-md rounded-full border border-white/25 pl-4 pr-1.5 flex items-center justify-between gap-2 shadow-lg shadow-blue-950/15">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="text-white flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
            </svg>
          </div>
          <span className="text-[12px] sm:text-[13px] text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {inputText}
            <span className="inline-block w-[2px] h-3 bg-white ml-0.5 animate-pulse align-middle" />
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2563EB] shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
          <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>

      {/* Sub-Pill: AI Analyzing */}
      <div className={`mt-4 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2 text-white/95 text-[11px] font-medium transition-all duration-500 shadow-sm ${showAnalysis ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z" />
        </svg>
        <span>Analyzing requirements & roadmap...</span>
      </div>
    </div>
  );
};

// --- STEP 2: CHAT & MATCHING ANIMATION ---
const DesignAnimation = () => {
  const [messages, setMessages] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeouts = [];
    setMessages([]);
    setShowMatch(false);

    timeouts.push(setTimeout(() => setMessages([1]), 350));
    timeouts.push(setTimeout(() => setMessages([1, 2]), 1200));
    timeouts.push(setTimeout(() => setMessages([1, 2, 3]), 2050));
    timeouts.push(setTimeout(() => setMessages([1, 2, 3, 4]), 2900));
    timeouts.push(setTimeout(() => setShowMatch(true), 3700));

    timeouts.push(setTimeout(() => {
      setKey(k => k + 1);
    }, 7800));

    return () => timeouts.forEach(clearTimeout);
  }, [key]);

  return (
    <div className="w-full h-full flex flex-col justify-between relative p-4 sm:p-5 overflow-hidden select-none">
      {/* Chat Messages Stream Area */}
      <div className="flex-1 w-full flex flex-col justify-start gap-2 pt-1 pb-1">
        <AnimatePresence>
          {messages.includes(1) && (
            <motion.div
              key="msg-1"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 w-full justify-start"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-white shadow-sm border border-white/20">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z" />
                </svg>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-3 py-1.5 flex flex-col gap-1 border border-white/25 shadow-sm min-w-[100px]">
                <div className="h-1.5 w-16 bg-white/85 rounded-full" />
                <div className="h-1.5 w-10 bg-white/60 rounded-full" />
              </div>
            </motion.div>
          )}

          {messages.includes(2) && (
            <motion.div
              key="msg-2"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 w-full justify-end"
            >
              <div className="bg-white/25 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center border border-white/30 shadow-sm min-w-[90px]">
                <div className="h-1.5 w-14 bg-white/90 rounded-full" />
              </div>
            </motion.div>
          )}

          {messages.includes(3) && (
            <motion.div
              key="msg-3"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 w-full justify-start"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-white shadow-sm border border-white/20">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z" />
                </svg>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-3 py-1.5 flex flex-col gap-1 border border-white/25 shadow-sm min-w-[100px]">
                <div className="h-1.5 w-18 bg-white/85 rounded-full" />
                <div className="h-1.5 w-12 bg-white/60 rounded-full" />
              </div>
            </motion.div>
          )}

          {messages.includes(4) && (
            <motion.div
              key="msg-4"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 w-full justify-end"
            >
              <div className="bg-white/25 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center border border-white/30 shadow-sm min-w-[95px]">
                <div className="h-1.5 w-16 bg-white/90 rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Matching Button */}
      <div className="w-full flex justify-center pt-1 pb-0.5 relative z-20">
        <AnimatePresence>
          {showMatch ? (
            <motion.div
              key="match-btn"
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[220px] py-2.5 px-4 bg-white rounded-full shadow-lg shadow-blue-950/20 flex items-center justify-center gap-2 text-[#2563EB] font-bold text-xs tracking-tight cursor-pointer hover:scale-105 transition-transform"
            >
              <span>View Your Matches</span>
              <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.div>
          ) : (
            <div className="h-9" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- STEP 3: MATCHING SCORES ANIMATION (Matches reference image) ---
const DeliveryAnimation = () => {
  const [activeCards, setActiveCards] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeouts = [];
    setActiveCards([]);

    timeouts.push(setTimeout(() => setActiveCards([1]), 350));
    timeouts.push(setTimeout(() => setActiveCards([1, 2]), 1100));
    timeouts.push(setTimeout(() => setActiveCards([1, 2, 3]), 1850));

    timeouts.push(setTimeout(() => {
      setKey(k => k + 1);
    }, 7000));

    return () => timeouts.forEach(clearTimeout);
  }, [key]);

  const matchItems = [
    { id: 1, score: "92%", width1: "w-20", width2: "w-12" },
    { id: 2, score: "87%", width1: "w-18", width2: "w-10" },
    { id: 3, score: "78%", width1: "w-20", width2: "w-12" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-5 relative select-none">
      <div className="w-full max-w-[270px] sm:max-w-[290px] flex flex-col gap-2.5">
        {matchItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ 
              opacity: activeCards.includes(item.id) ? 1 : 0.25, 
              y: activeCards.includes(item.id) ? 0 : 6,
              scale: activeCards.includes(item.id) ? 1 : 0.98
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full bg-white/15 backdrop-blur-md rounded-xl border border-white/20 p-2.5 px-3.5 flex items-center justify-between shadow-sm transition-all duration-300 ${activeCards.includes(item.id) ? 'hover:bg-white/20' : ''}`}
          >
            <div className="flex items-center gap-2.5">
              {/* Users Icon Badge */}
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#2563EB] flex-shrink-0 shadow-sm">
                <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className={`h-1.5 ${item.width1} bg-white/85 rounded-full`} />
                <div className={`h-1.5 ${item.width2} bg-white/50 rounded-full`} />
              </div>
            </div>

            {/* Score Percentage */}
            <div className="text-white font-bold text-xs tracking-tight">
              {item.score}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-[#FFFFFF] py-20 md:py-28 px-6">
      <div className="text-center max-w-4xl mx-auto mb-16 text-balance">
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#2563EB] bg-white px-6 py-1.5 rounded-full mb-6 border border-slate-200 shadow-sm">
          How It Works
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-medium text-[#1E293B] mb-4 tracking-tight">
          Three simple steps to <span className="text-[#2563EB]">InfozaTech</span>
        </h2>

        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-normal">
          No complex setup. Just tell us your idea and let InfozaTech do the heavy lifting.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((item, index) => (
          <div key={index} className="flex flex-col h-full group">
            {/* Box dimensions exactly matching reference image */}
            <div className="relative aspect-[1.35/1] sm:aspect-[1.38/1] md:aspect-[1.32/1] lg:aspect-[1.35/1] w-full bg-[#2563EB] rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden mb-6 shadow-xl shadow-blue-500/15 border border-blue-400/20">
              {index === 0 ? (
                <CardAnimation />
              ) : index === 1 ? (
                <DesignAnimation />
              ) : (
                <DeliveryAnimation />
              )}
            </div>

            <div className="flex flex-col flex-grow mt-1">
              <div className="flex items-start gap-3.5 mb-3">
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-300 ${index === 1 ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white'}`}>
                  {item.step}
                </div>

                <div className="flex flex-col text-balance">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F] leading-tight mb-2 transition-colors duration-300 group-hover:text-[#2563EB]">
                    {item.subtitle}
                  </h3>
                  
                  <p className="text-[#64748b] text-[13px] sm:text-[14px] leading-relaxed font-normal">
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
