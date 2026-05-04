import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X, Flame, LayoutDashboard, Disc, BookOpen, PenLine, MessageCircleQuestion, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Chanting", icon: <Disc size={20} />, path: "/chanting" },
    { name: "Reading", icon: <BookOpen size={20} />, path: "/reading" },
    { name: "Journaling", icon: <PenLine size={20} />, path: "/journaling" },
    { name: "Q&A / Guidance", icon: <MessageCircleQuestion size={20} />, path: "/qa" },
  ];
  const navigate = useNavigate();

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : -256 }}
      transition={{ type: "spring", damping: 20, stiffness: 150 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-950 shadow-2xl z-50 flex flex-col border-r border-slate-100 dark:border-slate-800"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 dark:bg-orange-600 rounded-lg flex items-center justify-center">
              <Flame className="text-white" size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">SoulTrack</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4 px-3">Main Menu</p>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 p-3 rounded-xl transition-all
                ${isActive 
                  ? 'bg-teal-50 dark:bg-orange-500/10 text-teal-600 dark:text-orange-500' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}
              `}
            >
              <span>{item.icon}</span>
              <span className="font-semibold text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-50 dark:border-slate-900">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all font-bold text-sm">
          <LogOut size={18} />
          <span
            onClick={() => {
              navigate('/login');
            }}
          >Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;