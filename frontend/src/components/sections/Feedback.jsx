"use client"

import * as React from "react"
import { CardStack, ReviewStars } from "@/components/blocks/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// User-provided Testimonials / Feedback
const TESTIMONIALS = [
  {
    id: "testimonial-3",
    name: "James S.",
    profession: "Founder, TechScale",
    rating: 5,
    description:
      "InfozaTech's innovative solutions and quick turnaround time made our collaboration incredibly successful. Highly recommended!",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: "testimonial-1",
    name: "Jessica H.",
    profession: "CEO, DevConnect",
    rating: 4.5,
    description:
      "The attention to detail and user experience they brought to our platform was exceptional. Completely transformed our business.",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "testimonial-2",
    name: "Lisa M.",
    profession: "Product Manager",
    rating: 5,
    description:
      "Working with them was a game-changer for our project. Their expertise in modern tech stacks exceeded expectations.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "testimonial-4",
    name: "Jane D.",
    profession: "Startup Founder",
    rating: 4.5,
    description:
      "The quality of code, scalable architecture, and constant communication proved InfozaTech is the right engineering partner.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60",
  },
]

export default function TestimonialSection() {
  return (
    <section className="bg-white px-8 py-24 md:py-32 relative font-sans border-b border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-blue-50/20 blur-3xl pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-8">
        <div className="text-center md:text-left w-full md:w-1/2">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[3px] text-[#2563EB] bg-[#2563EB]/5 border border-[#2563EB]/15 px-4 py-1.5 rounded-full shadow-sm">
            ● Client Feedback
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F0F0F] leading-tight">
            Hear From The <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Founders</span> We've Worked With
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed font-medium mx-auto md:mx-0 max-w-md">
            Real feedback from innovative businesses leveraging our tech stack to scale their operations and reach new heights.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <CardStack 
            items={TESTIMONIALS}
            renderItem={(testimonial) => (
              <div className="flex flex-col h-full gap-4">
                <ReviewStars className="text-[#2563EB]" rating={testimonial.rating} />
                <div className="flex-1 mt-2">
                  <p className="text-slate-700 text-[15px] sm:text-base font-medium leading-relaxed">
                    "{testimonial.description}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                  <Avatar className="!size-12 border border-slate-300 shadow-sm">
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left flex flex-col">
                    <span className="block text-base font-bold tracking-tight text-[#0F0F0F]">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs uppercase tracking-wider font-bold text-slate-400">
                      {testimonial.profession}
                    </span>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
