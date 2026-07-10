"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Hexagon, Triangle, CircleDashed, Command, Anchor, Zap, Box, Sparkles } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

const Logos3 = () => {
  const logos = [
    { id: 1, name: "Acme Corp", Icon: Triangle },
    { id: 2, name: "Quantum", Icon: Command },
    { id: 3, name: "Nexus", Icon: Hexagon },
    { id: 4, name: "GlobalTech", Icon: CircleDashed },
    { id: 5, name: "Vanguard", Icon: Anchor },
    { id: 6, name: "Nova", Icon: Sparkles },
    { id: 7, name: "Stratos", Icon: Zap },
    { id: 8, name: "Horizon", Icon: Box },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-12 md:mt-20 mb-12 md:mb-16 z-20 relative bg-[#f8fafc] py-10 border-y border-slate-100/50">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-10">
        <div className="flex -space-x-3">
          <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://i.pravatar.cc/100?img=33" alt="Founder 1" />
          <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://i.pravatar.cc/100?img=47" alt="Founder 2" />
          <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://i.pravatar.cc/100?img=12" alt="Founder 3" />
        </div>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Trusted by <span className="font-bold text-slate-800">2,000+</span> founders and startups
        </p>
      </div>

      <div className="w-full relative mx-auto flex items-center justify-center lg:max-w-6xl">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 0.8 })]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/2 min-[400px]:basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 items-center"
              >
                <div className="mx-6 flex shrink-0 items-center justify-center gap-2 text-slate-400 hover:text-slate-800 transition-colors duration-300 group cursor-default">
                  <logo.Icon className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                  <span className="text-lg md:text-xl font-bold tracking-tight">{logo.name}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export { Logos3 };
