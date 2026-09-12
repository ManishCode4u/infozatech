import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchInternshipSettings,
  getCachedInternshipSettings
} from '../services/settingsData';
import {
  Calendar,
  CheckCircle2,
  Award,
  FileText,
  QrCode,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  Code2,
  Layers,
  Send,
  ShieldCheck,
  Check,
  Briefcase,
  Smartphone,
  Cpu,
  Palette,
  Globe,
  Users,
  HelpCircle,
  X,
  ChevronDown,
} from 'lucide-react';

const programHighlights = [
  {
    icon: Clock,
    title: "1 Month / 4 Weeks Duration",
    description: "Structured 4-week self-paced virtual internship covering real industry problem statements and progressive tasks.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Layers,
    title: "4 Weekly Guided Tasks",
    description: "Step-by-step weekly milestone tasks designed to build strong problem-solving and software development skills.",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Code2,
    title: "Practical Project Work",
    description: "Hands-on engineering experience building modern, responsive, and functional applications for your resume portfolio.",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Github,
    title: "GitHub Code Submission",
    description: "Learn professional Git version control, branching, clean commits, and standard README documentation.",
    color: "bg-slate-500/10 text-slate-800 dark:text-slate-200",
  },
  {
    icon: Linkedin,
    title: "LinkedIn & Video Proof",
    description: "Share live project video demos and progress posts on LinkedIn to expand your professional network & visibility.",
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    icon: FileText,
    title: "Internship Offer Letter",
    description: "Receive an official verifiable offer letter from InfozaTech immediately upon registration and batch selection.",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Award,
    title: "Completion Certificate",
    description: "Industry-recognized certificate of internship completion highlighting your domain expertise and delivered projects.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: QrCode,
    title: "QR-Verified Credentials",
    description: "Instant QR-code verification for recruiters and universities to authenticate your certificate online.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
];

const domains = [
  {
    icon: Globe,
    title: "Web Development",
    level: "Beginner to Intermediate",
    description: "Master modern responsive web development with semantic HTML5, CSS3, modern JavaScript, and flexbox/grid layouts.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Web"],
  },
  {
    icon: Code2,
    title: "Frontend Engineering (React.js)",
    level: "Intermediate",
    description: "Build reactive single-page applications with React 18, Tailwind CSS, component state, hooks, and REST API integration.",
    tags: ["React.js", "Tailwind CSS", "Hooks & State", "API Fetching"],
  },
  {
    icon: Layers,
    title: "Full Stack Web Development",
    level: "Intermediate to Advanced",
    description: "Develop end-to-end full-stack SaaS apps with Node.js, Express, MongoDB database, authentication, and React frontend.",
    tags: ["MERN Stack", "Node.js", "MongoDB", "Auth & APIs"],
  },
  {
    icon: Cpu,
    title: "Python, Data & AI Systems",
    level: "Beginner to Intermediate",
    description: "Explore Python 3 programming, data automation, Pandas, web scraping, and fundamental AI/ML automation models.",
    tags: ["Python 3", "Data Analysis", "Automation", "AI Fundamentals"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    level: "Intermediate",
    description: "Create cross-platform mobile apps for iOS and Android with intuitive UI, state management, and device features.",
    tags: ["Flutter", "React Native", "Mobile UI", "Cross Platform"],
  },
  {
    icon: Palette,
    title: "UI / UX & Product Design",
    level: "All Skill Levels",
    description: "Craft modern UI screens, user journeys, interactive Figma prototypes, and scalable design component systems.",
    tags: ["Figma", "UI Design", "Wireframing", "User Research"],
  },
];

const roadmapWeeks = [
  {
    week: "Week 1",
    tag: "Milestone 1",
    title: "Onboarding & Foundation",
    desc: "Receive your Offer Letter, understand project requirements, setup Git repo, and build the initial UI structure.",
  },
  {
    week: "Week 2",
    tag: "Milestone 2",
    title: "Core Feature Engineering",
    desc: "Implement core business logic, connect data/APIs, and maintain clean commits on your public GitHub repository.",
  },
  {
    week: "Week 3",
    tag: "Milestone 3",
    title: "Advanced Features & Polish",
    desc: "Enhance user experience with interactive components, responsive testing, edge-case handling, and styling.",
  },
  {
    week: "Week 4",
    tag: "Milestone 4",
    title: "Deployment & Certification",
    desc: "Deploy the live app, record a video walkthrough, submit links via Google Form, and receive your QR-verified certificate.",
  },
];

const faqs = [
  {
    q: "Who is eligible to apply for this internship?",
    a: "Any college student, graduate, or self-taught developer eager to gain practical project experience can apply. No prior professional experience is required.",
  },
  {
    q: "Is this internship 100% remote / virtual?",
    a: "Yes, it is completely virtual and self-paced. You can work on the tasks and submit them online from anywhere at your own convenience.",
  },
  {
    q: "How do I submit my weekly project work?",
    a: "You will push your code to a public GitHub repository, record a demo video or LinkedIn post, and submit the URLs through the official Google Submission Form.",
  },
  {
    q: "When will I receive my Offer Letter and Certificate?",
    a: "You will receive your Offer Letter upon batch onboarding, and your QR-verified Certificate of Completion upon successful review of your 4-week task submissions.",
  },
];

export default function Internship() {
  const [openFaq, setOpenFaq] = useState(null);
  const [settings, setSettings] = useState(getCachedInternshipSettings);

  useEffect(() => {
    fetchInternshipSettings().then((res) => {
      if (res.success && res.data) {
        setSettings(res.data);
      }
    });
  }, []);

  const applyUrl = settings?.applyUrl || "https://forms.gle/SjDCcUxkjRAGpDRx6";

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pt-28 pb-24 font-sans transition-colors duration-200 relative overflow-hidden">
      {/* Ambient background blur circles */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-blue-100/50 dark:bg-blue-900/10 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] bg-indigo-100/50 dark:bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Breadcrumb & Dual Switch */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-[#2563EB] dark:hover:text-blue-400 shadow-xs transition-colors group"
          >
            <ArrowLeft className="size-3.5 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            <span>Back</span>
          </Link>

          {/* Quick Dual Pill Toggle (Internship / Jobs) */}
          <div className="inline-flex items-center rounded-full bg-white dark:bg-zinc-900 p-1 border border-slate-200 dark:border-zinc-800 shadow-xs">
            <span className="rounded-full bg-[#2563EB] text-white text-xs font-semibold px-4 py-1.5 shadow-sm">
              Virtual Internship
            </span>
            <Link
              to="/careers"
              className="rounded-full text-slate-600 dark:text-zinc-300 hover:text-[#2563EB] text-xs font-medium px-4 py-1.5 transition-colors"
            >
              Full-Time Jobs
            </Link>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 px-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Pill Badge */}
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#2563EB] bg-white dark:bg-zinc-900 px-5 py-1.5 rounded-full mb-5 border border-slate-200 dark:border-zinc-800 shadow-sm">
              1-Month Virtual Internship Program
            </span>

            {/* Main Hero Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-[#1E293B] dark:text-white tracking-tight leading-[1.18] mb-4">
              InfozaTech <span className="text-[#2563EB]">Virtual Internship</span> Program
            </h1>

            <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
              Accelerate your engineering journey with hands-on weekly milestone tasks, real-world project builds, GitHub tracking, and verifiable certificates.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md sm:max-w-none mx-auto mb-3">
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium px-7 py-3.5 text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Apply for Internship</span>
                <ExternalLink className="size-4" />
              </a>

              <Link
                to="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-zinc-900 text-[#1E293B] dark:text-white hover:text-[#2563EB] dark:hover:text-[#2563EB] border border-slate-200 dark:border-zinc-800 font-medium px-6 py-3.5 text-sm sm:text-base shadow-sm hover:border-blue-300 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <ShieldCheck className="size-4.5 text-[#2563EB]" />
                <span>Verify Certificate</span>
              </Link>
            </div>

            <p className="text-xs text-slate-400 dark:text-zinc-500">
              Free virtual internship • Official Google Form application • Instant verification
            </p>
          </motion.div>
        </div>

        {/* 1. 8 KEY HIGHLIGHTS GRID WITH BLUE SHADOW */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
              Program Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E293B] dark:text-white tracking-tight">
              What You Get In This Program
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 font-normal">
              Everything structured to give you a genuine professional internship experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {programHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-blue-100/90 dark:border-blue-900/30 shadow-[0_8px_30px_rgba(37,99,235,0.07)] hover:shadow-[0_14px_35px_rgba(37,99,235,0.16)] hover:border-blue-400/80 dark:hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`size-11 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-105 shadow-sm transition-transform`}>
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    <span>Verified Feature</span>
                    <CheckCircle2 className="size-3.5 ml-1 text-emerald-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. 4-WEEK ROADMAP PROCESS WITH BLUE SHADOW */}
        <div className="mb-20 sm:mb-24 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 md:p-12 border border-blue-100/90 dark:border-blue-900/30 shadow-[0_12px_40px_rgba(37,99,235,0.08)]">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="inline-flex items-center text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
              Step-by-Step Flow
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E293B] dark:text-white tracking-tight">
              4-Week Internship Roadmap
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-normal mt-2">
              Complete each week's structured milestone and build an end-to-end production-grade application.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {roadmapWeeks.map((step, idx) => (
              <div
                key={step.week}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-zinc-850/60 border border-blue-100/80 dark:border-zinc-800 shadow-[0_4px_20px_rgba(37,99,235,0.05)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs px-2.5 py-1 shadow-sm shadow-blue-500/25">
                      {step.week}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-zinc-800 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <Check className="size-3.5 text-blue-600" />
                  <span>Deliverable Required</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AVAILABLE TRACKS WITH BLUE SHADOW */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
              Domain Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E293B] dark:text-white tracking-tight">
              Available Internship Tracks
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 font-normal">
              Select your preferred domain during the official Google Form application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {domains.map((dom) => {
              const Icon = dom.icon;
              return (
                <div
                  key={dom.title}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-blue-100/90 dark:border-blue-900/30 shadow-[0_8px_30px_rgba(37,99,235,0.07)] hover:shadow-[0_14px_35px_rgba(37,99,235,0.16)] hover:border-blue-400/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 shadow-sm shadow-blue-500/10 transition-transform">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full border border-slate-200/60 dark:border-zinc-700/60">
                        {dom.level}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                      {dom.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {dom.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {dom.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-semibold bg-blue-50/70 dark:bg-zinc-800 text-blue-700 dark:text-zinc-300 px-2.5 py-1 rounded-lg border border-blue-200/50 dark:border-zinc-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">1 Month Program</span>
                    <a
                      href={applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. PROMINENT REGISTRATION / APPLY CARD WITH RICH BLUE GLOW SHADOW */}
        <div className="max-w-4xl mx-auto mb-20 sm:mb-24">
          <div className="rounded-3xl p-8 sm:p-10 md:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
            {/* Ambient decorative glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-xl relative z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/25 px-3.5 py-1 text-xs font-bold !text-white text-white backdrop-blur-sm mb-4 shadow-sm">
                <Sparkles className="size-3.5 text-blue-200" />
                <span className="!text-white text-white font-semibold tracking-wide">New Applicant Registration</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold !text-white text-white tracking-tight mb-3 leading-tight">
                Ready to Start Your Internship?
              </h3>
              <p className="text-xs sm:text-sm !text-blue-100 text-blue-100 leading-relaxed font-normal">
                Fill out the official Google Form application to register for the upcoming 1-month virtual internship batch. No registration fee required.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto relative z-10">
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 text-center text-sm sm:text-base shadow-lg shadow-black/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-bold text-blue-600">Apply for Internship</span>
                <ExternalLink className="size-4.5 text-blue-600" />
              </a>
            </div>
          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#1E293B] dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-normal mt-1">
              Common questions about the InfozaTech Virtual Internship Program.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-blue-100/90 dark:border-zinc-800 shadow-[0_6px_25px_rgba(37,99,235,0.06)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)] transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <CheckCircle2 className="size-4.5 text-blue-600 shrink-0" />
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronDown
                      className={`size-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-zinc-800 px-5 sm:px-6 pb-5 pt-3"
                      >
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 pl-7 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
