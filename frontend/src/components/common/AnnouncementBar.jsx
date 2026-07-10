import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const AnnouncementBar = ({ isAtTop, onClose, isHome = false }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Home page hides announcement bar above lg (>=1024px), other pages hide it above md (>=768px)
      const isMobile = isHome ? width < 1024 : width < 768;
      
      if (isAtTop && isMobile) {
        document.body.classList.add("has-announcement");
      } else {
        document.body.classList.remove("has-announcement");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("has-announcement");
    };
  }, [isAtTop, isHome]);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    localStorage.setItem("announcementDismissed", "true");
    
    // Smoothly remove margins and close
    document.body.classList.remove("has-announcement");
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Link
      to="/startup-website-package"
      className={`relative flex items-center justify-center bg-[#2563EB] hover:bg-[#1d4ed8] px-8 text-white w-full select-none cursor-pointer transition-all duration-300 ease-in-out z-[1001] origin-top border-none shadow-none outline-none ${
        isAtTop 
          ? "h-16 md:h-10 opacity-100 py-3 md:py-2.5 -mb-[1px]" 
          : "h-0 opacity-0 py-0 overflow-hidden pointer-events-none"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-y-1 md:gap-y-0 gap-x-3 text-center max-w-6xl mx-auto px-4">
        {/* Orange Badge */}
        <span className="bg-[#F59E0B] text-white text-[8px] sm:text-[9px] md:text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm shrink-0">
          SPECIAL OFFER
        </span>
        
        {/* Exact Text from Screenshots */}
        <span className="text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide leading-normal">
          <span className="hidden md:inline">
            Build Your Website Today — Save Big with Our Limited-Time Offer!
          </span>
          <span className="inline md:hidden">
            Save Big With Our Limited-Time Offer
          </span>
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </Link>
  );
};

export default AnnouncementBar;
