import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Loader2,
  Copy,
  Check,
  Printer
} from "lucide-react";
import { verifyDocumentById } from "../services/verificationsData";

export default function PublicVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [verificationIdInput, setVerificationIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const performVerification = async (idToVerify) => {
    const trimmedId = (idToVerify || "").trim();
    if (!trimmedId) {
      setResult({
        type: "error",
        title: "Please enter a code",
        message: "Enter your Certificate Code to look up your document."
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await verifyDocumentById(trimmedId);

      if (res.isServiceError) {
        setResult({
          type: "service_error",
          title: "Service Temporarily Unavailable",
          message: res.message || "We could not reach the verification service. Please try again in a few moments."
        });
      } else if (!res.found || !res.success) {
        setResult({
          type: "not_found",
          searchedCode: trimmedId,
          title: `No result found against this code: "${trimmedId}"`,
          message: "Data database se match nahi ho raha hai.",
          submessage: "Please verify your Certificate Code and try again."
        });
      } else if (res.status === "Revoked") {
        setResult({
          type: "revoked",
          title: "Certificate Result (Revoked)",
          message: "This document is no longer valid according to official InfozaTech records.",
          data: res.data
        });
      } else {
        setResult({
          type: "verified",
          title: "Certificate Result",
          data: res.data
        });
      }
    } catch (err) {
      setResult({
        type: "service_error",
        title: "Service Temporarily Unavailable",
        message: "Could not complete verification. Please check your internet connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify when `?id=` query parameter is in URL (QR Code scan flow)
  useEffect(() => {
    const queryId = searchParams.get("id");
    if (queryId && queryId.trim()) {
      setVerificationIdInput(queryId.trim());
      performVerification(queryId.trim());
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verificationIdInput.trim()) return;
    setSearchParams({ id: verificationIdInput.trim() });
    performVerification(verificationIdInput.trim());
  };

  const handleCopyLink = () => {
    const canonicalUrl = `${window.location.origin}/verify?id=${encodeURIComponent(verificationIdInput.trim())}`;
    navigator.clipboard.writeText(canonicalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-36 sm:pt-40 pb-20">
        
        {/* Title: CERTIFICATE VERIFICATION SYSTEM (Shifted to Left) */}
        <div className="mb-8 text-left">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            CERTIFICATE VERIFICATION SYSTEM
          </h1>
        </div>

        {/* =========================================================================
            SEARCH CARD (Matching Reference Image)
        ========================================================================= */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-[#f1f5f9]/80 dark:bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch">
              
              {/* Highlighted Input Box */}
              <input
                type="text"
                required
                placeholder="Enter Certificate Code"
                value={verificationIdInput}
                onChange={(e) => setVerificationIdInput(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-white dark:bg-zinc-800 border-2 border-slate-700 dark:border-zinc-300 rounded-lg sm:rounded-r-none outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium transition-all shadow-2xs"
              />

              {/* Dark Charcoal Search Button */}
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-8 py-3.5 bg-[#24303f] hover:bg-[#111827] dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white text-sm font-semibold rounded-lg sm:rounded-l-none border-2 border-[#24303f] hover:border-[#111827] dark:border-zinc-700 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shadow-sm active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <span>Search</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* =========================================================================
            CERTIFICATE RESULT PRESENTATION (Exact Striped Reference Design)
        ========================================================================= */}
        {result && (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200 mb-14">
            
            {/* 1. ✅ CERTIFICATE RESULT (Exact Reference Table Format) */}
            {result.type === "verified" && result.data && (
              <div>
                {/* Heading: Certificate Result */}
                <h2 className="text-2xl sm:text-3xl font-medium text-center text-slate-900 dark:text-white mb-6">
                  Certificate Result
                </h2>

                {/* Striped Result Container Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-300 dark:border-zinc-700 shadow-sm overflow-hidden divide-y divide-slate-200 dark:divide-zinc-800">
                  
                  {/* Row 1: Student Name */}
                  <div className="px-6 py-4 bg-white dark:bg-zinc-900 text-[15px] font-normal text-slate-800 dark:text-zinc-200">
                    <span className="text-slate-900 dark:text-white font-medium">Student Name:</span> {result.data.studentName}
                  </div>

                  {/* Row 2: Domain */}
                  <div className="px-6 py-4 bg-[#f8fafc] dark:bg-zinc-800/60 text-[15px] font-normal text-slate-800 dark:text-zinc-200">
                    <span className="text-slate-900 dark:text-white font-medium">Domain:</span> {result.data.domain} {result.data.domain && !result.data.domain.toLowerCase().includes("internship") ? "Internship" : ""}
                  </div>

                  {/* Row 3: Duration */}
                  <div className="px-6 py-4 bg-white dark:bg-zinc-900 text-[15px] font-normal text-slate-800 dark:text-zinc-200">
                    <span className="text-slate-900 dark:text-white font-medium">Duration:</span> {result.data.duration}
                  </div>

                  {/* Row 4: Certification No */}
                  <div className="px-6 py-4 bg-[#f8fafc] dark:bg-zinc-800/60 text-[15px] font-normal text-slate-800 dark:text-zinc-200">
                    <span className="text-slate-900 dark:text-white font-medium">Certification No:</span> {result.data.certificateId || result.data.verificationId}
                  </div>

                  {/* Row 5: Starting Date */}
                  <div className="px-6 py-4 bg-white dark:bg-zinc-900 text-[15px] font-normal text-slate-800 dark:text-zinc-200">
                    <span className="text-slate-900 dark:text-white font-medium">Starting Date:</span> {result.data.startDate}
                  </div>

                  {/* Row 6: Award Date */}
                  <div className="px-6 py-4 bg-[#f8fafc] dark:bg-zinc-800/60 text-[15px] font-normal text-slate-800 dark:text-zinc-200">
                    <span className="text-slate-900 dark:text-white font-medium">Award Date:</span> {result.data.endDate}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ⚠️ DOCUMENT REVOKED */}
            {result.type === "revoked" && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-medium text-center text-amber-600 dark:text-amber-400 mb-6">
                  Certificate Result (Revoked)
                </h2>

                <div className="p-4 mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm text-center font-medium">
                  {result.message}
                </div>

                {result.data && (
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-300 dark:border-zinc-700 shadow-sm overflow-hidden divide-y divide-slate-200 dark:divide-zinc-800">
                    <div className="px-6 py-4 bg-white dark:bg-zinc-900 text-[15px]">
                      <span className="font-medium text-slate-900 dark:text-white">Student Name:</span> {result.data.studentName}
                    </div>
                    <div className="px-6 py-4 bg-[#f8fafc] dark:bg-zinc-800/60 text-[15px]">
                      <span className="font-medium text-slate-900 dark:text-white">Domain:</span> {result.data.domain}
                    </div>
                    <div className="px-6 py-4 bg-white dark:bg-zinc-900 text-[15px]">
                      <span className="font-medium text-slate-900 dark:text-white">Certification No:</span> {result.data.verificationId}
                    </div>
                    <div className="px-6 py-4 bg-[#f8fafc] dark:bg-zinc-800/60 text-[15px]">
                      <span className="font-medium text-slate-900 dark:text-white">Status:</span> <span className="text-rose-600 font-bold">Revoked</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. ❌ NO RESULT FOUND (Data Not Matching) */}
            {result.type === "not_found" && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-red-200 dark:border-red-900/60 shadow-sm text-center p-8">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3.5">
                  <XCircle size={28} />
                </div>
                
                {/* Upper Message in RED with Searched Code */}
                <h2 className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                  No result found against this code: <span className="font-mono bg-red-50 dark:bg-red-950/60 px-2.5 py-0.5 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-extrabold">{result.searchedCode}</span>
                </h2>
                
                {/* Data match nahi ho raha hai message */}
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200 max-w-md mx-auto">
                  {result.message}
                </p>
                
                {result.submessage && (
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1.5 max-w-sm mx-auto">
                    {result.submessage}
                  </p>
                )}
              </div>
            )}

            {/* 4. ⚠️ TEMPORARY SERVICE ERROR */}
            {result.type === "service_error" && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-300 dark:border-zinc-700 shadow-sm text-center p-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">{result.title}</h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-sm mx-auto">{result.message}</p>
                <button
                  onClick={() => performVerification(verificationIdInput)}
                  className="mt-4 px-4 py-2 bg-[#24303f] hover:bg-[#1b2430] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Search size={13} />
                  <span>Try Again</span>
                </button>
              </div>
            )}

          </div>
        )}

        {/* Clean Footer Note (Exact Reference Look) */}
        <div className="text-center text-xs text-slate-500 dark:text-zinc-400 mt-20">
          © {new Date().getFullYear()} • Built with InfozaTech
        </div>

      </div>
    </div>
  );
}
