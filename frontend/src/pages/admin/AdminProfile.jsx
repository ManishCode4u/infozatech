import React, { useState, useEffect, useRef } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Building, 
  Save, 
  Calendar,
  Sparkles,
  BadgeCheck,
  Pencil,
  X,
  Check
} from "lucide-react";

export default function AdminProfile() {
  // Admin Profile Info State
  const [name, setName] = useState(() => {
    return localStorage.getItem("admin_profile_name") || "Manish Kumar";
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("admin_profile_email") || "manish12643@gmail.com";
  });
  const [phone, setPhone] = useState(() => {
    return localStorage.getItem("admin_profile_phone") || "+91 98765 43210";
  });
  const [role, setRole] = useState("Super Administrator");
  const [organization, setOrganization] = useState("InfozaTech Technologies");

  // Edit Mode States (False by default -> Hide Save Button, Show Edit Button)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Status message for profile
  const [profileSuccess, setProfileSuccess] = useState("");

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Refs for auto-focusing inputs on edit click
  const nameInputRef = useRef(null);
  const currentPasswordRef = useRef(null);

  useEffect(() => {
    if (isEditingProfile && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingProfile]);

  useEffect(() => {
    if (isEditingPassword && currentPasswordRef.current) {
      currentPasswordRef.current.focus();
    }
  }, [isEditingPassword]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem("admin_profile_name", name);
    localStorage.setItem("admin_profile_email", email);
    localStorage.setItem("admin_profile_phone", phone);
    
    // Broadcast change so Topbar and header update immediately
    window.dispatchEvent(new Event("admin_profile_changed"));

    // Hide save button and switch back to view mode
    setIsEditingProfile(false);

    setProfileSuccess("Profile details saved successfully!");
    setTimeout(() => {
      setProfileSuccess("");
    }, 3500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    const activePassword = localStorage.getItem("admin_custom_password") || "Goa@627830";

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (currentPassword !== activePassword) {
      setPasswordError("Current password does not match.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    // Save new password
    localStorage.setItem("admin_custom_password", newPassword);
    
    // Hide update button and switch back to view mode
    setIsEditingPassword(false);

    setPasswordSuccess("Password updated and saved successfully! Please use this password on your next login.");
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setPasswordSuccess("");
    }, 4500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Admin Profile & Security
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal administrator details and update your account credentials.
        </p>
      </div>

      {/* Main Grid: Profile Details & Password Change */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Admin Overview Badge Card */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 p-6 sm:p-7 shadow-xs text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600"></div>

          <div className="relative pt-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 p-1.5 shadow-xl">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-inner">
                  {name ? name.charAt(0).toUpperCase() : "M"}
                </div>
              </div>
              <button 
                onClick={() => setIsEditingProfile(true)}
                title="Edit Profile"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Pencil size={13} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h2>
                <BadgeCheck size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{email}</p>
              
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                <ShieldCheck size={14} />
                <span>{role}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Building size={14} /> Organization
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{organization}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Calendar size={14} /> Status
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Phone size={14} /> Phone
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Info & Change Password Forms */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: Profile Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 p-6 sm:p-7 shadow-xs transition-all duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Profile Details</h3>
                    {isEditingProfile ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-semibold border border-amber-200/50">
                        Editing
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 text-[10px] font-semibold">
                        Saved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View and update administrator profile information</p>
                </div>
              </div>

              {/* Edit / Cancel Toggle Button in Upper Header */}
              {!isEditingProfile ? (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800/30"
                  title="Edit Profile"
                >
                  <Pencil size={13} />
                  <span>Edit</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  title="Cancel Edit"
                >
                  <X size={13} />
                  <span>Cancel</span>
                </button>
              )}
            </div>

            {profileSuccess && (
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}

            <form onSubmit={handleProfileSave} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      ref={nameInputRef}
                      type="text"
                      disabled={!isEditingProfile}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Name"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                        isEditingProfile 
                          ? "bg-white dark:bg-zinc-800 border-2 border-indigo-500 shadow-xs text-gray-900 dark:text-white" 
                          : "bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 cursor-default"
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      disabled={!isEditingProfile}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@infozatech.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                        isEditingProfile 
                          ? "bg-white dark:bg-zinc-800 border-2 border-indigo-500 shadow-xs text-gray-900 dark:text-white" 
                          : "bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 cursor-default"
                      }`}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                        isEditingProfile 
                          ? "bg-white dark:bg-zinc-800 border-2 border-indigo-500 shadow-xs text-gray-900 dark:text-white" 
                          : "bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 cursor-default"
                      }`}
                    />
                  </div>
                </div>

                {/* Role (Read Only) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Assigned Role
                  </label>
                  <div className="relative">
                    <ShieldCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={role}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none text-gray-600 dark:text-gray-400 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>

              </div>

              {/* SAVE BUTTON (Only shown when isEditingProfile is true, Hidden otherwise) */}
              {isEditingProfile && (
                <div className="flex items-center justify-end gap-2 pt-2 animate-in fade-in duration-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Save size={15} />
                    Save Profile Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Section 2: Change Password */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 p-6 sm:p-7 shadow-xs transition-all duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <KeyRound size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Security & Password</h3>
                    {isEditingPassword ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-semibold border border-amber-200/50">
                        Editing
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                        Secured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Update your Admin login credentials securely</p>
                </div>
              </div>

              {/* Edit / Cancel Toggle Button in Upper Header */}
              {!isEditingPassword ? (
                <button
                  type="button"
                  onClick={() => setIsEditingPassword(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors cursor-pointer border border-purple-100 dark:border-purple-800/30"
                  title="Change Password"
                >
                  <Pencil size={13} />
                  <span>Change</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPassword(false);
                    setPasswordError("");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  title="Cancel Edit"
                >
                  <X size={13} />
                  <span>Cancel</span>
                </button>
              )}
            </div>

            {passwordError && (
              <div className="mt-4 p-3.5 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {/* If NOT editing password, show clean security status card */}
            {!isEditingPassword ? (
              <div className="mt-5 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Check size={15} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Admin Password is active & secure</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Password is hidden • Click "Change" above to update</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingPassword(true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-600 dark:text-purple-400 bg-white dark:bg-zinc-800 hover:bg-purple-50 dark:hover:bg-purple-500/10 border border-gray-200 dark:border-zinc-700 transition-colors"
                >
                  Update
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Current Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        ref={currentPasswordRef}
                        type={showPasswords ? "text" : "password"}
                        required
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-zinc-800 border-2 border-purple-500 rounded-xl outline-none text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPasswords ? "text" : "password"}
                        required
                        placeholder="Min 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-zinc-800 border-2 border-purple-500 rounded-xl outline-none text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPasswords ? "text" : "password"}
                        required
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-zinc-800 border-2 border-purple-500 rounded-xl outline-none text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                </div>

                {/* Show Password Toggle & Submit Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
                  >
                    {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{showPasswords ? "Hide password characters" : "Show password characters"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingPassword(false);
                        setPasswordError("");
                      }}
                      className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
