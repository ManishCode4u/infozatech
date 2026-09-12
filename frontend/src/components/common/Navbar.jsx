import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight, Home } from "lucide-react";
import logo from "../../assets/images/logo/infozatech-logo.png";
import { getCachedInternshipSettings } from "../../services/settingsData";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [applyUrl, setApplyUrl] = useState(() => getCachedInternshipSettings().applyUrl);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      setApplyUrl(getCachedInternshipSettings().applyUrl);
    };
    window.addEventListener('internship_settings_updated', handleUpdate);
    return () => window.removeEventListener('internship_settings_updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper for Contact
  const handleContactClick = (e) => {
    e.preventDefault();
    setOpen(false);
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  };

  const navLinks = [
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Our Work", path: "/projects" },
    { title: "How It Works", path: "/how-it-works" },
    { title: "Careers", path: "/careers" },
    { title: "Contact", path: "/contact", isContact: true }
  ];

  return (
    <>
      {/* ──────────────────────────────────────────────────────── */}
      {/* DESKTOP NAVBAR: Visible on md screens and above */}
      {/* ──────────────────────────────────────────────────────── */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 w-full pt-4 px-4 transition-all duration-300">
        <div 
          className={`mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12 flex items-center justify-between ${
            scrolled 
              ? "bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-sm py-3" 
              : "bg-transparent border border-transparent py-4"
          }`}
        >
          {/* Left Side: Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src={logo} 
              alt="InfozaTech Logo" 
              className="h-[42px] w-auto object-contain" 
            />
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={link.isContact ? handleContactClick : undefined}
                  className={`text-[15px] font-medium transition-colors duration-200 ${
                    isActive ? "text-[#5B4BFF] font-semibold" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Desktop Actions */}
          <div className="flex items-center">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2563EB] text-white hover:bg-[#1d4ed8] px-6 py-2.5 rounded-full text-[14px] font-bold transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              Apply Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* MOBILE NAVBAR: Visible only on mobile screens (below md) */}
      {/* ──────────────────────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 w-full bg-transparent font-sans px-4 mt-4">
        <div className="max-w-[1280px] w-full mx-auto bg-[#111111] h-[72px] rounded-full pl-[28px] pr-[16px] flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="InfozaTech Logo" 
              className="h-[36px] w-auto object-contain" 
            />
          </Link>

          {/* Right Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-slate-900 border border-slate-800 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer */}
      {open && (
        <div 
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
        />
      )}

      <div 
        className={`fixed inset-y-0 right-0 z-50 w-[280px] bg-black text-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header with Logo & Close */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-900">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="InfozaTech Logo" 
              className="h-[32px] w-auto object-contain" 
            />
          </Link>
          <button 
            onClick={() => setOpen(false)} 
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white bg-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Home Link */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-sm font-semibold py-2.5 border-b border-slate-900 text-slate-300 hover:text-[#DFFF00] transition-colors"
        >
          <Home className="w-4.5 h-4.5 text-slate-400" /> Home
        </Link>

        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          
          if (link.hasDropdown) {
            return (
              <div key={link.path} className="flex flex-col border-b border-slate-900 py-2">
                <span className="text-sm font-semibold text-slate-400">
                  {link.title}
                </span>
                <div className="pl-4 flex flex-col gap-3 mt-3 mb-1">
                  <Link to="/services" onClick={() => setOpen(false)} className="text-xs font-medium text-slate-400 hover:text-[#DFFF00] transition-colors">AI Automation</Link>
                  <Link to="/services" onClick={() => setOpen(false)} className="text-xs font-medium text-slate-400 hover:text-[#DFFF00] transition-colors">Mobile Development</Link>
                  <Link to="/services" onClick={() => setOpen(false)} className="text-xs font-medium text-slate-400 hover:text-[#DFFF00] transition-colors">Web Applications</Link>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={link.isContact ? handleContactClick : () => setOpen(false)}
              className={`text-sm font-semibold py-2.5 border-b border-slate-900 transition-colors ${
                isActive ? "text-[#DFFF00] font-bold" : "text-slate-300 hover:text-[#DFFF00]"
              }`}
            >
              {link.title}
            </Link>
          );
        })}
        
        {/* Book a Call button inside Drawer */}
        <div className="flex items-center justify-center pt-6 mt-auto">
          <a
            href="tel:+919155596712"
            onClick={() => setOpen(false)}
            className="bg-[#2563EB] text-white hover:bg-[#1d4ed8] px-5 py-3 rounded-full text-sm font-bold w-full text-center shadow-md shadow-blue-500/20 transition-all duration-200"
          >
            Book a Call
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;