import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X, Flame, LayoutDashboard, Disc, BookOpen, PenLine, MessageCircleQuestion, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Chanting", icon: <Disc size={20} />, path: "/chanting" },
    { name: "Reading", icon: <BookOpen size={20} />, path: "/reading" },
    { name: "Journaling", icon: <PenLine size={20} />, path: "/journaling" },
    { name: "Q&A / Guidance", icon: <MessageCircleQuestion size={20} />, path: "/qa" },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-r border-slate-100 dark:border-slate-800"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-600 dark:bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Flame className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">SoulTrack</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-3">Main Menu</p>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)} // Auto-close on mobile
              className={({ isActive }) => `
                flex items-center gap-3 p-3 rounded-xl transition-all group
                ${isActive 
                  ? 'bg-teal-50 dark:bg-orange-500/10 text-teal-600 dark:text-orange-500' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}
              `}
            >
              <span className="transition-colors">{item.icon}</span>
              <span className="font-semibold text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-50 dark:border-slate-800">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;