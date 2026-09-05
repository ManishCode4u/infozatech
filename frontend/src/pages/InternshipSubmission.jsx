import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  FileText,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Check,
} from 'lucide-react';

const SUBMISSION_FORM_URL = "https://forms.gle/oS3KLgW8nnPpxKXA6";
const APPLY_FORM_URL = "https://forms.gle/SjDCcUxkjRAGpDRx6";

export default function InternshipSubmission() {
  const [confirmedTasks, setConfirmedTasks] = useState(false);
  const [confirmedGithub, setConfirmedGithub] = useState(false);
  const [confirmedLinkedin, setConfirmedLinkedin] = useState(false);
  const [confirmedAccuracy, setConfirmedAccuracy] = useState(false);

  // Master confirmation
  const allPrerequisitesChecked =
    confirmedTasks && confirmedGithub && confirmedLinkedin && confirmedAccuracy;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pt-28 pb-24 font-sans transition-colors duration-200 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 left-1/4 w-[360px] h-[360px] bg-blue-100/40 dark:bg-blue-900/10 blur-[90px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[360px] h-[360px] bg-indigo-100/40 dark:bg-indigo-900/10 blur-[90px] rounded-full pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link
            to="/internship"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowRight className="size-3.5 rotate-180" />
            <span>Back to Internship Overview</span>
          </Link>
        </div>

        {/* Main Card Container with Blue Shadow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-blue-100/90 dark:border-blue-900/30 shadow-[0_16px_50px_rgba(37,99,235,0.14)]"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 px-3.5 py-1 text-xs font-bold mb-3 shadow-[0_2px_10px_rgba(37,99,235,0.08)]">
              <Send className="size-3.5" />
              <span>Step 1: Submission Checklist</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Internship Task Submission
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
              Please verify the completion checklist below before proceeding to the official Google Form submission.
            </p>
          </div>

          {/* Submission Prerequisites / Checkboxes */}
          <div className="space-y-3.5 mb-8">
            <label
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                confirmedTasks
                  ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                  : "bg-slate-50 dark:bg-zinc-850 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={confirmedTasks}
                onChange={(e) => setConfirmedTasks(e.target.checked)}
                className="size-5 rounded-md text-blue-600 border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer accent-blue-600"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  1. 4 Weekly Tasks Completed
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  I confirm that I have built and completed all 4 weekly assigned task milestones for my domain.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                confirmedGithub
                  ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                  : "bg-slate-50 dark:bg-zinc-850 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={confirmedGithub}
                onChange={(e) => setConfirmedGithub(e.target.checked)}
                className="size-5 rounded-md text-blue-600 border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer accent-blue-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <Github className="size-4 text-slate-700 dark:text-slate-300" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    2. Public GitHub Repository Ready
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  My project source code is pushed to a public GitHub repository with a detailed README file.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                confirmedLinkedin
                  ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                  : "bg-slate-50 dark:bg-zinc-850 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={confirmedLinkedin}
                onChange={(e) => setConfirmedLinkedin(e.target.checked)}
                className="size-5 rounded-md text-blue-600 border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer accent-blue-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <Linkedin className="size-4 text-sky-600" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    3. LinkedIn Video / Project Proof Published
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  I have shared a project demo video or post on LinkedIn mentioning InfozaTech.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                confirmedAccuracy
                  ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                  : "bg-slate-50 dark:bg-zinc-850 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={confirmedAccuracy}
                onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                className="size-5 rounded-md text-blue-600 border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer accent-blue-600"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  4. Verifiable Information
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  I agree that the submitted email matches my registered Offer Letter batch details.
                </p>
              </div>
            </label>
          </div>

          {/* Action Button */}
          <div className="space-y-3">
            {allPrerequisitesChecked ? (
              <a
                href={SUBMISSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-center text-base shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Proceed to Official Submission Form</span>
                <ExternalLink className="size-4.5 stroke-[2.2]" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setConfirmedTasks(true);
                  setConfirmedGithub(true);
                  setConfirmedLinkedin(true);
                  setConfirmedAccuracy(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-semibold py-4 text-center text-sm border border-slate-200 dark:border-zinc-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer"
              >
                <span>Tick All Checkboxes to Proceed</span>
                <Check className="size-4 text-blue-600" />
              </button>
            )}

            <p className="text-center text-xs text-slate-400 dark:text-zinc-500">
              {allPrerequisitesChecked
                ? "✓ All checkpoints verified. Click above to open the official Google Form."
                : "Please tick the checkboxes above to unlock the submission link."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
