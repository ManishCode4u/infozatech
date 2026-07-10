import React, { useRef, useState } from 'react';
import sakshiImg from '../../assets/images/SakshiMalik.jpeg';
import divyaImg from '../../assets/images/DivyaVarma.jpeg';

const teamMembers = [
  { name: 'Manish Gupta', role: 'Founder', img: '/images/founder_left.jpg', customClass: 'scale-[1.2] group-hover:scale-[1.3]' },
  { name: 'Sakshi Malik', role: 'Sales Executive', img: sakshiImg, objectPosition: 'center 25%' },
  { name: 'Satyam Singh', role: 'Lead Generation Executive', img: '/images/satyam_singh.jpg', customClass: 'origin-top scale-[1.1] group-hover:scale-[1.2]' },
  { name: 'Himanshu', role: 'Fullstack Developer', img: '/images/Himanshu-passport1.JPEG' },
  { name: 'Divya Varma', role: 'Sales Executive', img: divyaImg, objectPosition: 'center 25%' },
];

const OurTeam = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    // We calculate the active index based on how far we've scrolled
    const scrollPosition = scrollRef.current.scrollLeft;
    // On mobile, card width is ~80vw + gap. For simplicity, just divide total scrollable width
    const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const percentage = scrollWidth > 0 ? scrollPosition / scrollWidth : 0;
    
    // Convert percentage back to index
    let newIndex = Math.round(percentage * (teamMembers.length - 1));
    // Clamp
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= teamMembers.length) newIndex = teamMembers.length - 1;
    
    setActiveIndex(newIndex);
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const targetScroll = (index / (teamMembers.length - 1)) * scrollWidth;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="pt-6 md:pt-8 pb-20 md:pb-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 mb-3 text-xs font-semibold tracking-wider uppercase">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F0F0F]">Team Behind InfozaTech</h2>
        </div>
        
        {/* Slider Container with negative margin on mobile to allow edge-to-edge swipe but start padded */}
        <div className="-mx-6 md:mx-0">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-6 md:px-0 pb-4 md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="flex-none w-[75vw] sm:w-[50vw] md:w-auto snap-center md:snap-align-none relative group rounded-2xl overflow-hidden h-[340px] md:h-[280px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${member.customClass || 'group-hover:scale-110'}`}
                  style={{ objectPosition: member.objectPosition || 'top' }}
                />
                
                {/* Info Box */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] text-center group-hover:bg-white transition-colors duration-300">
                  <h3 className="text-base font-bold text-[#0F0F0F] leading-tight">{member.name}</h3>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
            
            {/* Right padding hack for final slide to align correctly on mobile */}
            <div className="flex-none w-[6vw] md:hidden"></div>
          </div>
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-4">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'w-6 h-2 bg-[#2563EB]' 
                  : 'w-2 h-2 bg-slate-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
      
      {/* Hide scrollbar for webkit (Chrome/Safari) via style block to ensure it works */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default OurTeam;
