import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, StickyNote, Briefcase, X } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Leads", path: "/admin/leads", icon: Users },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
    { name: "Notes & Follow-ups", path: "/admin/notes", icon: StickyNote },
    { name: "Job Applications", path: "/admin/applications", icon: Briefcase },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 sm:hidden transition-opacity" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed sm:relative top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 dark:border-zinc-800">
          <div className="text-[22px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tight">
            Infoza<span className="text-indigo-600 dark:text-indigo-500">Admin</span>
          </div>
          <button onClick={toggleSidebar} className="sm:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </div>
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-indigo-50/80 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800/50 dark:hover:text-gray-200"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 640) toggleSidebar();
                  }}
                >
                  <Icon size={18} className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
           <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800/50 dark:hover:text-gray-200 transition-all duration-200">
            <span className="text-lg">←</span> Back to Website
           </Link>
        </div>
      </aside>
    </>
  );
}
