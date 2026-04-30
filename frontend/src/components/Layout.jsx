import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open for desktop

  return (
    <div className="min-h-screen bg-[#F8FAF8] dark:bg-slate-950 transition-colors duration-300">
      <Navbar 
        onMenuClick={() => setIsOpen(!isOpen)} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        isOpen={isOpen}
      />

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden" 
            />
          )}
        </AnimatePresence>

        {/* pt-16 added to account for fixed navbar height */}
        <main className={`flex-1 transition-all duration-300 ease-in-out pt-16 
          ${isOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;