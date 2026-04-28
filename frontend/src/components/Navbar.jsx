import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

const Navbar = ({ onMenuClick, darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30 h-16 flex items-center w-full transition-all">
      <div className="w-full px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-300"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col leading-tight hidden sm:block">
            <span className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">SoulTrack</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500 dark:text-orange-500 active:rotate-12"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 hidden md:block">Kashish Pundir</p>
            
            <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-emerald-400 dark:from-orange-600 dark:to-orange-400 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-teal-100 dark:shadow-orange-900/20 cursor-pointer hover:scale-105 transition-transform">
              KP
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;