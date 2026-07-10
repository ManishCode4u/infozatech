/* eslint-disable */
import React, { useState, useEffect } from "react";
import API_URL from "../../config";
import { Search, Eye, X, Trash2, RefreshCw, Briefcase, Mail, Phone, MapPin, Calendar, CheckSquare, Users } from "lucide-react";

export default function AdminApplications() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/applications`);
      const data = await res.json();
      
      console.log("API Response:", data);
      
      if (data.success) {
        // Sort descending by date to show newest first
        const sorted = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setApplications(sorted);
      } else {
        setError(data.message || "Failed to load job applications.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Cannot reach server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`${API_URL}/api/applications/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();

      if (data.success) {
        setApplications(prev => prev.filter(app => app.id !== id));
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(null);
        }
      } else {
        alert(data.message || "Failed to delete application.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete application. Server connection error.");
    }
  };

  // Filter application list based on search query and role filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
      (app.email || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
      (app.location || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      selectedRoleFilter === "All" || 
      app.role === selectedRoleFilter;

    return matchesSearch && matchesRole;
  });

  // Calculate statistics
  const totalCount = applications.length;
  const devCount = applications.filter(app => app.role.includes("Developer")).length;
  const salesCount = applications.filter(app => app.role.includes("Sales") || app.role.includes("Lead")).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Job Applications</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review candidates who applied via the careers portal.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Refresh Button */}
          <button 
            onClick={fetchApplications}
            disabled={loading}
            className="p-2.5 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center"
            title="Refresh Applications"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>

          {/* Role Filter Dropdown */}
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-2 outline-none focus:border-indigo-500 transition-all text-gray-700 dark:text-gray-300 shadow-sm"
          >
            <option value="All">All Roles</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Sales Executive">Sales Executive</option>
            <option value="Lead Generation Executive">Lead Generation Executive</option>
          </select>

          {/* Search Bar */}
          <div className="flex items-center bg-white dark:bg-zinc-900 px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm focus-within:border-indigo-500 focus-within:ring-[3px] focus-within:ring-indigo-500/10 transition-all">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm ml-2 w-full sm:w-56 text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applicants</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Briefcase size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Developers (Eng)</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{devCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckSquare size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sales & Lead Gen</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{salesCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Users size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Applied Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Applied On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-sm font-medium">Loading applications...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="inline-flex flex-col items-center p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-500/20">
                      {error}
                      <button onClick={fetchApplications} className="mt-3 underline text-red-700 hover:text-red-800 dark:hover:text-red-300">Try Again</button>
                    </div>
                  </td>
                </tr>
              ) : filteredApplications.length > 0 ? (
                filteredApplications.map((app) => {
                  const dateOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' };
                  const formattedDate = new Date(app.createdAt).toLocaleDateString(undefined, dateOptions);
                  return (
                    <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{app.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{app.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-55/10 dark:bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                          {app.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {app.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedApp({ ...app, formattedDate })}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-250 dark:border-zinc-750 transition-colors shadow-sm"
                          >
                            <Eye size={14} /> View Details
                          </button>
                          <button 
                            onClick={() => deleteApplication(app.id)}
                            title="Delete Application"
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                      <p className="text-sm font-medium">No applications found</p>
                      <p className="text-xs mt-1">Try resetting search queries or filtering criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expand Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden transform animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Applicant Detail Card</h3>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              
              {/* Profile Details Block */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                      {selectedApp.name}
                    </h2>
                    <span className="inline-flex mt-2 items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-55/10 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                      {selectedApp.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50/60 dark:bg-zinc-800/40 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800/60 text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <a href={`mailto:${selectedApp.email}`} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline truncate">
                    {selectedApp.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <a href={`tel:${selectedApp.contact}`} className="text-gray-700 dark:text-gray-300 font-semibold hover:underline">
                    {selectedApp.contact}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">{selectedApp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">{selectedApp.formattedDate}</span>
                </div>
              </div>

              {/* Why Join Us Statement */}
              <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                  Why do you want to join InfozaTech?
                </h4>
                <div className="bg-gray-50/30 dark:bg-zinc-800/20 p-4 rounded-xl border border-gray-100 dark:border-zinc-800/60 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-medium">
                  {selectedApp.whyJoinUs}
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedApp(null)} 
                className="px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                Close
              </button>
              <a 
                href={`mailto:${selectedApp.email}?subject=Application for ${selectedApp.role} - InfozaTech`}
                className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-2"
              >
                Email Candidate
              </a>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
