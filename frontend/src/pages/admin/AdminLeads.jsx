/* eslint-disable */
import React, { useState, useEffect } from "react";
import API_URL from "../../config";
import { Search, Filter, MoreHorizontal, Trash2, Star, RefreshCw, LayoutGrid, List } from "lucide-react";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("cards");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/leads`);
      const data = await res.json();
      
      console.log("Leads API Response:", data);
      
      if (data.success) {
        const sorted = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLeads(sorted);
      } else {
        setError(data.message || "Failed to load leads.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Cannot reach server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const toggleStar = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, isImportant: !lead.isImportant } : lead));
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "New": return "bg-blue-50/60 text-blue-600 border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-900/30";
      case "Contacted": return "bg-amber-50/60 text-amber-600 border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-900/30";
      case "In Progress": return "bg-indigo-50/60 text-indigo-600 border-indigo-200/50 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-900/30";
      case "Converted": return "bg-emerald-50/60 text-emerald-600 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-900/30";
      default: return "bg-gray-50/60 text-gray-600 border-gray-200/50 dark:bg-zinc-800/50 dark:text-gray-400 dark:border-zinc-700/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Leads</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your incoming leads.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100/80 dark:bg-zinc-800/80 p-1 rounded-xl border border-gray-200/50 dark:border-zinc-750 shadow-inner">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "cards"
                  ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
              title="Cards View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>

          <button 
            onClick={fetchLeads}
            disabled={loading}
            className="p-2 border border-gray-200 dark:border-zinc-850 text-gray-500 hover:bg-gray-55 dark:hover:bg-zinc-800 rounded-xl transition-colors bg-white dark:bg-zinc-900 shadow-sm"
            title="Refresh Leads"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          
          <div className="flex items-center bg-white dark:bg-zinc-900 px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-850 shadow-sm focus-within:border-indigo-500 focus-within:ring-[3px] focus-within:ring-indigo-500/10 transition-all">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-full sm:w-48 text-gray-700 dark:text-gray-200"
            />
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-55 dark:hover:bg-zinc-800 flex-shrink-0 transition-colors">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-12 text-center">
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Loading leads...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-12 text-center">
          <div className="inline-flex flex-col items-center p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-500/20">
            {error}
            <button onClick={fetchLeads} className="mt-3 underline text-red-700 hover:text-red-800 dark:hover:text-red-300">Try Again</button>
          </div>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-12 text-center">
          <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
            <Search size={32} className="mb-3 opacity-20" />
            <p className="text-sm font-medium">No leads found</p>
            <p className="text-xs mt-1">Your incoming leads will appear here.</p>
          </div>
        </div>
      ) : viewMode === "cards" ? (
        /* Cards View (Futuristic / AI-generated style) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => {
            const dateOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedDate = new Date(lead.createdAt).toLocaleDateString(undefined, dateOptions);
            const initial = lead.email.charAt(0).toUpperCase();

            // Dynamic gradient backgrounds for avatars
            const gradients = [
              "from-purple-500 to-indigo-500",
              "from-cyan-500 to-blue-500",
              "from-emerald-500 to-teal-500",
              "from-rose-500 to-orange-500",
              "from-amber-500 to-yellow-500",
              "from-pink-500 to-rose-500"
            ];
            const gradientIdx = lead.email.charCodeAt(0) % gradients.length;
            const avatarGradient = gradients[gradientIdx];

            return (
              <div
                key={lead.id}
                className="relative group bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-100/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Neon top glow */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Glowing Avatar */}
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-black text-[15px] shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                      {initial}
                    </div>
                    
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lead.email}
                      </p>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500 flex items-center gap-1.5 mt-1 font-medium">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Star Toggle */}
                  <button
                    onClick={() => toggleStar(lead.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      lead.isImportant
                        ? 'text-amber-500 border-amber-100 dark:border-amber-900/30 bg-amber-50/40 dark:bg-amber-500/10'
                        : 'text-slate-400 border-slate-100 dark:border-zinc-800 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-zinc-800'
                    }`}
                    title="Mark as important"
                  >
                    <Star size={15} fill={lead.isImportant ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100/50 dark:border-zinc-800/40 flex items-center justify-between gap-3">
                  {/* Status Dropdown */}
                  <div className="relative">
                    <select
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer appearance-none pr-8 shadow-sm transition-colors ${getStatusStyle(lead.status)}`}
                      defaultValue={lead.status}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Converted">Converted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-slate-500 dark:text-zinc-400">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-950/20"
                    title="Delete lead"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  <th className="px-6 py-4">Lead Email</th>
                  <th className="px-6 py-4">Date Added</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {leads.map((lead) => {
                  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                  const formattedDate = new Date(lead.createdAt).toLocaleDateString(undefined, dateOptions);
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative inline-block">
                          <select
                            className={`text-xs font-bold px-3 py-1 rounded-lg border appearance-none pr-8 outline-none cursor-pointer ${getStatusStyle(lead.status)}`}
                            defaultValue={lead.status}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Converted">Converted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-slate-500 dark:text-zinc-400">
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-gray-400 dark:text-gray-500">
                          <button
                            onClick={() => toggleStar(lead.id)}
                            className={`p-1 transition-colors rounded ${lead.isImportant ? 'text-yellow-500 hover:text-yellow-600' : 'hover:text-yellow-500'}`}
                            title="Mark as important"
                          >
                            <Star size={16} fill={lead.isImportant ? "currentColor" : "none"} />
                          </button>
                          <button className="p-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded">
                            <MoreHorizontal size={18} />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1 hover:text-red-500 transition-colors rounded"
                            title="Delete lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination (Common) */}
      {leads.length > 0 && !loading && !error && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-gray-150 dark:border-zinc-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 shadow-sm">
          <span>Showing 1 to {leads.length} of {leads.length} leads</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors border border-gray-200 dark:border-zinc-700/80">Prev</button>
            <button className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 font-bold">1</button>
            <button className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors border border-gray-200 dark:border-zinc-700/80">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
