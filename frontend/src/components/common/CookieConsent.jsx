import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already chosen cookie preferences
    const consent = localStorage.getItem('cookie_consent_status');
    if (!consent) {
      // Delay slightly for smooth page load
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status) => {
    localStorage.setItem('cookie_consent_status', status);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[99999] w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-zinc-800 shadow-[0_-10px_35px_rgba(0,0,0,0.08)] py-3 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            
            {/* Left Side: Shield/Cookie Icon + Privacy Text */}
            <div className="flex items-center gap-3 text-left w-full md:w-auto flex-1">
              <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/40">
                <ShieldCheck size={18} />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                We use cookies and essential analytics to optimize your experience and ensure security. By continuing, you agree to our{' '}
                <Link
                  to="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Right Side: Action Buttons (Reject & Accept) */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
              <button
                type="button"
                onClick={() => handleConsent('rejected')}
                className="flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => handleConsent('accepted')}
                className="flex-1 md:flex-initial px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0f172a] hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-all cursor-pointer whitespace-nowrap shadow-sm active:scale-95"
              >
                Accept All
              </button>

              <button
                type="button"
                onClick={() => handleConsent('dismissed')}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded-lg transition-colors ml-1 hidden sm:inline-flex"
                title="Dismiss"
              >
                <X size={16} />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
