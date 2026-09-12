/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  FileCheck,
  Plus,
  Link2,
  Search,
  RefreshCw,
  Eye,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Clock,
  Mail,
  User,
  Hash,
  Layers,
  Filter,
  ExternalLink,
  Ban,
  Check,
  Upload,
  Download,
  FileSpreadsheet,
  FileUp,
  ClipboardList
} from "lucide-react";
import {
  fetchVerifications,
  createVerification,
  updateVerification,
  revokeVerification,
  deleteVerification,
  bulkUploadVerifications
} from "../../services/verificationsData";
import QRCodeDisplay from "../../components/common/QRCodeDisplay";

const DOMAIN_OPTIONS = [
  "Frontend Development",
  "Backend Development",
  "Web Development",
  "Full stack Web Development",
  "Android App Development",
  "Data Science",
  "Java Programming",
  "Python Programming",
  "C++ Programming",
  "Cyber Security",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Analytics",
  "Digital Marketing",
  "Other"
];

const INITIAL_FORM = {
  documentType: "Internship Certificate",
  studentName: "",
  verificationId: "",
  domain: "Web Development",
  startDate: "",
  endDate: "",
  duration: "4 Weeks",
  status: "Verified",
  email: "",
  notes: ""
};

export default function AdminVerifications() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocFilter, setSelectedDocFilter] = useState("All");
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'add', 'search'

  // Modals & Active Items
  const [viewingRecord, setViewingRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Bulk Upload State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState("file"); // 'file' | 'paste'
  const [bulkRawText, setBulkRawText] = useState("");
  const [bulkParsedData, setBulkParsedData] = useState([]);
  const [bulkErrors, setBulkErrors] = useState([]);
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkFileName, setBulkFileName] = useState("");
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const loadData = async () => {
    setLoading(true);
    const res = await fetchVerifications();
    if (res.success && Array.isArray(res.data)) {
      setVerifications(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotice = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 4000);
  };

  /**
   * Helper: Parse CSV or Tab-separated text flexibly
   */
  const parseCSVData = (text) => {
    if (!text || !text.trim()) return { records: [], errors: ["File or text is empty."] };

    const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (lines.length < 2) {
      return { records: [], errors: ["Please provide a header row and at least 1 student row."] };
    }

    const isTabSeparated = lines[0].includes("\t");

    const parseLine = (line) => {
      if (isTabSeparated) {
        return line.split("\t").map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }
      const result = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          result.push(current.trim().replace(/^["']|["']$/g, ""));
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^["']|["']$/g, ""));
      return result;
    };

    const headerLine = lines[0];
    const rawHeaders = parseLine(headerLine);
    const normalizedHeaders = rawHeaders.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));

    // Find column positions by common synonyms
    const idIdx = normalizedHeaders.findIndex((h) =>
      h.includes("cert") || h.includes("code") || h.includes("verif") || h.includes("id") || h.includes("no")
    );
    const nameIdx = normalizedHeaders.findIndex((h) =>
      h.includes("name") || h.includes("student") || h.includes("candidate")
    );
    const domainIdx = normalizedHeaders.findIndex((h) =>
      h.includes("domain") || h.includes("stream") || h.includes("course") || h.includes("role") || h.includes("field")
    );
    const durationIdx = normalizedHeaders.findIndex((h) =>
      h.includes("duration") || h.includes("period") || h.includes("week") || h.includes("month")
    );
    const startIdx = normalizedHeaders.findIndex((h) =>
      h.includes("start") || h.includes("from") || h.includes("begin")
    );
    const endIdx = normalizedHeaders.findIndex((h) =>
      h.includes("end") || h.includes("award") || h.includes("to") || h.includes("issue") || h.includes("completion")
    );
    const emailIdx = normalizedHeaders.findIndex((h) => h.includes("email") || h.includes("mail"));
    const statusIdx = normalizedHeaders.findIndex((h) => h.includes("status"));

    const records = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const rawLine = lines[i].trim();
      if (!rawLine) continue;

      const values = parseLine(rawLine);

      const verificationId = (idIdx !== -1 ? values[idIdx] : values[0] || "").trim();
      const studentName = (nameIdx !== -1 ? values[nameIdx] : values[1] || "").trim();
      const domain = (domainIdx !== -1 ? values[domainIdx] : values[2] || "Web Development").trim();
      const duration = (durationIdx !== -1 ? values[durationIdx] : values[3] || "4 Weeks").trim();
      const startDate = (startIdx !== -1 ? values[startIdx] : values[4] || "").trim();
      const endDate = (endIdx !== -1 ? values[endIdx] : values[5] || "").trim();
      const email = (emailIdx !== -1 ? values[emailIdx] : values[6] || "").trim();
      const status = (statusIdx !== -1 ? values[statusIdx] : "Verified").trim();

      if (!verificationId || !studentName) {
        errors.push(`Row ${i + 1}: Missing ${!verificationId ? "Certification No" : "Student Name"}`);
        continue;
      }

      records.push({
        verificationId,
        certificateId: verificationId,
        internshipId: verificationId,
        studentName,
        domain: domain || "Web Development",
        duration: duration || "4 Weeks",
        startDate: startDate || new Date().toISOString().split("T")[0],
        endDate: endDate || new Date().toISOString().split("T")[0],
        email: email || "",
        status: status.toLowerCase().includes("revoke") ? "Revoked" : "Verified",
        documentType: "Internship Certificate",
        issuedBy: "InfozaTech"
      });
    }

    return { records, errors };
  };

  /**
   * Helper: Download Sample CSV Template
   */
  const downloadSampleTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Certification No,Student Name,Domain,Duration,Starting Date,Award Date,Email,Status\n" +
      "ITZ26001,Deepak Kumar,Web Development,4 Weeks,2026-09-10,2026-10-10,deepak@gmail.com,Verified\n" +
      "ITZ26002,Priya Patel,Data Science,4 Weeks,2026-09-10,2026-10-10,priya@gmail.com,Verified\n" +
      "ITZ26003,Amit Verma,Python Programming,4 Weeks,2026-09-15,2026-10-15,amit@gmail.com,Verified\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "infozatech_students_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Handle Bulk File Input Change
   */
  const handleBulkFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulkFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setBulkRawText(text);
      const { records, errors } = parseCSVData(text);
      setBulkParsedData(records);
      setBulkErrors(errors);
    };
    reader.readAsText(file);
  };

  /**
   * Handle Bulk Raw Text Change (Paste from Excel/Sheets)
   */
  const handleBulkTextChange = (text) => {
    setBulkRawText(text);
    const { records, errors } = parseCSVData(text);
    setBulkParsedData(records);
    setBulkErrors(errors);
  };

  /**
   * Submit Bulk Records
   */
  const handleBulkUploadSubmit = async () => {
    if (bulkParsedData.length === 0) {
      setBulkErrors(["Please upload a valid CSV file or paste student rows."]);
      return;
    }

    setBulkSubmitting(true);
    try {
      const res = await bulkUploadVerifications(bulkParsedData);
      if (res.success) {
        showNotice(res.message || `Successfully uploaded ${bulkParsedData.length} records!`);
        setIsBulkModalOpen(false);
        setBulkRawText("");
        setBulkParsedData([]);
        setBulkErrors([]);
        setBulkFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        loadData();
      } else {
        setBulkErrors([res.message || "Failed to upload records."]);
      }
    } catch (err) {
      setBulkErrors(["Unexpected network error. Please try again."]);
    } finally {
      setBulkSubmitting(false);
    }
  };

  const openAddForm = () => {
    setEditingRecord(null);
    setFormError("");
    setFormData(INITIAL_FORM);
    setIsAddModalOpen(true);
  };

  const openEditForm = (record) => {
    setEditingRecord(record);
    setFormError("");
    setFormData({
      documentType: record.documentType || "Internship Certificate",
      studentName: record.studentName || "",
      verificationId: record.verificationId || record.certificateId || record.internshipId || "",
      domain: record.domain || "Web Development",
      startDate: record.startDate || "",
      endDate: record.endDate || "",
      duration: record.duration || "4 Weeks",
      status: record.status || "Verified",
      email: record.email || "",
      notes: record.notes || ""
    });
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!formData.studentName.trim()) {
      setFormError("Student Name is required.");
      return;
    }
    if (!formData.verificationId.trim()) {
      setFormError("Verification ID is required.");
      return;
    }
    if (!formData.startDate.trim() || !formData.endDate.trim() || !formData.duration.trim()) {
      setFormError("Start Date, End Date, and Duration are required.");
      return;
    }

    const trimmedVerifId = formData.verificationId.trim();

    // Client duplicate check
    const isDuplicate = verifications.some((v) => {
      if (editingRecord && v.id === editingRecord.id) return false;
      return (v.verificationId || "").trim().toLowerCase() === trimmedVerifId.toLowerCase();
    });

    if (isDuplicate) {
      setFormError("This Verification ID already exists. Please use a unique ID.");
      return;
    }

    setFormSubmitting(true);

    const submitPayload = {
      ...formData,
      verificationId: trimmedVerifId,
      internshipId: trimmedVerifId,
      certificateId: trimmedVerifId
    };

    try {
      if (editingRecord) {
        const res = await updateVerification(editingRecord.id, submitPayload);
        if (res.success) {
          showNotice("Verification record updated successfully!");
          setIsAddModalOpen(false);
          setEditingRecord(null);
          loadData();
        } else {
          setFormError(res.message || "Failed to update verification record.");
        }
      } else {
        const res = await createVerification(submitPayload);
        if (res.success) {
          showNotice("New verification record created successfully!");
          setIsAddModalOpen(false);
          setFormData(INITIAL_FORM);
          loadData();
        } else {
          setFormError(res.message || "Failed to create verification record.");
        }
      }
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleQuickRevoke = async (record) => {
    if (!window.confirm(`Are you sure you want to revoke the document for ${record.studentName} (${record.verificationId})?`)) {
      return;
    }
    const res = await revokeVerification(record.id);
    if (res.success) {
      showNotice(`Document ${record.verificationId} has been REVOKED.`, "warning");
      if (viewingRecord && viewingRecord.id === record.id) {
        setViewingRecord({ ...viewingRecord, status: "Revoked" });
      }
      loadData();
    } else {
      alert(res.message || "Failed to revoke record.");
    }
  };

  const handleDeleteRecord = async (record) => {
    if (!window.confirm(`Permanent Deletion Warning: Are you sure you want to delete verification record ${record.verificationId}? This action cannot be undone.`)) {
      return;
    }
    const res = await deleteVerification(record.id);
    if (res.success) {
      showNotice("Verification record deleted successfully.", "error");
      if (viewingRecord && viewingRecord.id === record.id) {
        setViewingRecord(null);
      }
      loadData();
    } else {
      alert(res.message || "Failed to delete record.");
    }
  };

  // Filtered List
  const filteredVerifications = verifications.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (item.studentName || "").toLowerCase().includes(q) ||
      (item.verificationId || "").toLowerCase().includes(q) ||
      (item.internshipId || "").toLowerCase().includes(q) ||
      (item.certificateId || "").toLowerCase().includes(q) ||
      (item.domain || "").toLowerCase().includes(q) ||
      (item.email || "").toLowerCase().includes(q);

    const matchesDocType = selectedDocFilter === "All" || item.documentType === selectedDocFilter;
    const matchesDomain = selectedDomainFilter === "All" || item.domain === selectedDomainFilter;
    const matchesStatus = selectedStatusFilter === "All" || item.status === selectedStatusFilter;

    return matchesSearch && matchesDocType && matchesDomain && matchesStatus;
  });

  // Statistics
  const totalCount = verifications.length;
  const verifiedCount = verifications.filter((v) => v.status === "Verified").length;
  const revokedCount = verifications.filter((v) => v.status === "Revoked").length;
  const certCount = verifications.filter((v) => v.documentType === "Internship Certificate").length;
  const offerCount = verifications.filter((v) => v.documentType === "Internship Offer Letter").length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Toast Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border text-sm font-medium animate-in slide-in-from-top-3 ${
          notification.type === "error"
            ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-900"
            : notification.type === "warning"
            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-900"
            : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-900"
        }`}>
          {notification.type === "error" ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Internship Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                Issue and manage verified Internship Certificates
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/internship-settings"
            className="flex items-center gap-2 px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-semibold transition-colors border border-indigo-200 dark:border-indigo-800"
            title="Change 1-Month Virtual Internship Apply Link"
          >
            <Link2 size={16} />
            <span className="hidden sm:inline">Change Apply Link</span>
          </Link>

          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center"
            title="Refresh Records"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>

          <a
            href="/verify"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors border border-gray-200 dark:border-zinc-700"
            title="Open Public /verify Page"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Public /verify</span>
          </a>

          <button
            onClick={() => {
              setIsBulkModalOpen(true);
              setBulkErrors([]);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm text-sm font-semibold transition-all hover:shadow-emerald-500/25 active:scale-[0.98]"
            title="Upload multiple students from CSV or Excel file"
          >
            <Upload size={18} />
            <span>Bulk Upload (CSV / Excel)</span>
          </button>

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm text-sm font-semibold transition-all hover:shadow-indigo-500/25 active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Add Single Record</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gray-100 dark:border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Records</p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileCheck size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-3 font-medium">All registered credentials</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gray-100 dark:border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Verified Active</p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">{verifiedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400/80 mt-3 font-medium">Authentic & Valid</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gray-100 dark:border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Revoked</p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">{revokedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Ban size={20} />
            </div>
          </div>
          <p className="text-xs text-rose-600 dark:text-rose-400/80 mt-3 font-medium">No longer valid</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gray-100 dark:border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Document Type</p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">
                Certificate
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-3 font-medium">Internship Certificate System</p>
        </div>
      </div>

      {/* Controls & Navigation Tabs */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-zinc-800 shadow-xs space-y-4">
        
        {/* Navigation Section Tabs */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              All Records ({verifications.length})
            </button>
            <button
              onClick={openAddForm}
              className="px-3.5 py-1.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Add Verification Record</span>
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "search"
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <Search size={15} />
              <span>Search Records</span>
            </button>
          </div>

          <div className="text-xs text-gray-400 font-medium hidden sm:block">
            Showing {filteredVerifications.length} of {verifications.length} records
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-zinc-800/60 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700/80 focus-within:border-indigo-500 focus-within:ring-[3px] focus-within:ring-indigo-500/10 transition-all">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by Student Name, Verification ID, Domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-800 dark:text-gray-100 placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Document Type Filter */}
            <select
              value={selectedDocFilter}
              onChange={(e) => setSelectedDocFilter(e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:border-indigo-500 text-gray-700 dark:text-gray-200"
            >
              <option value="All">All Documents</option>
              <option value="Internship Certificate">Internship Certificate</option>
            </select>

            {/* Domain Filter */}
            <select
              value={selectedDomainFilter}
              onChange={(e) => setSelectedDomainFilter(e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:border-indigo-500 text-gray-700 dark:text-gray-200"
            >
              <option value="All">All Domains</option>
              {DOMAIN_OPTIONS.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:border-indigo-500 text-gray-700 dark:text-gray-200"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Revoked">Revoked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-900/80 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Verification ID</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400 dark:text-zinc-500 font-medium">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading verification records...
                  </td>
                </tr>
              ) : filteredVerifications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-400 dark:text-zinc-500">
                    <ShieldCheck size={36} className="mx-auto mb-3 opacity-40 text-indigo-400" />
                    <p className="font-semibold text-gray-600 dark:text-gray-300">No verification records found</p>
                    <p className="text-xs mt-1">Try adjusting your search query or add a new record.</p>
                  </td>
                </tr>
              ) : (
                filteredVerifications.map((record) => {
                  const isRevoked = record.status === "Revoked";
                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition-colors group"
                    >
                      {/* Student Name */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {record.studentName}
                        </div>
                        {record.email && (
                          <div className="text-xs text-gray-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
                            <Mail size={11} />
                            <span>{record.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Verification ID */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                          {record.verificationId}
                        </span>
                      </td>

                      {/* Document Type */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
                          {record.documentType === "Internship Certificate" ? (
                            <Award size={15} className="text-amber-500 shrink-0" />
                          ) : (
                            <FileText size={15} className="text-blue-500 shrink-0" />
                          )}
                          <span>{record.documentType}</span>
                        </div>
                      </td>

                      {/* Domain */}
                      <td className="px-6 py-4">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {record.domain}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                        <div>{record.startDate} → {record.endDate}</div>
                        <div className="font-medium text-gray-400 dark:text-zinc-500 mt-0.5">Duration: {record.duration}</div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isRevoked
                              ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20"
                              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20"
                          }`}
                        >
                          {isRevoked ? <Ban size={12} /> : <CheckCircle2 size={12} />}
                          {record.status || "Verified"}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 text-xs text-gray-400 dark:text-zinc-500 font-mono">
                        {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Button */}
                          <button
                            onClick={() => setViewingRecord(record)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                            title="View Complete Verification Details & QR"
                          >
                            <Eye size={17} />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => openEditForm(record)}
                            className="p-1.5 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                            title="Edit Record"
                          >
                            <Edit2 size={17} />
                          </button>

                          {/* Quick Revoke / Restore Button */}
                          {!isRevoked ? (
                            <button
                              onClick={() => handleQuickRevoke(record)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Revoke Document"
                            >
                              <Ban size={17} />
                            </button>
                          ) : (
                            <button
                              onClick={() => openEditForm(record)}
                              className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                              title="Reinstate Document"
                            >
                              <CheckCircle2 size={17} />
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteRecord(record)}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Permanently Delete Record"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          VIEW RECORD MODAL
      ========================================================================= */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-zinc-800 pb-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  viewingRecord.status === "Revoked"
                    ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {viewingRecord.status === "Revoked" ? <AlertTriangle size={24} /> : <Award size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      viewingRecord.status === "Revoked"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                    }`}>
                      Document Status: {viewingRecord.status || "Verified"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">
                    {viewingRecord.studentName}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setViewingRecord(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              
              {/* Document Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Document Type</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                    {viewingRecord.documentType}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verification ID</p>
                  <p className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                    {viewingRecord.verificationId}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Domain</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-1">
                    {viewingRecord.domain}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-1">
                    {viewingRecord.duration}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Start Date</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-1">
                    {viewingRecord.startDate}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">End Date</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-1">
                    {viewingRecord.endDate}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Issued By</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                    {viewingRecord.issuedBy || "InfozaTech"}
                  </p>
                </div>

                {viewingRecord.email && (
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Student Email</p>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200 mt-1">
                      {viewingRecord.email}
                    </p>
                  </div>
                )}
              </div>

              {/* Internal Notes (Admin Only) */}
              {viewingRecord.notes && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Internal Notes (Admin Only)
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                    {viewingRecord.notes}
                  </p>
                </div>
              )}

              {/* QR Code Section */}
              <div className="mt-6">
                <QRCodeDisplay verificationId={viewingRecord.verificationId} size={180} />
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const rec = viewingRecord;
                    setViewingRecord(null);
                    openEditForm(rec);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors"
                >
                  <Edit2 size={15} />
                  <span>Edit Record</span>
                </button>

                {viewingRecord.status !== "Revoked" && (
                  <button
                    type="button"
                    onClick={() => handleQuickRevoke(viewingRecord)}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 text-rose-700 dark:text-rose-400 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Ban size={15} />
                    <span>Revoke Document</span>
                  </button>
                )}
              </div>

              <a
                href={`/verify?id=${encodeURIComponent(viewingRecord.verificationId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
              >
                <span>View Public Verification</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT RECORD MODAL
      ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-gray-100 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-zinc-800 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {editingRecord ? "Edit Verification Record" : "Add Verification Record"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                  {editingRecord
                    ? "Update student verification record details."
                    : "Fill in the details to register a new verified Offer Letter or Certificate."}
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="py-6 space-y-5">
              
              {/* Error Alert */}
              {formError && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                  <AlertTriangle size={17} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Document Type */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm font-medium"
                >
                  <option value="Internship Certificate">Internship Certificate</option>
                </select>
              </div>

              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Student Name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                />
              </div>

              {/* Verification ID (Single ID Field) */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Verification ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter ID"
                  value={formData.verificationId}
                  onChange={(e) => setFormData({ ...formData, verificationId: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm font-mono"
                />
                <p className="text-xs text-gray-400 dark:text-zinc-500">Must be unique across all documents.</p>
              </div>

              {/* Domain & Duration Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Domain */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Domain <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                  >
                    {DOMAIN_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 4 Weeks or 1 Month"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Start Date & End Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 01 September 2026 or 2026-09-01"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 30 September 2026 or 2026-09-30"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Status & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Document Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="Verified">Verified (Active & Valid)</option>
                    <option value="Revoked">Revoked (Cancelled)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Student Email <span className="text-xs font-normal text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g., student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Additional Information / Notes <span className="text-xs font-normal text-gray-400">(Optional - Admin Internal Only)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Project details, performance distinction, internal reference..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  {formSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>{editingRecord ? "Save Changes" : "Add Verification Record"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          BULK UPLOAD MODAL (CSV / EXCEL / PASTE)
      ========================================================================= */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-2xl w-full max-w-4xl p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-5 border-b border-gray-100 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Bulk Upload Students & Certificates
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Import multiple records instantly via CSV or paste directly from Google Sheets
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadSampleTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors border border-gray-200 dark:border-zinc-700"
                  title="Download Sample CSV template"
                >
                  <Download size={14} />
                  <span>Download Sample CSV</span>
                </button>

                <button
                  onClick={() => setIsBulkModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
              
              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-zinc-800/80 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setBulkMode("file")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bulkMode === "file"
                      ? "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  }`}
                >
                  <FileUp size={15} />
                  <span>Upload .CSV File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBulkMode("paste")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bulkMode === "paste"
                      ? "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  }`}
                >
                  <ClipboardList size={15} />
                  <span>Paste from Excel / Google Sheets</span>
                </button>
              </div>

              {/* Mode 1: File Drag & Drop */}
              {bulkMode === "file" && (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".csv,text/csv,text/plain"
                    onChange={handleBulkFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-gray-50/50 dark:bg-zinc-800/30 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                      <Upload size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">
                        {bulkFileName ? bulkFileName : "Click or drag & drop CSV file here"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Supports standard .csv file exported from Google Sheets or Excel
                      </p>
                    </div>
                    {bulkFileName && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold">
                        <Check size={14} /> File loaded successfully
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Mode 2: Direct Paste */}
              {bulkMode === "paste" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                    <span>Paste raw rows directly (Header in row 1, student data in next rows):</span>
                    <span className="text-gray-400 font-normal">Excel tabs & CSV commas supported</span>
                  </label>
                  <textarea
                    rows={6}
                    value={bulkRawText}
                    onChange={(e) => handleBulkTextChange(e.target.value)}
                    placeholder={`Certification No,Student Name,Domain,Duration,Starting Date,Award Date,Email\nITZ26001,Deepak Kumar,Web Development,4 Weeks,2026-09-10,2026-10-10,deepak@gmail.com\nITZ26002,Priya Patel,Data Science,4 Weeks,2026-09-10,2026-10-10,priya@gmail.com`}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-2xl outline-none focus:border-emerald-500 text-gray-900 dark:text-white text-xs font-mono resize-none leading-relaxed"
                  />
                </div>
              )}

              {/* Validation & Live Preview Section */}
              {(bulkParsedData.length > 0 || bulkErrors.length > 0) && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Live Data Preview</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
                        ✓ {bulkParsedData.length} Valid Records
                      </span>
                      {bulkErrors.length > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-bold">
                          ⚠ {bulkErrors.length} Errors / Skipped
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Errors List if any */}
                  {bulkErrors.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertTriangle size={14} /> Please check these rows:
                      </div>
                      {bulkErrors.slice(0, 5).map((err, idx) => (
                        <div key={idx}>• {err}</div>
                      ))}
                      {bulkErrors.length > 5 && (
                        <div className="text-gray-500 mt-1">...and {bulkErrors.length - 5} more skipped rows.</div>
                      )}
                    </div>
                  )}

                  {/* Preview Table */}
                  {bulkParsedData.length > 0 && (
                    <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xs">
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 sticky top-0 font-bold">
                            <tr>
                              <th className="p-2.5 pl-4">#</th>
                              <th className="p-2.5">Certification No</th>
                              <th className="p-2.5">Student Name</th>
                              <th className="p-2.5">Domain</th>
                              <th className="p-2.5">Duration</th>
                              <th className="p-2.5">Starting Date</th>
                              <th className="p-2.5 pr-4">Award Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/80">
                            {bulkParsedData.slice(0, 8).map((row, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30">
                                <td className="p-2.5 pl-4 text-gray-400">{idx + 1}</td>
                                <td className="p-2.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                  {row.verificationId}
                                </td>
                                <td className="p-2.5 font-semibold text-gray-900 dark:text-white">
                                  {row.studentName}
                                </td>
                                <td className="p-2.5 text-gray-600 dark:text-gray-300">{row.domain}</td>
                                <td className="p-2.5 text-gray-500 dark:text-gray-400">{row.duration}</td>
                                <td className="p-2.5 text-gray-500 dark:text-gray-400">{row.startDate}</td>
                                <td className="p-2.5 pr-4 text-gray-500 dark:text-gray-400">{row.endDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {bulkParsedData.length > 8 && (
                        <div className="p-2 text-center text-xs text-gray-400 bg-gray-50/50 dark:bg-zinc-800/40 border-t border-gray-100 dark:border-zinc-800">
                          Showing first 8 of {bulkParsedData.length} records.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsBulkModalOpen(false);
                  setBulkRawText("");
                  setBulkParsedData([]);
                  setBulkErrors([]);
                  setBulkFileName("");
                }}
                className="px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBulkUploadSubmit}
                disabled={bulkSubmitting || bulkParsedData.length === 0}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
              >
                {bulkSubmitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Uploading {bulkParsedData.length} Records...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Confirm & Upload ({bulkParsedData.length} Students)</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
