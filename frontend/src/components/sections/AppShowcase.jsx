/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../ui/scroll-reveal';

// Import local assets
import app2 from '../../assets/images/demo/app2.png';
import app3 from '../../assets/images/demo/app3.png';

const DEMO_APPS = [
  {
    id: 1,
    title: "Instagram Reel 1",
    subtitle: "Latest Updates",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=800", // Instagram-style placeholder thumbnail
    instagramUrl: "https://www.instagram.com/reel/DYBepkCAPEo/?utm_source=ig_web_copy_link",
  },
  {
    id: 2,
    title: "Health Tracker",
    subtitle: "Personal Wellness Assistant",
    image: app2,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 3,
    title: "Glamour Store",
    subtitle: "Premium Fashion E-commerce",
    image: app3,
    color: "from-rose-500 to-pink-600"
  },
  {
    id: 4,
    title: "EduPulse",
    subtitle: "Interactive Learning Platform",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 5,
    title: "SecureGuard",
    subtitle: "Enterprise Security Monitor",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    color: "from-slate-700 to-slate-900"
  },
  {
    id: 6,
    title: "EcoConnect",
    subtitle: "Sustainable Lifestyle App",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
    color: "from-green-500 to-emerald-700"
  }
];

const AppShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      startIndex: Math.floor(DEMO_APPS.length / 2),
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-16 px-4">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-500 bg-white px-6 py-1.5 rounded-full mb-6 border border-slate-200 shadow-sm">
              Social Presence
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-medium text-[#1E293B] mb-4 tracking-tight">
              Trusted by 130k+ People
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Slider Viewport */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing py-10" ref={emblaRef}>
            <div className="flex items-center">
              {DEMO_APPS.map((app, index) => {
                const isActive = index === selectedIndex;
                return (
                  <div
                    key={app.id}
                    className="flex-[0_0_65%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_26%] select-none flex justify-center"
                  >
                    {app.instagramUrl ? (
                      <a 
                        href={app.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex justify-center group cursor-pointer"
                      >
                        <div
                          className={`relative w-full aspect-[4/5] sm:aspect-[9/16] rounded-3xl overflow-hidden bg-slate-100 ${isActive ? 'max-w-[320px] scale-100 shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-20' : 'max-w-[320px] scale-[0.80] opacity-90 shadow-md z-10'} mx-auto origin-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                        >
                          <img
                            src={app.image}
                            alt="Instagram Reel"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Instagram Play Icon Overlay */}
                          <div className={`absolute inset-0 flex items-center justify-center bg-black/10 transition-all duration-500 ${isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 text-pink-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div
                        className={`relative w-full aspect-[4/5] sm:aspect-[9/16] rounded-3xl overflow-hidden bg-slate-100 ${isActive ? 'max-w-[320px] scale-100 shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-20' : 'max-w-[320px] scale-[0.80] opacity-90 shadow-md z-10'} group mx-auto origin-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                      >
                        {app.video ? (
                          <video
                            src={app.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={app.image}
                            alt={app.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls & Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6 pb-12">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    selectedIndex === index ? 'w-8 bg-slate-800' : 'w-2.5 bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling Marquee Section */}
      <div className="relative w-full overflow-hidden bg-[#0F0F0F] border-y border-slate-800 py-4 sm:py-5 mt-16 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        {/* Shimmer Flash Effect */}
        <div className="absolute top-0 left-0 h-full w-[80px] md:w-[120px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-20 animate-shimmer-sweep pointer-events-none"></div>

        {/* Fade effect edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee-left w-max items-center">
          <div className="flex items-center text-slate-300">
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default">Develop it from Best</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default">Develop it Once</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">InfozaTech</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default">Startup Solutions</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center text-slate-300" aria-hidden="true">
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default">Develop it from Best</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default">Develop it Once</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">InfozaTech</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
            <span className="text-lg md:text-xl font-bold mx-8 hover:text-white transition-colors cursor-default">Startup Solutions</span>
            <span className="text-[#2563EB] mx-4 md:mx-6 text-lg">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
