import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Crown,
  Sparkles,
  CheckCircle2,
  Send,
  X,
  User,
  Mail,
  Phone,
  Compass,
  CheckCircle,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Calendar,
  Check,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { getCareers, getIconComponent } from '../services/careersData';
import { saveNewApplication } from '../services/applicationsData';
import API_URL from '../config';

const Careers = () => {
  const [jobsList, setJobsList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalView, setModalView] = useState('details'); // 'details' | 'form' | 'success'

  // Application Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    role: '',
    location: '',
    whyJoinUs: '',
  });
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [statusError, setStatusError] = useState('');

  useEffect(() => {
    setJobsList(getCareers());
  }, []);

  // Open modal in details mode
  const handleOpenJobModal = (job) => {
    setSelectedJob(job);
    setModalView('details');
    setFormData({
      name: '',
      email: '',
      contact: '',
      role: job.title,
      location: '',
      whyJoinUs: '',
    });
    setSubmittedData(null);
    setStatusError('');
  };

  const handleCloseJobModal = () => {
    setSelectedJob(null);
    setModalView('details');
    setSubmittedData(null);
    setStatusError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusError('');

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.contact.trim() ||
      !formData.role.trim() ||
      !formData.location.trim() ||
      !formData.whyJoinUs.trim()
    ) {
      setStatusError('All fields are required.');
      setLoading(false);
      return;
    }

    // 1. Instantly save to local Admin storage so it is immediately visible in Admin Panel
    saveNewApplication(formData);

    // 2. Fire non-blocking background sync to backend (if running)
    try {
      fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch((err) => console.log('Backend sync notice:', err));
    } catch (err) {
      console.log('Background sync catch:', err);
    }

    // 3. Instant UI confirmation without waiting
    setTimeout(() => {
      setSubmittedData({ ...formData });
      setModalView('success');
      setLoading(false);
    }, 200);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseJobModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pt-28 pb-24 font-sans transition-colors duration-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-indigo-100/30 dark:bg-indigo-900/5 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-blue-100/30 dark:bg-blue-900/5 blur-[80px] rounded-full pointer-events-none z-0" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

      {/* Top Breadcrumb & Dual Switch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-[#2563EB] dark:hover:text-blue-400 shadow-xs transition-colors group"
          >
            <ArrowLeft className="size-3.5 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            <span>Back</span>
          </Link>

          {/* Quick Dual Pill Toggle (Internship / Jobs) */}
          <div className="inline-flex items-center rounded-full bg-white dark:bg-zinc-900 p-1 border border-slate-200 dark:border-zinc-800 shadow-xs">
            <Link
              to="/internship"
              className="rounded-full text-slate-600 dark:text-zinc-300 hover:text-[#2563EB] text-xs font-medium px-4 py-1.5 transition-colors"
            >
              Virtual Internship
            </Link>
            <span className="rounded-full bg-[#2563EB] text-white text-xs font-semibold px-4 py-1.5 shadow-sm">
              Full-Time Jobs
            </span>
          </div>
        </div>
      </div>

      {/* Header & Two Clear Options: Internship vs Jobs */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest border border-blue-200/60 dark:border-blue-500/20">
            Careers & Opportunities
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-3 mb-3">
            Join InfozaTech
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            Choose an opportunity track below: apply for our 1-Month Virtual Internship or explore direct engineering job roles.
          </p>

          {/* Two Clear Options: Internship & Jobs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto text-left mb-10">
            {/* Option 1: Virtual Internship (1 Month) */}
            <Link
              to="/internship"
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border-2 border-blue-500/40 hover:border-blue-600 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <GraduationCap className="size-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 px-3 py-1 text-[11px] font-bold text-blue-800 dark:text-blue-300">
                    <Sparkles className="size-3" />
                    1 Month / 4 Weeks
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Virtual Internship Program
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Weekly tasks, real-world project builds, GitHub tracking, LinkedIn video proof, and QR-verified certificates.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1">
                  <span>Explore Internship & Apply</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-slate-400">All Domains Available</span>
              </div>
            </Link>

            {/* Option 2: Full-Time Jobs */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="size-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Briefcase className="size-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {jobsList.length} Open Roles
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Direct Job Openings
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Full-time and founding positions across frontend, backend, full stack, mobile, and AI engineering.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Select a position below to apply
                </span>
                <span className="text-[11px] text-slate-400">Remote / Hybrid</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* COMPACT CARDS GRID */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobsList.map((job, idx) => {
            const IconComponent = getIconComponent(job.iconName);
            const isFeatured = job.isFeatured || job.id === 'cofounder';

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleOpenJobModal(job)}
                className={`relative bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1 ${
                  isFeatured
                    ? 'border-2 border-amber-400/90 dark:border-amber-500/70 shadow-amber-500/10 hover:border-amber-500'
                    : 'border border-slate-200/90 dark:border-zinc-800 hover:border-blue-400/60 dark:hover:border-blue-500/50'
                }`}
              >
                {/* Vertical accent stripe */}
                <div className={`absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b ${job.color} z-30`}></div>

                <div className="pl-1.5">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div
                      className={`size-10 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent size={20} />
                    </div>
                    {isFeatured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 px-2.5 py-0.5 text-[10.5px] font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                        <Crown size={11} className="text-amber-600 dark:text-amber-400" />
                        Founding Role
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[10.5px] font-semibold text-slate-600 dark:text-gray-300">
                        {job.badge || 'Opening'}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" /> {job.type}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" /> {job.location}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mt-2.5 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                {/* Bottom Trigger Button */}
                <div className="pt-3.5 mt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 flex items-center gap-1.5 transition-colors">
                    <span>View Details</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {(job.bullets || []).length} key skills
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SEPARATE FULL MODAL WINDOW */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseJobModal}
              className="fixed inset-0"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 px-6 py-4 bg-slate-50/80 dark:bg-zinc-850">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 rounded-xl bg-gradient-to-br ${selectedJob.color} flex items-center justify-center text-white shadow-xs shrink-0`}
                  >
                    {React.createElement(getIconComponent(selectedJob.iconName), { size: 20 })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {selectedJob.title}
                      </h2>
                      {(selectedJob.isFeatured || selectedJob.id === 'cofounder') && (
                        <span className="rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 px-2 py-0.5 text-[10px] font-extrabold text-amber-800 dark:text-amber-300">
                          👑 Co-Founder Role
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 font-medium">
                      <span>{selectedJob.type}</span>
                      <span>•</span>
                      <span>{selectedJob.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseJobModal}
                  className="flex size-8.5 items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* VIEW 1: JOB DETAILS VIEW */}
              {modalView === 'details' && (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* About this role */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                        About this Role
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                        {selectedJob.description}
                      </p>
                    </div>

                    {/* Responsibilities & Skills */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                        Key Responsibilities & Qualifications
                      </h3>
                      <ul className="space-y-2.5">
                        {selectedJob.bullets.map((bullet, index) => (
                          <li
                            key={index}
                            className="flex items-start text-xs sm:text-[13.5px] text-slate-700 dark:text-gray-300 leading-relaxed gap-3 bg-slate-50/70 dark:bg-zinc-800/40 p-3 rounded-xl border border-slate-100 dark:border-zinc-800/60"
                          >
                            <span
                              className={`size-5 rounded-full ${selectedJob.bg} ${selectedJob.textColor} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                              <CheckCircle2 size={13} />
                            </span>
                            <span className="font-normal">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Process Info */}
                    <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-100 dark:border-blue-900/40 p-4 flex items-center gap-3 text-xs text-blue-900 dark:text-blue-300">
                      <div className="size-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <p className="font-bold">Fast-Track Hiring</p>
                        <p className="text-blue-700 dark:text-blue-400 text-[11.5px]">
                          Submit your application online. Our hiring lead will connect with you within 24–48 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer (Apply for Job button) */}
                  <div className="border-t border-slate-100 dark:border-zinc-800 p-5 bg-slate-50/80 dark:bg-zinc-850 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleCloseJobModal}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalView('form')}
                      className="flex-1 max-w-sm flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-center text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Apply for this Job</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </>
              )}

              {/* VIEW 2: APPLICATION FORM VIEW */}
              {modalView === 'form' && (
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Job Application Form
                      </h3>
                      <p className="text-xs text-slate-400">
                        Applying for <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedJob.title}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModalView('details')}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>View Requirements</span>
                    </button>
                  </div>

                  {statusError && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      {statusError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Manish Kumar"
                          required
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail size={16} />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@email.com"
                            required
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Phone size={16} />
                          </div>
                          <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Current Location / City *
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <MapPin size={16} />
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Patna, Noida, Bangalore (or Remote)"
                          required
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Pitch / Fit */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Why are you a great fit for this role? *
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                          <Compass size={16} />
                        </div>
                        <textarea
                          rows="4"
                          name="whyJoinUs"
                          value={formData.whyJoinUs}
                          onChange={handleChange}
                          placeholder="Briefly describe your experience, relevant technical background, and why you want to build with InfozaTech..."
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:bg-white transition-all resize-none leading-relaxed placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Form Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setModalView('details')}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        <span>{loading ? 'Submitting Application...' : 'Submit Application Now'}</span>
                        {!loading && <Send size={15} />}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* VIEW 3: SUCCESS CONFIRMATION VIEW */}
              {modalView === 'success' && submittedData && (
                <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
                  {/* Glowing checkmark animation */}
                  <div className="relative size-20 mx-auto flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping opacity-75"></span>
                    <div className="size-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-inner">
                      <Check size={36} className="stroke-[2.5]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Application Submitted Successfully! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you <strong className="text-slate-800 dark:text-white font-bold">{submittedData.name}</strong>! We have received your application for the position of <strong className="text-blue-600 dark:text-blue-400 font-bold">{submittedData.role}</strong>.
                    </p>
                  </div>

                  {/* Submission Details Card */}
                  <div className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2.5 text-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Submission Summary
                    </p>
                    <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-zinc-700/50">
                      <span className="text-slate-400">Position:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{submittedData.role}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-zinc-700/50">
                      <span className="text-slate-400">Email:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{submittedData.email}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{submittedData.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 dark:text-gray-500 max-w-sm mx-auto">
                    Our technical lead will review your profile and get in touch with you at <span className="font-semibold text-slate-600 dark:text-slate-300">{submittedData.email}</span> within 24–48 hours.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleCloseJobModal}
                      className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      Done & Browse Other Roles
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
