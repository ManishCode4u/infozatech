import React, { useState, useEffect } from "react";
import {
  Link2,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Clock,
  Globe
} from "lucide-react";
import {
  fetchInternshipSettings,
  updateInternshipSettings,
  DEFAULT_INTERNSHIP_SETTINGS
} from "../../services/settingsData";

export default function AdminInternshipSettings() {
  const [applyUrl, setApplyUrl] = useState(DEFAULT_INTERNSHIP_SETTINGS.applyUrl);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const loadData = async () => {
    setLoading(true);
    const res = await fetchInternshipSettings();
    if (res.success && res.data) {
      setApplyUrl(res.data.applyUrl || DEFAULT_INTERNSHIP_SETTINGS.applyUrl);
      setLastUpdated(res.data.lastUpdated || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const handleCopy = () => {
    if (!applyUrl) return;
    navigator.clipboard.writeText(applyUrl);
    setCopied(true);
    showToast("Link clipboard par copy ho gaya!", "success");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    if (window.confirm("Default Google Form link set karein?")) {
      setApplyUrl(DEFAULT_INTERNSHIP_SETTINGS.applyUrl);
      showToast("Default link daal diya gaya hai. 'Save Link' par click karein.", "success");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applyUrl || !applyUrl.trim()) {
      showToast("Kripya valid Google Form URL daalein!", "error");
      return;
    }

    setSaving(true);
    const res = await updateInternshipSettings({ applyUrl: applyUrl.trim() });
    setSaving(false);

    if (res.success) {
      if (res.data) {
        setApplyUrl(res.data.applyUrl);
        setLastUpdated(res.data.lastUpdated);
      }
      showToast("Internship Apply Link successfully save ho gaya!", "success");
    } else {
      showToast(res.message || "Save karne mein dikkat aayi. Kripya dobara try karein.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Toast Notification */}
      {notification.show && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-medium transition-all duration-300 animate-in slide-in-from-top-3 ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800"
              : "bg-rose-50 dark:bg-rose-950/90 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="size-5 text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Internship Apply Link
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Har batch ke hisab se 1-Month Virtual Internship ka Google Form application link yahan se change karein.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-colors w-fit"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Settings Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
            Google Form URL (Batch Apply Link) <span className="text-rose-500">*</span>
          </label>
          
          <div className="relative">
            <input
              type="url"
              required
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder="https://forms.gle/..."
              className="w-full pl-4 pr-24 py-3.5 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-2xl text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                title="Copy Link"
                className="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </button>
              {applyUrl && (
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Test Link in new tab"
                  className="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Save karne par website ke sabhi "Apply for Internship" aur "Apply Now" buttons automatically is naye link par redirect karenge.
          </p>
        </div>

        {/* Live Target & Status Box */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-medium">
            <Globe className="size-4 shrink-0 text-indigo-600" />
            <span>Target: 1-Month Virtual Internship Application</span>
          </div>

          {lastUpdated && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Clock className="size-3.5" />
              <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline cursor-pointer"
          >
            Reset to default link
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className={`size-4 ${saving ? "animate-spin" : ""}`} />
            <span>{saving ? "Saving..." : "Save Link"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
