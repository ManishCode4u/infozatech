import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API delay for polish
    setTimeout(() => {
      const activePassword = localStorage.getItem('admin_custom_password') || 'Goa@627830';
      const validEmail = 'manish12643@gmail.com';

      if (email.trim().toLowerCase() === validEmail.toLowerCase() && password === activePassword) {
        localStorage.setItem('admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/20 mb-6">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Portal</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Sign in to manage InfozaTech operations</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 dark:border-zinc-800">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2 border border-red-100 dark:border-red-500/20">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-[3px] focus:ring-indigo-500/15 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 text-[15px]"
                  placeholder="admin@buildoracraft.in"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-[3px] focus:ring-indigo-500/15 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 text-[15px]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative flex items-center justify-center py-3.5 px-4 bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-xl text-[15px] shadow-[0_2px_8px_-2px_rgba(79,70,229,0.4)] hover:shadow-[0_8px_20px_-4px_rgba(79,70,229,0.5)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed border border-indigo-700/50 mt-8"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
