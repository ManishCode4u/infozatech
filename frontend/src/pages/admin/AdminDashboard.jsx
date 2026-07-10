import React from "react";
import { Users, MessageSquare, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [];

export default function AdminDashboard() {
  const stats = [
    { title: "Total Leads", value: "0", icon: Users, change: "0%", isPositive: true },
    { title: "Total Messages", value: "0", icon: MessageSquare, change: "0%", isPositive: true },
    { title: "Today Leads", value: "0", icon: TrendingUp, change: "0%", isPositive: true },
    { title: "Converted", value: "0%", icon: CheckCircle, change: "0%", isPositive: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="relative group bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-100/50 dark:border-zinc-800/80 shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">{stat.title}</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">{stat.value}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100/50 dark:border-zinc-700/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-xs relative z-10">
                <span className={`flex items-center px-2 py-0.5 rounded-full font-semibold ${
                  stat.isPositive 
                    ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' 
                    : 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-500/10'
                }`}>
                  {stat.change}
                  {stat.isPositive && <ArrowUpRight size={12} className="ml-0.5" />}
                </span>
                <span className="text-slate-400 dark:text-zinc-500 ml-2 font-medium">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Lead Activity</h2>
          <select className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-700 dark:text-gray-300">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        
        <div className="h-[300px] w-full flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-xl">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:opacity-10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: 'var(--tw-prose-body, white)' }}
                  itemStyle={{ color: '#111827', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="leads" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-500 font-medium">No activity data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
