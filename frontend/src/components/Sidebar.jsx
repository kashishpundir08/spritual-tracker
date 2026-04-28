import React from 'react';
import { motion } from 'framer-motion';
import { X, Flame, Moon, Sun, Trees, Book, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, darkMode }) => {
  const menuItems = [
    { name: "Morning Meditation", icon: <Sun size={20} /> },
    { name: "Evening Prayer", icon: <Moon size={20} /> },
    { name: "Gratitude Journaling", icon: <Flame size={20} /> },
    { name: "Nature Walks", icon: <Trees size={20} /> },
    { name: "Reading Spiritual Texts", icon: <Book size={20} /> },
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
            <div className="w-9 h-9 bg-teal-600 dark:bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 dark:shadow-orange-900/20">
              <Flame className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">SoulTrack</h2>
          </div>
          
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-3">Disciplines</p>
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-orange-500/10 hover:text-teal-600 dark:hover:text-orange-500 transition-all cursor-pointer group"
            >
              <span className="text-slate-400 group-hover:text-teal-500 dark:group-hover:text-orange-500 transition-colors">
                {item.icon}
              </span>
              <span className="font-semibold text-sm">{item.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-auto p-6 border-t border-slate-50 dark:border-slate-800 space-y-1">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all group">
          <LogOut size={20} className="text-rose-400" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;