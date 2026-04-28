import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F8FAF8] dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      <Navbar onMenuClick={() => setIsOpen(!isOpen)} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} darkMode={darkMode} />

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/60 z-40 md:hidden" 
            />
          )}
        </AnimatePresence>

        <main className={`flex-1 transition-all duration-300 ease-in-out p-6 w-full
          ${isOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;