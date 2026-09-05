import React, { useState } from "react";
import { QrCode, Copy, Check, ExternalLink, Download } from "lucide-react";

export default function QRCodeDisplay({ verificationId, showTitle = true, size = 180 }) {
  const [copied, setCopied] = useState(false);

  // Verification URL
  const verifyUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify?id=${encodeURIComponent(verificationId)}`
    : `https://infozatech.com/verify?id=${encodeURIComponent(verificationId)}`;

  const canonicalUrl = `https://infozatech.com/verify?id=${encodeURIComponent(verificationId)}`;

  // QR Code Image URL (High Resolution)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(canonicalUrl)}&margin=12&format=svg`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(canonicalUrl)}&margin=15&format=png`;
    link.download = `QRCode-${verificationId}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-800/60 rounded-2xl border border-gray-200/80 dark:border-zinc-700/60">
      {showTitle && (
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <QrCode size={14} className="text-indigo-600 dark:text-indigo-400" />
          <span>Document Verification QR</span>
        </div>
      )}

      {/* QR Code Container */}
      <div className="relative p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">
        <img
          src={qrImageUrl}
          alt={`QR Code for ${verificationId}`}
          width={size}
          height={size}
          className="rounded-lg object-contain"
          loading="lazy"
        />
      </div>

      <p className="mt-2.5 text-xs text-center font-mono font-medium text-gray-600 dark:text-gray-300 break-all max-w-[220px]">
        {canonicalUrl}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-3 w-full max-w-[240px]">
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-zinc-700 transition-colors shadow-2xs"
          title="Copy Verification Link"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center justify-center p-1.5 text-xs font-medium bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-zinc-700 transition-colors shadow-2xs"
          title="Download QR Image (PNG)"
        >
          <Download size={13} />
        </button>

        <a
          href={verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-1.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-200/50 dark:border-indigo-500/30 transition-colors shadow-2xs"
          title="Open Verification Page in New Tab"
        >
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
