import React from "react";
import API_URL from "../config";

const Contact = () => {
  const [status, setStatus] = React.useState({ type: "", message: "" });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      _subject: e.target.subject.value, // honeypot
    };

    try {
      const apiUrl = API_URL;
      
      const controller = new AbortController();
      // Use 15s timeout
      const timeoutId = setTimeout(() => controller.abort(), 15000); 

      console.log(`🚀 [Frontend] Sending request to: ${apiUrl}/api/contacts`);

      const response = await fetch(`${apiUrl}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("📥 [Frontend] Response received status:", response.status);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ [Frontend] Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Your message has been sent successfully." });
        e.target.reset();
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      console.error("❌ [Frontend] Submission error:", error);
      if (error.name === "AbortError") {
        setStatus({ type: "error", message: "Connection timed out. Please try again." });
      } else {
        setStatus({ type: "error", message: `Error: ${error.message || "Server connection failed"}` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-16 sm:pt-40 sm:pb-24 bg-[#FFFFFF] min-h-[calc(100vh-80px)]"
    >
      {/* SOFT BACKGROUND GLOWS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-50 blur-[140px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-50 blur-[140px]" />

      {/* PAGE LABEL */}
      <div className="mb-8 z-20">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-6 py-2 rounded-full shadow-sm">
          ● Contact
        </span>
      </div>

      {/* MAIN CARD */}
      <div
        className="relative z-10 max-w-4xl w-full grid md:grid-cols-2
        rounded-[26px] overflow-hidden border border-slate-200 shadow-xl bg-[#FFFFFF]"
      >
        {/* LEFT PANEL (DEEP BLACK) */}
        <div className="p-12 bg-[#0F0F0F] text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-[700] text-white mb-4">
              Let’s Connect
            </h2>

            <p className="text-slate-400 max-w-sm mb-12">
              Have an idea? We combine design, AI and engineering to craft
              meaningful digital experiences.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[11px] tracking-wider uppercase text-slate-500 font-bold">
                  Founder
                </p>
                <p className="text-lg font-semibold text-white mt-1">
                  Manish Gupta
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-wider uppercase text-slate-500 font-bold">
                  Call
                </p>
                <p className="text-white mt-1 leading-relaxed">
                  +91 9155596712 <br /> +91 9263119717
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-wider uppercase text-slate-500 font-bold">
                  Email
                </p>
                <p className="text-white mt-1">
                  teaminfozatech@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM (COMPACT) */}
        <div className="p-8 sm:p-12 bg-[#FFFFFF]">
          <h3 className="text-2xl font-[700] text-[#0F0F0F] mb-2">
            Send a Message
          </h3>

          <p className="text-slate-500 mb-6 text-sm">
            We usually reply within a few hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="subject"
              className="hidden"
              autoComplete="off"
            />
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-slate-50
              border border-slate-200 text-[#0F0F0F] placeholder-slate-400
              focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all duration-200"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl bg-slate-50
              border border-slate-200 text-[#0F0F0F] placeholder-slate-400
              focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all duration-200"
            />

            <textarea
              name="message"
              required
              rows="3"
              placeholder="Describe your project..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50
              border border-slate-200 text-[#0F0F0F] placeholder-slate-400 resize-none
              focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all duration-200"
            />

            {status.message && (
              <div className={`p-3 rounded-lg text-sm font-medium border ${
                status.type === "success" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" 
                  : "bg-rose-50 text-rose-700 border-rose-200/50"
              }`}>
                {status.type === "success" ? "✅ " : "❌ "}
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-[700] text-white transition-all duration-200
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-[#2563EB] hover:bg-[#1d4ed8]"}
              shadow-sm hover:shadow flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  SENDING...
                </>
              ) : (
                "SEND MESSAGE →"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
