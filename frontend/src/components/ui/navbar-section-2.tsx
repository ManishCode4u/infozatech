"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  Home,
  Info,
  Briefcase,
  Layers,
  Cpu,
  BookOpen,
  Users,
  HelpCircle,
  Shield,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Code2,
  Smartphone,
  Bot,
  Scale,
} from "lucide-react";
import logo from "../../assets/images/logo/infozatech-logo.png";
import { getCachedInternshipSettings } from "../../services/settingsData";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/projects" },
  { label: "Internship", href: "/internship" },
  { label: "Careers", href: "/careers" },
];

const mainNavLinks = [
  { label: "Home", href: "/", icon: Home, desc: "Welcome & overview" },
  { label: "About InfozaTech", href: "/about", icon: Info, desc: "Our team, vision & values" },
  { label: "Our Work / Projects", href: "/projects", icon: Briefcase, desc: "Featured client builds" },
  { label: "Portfolio Gallery", href: "/portfolio", icon: Layers, desc: "Interactive project showcase" },
  { label: "How It Works", href: "/how-it-works", icon: CheckCircle2, desc: "Our 4-step agile process" },
  { label: "Careers", href: "/careers", icon: Users, badge: "We're Hiring", desc: "Join our engineering team" },
  { label: "Verify Certificate", href: "/verify", icon: Shield, desc: "Instant credential verification" },
  { label: "Blog & Insights", href: "/blog", icon: BookOpen, desc: "Tech articles & guides" },
  { label: "Clients & Partners", href: "/clients", icon: Users, desc: "Trusted by founders" },
  { label: "Frequently Asked Questions", href: "/faq", icon: HelpCircle, desc: "Common questions & answers" },
  { label: "Contact Us", href: "/contact", icon: PhoneCall, desc: "Get a free consultation" },
];

const serviceSubItems = [
  { label: "All Services & Solutions", href: "/services", icon: Cpu, desc: "Complete services catalog" },
  { label: "Web Application Development", href: "/services", icon: Code2, desc: "React, Next.js, Custom SaaS" },
  { label: "Mobile App Development", href: "/services", icon: Smartphone, desc: "iOS & Android solutions" },
  { label: "AI & Autonomous Systems", href: "/services", icon: Bot, desc: "Custom AI agents & automations" },
];

/**
 * Modern White Pill Navigation Bar:
 * - Rounded full floating capsule container
 * - Blue InfozaTech Logo on left with blue-glow hamburger button
 * - Inner white capsule with direct navigation links
 * - Blue capsule CTA button on right ("Apply Now")
 * - Smart scroll: hides on scroll down, shows on scroll up smoothly
 * - Full mega all-pages side drawer on click
 */
export function NavbarTwoHeader() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [applyUrl, setApplyUrl] = useState(() => getCachedInternshipSettings().applyUrl);

  useEffect(() => {
    const handleUpdate = () => {
      setApplyUrl(getCachedInternshipSettings().applyUrl);
    };
    window.addEventListener('internship_settings_updated', handleUpdate);
    return () => window.removeEventListener('internship_settings_updated', handleUpdate);
  }, []);

  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    services: false,
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isVisible, setIsVisible] = useState(() => (typeof window !== "undefined" ? location.pathname !== "/" || window.scrollY > 400 : false));

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const isCurrentHome = location.pathname === "/";
          const diff = currentY - lastY;

          setScrolled(currentY > 20);

          if (sideMenuOpen) {
            setIsVisible(true);
            lastY = currentY;
            ticking = false;
            return;
          }

          if (isCurrentHome) {
            const heroEl = document.getElementById("home-hero-section");
            const heroHeight = heroEl ? heroEl.offsetHeight - 80 : 450;

            if (currentY < heroHeight) {
              // Always hide white navbar on top black animation hero section
              setIsVisible(false);
            } else {
              // Below black hero section:
              if (diff > 8) {
                // Scrolling down -> HIDE navbar
                setIsVisible(false);
              } else if (diff < -8) {
                // Scrolling up -> SHOW navbar
                setIsVisible(true);
              }
            }
          } else {
            // Other pages:
            if (currentY <= 20) {
              setIsVisible(true);
            } else if (diff > 8) {
              // Scrolling down -> HIDE navbar
              setIsVisible(false);
            } else if (diff < -8) {
              // Scrolling up -> SHOW navbar
              setIsVisible(true);
            }
          }

          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Show navbar if cursor moves to the very top (<= 50px) when below hero or on any page
    const handleMouseMove = (e: MouseEvent) => {
      const isCurrentHome = location.pathname === "/";
      const currentY = window.scrollY;
      const heroEl = document.getElementById("home-hero-section");
      const heroHeight = heroEl ? heroEl.offsetHeight - 80 : 450;

      if (e.clientY <= 50) {
        if (!isCurrentHome || currentY >= heroHeight) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sideMenuOpen, location.pathname]);

  useEffect(() => {
    setSideMenuOpen(false);
  }, [location.pathname]);

  const closeAll = () => {
    setSideMenuOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSideMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full select-none pt-4 px-4 sm:px-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* DESKTOP NAVBAR (>=1024px) */}
      <div
        className="mx-auto hidden max-w-7xl items-center justify-between rounded-full bg-[#dbe0e7] px-3.5 py-2 border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 lg:flex"
      >
        {/* Left: Circle Menu (with glowing hover effect) & Logo */}
        <div className="flex items-center gap-3 pl-1">
          <button
            type="button"
            onClick={() => setSideMenuOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-xs border border-white transition-all duration-300 hover:scale-110 hover:border-blue-500 hover:text-blue-600 hover:shadow-[0_0_25px_rgba(37,99,235,0.8),inset_0_0_8px_rgba(59,130,246,0.2)] active:scale-95 cursor-pointer group"
            aria-label="Open all pages menu"
            title="Explore All Pages"
          >
            <Menu className="size-4.5 stroke-[2.2] transition-transform duration-300 group-hover:rotate-90 text-slate-800 group-hover:text-blue-600" />
          </button>
          <Link to="/" onClick={closeAll} className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <img src={logo} alt="InfozaTech Logo" className="h-[46px] w-auto object-contain drop-shadow-xs" />
          </Link>
        </div>

        {/* Center: Inner Pure White Pill with Direct Nav Links */}
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-1.5 rounded-full bg-white px-7 py-2.5 border border-white shadow-xs text-[14px] font-medium text-slate-800">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={closeAll}
                className={`rounded-full px-4 py-1.5 transition-all duration-200 ${
                  location.pathname === item.href
                    ? "bg-slate-100 text-blue-600 font-semibold shadow-xs"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Sleek Blue Capsule Button ("Apply Now") */}
        <div className="flex items-center gap-2 pr-1">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-[14px] sm:text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="size-4 text-blue-200" />
            <span>Apply Now</span>
          </a>
        </div>
      </div>

      {/* MOBILE NAVBAR (<1024px) */}
      <div className="mx-auto flex h-14 sm:h-15 w-full max-w-md items-center justify-between rounded-full bg-white px-3.5 backdrop-blur-md border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)] lg:hidden">
        {/* Left: Brand Logo */}
        <Link to="/" onClick={closeAll} className="flex items-center gap-1.5 pl-1.5 transition-transform active:scale-95">
          <img src={logo} alt="InfozaTech Logo" className="h-[40px] w-auto object-contain" />
        </Link>

        {/* Right: 3-line Menu Button */}
        <button
          type="button"
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-800 shadow-xs border border-slate-200 transition-all duration-300 hover:scale-110 hover:border-blue-500 hover:text-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] active:scale-95 cursor-pointer"
          aria-label="Toggle menu"
        >
          {sideMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </div>

      {/* ALL-PAGES SIDE MEGA DRAWER */}
      <AnimatePresence>
        {sideMenuOpen && (
          <>
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeAll}
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Sliding Drawer Panel from Left (< 50% width on desktop, 370px) with Clean White Theme */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed top-0 left-0 bottom-0 z-[101] flex h-screen w-[340px] sm:w-[380px] max-w-[88vw] flex-col bg-white shadow-2xl border-r border-slate-200/80 font-sans text-slate-800"
            >
              {/* Drawer Header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5 bg-white">
                <Link to="/" onClick={closeAll} className="flex items-center gap-2">
                  <img
                    src={logo}
                    alt="InfozaTech Logo"
                    className="h-9 w-auto max-w-[150px] object-contain drop-shadow-xs"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeAll}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="size-4.5 stroke-[2.2]" />
                </button>
              </div>

              {/* Drawer Body - Clean Scrollable Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {/* 1. Home */}
                <Link
                  to="/"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Home</span>
                  {location.pathname === "/" && (
                    <span className="size-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                  )}
                </Link>

                {/* 2. Services (Expandable Accordion) */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup("services")}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 cursor-pointer ${
                      location.pathname.startsWith("/services")
                        ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`size-4 text-slate-400 transition-transform duration-200 ${
                        expandedGroups.services ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedGroups.services && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 ml-2 border-l border-blue-200 space-y-1 py-1"
                      >
                        {[
                          { label: "All Services & Solutions", href: "/services" },
                          { label: "Web Application Development", href: "/services" },
                          { label: "Mobile App Development", href: "/services" },
                          { label: "AI & Autonomous Systems", href: "/services" },
                          { label: "Custom Software Solutions", href: "/services" },
                        ].map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            onClick={closeAll}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-[13.5px] text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
                          >
                            <span>{subItem.label}</span>
                            <ChevronRight className="size-3 text-slate-400" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Our Projects */}
                <Link
                  to="/projects"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/projects"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Our Projects</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 4. Portfolio Gallery */}
                <Link
                  to="/portfolio"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/portfolio"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Portfolio Gallery</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 5. How It Works */}
                <Link
                  to="/how-it-works"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/how-it-works"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>How It Works</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 6. Virtual Internship */}
                <Link
                  to="/internship"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/internship"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Virtual Internship</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
                      <Sparkles className="size-2.5 text-blue-600" />
                      1 Month
                    </span>
                  </div>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 7. Careers & Jobs */}
                <Link
                  to="/careers"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/careers"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Careers / Jobs</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Hiring
                    </span>
                  </div>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 7. About Us */}
                <Link
                  to="/about"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/about"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>About Us</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 8. Blog & Insights */}
                <Link
                  to="/blog"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/blog"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Tech Blog</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 9. FAQs */}
                <Link
                  to="/faq"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/faq"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>FAQs</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>

                {/* 10. Contact Us */}
                <Link
                  to="/contact"
                  onClick={closeAll}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15.5px] font-medium transition-all duration-200 ${
                    location.pathname === "/contact"
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200/80 shadow-xs"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Contact Us</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>
              </div>

              {/* Drawer Footer */}
              <div className="shrink-0 border-t border-slate-100 p-4 bg-slate-50/80 backdrop-blur-md">
                <a
                  href="tel:+919155596712"
                  onClick={closeAll}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 py-3.5 text-center text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  <span>Book a Call</span>
                  <ArrowUpRight className="size-4.5 stroke-[2.2]" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Full Showcase & Hero Section with InfozaTech Branding
 */
export default function NavbarTwo() {
  return (
    <div className="relative flex min-h-[720px] w-full select-none flex-col items-center overflow-hidden bg-slate-50 px-6 pb-6 pt-0 font-sans text-slate-900 transition-colors duration-300">
      <NavbarTwoHeader />

      {/* Hero Showcase Content */}
      <div className="relative z-10 mt-24 w-full max-w-[760px] text-center lg:mt-28">
        <div className="flex flex-col items-center px-6 pt-6">
          <Link
            to="/careers"
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 shadow-sm transition-colors hover:text-black hover:border-slate-300"
          >
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              We&apos;re Hiring
            </span>
            Join our Engineering & Design Team
            <ArrowRight className="size-3 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-black" />
          </Link>

          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            Scale 10x Faster with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InfozaTech
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-center text-sm leading-relaxed text-slate-600 md:text-lg">
            We build high-performance web apps, mobile solutions, and autonomous AI agents designed to transform your business.
          </p>

          <div className="mb-10 mt-7 flex flex-row flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="flex min-w-[150px] items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-[1.02] md:text-base"
            >
              Start Building
            </Link>
            <Link
              to="/services"
              className="flex min-w-[150px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 md:text-base"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Graphic */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="InfozaTech Dashboard Preview"
            className="h-auto w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />
        </div>
      </div>
    </div>
  );
}
