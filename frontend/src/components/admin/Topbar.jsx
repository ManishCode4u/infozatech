import React, { useEffect, useState, useRef } from "react";
import { Search, Bell, Menu, Moon, Sun, User, LogOut, KeyRound, X, CheckCircle2, AlertTriangle, Eye, EyeOff, ShieldCheck, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("admin_theme") === "dark" || false;
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const [adminName, setAdminName] = useState(() => {
    return localStorage.getItem("admin_profile_name") || "Manish Kumar";
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem("admin_profile_email") || "manish12643@gmail.com";
  });

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for real-time profile updates
  useEffect(() => {
    const handleProfileUpdate = () => {
      setAdminName(localStorage.getItem("admin_profile_name") || "Manish Kumar");
      setAdminEmail(localStorage.getItem("admin_profile_email") || "manish12643@gmail.com");
    };
    window.addEventListener("admin_profile_changed", handleProfileUpdate);
    return () => window.removeEventListener("admin_profile_changed", handleProfileUpdate);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin_theme", "light");
    }
  }, [isDark]);

  const handleOpenProfileModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setShowProfileDropdown(false);
    setIsProfileModalOpen(true);
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
    setPasswordSuccess("Password updated successfully!");

    setTimeout(() => {
      setPasswordSuccess("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 2500);
  };

  return (
    <>
      <header className="h-16 px-4 sm:px-6 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between sticky top-0 z-20 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="p-2 sm:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="hidden sm:flex items-center bg-gray-50 dark:bg-zinc-800/50 px-3 py-2 rounded-xl border border-gray-200/60 dark:border-zinc-700/50 focus-within:border-indigo-500 focus-within:ring-[3px] focus-within:ring-indigo-500/10 transition-all duration-200">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-64 text-gray-700 dark:text-gray-200 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors relative"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-zinc-900"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-zinc-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">Notifications</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">2 New</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer border-b border-gray-50 dark:border-zinc-800/50 transition-colors">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">New lead: Anna Smith</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">New message from David</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="ml-2 flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/20 transition-all focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {adminName ? adminName.charAt(0).toUpperCase() : "M"}
              </div>
            </button>
            
            {showProfileDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-zinc-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{adminName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{adminEmail}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                    Administrator
                  </span>
                </div>
                
                <div className="p-1 space-y-0.5">
                  {/* Profile Option */}
                  <button 
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/admin/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-left"
                  >
                    <User size={16} className="text-gray-500 dark:text-gray-400" />
                    Profile & Password
                  </button>

                  {/* Sign Out Button */}
                  <button 
                    onClick={() => {
                      localStorage.removeItem('admin_authenticated');
                      navigate('/admin/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          ADMIN PROFILE & PASSWORD CHANGE MODAL
      ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full border border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Admin Profile</h2>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
              {/* Profile Details Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  M
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">Manish Kumar</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    <Mail size={13} className="shrink-0" />
                    <span className="truncate">manish12643@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                    <ShieldCheck size={13} className="shrink-0" />
                    <span>Administrator</span>
                  </div>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="border-t border-gray-100 dark:border-zinc-800 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <KeyRound size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Change Password</h4>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                  {passwordError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                      <AlertTriangle size={15} className="shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 size={15} className="shrink-0" />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}

                  {/* Current Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      required
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-xs sm:text-sm"
                    />
                  </div>

                  {/* New Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      required
                      placeholder="Enter new password (min 6 chars)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-xs sm:text-sm"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      required
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 text-gray-900 dark:text-white text-xs sm:text-sm"
                    />
                  </div>

                  {/* Show Passwords Toggle */}
                  <div className="pt-0.5">
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
                    >
                      {showPasswords ? <EyeOff size={13} /> : <Eye size={13} />}
                      <span>{showPasswords ? "Hide password characters" : "Show password characters"}</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsProfileModalOpen(false)}
                      className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
