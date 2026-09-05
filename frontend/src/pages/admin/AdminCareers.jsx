import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  CheckCircle,
  Clock,
  MapPin,
  ExternalLink,
  Crown,
  Sparkles,
  Save,
  X,
  Layers,
  Users
} from "lucide-react";
import {
  getCareers,
  saveCareers,
  resetCareersToDefault,
  getIconComponent,
} from "../../services/careersData";

export default function AdminCareers() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    type: "Full-time",
    location: "Patna / Remote",
    badge: "Engineering",
    isFeatured: false,
    description: "",
    bulletsText: "",
  });

  useEffect(() => {
    setJobs(getCareers());
  }, []);

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({
      id: "job-" + Date.now(),
      title: "",
      type: "Full-time",
      location: "Patna / Remote",
      badge: "Engineering",
      isFeatured: false,
      description: "",
      bulletsText: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      id: job.id,
      title: job.title,
      type: job.type,
      location: job.location,
      badge: job.badge || "",
      isFeatured: job.isFeatured || false,
      description: job.description || "",
      bulletsText: (job.bullets || []).join("\n"),
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const bulletsArray = formData.bulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const updatedJob = {
      id: formData.id || "job-" + Date.now(),
      title: formData.title,
      iconName: formData.isFeatured ? "Crown" : "Code",
      color: formData.isFeatured
        ? "from-amber-500 via-orange-500 to-rose-600"
        : "from-blue-500 to-indigo-600",
      bg: formData.isFeatured
        ? "bg-amber-50/70 dark:bg-amber-950/30"
        : "bg-blue-50/50 dark:bg-blue-950/20",
      textColor: formData.isFeatured
        ? "text-amber-600 dark:text-amber-400"
        : "text-blue-600 dark:text-blue-400",
      badge: formData.badge || (formData.isFeatured ? "Leadership" : "Open"),
      type: formData.type,
      location: formData.location,
      isFeatured: Boolean(formData.isFeatured),
      description: formData.description,
      bullets: bulletsArray.length > 0 ? bulletsArray : ["Key responsibilities and skills."],
    };

    let newJobsList;
    if (editingJob) {
      newJobsList = jobs.map((j) => (j.id === editingJob.id ? updatedJob : j));
    } else {
      // Put featured / co-founder roles at the very top
      if (updatedJob.isFeatured) {
        newJobsList = [updatedJob, ...jobs];
      } else {
        newJobsList = [...jobs, updatedJob];
      }
    }

    setJobs(newJobsList);
    saveCareers(newJobsList);
    setIsModalOpen(false);
    showNotice("Job opening saved successfully! Changes are live on the website.");
  };

  const handleDeleteJob = (id) => {
    if (!window.confirm("Are you sure you want to remove this job opening?")) return;
    const filtered = jobs.filter((j) => j.id !== id);
    setJobs(filtered);
    saveCareers(filtered);
    showNotice("Job opening removed.");
  };

  const handleResetDefaults = () => {
    if (
      !window.confirm(
        "Reset all career listings back to standard default openings (including Co-Founder role)?"
      )
    )
      return;
    const defaults = resetCareersToDefault();
    setJobs(defaults);
    showNotice("Career openings reset to defaults.");
  };

  const showNotice = (msg) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(""), 4000);
  };

  const featuredCount = jobs.filter((j) => j.isFeatured || j.id === "cofounder").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Briefcase size={22} />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Careers & Job Openings
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage public job openings, co-founder requirements, and roles displayed on your careers page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/careers"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
          >
            <span>Live Careers Page</span>
            <ExternalLink size={13} />
          </Link>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Add Job Opening</span>
          </button>
        </div>
      </div>

      {/* Notice Alert */}
      {saveStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600" />
            <span>{saveStatus}</span>
          </div>
          <button onClick={() => setSaveStatus("")} className="text-emerald-600 hover:text-emerald-800">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Openings</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{jobs.length}</h3>
          </div>
          <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Layers size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Co-Founder / Leadership</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{featuredCount}</h3>
          </div>
          <div className="size-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Crown size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Standard Positions</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{jobs.length - featuredCount}</h3>
          </div>
          <div className="size-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Jobs Table & List */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Active Career Listings</h2>
            <p className="text-xs text-gray-400">These jobs are displayed to applicants on the website in real-time.</p>
          </div>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset to Default Jobs</span>
          </button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {jobs.map((job, idx) => {
            const IconComp = getIconComponent(job.iconName);
            const isFeatured = job.isFeatured || job.id === "cofounder";

            return (
              <div
                key={job.id}
                className={`p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isFeatured ? "bg-amber-50/30 dark:bg-amber-950/10" : "hover:bg-gray-50/60 dark:hover:bg-zinc-800/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs ${
                      isFeatured ? "bg-gradient-to-br from-amber-500 to-rose-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    }`}
                  >
                    <IconComp size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-[10px] font-extrabold text-amber-800 dark:text-amber-300 px-2 py-0.5 uppercase tracking-wider">
                          <Crown size={11} /> Top Featured / Co-Founder
                        </span>
                      )}
                      <span className="rounded-md bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:text-gray-300">
                        {job.badge || "Role"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 max-w-2xl">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {job.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span>•</span>
                      <span>{(job.bullets || []).length} key requirements</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => openEditModal(job)}
                    className="p-2 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1"
                    title="Edit Opening"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-2 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 transition-colors"
                    title="Delete Opening"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full border border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Briefcase size={18} />
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingJob ? "Edit Job Opening" : "Create New Job Opening"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Job / Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Technical Co-Founder & Partner, Full Stack Developer"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g. Full-time, Co-Founder / Equity"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Patna / Remote / Hybrid"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Category / Department Tag
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Leadership, Engineering, Outreach"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isFeaturedCheck"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="size-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="isFeaturedCheck" className="text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer flex items-center gap-1">
                    <Crown size={14} className="text-amber-500" />
                    <span>Highlight at Top (Co-Founder / Priority)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Job Summary Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a high-level overview of the role and vision..."
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium outline-none focus:border-blue-500 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Key Skills & Responsibilities (1 per line)
                </label>
                <textarea
                  rows="5"
                  value={formData.bulletsText}
                  onChange={(e) => setFormData({ ...formData, bulletsText: e.target.value })}
                  placeholder="Client Communication: Fluent in English and Hindi&#10;Full Stack Web & Mobile architecture&#10;Hiring & Managing engineering teams&#10;Marketing and growth scaling..."
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium outline-none focus:border-blue-500 text-gray-900 dark:text-white resize-none font-mono text-xs"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save size={14} />
                  <span>Save Job Opening</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
