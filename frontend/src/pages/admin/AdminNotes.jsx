/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Clock,
  Pin,
  Edit2,
  Trash2,
  Search,
  X,
  Check,
  AlertTriangle,
  CheckCircle2,
  Tag,
  StickyNote,
  Filter,
  RefreshCw,
  MoreVertical,
  Flame,
  Bell
} from "lucide-react";
import {
  fetchNotes,
  createNote,
  updateNote,
  togglePinNote,
  deleteNote
} from "../../services/notesData";

const CATEGORIES = [
  "All",
  "Client Follow-up",
  "Project Task",
  "Lead Follow-up",
  "Candidate / Hiring",
  "General Reminder"
];

const COLOR_THEMES = [
  { id: "indigo", name: "Indigo", bg: "bg-indigo-50/50 dark:bg-indigo-950/20", border: "border-indigo-200 dark:border-indigo-800/60", badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300" },
  { id: "amber", name: "Amber", bg: "bg-amber-50/50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800/60", badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300" },
  { id: "emerald", name: "Emerald", bg: "bg-emerald-50/50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800/60", badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300" },
  { id: "rose", name: "Rose", bg: "bg-rose-50/50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800/60", badge: "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300" },
  { id: "purple", name: "Purple", bg: "bg-purple-50/50 dark:bg-purple-950/20", border: "border-purple-200 dark:border-purple-800/60", badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300" },
  { id: "slate", name: "Slate", bg: "bg-slate-50/60 dark:bg-zinc-900", border: "border-slate-200 dark:border-zinc-800", badge: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300" }
];

const INITIAL_FORM = {
  title: "",
  content: "",
  category: "Client Follow-up",
  priority: "Medium",
  color: "indigo",
  followUp: "",
  pinned: false
};

export default function AdminNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Notification Toast
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await fetchNotes();
    if (res.success && Array.isArray(res.data)) {
      setNotes(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingNote(null);
    setFormError("");
    setFormData(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setFormError("");
    setFormData({
      title: note.title || "",
      content: note.content || "",
      category: note.category || "Client Follow-up",
      priority: note.priority || "Medium",
      color: note.color || "indigo",
      followUp: note.followUp || "",
      pinned: !!note.pinned
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError("Note title is required.");
      return;
    }

    setFormSubmitting(true);
    setFormError("");

    try {
      if (editingNote) {
        const res = await updateNote(editingNote.id, formData);
        if (res.success) {
          showToast("Note updated successfully!");
          setIsModalOpen(false);
          setEditingNote(null);
          loadData();
        } else {
          setFormError(res.message || "Failed to update note.");
        }
      } else {
        const res = await createNote(formData);
        if (res.success) {
          showToast("New note created successfully!");
          setIsModalOpen(false);
          setFormData(INITIAL_FORM);
          loadData();
        } else {
          setFormError(res.message || "Failed to create note.");
        }
      }
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePin = async (note) => {
    const res = await togglePinNote(note.id);
    if (res.success) {
      showToast(res.message || "Pin status updated");
      loadData();
    }
  };

  const handleDelete = async (note) => {
    if (!window.confirm(`Are you sure you want to delete note "${note.title}"?`)) {
      return;
    }
    const res = await deleteNote(note.id);
    if (res.success) {
      showToast("Note deleted successfully.", "error");
      loadData();
    } else {
      alert(res.message || "Failed to delete note.");
    }
  };

  // Filter & Search Logic
  const filteredNotes = notes.filter((n) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (n.title || "").toLowerCase().includes(q) ||
      (n.content || "").toLowerCase().includes(q) ||
      (n.category || "").toLowerCase().includes(q);

    const matchesCategory = selectedCategory === "All" || n.category === selectedCategory;
    const matchesPriority = selectedPriority === "All" || n.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getColorTheme = (colorId) => {
    return COLOR_THEMES.find((c) => c.id === colorId) || COLOR_THEMES[0];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Toast Notification */}
      {notification.show && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border text-sm font-medium animate-in slide-in-from-top-3 ${
            notification.type === "error"
              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-900"
              : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-900"
          }`}
        >
          {notification.type === "error" ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <StickyNote size={22} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Notes & Follow-ups
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                Keep track of client reminders, project milestones, and due dates
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center"
            title="Refresh Notes"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm text-sm font-semibold transition-all hover:shadow-indigo-500/25 active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Create New Note</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-zinc-800 shadow-xs space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {cat} {cat === "All" ? `(${notes.length})` : `(${notes.filter((n) => n.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Search Bar & Priority Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-zinc-800/60 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-zinc-700/80 focus-within:border-indigo-500 transition-all">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search notes by title, content, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-800 dark:text-gray-100 placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:border-indigo-500 text-gray-700 dark:text-gray-200"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Clickable Card to Add New Note */}
        <button
          onClick={openAddModal}
          className="rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white/40 dark:bg-zinc-900/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 flex flex-col items-center justify-center p-8 min-h-[220px] transition-all group cursor-pointer text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800 group-hover:bg-indigo-600 group-hover:text-white text-gray-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-xs">
            <Plus size={24} />
          </div>
          <span className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            Create new note
          </span>
          <p className="text-xs text-gray-400 mt-1">Add a quick reminder or task</p>
        </button>

        {/* Render Notes */}
        {filteredNotes.map((note) => {
          const theme = getColorTheme(note.color);
          const isUrgent = note.priority === "Urgent" || note.priority === "High";

          return (
            <div
              key={note.id}
              className={`rounded-3xl p-6 border ${theme.border} ${theme.bg} transition-all hover:shadow-md group flex flex-col justify-between relative`}
            >
              <div>
                {/* Card Top: Category, Priority Badge, Actions */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${theme.badge}`}>
                      {note.category || "General"}
                    </span>

                    {note.priority && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          note.priority === "Urgent"
                            ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900"
                            : note.priority === "High"
                            ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
                            : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {isUrgent && <Flame size={10} />}
                        {note.priority}
                      </span>
                    )}
                  </div>

                  {/* Actions: Pin, Edit, Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePin(note)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        note.pinned
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-100/70 dark:bg-indigo-900/40"
                          : "text-gray-400 hover:text-indigo-600 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      title={note.pinned ? "Unpin note" : "Pin note to top"}
                    >
                      <Pin size={14} className={note.pinned ? "fill-indigo-600 dark:fill-indigo-400" : ""} />
                    </button>

                    <button
                      onClick={() => openEditModal(note)}
                      className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                      title="Edit note"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      onClick={() => handleDelete(note)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                      title="Delete note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug mb-2">
                  {note.title}
                </h3>

                {/* Content */}
                {note.content && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-4 line-clamp-5">
                    {note.content}
                  </p>
                )}
              </div>

              {/* Card Footer: Date Created & Follow-up Due */}
              <div className="flex items-center justify-between text-xs pt-3.5 border-t border-black/5 dark:border-white/5 mt-auto">
                <span className="text-gray-400 dark:text-zinc-500 font-medium">
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
                </span>

                {note.followUp ? (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/70 dark:bg-zinc-800/80 rounded-lg text-gray-700 dark:text-gray-200 font-semibold border border-black/5 dark:border-white/5 shadow-2xs">
                    <Calendar size={12} className="text-indigo-500" />
                    <span>Due: {note.followUp}</span>
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-zinc-600 text-[11px]">No due date</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          ADD / EDIT NOTE MODAL
      ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingNote ? "Edit Note" : "Create New Note"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
                  Record client follow-up, meeting notes, or internal tasks.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="py-5 space-y-4">
              
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Note Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Call Rahul regarding Website Proposal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Note Content / Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Write the notes, discussion points, or next action steps here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm resize-none"
                />
              </div>

              {/* Category & Priority Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Category Tag
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-xs sm:text-sm"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-xs sm:text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent 🔥</option>
                  </select>
                </div>
              </div>

              {/* Follow-up Due Date */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Follow-up Due Date <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="date"
                  value={formData.followUp}
                  onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                />
              </div>

              {/* Color Theme Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Card Color
                </label>
                <div className="flex items-center gap-3">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: theme.id })}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${theme.bg} ${
                        formData.color === theme.id
                          ? "border-indigo-600 scale-110 shadow-sm"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                      title={theme.name}
                    >
                      {formData.color === theme.id && <Check size={12} className="text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pin to Top Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.pinned}
                    onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-zinc-700"
                  />
                  <span>Pin this note to the top</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs sm:text-sm font-medium transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  {formSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingNote ? "Save Changes" : "Create Note"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
