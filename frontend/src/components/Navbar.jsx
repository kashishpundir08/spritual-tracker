import React, { useState, useEffect, useRef } from 'react';
import { Menu, Sun, Moon, Search, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick, darkMode, toggleDarkMode, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const pages = [
    { name: "Dashboard", path: "/" },
    { name: "Chanting", path: "/chanting" },
    { name: "Reading", path: "/reading" },
    { name: "Journaling", path: "/journaling" },
    { name: "Q&A / Guidance", path: "/qa" },
  ];

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <nav className={`fixed top-0 right-0 h-16 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-30 transition-all duration-300 
      ${isOpen ? 'md:left-64' : 'left-0'}`}>
      
      <div className="flex items-center justify-between h-full px-6 gap-4">
        
        {/* LEFT SECTION: Menu Button (Hidden when sidebar open on desktop) */}
        <div className="flex items-center w-40">
          {!isOpen && (
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-300"
            >
              <Menu size={24} />
            </button>
          )}
        </div>

        {/* CENTER SECTION: Search Bar */}
        <div className="flex-1 flex justify-center max-w-2xl" ref={searchRef}>
          <div className="relative w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-teal-500/50 dark:focus:border-orange-500/50 rounded-xl py-2 pl-10 pr-4 focus:ring-4 focus:ring-teal-500/10 dark:focus:ring-orange-500/10 text-sm transition-all outline-none dark:text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                <Command size={10} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400">K</span>
              </div>
            </div>

            {/* Results Dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <div
                      key={page.path}
                      onClick={() => handleNavigate(page.path)}
                      className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-sm text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
                    >
                      <span>{page.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Navigate</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: Profile & Theme */}
        <div className="flex items-center gap-4 w-40 justify-end">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500 dark:text-orange-500"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-slate-800">
            <div className="w-9 h-9 bg-gradient-to-tr from-teal-500 to-emerald-400 dark:from-orange-600 dark:to-orange-400 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
              KP
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;