import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  ChevronDown, 
  BarChart3, 
  BookOpen, 
  Users, 
  Rocket, 
  Check,
  CheckCircle2, 
  ArrowRight,
  ArrowUpRight,
  Shield
} from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-5';


const MouseParticles = () => {
  const [mouseParticles, setMouseParticles] = useState([]);

  // Handle mouse movement to spawn particles
  const handleMouseMove = useCallback((e) => {
    if (Math.random() > 0.3) return; // Throttle spawning to avoid lag

    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 5 + 2,
      isGreen: Math.random() > 0.7,
      animX: (Math.random() - 0.5) * 50,
      animY: -50 - Math.random() * 50,
      duration: 1 + Math.random(),
    };

    setMouseParticles((prev) => [...prev.slice(-15), newParticle]); // keep max 15 particles

    // Remove particle after animation completes
    setTimeout(() => {
      setMouseParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1500);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      {mouseParticles.map((p) => (
        <motion.div
          key={p.id}
          className={`fixed rounded-full blur-[1px] z-50 pointer-events-none ${p.isGreen ? 'bg-[#2563EB] shadow-[0_0_10px_#2563EB]' : 'bg-blue-300 shadow-[0_0_10px_#93c5fd]'}`}
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            y: p.animY,
            x: p.animX,
            opacity: 0,
            scale: 0
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut"
          }}
        />
      ))}
    </>
  );
};

const MobileShowcase = () => {
  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center justify-center">
      {/* Background Decorative Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[450px] h-[220px] md:h-[450px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-[60px] md:blur-[80px] rounded-full pointer-events-none z-0" />

      {/* Main Wrapper for Mockups */}
      <div className="relative z-10 w-full flex items-center justify-center px-2 py-4">
        
        {/* Device Wrapper that encloses both Phone and Floating Cards */}
        <div className="relative">

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[220px] sm:w-[240px] lg:w-[240px] xl:w-[265px] aspect-[9/19.5] bg-black rounded-[36px] sm:rounded-[40px] lg:rounded-[48px] p-2 sm:p-2.5 lg:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-[5px] lg:border-[6px] border-slate-950 overflow-hidden flex flex-col z-10"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-1.5 sm:top-2 md:top-3.5 left-1/2 -translate-x-1/2 w-[70px] sm:w-[90px] lg:w-[100px] h-[15px] sm:h-[20px] lg:h-[24px] bg-black rounded-full z-30 flex items-center justify-center">
              {/* Camera dot */}
              <div className="absolute right-2 sm:right-3 w-1.5 h-1.5 rounded-full bg-slate-900/60" />
            </div>

            {/* Screen Content Wrapper */}
            <div className="relative flex-grow bg-slate-50 rounded-[26px] sm:rounded-[34px] lg:rounded-[36px] overflow-hidden flex flex-col p-3 sm:p-4 lg:p-5 pt-7 sm:pt-9 lg:pt-11">
              {/* Top Status Bar Mock */}
              <div className="absolute top-2 sm:top-2.5 inset-x-4 sm:inset-x-5 flex justify-between items-center text-[7px] sm:text-[9px] lg:text-[10px] font-bold text-slate-800 z-20 px-1">
                <span>9:41</span>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <svg className="w-2 sm:w-3.5 h-2 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3c-1.2 0-2.4.4-3.4 1.2L2.3 9.4c-.4.3-.4.9-.1 1.3l1.3 1.3c.3.3.9.3 1.3-.1L9 8.2V20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V8.2l4.2 3.7c.4.3.9.3 1.3-.1l1.3-1.3c.3-.4.3-.9-.1-1.3l-6.3-5.2C14.4 3.4 13.2 3 12 3z"/>
                  </svg>
                  <svg className="w-2 sm:w-3.5 h-2 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <div className="w-3.5 sm:w-4.5 h-1.5 sm:h-2.5 border border-slate-700 rounded-2xs p-px flex items-center justify-start">
                    <div className="w-1.5 sm:w-2.5 h-full bg-slate-700 rounded-3xs" />
                  </div>
                </div>
              </div>

              {/* Back Button and More Button */}
              <div className="flex items-center justify-between mt-1 sm:mt-2 mb-2 sm:mb-3">
                <button className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-3xs border border-slate-100/80">
                  <svg className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-3xs border border-slate-100/80">
                  <svg className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                </button>
              </div>

              {/* App Screen Header */}
              <h4 className="text-slate-800 font-bold text-xs sm:text-base lg:text-lg tracking-tight mb-1.5 sm:mb-2.5">Work Progress</h4>

              {/* Pills Selector */}
              <div className="bg-slate-200/60 p-0.5 rounded-full flex items-center gap-0.5 mb-2.5 sm:mb-3.5">
                <button className="flex-1 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-[7px] sm:text-[9px] lg:text-[10px] font-semibold text-slate-500 hover:text-slate-800">Day</button>
                <button className="flex-1 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-[7px] sm:text-[9px] lg:text-[10px] font-bold bg-white text-slate-800 shadow-3xs">Weekly</button>
                <button className="flex-1 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-[7px] sm:text-[9px] lg:text-[10px] font-semibold text-slate-500 hover:text-slate-800">Monthly</button>
              </div>

              {/* Chart Graphic Area */}
              <div className="relative h-20 sm:h-28 lg:h-32 flex items-end justify-between gap-1.5 sm:gap-2.5 lg:gap-3 bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-3xs mb-3 sm:mb-4">
                
                {/* Overlay blue tag pointing to a bar */}
                <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white font-bold text-[6px] sm:text-[9px] lg:text-[10px] py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-md sm:rounded-lg shadow-md z-10 flex flex-col items-center">
                  <span>120 Tasks</span>
                  <div className="w-1 h-1 bg-[#2563EB] rotate-45 -mb-0.5 mt-0.5" />
                </div>

                {/* Grid Lines inside chart */}
                <div className="absolute inset-x-0 inset-y-4 sm:inset-y-6 flex flex-col justify-between pointer-events-none opacity-[0.05]">
                  <div className="h-px bg-slate-800 w-full" />
                  <div className="h-px bg-slate-800 w-full" />
                </div>

                {/* Bars */}
                <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-10 sm:h-16 lg:h-20 flex items-end">
                    <div className="w-full bg-slate-300 rounded-full h-[65%]" />
                  </div>
                  <span className="text-[6px] sm:text-[8px] text-slate-400 font-bold">Mon</span>
                </div>

                <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-10 sm:h-16 lg:h-20 flex items-end">
                    <div className="w-full bg-slate-300 rounded-full h-[40%]" />
                  </div>
                  <span className="text-[6px] sm:text-[8px] text-slate-400 font-bold">Tue</span>
                </div>

                <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-10 sm:h-16 lg:h-20 flex items-end">
                    <div className="w-full bg-blue-500 rounded-full h-[85%] shadow-[0_4px_12px_rgba(37,99,235,0.25)]" />
                  </div>
                  <span className="text-[6px] sm:text-[8px] text-blue-600 font-bold">Wed</span>
                </div>

                <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-10 sm:h-16 lg:h-20 flex items-end">
                    <div className="w-full bg-slate-300 rounded-full h-[55%]" />
                  </div>
                  <span className="text-[6px] sm:text-[8px] text-slate-400 font-bold">Thu</span>
                </div>

                <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-10 sm:h-16 lg:h-20 flex items-end">
                    <div className="w-full bg-slate-300 rounded-full h-[70%]" />
                  </div>
                  <span className="text-[6px] sm:text-[8px] text-slate-400 font-bold">Fri</span>
                </div>

              </div>

              {/* Recent Activity List (Inside phone) */}
              <div className="flex-grow flex flex-col justify-start">
                <span className="text-[8px] sm:text-[10px] lg:text-[11px] font-bold text-slate-800 mb-1.5 sm:mb-2 text-left">Project Updates</span>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  {/* Alex */}
                  <div className="flex items-center justify-between p-1.5 bg-white rounded-xl border border-slate-100/50 shadow-3xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 rounded-full overflow-hidden bg-slate-250">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" className="object-cover w-full h-full" alt="" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-bold text-slate-800">UI Design Approved</span>
                        <span className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-400 font-semibold">Alex (Lead Designer)</span>
                      </div>
                    </div>
                    <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-black text-emerald-600">Done</span>
                  </div>

                  {/* Netflix */}
                  <div className="flex items-center justify-between p-1.5 bg-white rounded-xl border border-slate-100/50 shadow-3xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center bg-rose-50 text-rose-600 font-bold text-[7px] sm:text-[9px]">
                        D
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-bold text-slate-800">Prod Deployment</span>
                        <span className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-400 font-semibold">Vercel Pipeline</span>
                      </div>
                    </div>
                    <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-black text-slate-800">Live</span>
                  </div>

                  {/* John */}
                  <div className="flex items-center justify-between p-1.5 bg-white rounded-xl border border-slate-100/50 shadow-3xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 rounded-full overflow-hidden bg-slate-250">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" className="object-cover w-full h-full" alt="" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-bold text-slate-800">API Integration</span>
                        <span className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-400 font-semibold">John (Backend Dev)</span>
                      </div>
                    </div>
                    <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-black text-slate-800">Done</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Floating 347.25% Badge above the Left Card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="absolute left-[-40px] sm:left-[-60px] lg:left-[-50px] xl:left-[-60px] top-[16%] lg:top-[18%] z-30 bg-[#ECFDF5] lg:bg-white border border-emerald-150 lg:border-slate-100 text-emerald-700 lg:text-slate-800 font-extrabold text-[8px] sm:text-[10px] lg:text-xs px-2 py-0.5 lg:pl-1 lg:pr-3 lg:py-1 rounded-full shadow-3xs lg:shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center gap-1 pointer-events-auto hover:scale-105 transition-transform duration-300"
          >
            <span className="lg:hidden text-emerald-600 font-bold">↗</span>
            <span className="hidden lg:flex w-5 h-5 rounded-full bg-[#ECFDF5] items-center justify-center text-emerald-600 font-extrabold text-xs mr-0.5">
              ↑
            </span>
            347.25%
          </motion.div>

          {/* Left Floating Card - Positioned relative to the Phone Container */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute left-[-50px] sm:left-[-70px] lg:left-[-60px] xl:left-[-75px] top-[30%] z-30 w-[100px] sm:w-[120px] lg:w-[110px] xl:w-[135px] bg-white border border-slate-100 rounded-xl lg:rounded-[24px] p-2 sm:p-3.5 xl:p-4 shadow-[0_18px_60px_rgba(17,17,17,0.08)] flex flex-col pointer-events-auto hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Top Growth Badge */}
            <div className="flex lg:hidden items-center gap-0.5 sm:gap-1 self-start bg-emerald-50 border border-emerald-100 text-emerald-700 px-1.5 sm:px-2.5 py-0.5 rounded-full mb-1.5 sm:mb-3">
              <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
              <span className="text-[6px] sm:text-[8px] md:text-[9px] font-extrabold">347% Speedup</span>
            </div>

            <div className="flex items-center gap-1 mb-0.5 justify-start text-left">
              <span className="text-[7px] sm:text-[9px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-wider text-left">Projects Built</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 font-normal">ⓘ</span>
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-800 text-left">120+ Done</span>

            {/* Bottom Growth Arrow Badge */}
            <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5 text-[7px] sm:text-[9px] font-bold text-emerald-500 lg:text-emerald-600 lg:bg-[#ECFDF5] lg:px-2 lg:py-0.5 lg:rounded-full lg:w-fit">
              <svg className="w-2 sm:w-3.5 h-2 sm:h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
              <span>100% Success</span>
            </div>
          </motion.div>

          {/* Right Floating Card 1 - Positioned relative to the Phone Container */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute right-[-50px] sm:right-[-70px] lg:right-[-60px] xl:right-[-75px] top-[20%] z-20 w-[100px] sm:w-[120px] lg:w-[110px] xl:w-[135px] bg-white border border-slate-100 rounded-xl lg:rounded-[24px] p-2 sm:p-3.5 xl:p-4 shadow-[0_18px_60px_rgba(17,17,17,0.08)] flex flex-col pointer-events-auto hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center gap-1 mb-0.5 justify-start text-left">
              <span className="text-[7px] sm:text-[9px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-wider text-left">Client Rating</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 font-normal">ⓘ</span>
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-800 text-left">4.9 / 5.0★</span>
          </motion.div>

          {/* Right Floating Card 2: Avatars card */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute right-[-50px] sm:right-[-70px] lg:right-[-60px] xl:right-[-75px] top-[50%] z-20 bg-white border border-slate-100/80 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-[0_18px_60px_rgba(17,17,17,0.08)] flex items-center gap-1.5 pointer-events-auto hover:scale-105 transition-transform duration-300"
          >
            <div className="flex -space-x-1 sm:-space-x-1.5 overflow-hidden">
              <img className="inline-block h-3.5 w-3.5 sm:h-5 sm:w-5 rounded-full ring-1 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" alt="" />
              <img className="inline-block h-3.5 w-3.5 sm:h-5 sm:w-5 rounded-full ring-1 ring-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&auto=format&fit=crop&q=80" alt="" />
              <img className="inline-block h-3.5 w-3.5 sm:h-5 sm:w-5 rounded-full ring-1 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" alt="" />
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#DFFF00]" />
              <span className="text-[7px] sm:text-[9px] lg:text-[10px] font-bold text-slate-800">5.5K+</span>
            </div>
          </motion.div>

          {/* Floating circular arrow-up-right button */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
            className="absolute right-[-20px] sm:right-[-28px] lg:right-[-50px] xl:right-[-75px] bottom-[15%] z-30"
          >
            <button className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-150 shadow-md hover:shadow-lg flex items-center justify-center text-slate-800 hover:-translate-y-0.5 transition-all duration-300">
              <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5H8M19 5V16"/></svg>
            </button>
          </motion.div>

        </div>

      </div>
      {/* Desktop-only: View all transactions → link directly below the phone mockup */}
      <div className="hidden lg:block text-center z-30 relative mt-4">
        <a href="#projects" className="text-xs font-bold text-[#5B4BFF] hover:text-[#4a3ae6] hover:underline flex items-center justify-center gap-0.5">
          View all projects <span className="font-extrabold">→</span>
        </a>
      </div>
    </div>
  );
};

const Home = () => {

  // Smooth scroll helper for Booking a Call / starting project
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '#contact';
    }
  };

  // --- START ORIGINAL ANIMATIONS CODE ---
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate ambient floating particles
    setParticles(
      Array.from({ length: 30 }).map(() => ({
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
        isGreen: Math.random() > 0.7,
        animX: (Math.random() - 0.5) * 50,
      }))
    );
  }, []);
  // --- END ORIGINAL ANIMATIONS CODE ---

  return (
    <>
      {/* Desktop Hero Section (lg and above) */}
      <div className="hidden lg:block w-full">
        <HeroSection />
      </div>

      {/* Mobile/Tablet Hero Section (below lg) */}
      <div className="block lg:hidden w-full">
        <div 
          className="min-h-screen text-black overflow-x-hidden relative font-sans bg-white flex flex-col justify-between pt-28 sm:pt-32 pb-12"
          style={{ backgroundImage: 'radial-gradient(circle at center, rgba(91, 75, 255, 0.03) 0%, rgba(255, 255, 255, 0) 70%)' }}
        >
          {/* Two-Column Hero Content Grid Section */}
          <section className="relative z-20 w-full max-w-[1280px] mx-auto flex-grow flex flex-col items-center justify-between px-6 gap-8 h-auto my-auto">
            
            {/* Left Column */}
            <div className="w-full flex flex-col items-center text-center justify-center h-full mt-4">
              
              {/* Sub-badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2 mb-4 bg-[#F5F5F7] h-10 px-[18px] rounded-full shadow-2xs">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-200/50 text-slate-700">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-[#6B7280] tracking-wide">Develop it from Best</span>
              </div>

              {/* Main Heading */}
              <h1 
                className="animate-fade-in-up text-[28px] sm:text-4xl md:text-5xl font-bold text-[#111111] max-w-[620px] mb-3"
                style={{ opacity: 0, animationDelay: '0.2s' }}
              >
                Building Digital Products
                <span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-emerald-150 text-emerald-700 font-extrabold text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-0.75 rounded-full align-middle ml-1.5 sm:ml-3 shadow-3xs">
                  <span className="text-emerald-600">↗</span> 10x Speed
                </span>
                <br /> That Matter & Help You Grow
              </h1>

              {/* Subheading */}
              <p 
                className="animate-fade-in-up text-xs sm:text-sm md:text-base font-normal text-[#6B7280] max-w-[560px] mt-[16px] mb-4"
                style={{ opacity: 0, animationDelay: '0.3s' }}
              >
                We design and build powerful websites, applications, and startup solutions that help businesses grow faster.
              </p>

              {/* CTA Buttons */}
              <div 
                className="animate-fade-in-up flex flex-row items-center justify-center gap-5 mt-[24px] mb-4"
                style={{ opacity: 0, animationDelay: '0.4s' }}
              >
                <button 
                  onClick={scrollToContact}
                  className="bg-[#DFFF00] hover:bg-[#cbe600] text-black h-[52px] px-[28px] rounded-full text-xs sm:text-sm font-semibold transition-all shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center justify-center gap-1 group"
                >
                  Start a Project
                </button>
                <button 
                  onClick={scrollToContact}
                  className="bg-[#5B4BFF] hover:bg-[#4a3ae6] text-white h-[52px] px-[28px] rounded-full text-xs sm:text-sm font-semibold transition-all shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center justify-center gap-1 group"
                >
                  Book a Call
                </button>
              </div>

            </div>

            {/* Right Column */}
            <div className="w-full flex items-center justify-center mt-6">
              <MobileShowcase />
            </div>

          </section>

          {/* 5. COMPANY LOGOS */}
          <div 
            className="animate-fade-in-up mt-8 text-center w-full relative z-10 px-6 pb-2"
            style={{ opacity: 0, animationDelay: '0.6s' }}
          >
            <div className="max-w-[1280px] w-full mx-auto bg-white py-[40px] px-6 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100/50">
              <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-[36px] pb-4 border-b border-slate-100 gap-2">
                <p className="text-[18px] text-[#111111] font-semibold text-center w-full">Trusted by Over 5,500+ Startups & Creators</p>
                <a href="#projects" className="text-xs font-bold text-[#5B4BFF] hover:text-[#4a3ae6] hover:underline flex items-center gap-0.5">
                  View all projects <span className="font-extrabold">→</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-[32px] gap-y-4 max-w-full mx-auto opacity-70">
                <span className="text-lg font-bold tracking-tight text-slate-400 select-none">Google</span>
                <span className="text-lg font-extrabold tracking-widest text-slate-400 select-none uppercase">Siemens</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5"><div className="bg-current" /><div className="bg-current" /><div className="bg-current" /><div className="bg-current" /></div>
                  <span className="text-base font-semibold tracking-tight">Microsoft</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.78a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.522h-5.043a2.528 2.528 0 0 1-2.52-2.522V3.78a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043zm-3.78 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v8.823a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/></svg>
                  <span className="text-base font-bold">slack</span>
                </div>
                <span className="text-base font-black tracking-widest text-slate-400 select-none uppercase font-mono">TESLA</span>
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="text-base font-bold select-none">Walmart</span>
                  <span className="text-[#FFC120] font-black text-sm">*</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M13.968 2L22 22H16.8L12 9.6L7.2 22H2L10.032 2H13.968Z"/></svg>
                  <span className="text-base font-bold">Adobe</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-3.5 h-4 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v8H12L0 20v4h24v-8H12L24 4V0z"/></svg>
                  <span className="text-base font-bold">Framer</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.74 11.23a5.4 5.4 0 0 0-.25-2.58 5.42 5.42 0 0 0-1.85-2.48l-.05-.03a5.39 5.39 0 0 0-2.8-.78 5.43 5.43 0 0 0-2.8.78l-.05.03a5.41 5.41 0 0 0-3.3 0l-.05-.03a5.42 5.42 0 0 0-2.8-.78c-.99 0-1.95.27-2.8.78l-.05.03A5.4 5.4 0 0 0 3.1 8.65c-.46.8-.71 1.7-.73 2.58a5.4 5.4 0 0 0 .25 2.58A5.42 5.42 0 0 0 4.47 16.3l.05.03c.8.46 1.7.71 2.8.73.99 0 1.95-.27 2.8-.78l.05-.03a5.4 5.4 0 0 0 3.3 0l.05.03c.8.46 1.7.71 2.8.73h.14a5.39 5.39 0 0 0 2.8-.78l.05-.03a5.42 5.42 0 0 0 1.88-2.48c.45-.81.69-1.72.7-2.6zm-8.4-5.23a3.59 3.59 0 0 1 1.8.49l.03.02-3.1 1.79c-.1.06-.2.13-.28.22l-2.43-1.4a3.61 3.61 0 0 1 3.98-1.12zM5.56 8.35a3.59 3.59 0 0 1 .84-1.63l2.43 1.4c.05.09.11.18.2.25v2.8L5.94 9.38a3.61 3.61 0 0 1-.38-1.03zm1.18 5.76a3.59 3.59 0 0 1-.84-1.63c-.02-.37.04-.74.18-1.08l3.1 1.79v2.8l-2.44-1.4c-.05-.09-.12-.17-.2-.25v-.23zm8.03 2.14a3.59 3.59 0 0 1-1.8-.49l-.03-.02 3.1-1.79c.1-.06.2-.13.28-.22l2.43 1.4a3.61 3.61 0 0 1-3.98 1.12zm4.44-3.11a3.59 3.59 0 0 1-.84 1.63l-2.43-1.4c-.05-.09-.11-.18-.2-.25v-2.8l3.09 1.79c.14.34.2.71.18 1.08v.23-.29zm-4.28-2.47l-3.1-1.79v-2.8l2.44 1.4c.05.09.12.17.2.25v2.94zm-1.8 1.04l-3.1-1.79c-.1-.06-.2-.11-.31-.15v-3.58a.5.5 0 0 1 .75-.43l3.1 1.79c.1.06.2.11.31.15v3.58a.5.5 0 0 1-.75.43z"/></svg>
                  <span className="text-base font-bold">OpenAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };

export default Home;