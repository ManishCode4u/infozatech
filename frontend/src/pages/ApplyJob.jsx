import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle, Briefcase, MapPin, Mail, Phone, User, Compass } from "lucide-react";
import API_URL from "../config";

const ROLES = [
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Sales Executive",
  "Lead Generation Executive"
];

export default function ApplyJob() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
    location: "",
    whyJoinUs: ""
  });

  // Prefill the role if provided via query params (?role=Backend%20Developer)
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam && ROLES.includes(roleParam)) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Validate inputs
    if (!formData.name || !formData.email || !formData.contact || !formData.role || !formData.location || !formData.whyJoinUs) {
      setStatus({ type: "error", message: "All fields are required." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to submit application. Please try again."
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({ type: "error", message: "Connection to server failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 flex flex-col justify-center items-center p-6 transition-colors duration-200 relative overflow-hidden">
        {/* Glowing background highlights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 blur-[60px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center shadow-xl animate-in zoom-in-95 duration-300 overflow-hidden">
          {/* Vertical left accent line matching the service cards style */}
          <div className="absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-b from-emerald-500 to-indigo-500 z-30"></div>
          
          <div className="relative">
            {/* Glimmer check ring */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping opacity-75"></span>
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle size={36} />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
              Application Received!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Thank you for applying. We have received your application for the <span className="font-bold text-slate-800 dark:text-white bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">{formData.role}</span> position.
            </p>

            {/* Structured Info Box to look premium */}
            <div className="bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800/60 rounded-2xl p-5 mb-8 text-left space-y-3">
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                Summary of Submission
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <span className="text-gray-400 font-bold">Applicant</span>
                <span className="col-span-2 text-slate-800 dark:text-zinc-200 font-semibold">{formData.name}</span>
                
                <span className="text-gray-400 font-bold">Email</span>
                <span className="col-span-2 text-slate-800 dark:text-zinc-200 font-semibold truncate">{formData.email}</span>
                
                <span className="text-gray-400 font-bold">Role</span>
                <span className="col-span-2 text-indigo-600 dark:text-indigo-400 font-bold">{formData.role}</span>

                <span className="text-gray-400 font-bold">Location</span>
                <span className="col-span-2 text-slate-800 dark:text-zinc-200 font-semibold">{formData.location}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mb-8">
              Our hiring manager will review your profile. If you are qualified, we will contact you at your email address within 24-48 hours.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/careers"
                className="flex-1 bg-slate-950 dark:bg-zinc-850 hover:bg-slate-800 dark:hover:bg-zinc-750 text-white py-3.5 px-6 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Back to Careers
              </Link>
              <Link
                to="/"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-6 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pt-32 pb-24 font-sans transition-colors duration-200 relative overflow-hidden">
      
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-100/30 dark:bg-indigo-900/5 blur-[70px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-100/30 dark:bg-blue-900/5 blur-[70px] rounded-full pointer-events-none z-0" />

      <div className="max-w-2xl mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-y-4 duration-500">
        
        {/* Back Link */}
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-250 mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Careers
        </Link>

        {/* Header Title */}
        <div className="mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {formData.role ? `Apply for ${formData.role}` : "Job Application"}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-3">
            {formData.role ? `Join as ${formData.role}` : "Start Your Journey"}
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 font-normal mt-2">
            {formData.role 
              ? `Submit your details below to apply for the ${formData.role} position at InfozaTech.` 
              : "Fill in the details below to apply for your chosen position."}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
          {status.message && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-bold border ${status.type === "error" ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50" : "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ishaan Sharma"
                    required
                    className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-zinc-800 border border-gray-250 dark:border-zinc-700/60 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ishaan.sharma@example.com"
                    required
                    className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-zinc-800 border border-gray-250 dark:border-zinc-700/60 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-zinc-800 border border-gray-250 dark:border-zinc-700/60 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Role
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                    <Briefcase size={18} />
                  </span>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-zinc-800 border border-gray-250 dark:border-zinc-700/60 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-950 dark:text-white"
                  >
                    <option value="" className="text-gray-400 dark:text-gray-500">Select Role</option>
                    {ROLES.map(r => (
                      <option key={r} value={r} className="text-gray-900 dark:text-white">{r}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                  <MapPin size={18} />
                </span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Noida, Uttar Pradesh (or Remote)"
                  required
                  className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-zinc-800 border border-gray-250 dark:border-zinc-700/60 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Why Join Us? */}
            <div>
              <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Why do you want to join InfozaTech?
              </label>
              <div className="relative">
                <span className="absolute top-3 left-4 text-gray-400 dark:text-gray-500">
                  <Compass size={18} />
                </span>
                <textarea
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleChange}
                  placeholder="e.g. I am passionate about building modern web applications, scaling systems, and collaborating with design-centric teams at InfozaTech..."
                  required
                  rows="6"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-250 dark:border-zinc-700/60 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-50 dark:border-zinc-800/50">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#DFFF00] text-slate-950 hover:bg-[#bce600] py-4 px-6 rounded-2xl text-[14px] font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98]"
              >
                {loading ? "Submitting Application..." : "Submit Application"}
                {!loading && <Send size={16} className="transition-transform group-hover:translate-x-1 text-slate-950" />}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
