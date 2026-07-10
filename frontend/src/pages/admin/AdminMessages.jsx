/* eslint-disable */
import React, { useState, useEffect } from "react";
import API_URL from "../../config";
import { Search, Eye, X, Trash2, RefreshCw } from "lucide-react";

export default function AdminMessages() {
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/contacts`);
      const data = await res.json();
      
      console.log("API Response:", data);
      
      if (data.success) {
        // Sort descending by ID to show newest first, assuming ID is timestamp
        const sorted = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMessages(sorted);
      } else {
        setError(data.message || "Failed to load communications.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Cannot reach server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Direct inquiries from the contact form.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchMessages}
            disabled={loading}
            className="p-2 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors bg-white dark:bg-zinc-900 shadow-sm"
            title="Refresh Messages"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="flex items-center bg-white dark:bg-zinc-900 px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm focus-within:border-indigo-500 focus-within:ring-[3px] focus-within:ring-indigo-500/10 transition-all">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-full sm:w-56 text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Message Preview</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-sm font-medium">Loading messages...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="inline-flex flex-col items-center p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-500/20">
                      {error}
                      <button onClick={fetchMessages} className="mt-3 underline text-red-700 hover:text-red-800 dark:hover:text-red-300">Try Again</button>
                    </div>
                  </td>
                </tr>
              ) : messages.length > 0 ? messages.map((msg) => {
                const dateOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' };
                const formattedDate = new Date(msg.createdAt).toLocaleDateString(undefined, dateOptions);
                return (
                <tr key={msg.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{msg.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs sm:max-w-md">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{msg.subject || "Website Inquiry"}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{msg.message || msg.content}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                     <button 
                       onClick={() => setSelectedMsg({...msg, formattedDate})}
                       className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-200 dark:border-zinc-700 transition-colors shadow-sm"
                     >
                       <Eye size={14} /> View
                     </button>
                     <button 
                       onClick={() => deleteMessage(msg.id)}
                       title="Delete Message"
                       className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent"
                     >
                       <Trash2 size={16} />
                     </button>
                    </div>
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                      <p className="text-sm font-medium">No messages yet</p>
                      <p className="text-xs mt-1">Inbox is completely clear.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Details</h3>
              <button 
                onClick={() => setSelectedMsg(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedMsg.name}</div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400">{selectedMsg.email}</div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{selectedMsg.formattedDate || selectedMsg.date}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-2">Subject: {selectedMsg.subject || "Website Inquiry"}</div>
                <div className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMsg.message || selectedMsg.content}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex justify-end gap-3">
              <button onClick={() => setSelectedMsg(null)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">Close</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors">Reply via Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
