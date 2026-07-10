/* eslint-disable */
import React, { useState } from "react";
import { Plus, Calendar, Clock, MoreVertical } from "lucide-react";

export default function AdminNotes() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Notes & Follow-ups</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Keep track of client reminders and internal tasks.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm text-sm font-medium transition-colors">
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className={`rounded-2xl p-6 border ${note.border} ${note.color} transition-all hover:shadow-md group flex flex-col`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{note.title}</h3>
              <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed mb-6 flex-1">
              {note.content}
            </p>
            
            <div className="flex items-center justify-between text-xs pt-4 border-t border-black/5 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Added: {note.date}</span>
              {note.followUp && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-black/20 rounded-md text-gray-700 dark:text-gray-300 font-medium font-medium border border-black/5 dark:border-white/5 shadow-sm">
                  <Calendar size={12} className="text-indigo-500" />
                  Due: {note.followUp}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {/* Add Note Card */}
        <button className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800 bg-transparent hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 flex flex-col items-center justify-center p-8 min-h-[200px] transition-colors group text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="font-medium text-[15px]">Create new note</span>
        </button>
      </div>
    </div>
  );
}
