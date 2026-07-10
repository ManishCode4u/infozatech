import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";
import logo from "../../assets/images/logo/infozatech-logo.png";
import API_URL from "../../config";


const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");
    setStatusType("");

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribeEmail }),
      });
      const data = await response.json();
      if (data.success) {
        setStatusMsg("Subscribed successfully! 🎉");
        setStatusType("success");
        setSubscribeEmail("");
      } else {
        setStatusMsg(data.message || "Failed to subscribe. Please try again.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Newsletter submission error:", err);
      setStatusMsg("Connection error. Please try again.");
      setStatusType("error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <footer className="bg-[#0F0F0F] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
 
          {/* BRAND */}
          <div>
            <Link to="/" className="shrink-0 z-50 inline-block focus:outline-none mb-6" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-start">
                <img src={logo} alt="InfozaTech Logo" className="h-[55px] md:h-[60px] w-auto object-contain brightness-0 invert opacity-90" />
              </div>
            </Link>
 
            <p className="text-slate-450 text-sm mb-6 max-w-xs">
              AI-powered development, training, and startup solutions for
              students, founders, and institutions.
            </p>
 
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/infozatech/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all text-slate-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/company/infozatech"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all text-slate-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </span>
              </a>

              <a href="mailto:teaminfozatech@gmail.com" className="group">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all text-slate-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </span>
              </a>
            </div>
          </div>
 
          {/* PLATFORM + LEGAL */}
          <div className="grid grid-cols-2 gap-10 md:col-span-2">
 
            {/* PLATFORM */}
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link to="/about" className="block hover:text-[#2563EB] transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="block hover:text-[#2563EB] transition">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="block hover:text-[#2563EB] transition">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block hover:text-[#2563EB] transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
 
            {/* LEGAL */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link to="/privacy-policy" className="block hover:text-[#2563EB] transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="block hover:text-[#2563EB] transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="block hover:text-[#2563EB] transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
 
          {/* CONTACT & NEWSLETTER */}
          <div>
            <h4 className="font-semibold text-slate-400 text-sm mb-1">Contact us at</h4>
            <p className="text-base font-bold text-white mb-4 break-all">
              <a href="mailto:teaminfozatech@gmail.com" className="hover:text-[#2563EB] transition">
                teaminfozatech@gmail.com
              </a>
            </p>
            
            {/* Newsletter Subscription input matching design */}
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex items-center bg-white rounded-full p-1 border border-slate-700 w-full max-w-[280px] shadow-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="bg-transparent border-none text-slate-800 placeholder-slate-450 text-xs pl-4 pr-1 py-2.5 w-full focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0f0f0f] hover:bg-slate-800 text-white rounded-full px-5 py-2 text-xs font-semibold transition whitespace-nowrap"
                >
                  {submitting ? "..." : "Subscribe"}
                </button>
              </div>
              {statusMsg && (
                <p className={`text-xs mt-2 ${statusType === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {statusMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
 
      {/* BOTTOM */}
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} InfozaTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
