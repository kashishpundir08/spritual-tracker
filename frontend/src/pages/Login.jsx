import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Flame, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add auth logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8] dark:bg-slate-950 p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-teal-600 dark:bg-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20 dark:shadow-orange-500/20">
            <Flame className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center">Continue your spiritual journey today</p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-teal-500 dark:focus:border-orange-500 rounded-xl py-3 pl-10 pr-4 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <button type="button" className="text-xs font-bold text-teal-600 dark:text-orange-500 hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-teal-500 dark:focus:border-orange-500 rounded-xl py-3 pl-10 pr-4 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-teal-600 dark:bg-orange-600 hover:bg-teal-700 dark:hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-500/20 dark:shadow-orange-500/20"
            >
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              New here? {' '}
              <Link to="/register" className="text-teal-600 dark:text-orange-500 font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;