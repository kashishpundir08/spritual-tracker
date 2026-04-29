import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Timer, Hash, Plus, ChevronDown, CheckCircle2 } from 'lucide-react';

const Chanting = () => {
  const [count, setCount] = useState(0);
  const [malaCount, setMalaCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isChanting, setIsChanting] = useState(false);
  const [language, setLanguage] = useState('English');
  const [selectedMantra, setSelectedMantra] = useState('Hare Krishna Hare Krishna Krsna Krsna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const mantras = {
    English: [
      'Hare Krishna Hare Krishna Krsna Krsna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare',
      'Om Namah Shivaya',
      'Om Namo Bhagavate Vasudevaya',
      'Om Gam Ganapataye Namaha'
    ],
    Hindi: ['ॐ नमः शिवाय', 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे', 'ॐ नमो भगवते वासुदेवाय']
  };

  useEffect(() => {
    let interval;
    if (isChanting) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isChanting]);

  const handleTap = () => {
    if (!isChanting) setIsChanting(true);
    const nextCount = count + 1;
    if (nextCount === 108) {
      setCount(0);
      setMalaCount((prev) => prev + 1);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setCount(nextCount);
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to colorize words
  const colorWords = (text) => {
    const colors = ['#0d9488', '#f97316', '#ef4444', '#8b5cf6', '#3b82f6', '#10b981'];
    return text.split(' ').map((word, i) => (
      <tspan key={i} fill={colors[i % colors.length]} dx="6">{word}</tspan>
    ));
  };

  // Logic to split mantra into 2 lines if it's too big
  const renderMantraLines = () => {
    const isBig = selectedMantra.length > 50;
    
    if (!isBig) {
      return (
        <text className="text-lg md:text-xl font-black italic uppercase tracking-tighter">
          <textPath xlinkHref="#path1" startOffset="50%" textAnchor="middle">
            {colorWords(selectedMantra)}
          </textPath>
        </text>
      );
    }

    // Split logic
    const words = selectedMantra.split(' ');
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(' ');
    const line2 = words.slice(mid).join(' ');

    return (
      <>
        <text className="text-[12px] md:text-[14px] font-black italic uppercase tracking-tighter">
          <textPath xlinkHref="#path1" startOffset="50%" textAnchor="middle">
            {colorWords(line1)}
          </textPath>
        </text>
        <text className="text-[12px] md:text-[14px] font-black italic uppercase tracking-tighter">
          <textPath xlinkHref="#path2" startOffset="50%" textAnchor="middle">
            {colorWords(line2)}
          </textPath>
        </text>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-2 h-full overflow-hidden">
      
      {/* 1. Top Stats - Reduced Margin */}
      <div className="grid grid-cols-3 gap-3 w-full mb-4">
        <StatBox icon={<Flame size={18} className="text-teal-600 dark:text-orange-500" />} label="Streak" value="5 Days" />
        <StatBox icon={<Timer size={18} className="text-blue-500" />} label="Time" value={formatTime(timer)} />
        <StatBox icon={<Hash size={18} className="text-teal-600 dark:text-orange-500" />} label="Malas" value={malaCount} />
      </div>

      {/* 2. Selection Bar - Reduced Margin */}
      <div className="w-full flex flex-col mb-11 md:flex-row items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
            className="px-2 py-1 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest"
          >
            {language}
          </button>
          <div className="relative flex-1 md:min-w-[280px]">
            <select 
              value={selectedMantra}
              onChange={(e) => setSelectedMantra(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold pr-8 dark:text-slate-200"
            >
              {mantras[language].map(m => <option key={m} value={m} className="dark:bg-slate-950">{m}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-0 top-0.5 opacity-50" />
          </div>
        </div>
        
        <button 
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="text-xs font-black text-teal-600 dark:text-orange-500 flex items-center gap-1"
        >
          <Plus size={14} /> {showCustomInput ? "Done" : "Write Custom"}
        </button>
      </div>

      {showCustomInput && (
        <input 
          autoFocus className="w-full mb-4 p-2 bg-transparent border-b border-teal-500/20 dark:border-orange-500/40 outline-none text-center text-sm font-medium"
          placeholder="Enter your mantra..."
          onChange={(e) => setSelectedMantra(e.target.value)}
        />
      )}

      {/* 3. Interaction Area - Reduced mt */}
      <div className="relative flex flex-col items-center justify-center w-full mt-14 md:mt-14 mb-6">
        
        {/* DYNAMIC TWO-LINE ARC */}
        <div className="absolute -top-30 md:-top-24 w-full max-w-[500px] pointer-events-none">
          <svg viewBox="0 0 500 240" className="w-full h-auto overflow-visible">
            {/* Path 1: Outer/Top Line */}
            <path id="path1" d="M 40,210 A 210,170 0 0,1 460,210" fill="transparent" />
            {/* Path 2: Inner Line (only used for big mantras) */}
            <path id="path2" d="M 80,210 A 170,130 0 0,1 420,210" fill="transparent" />
            
            {renderMantraLines()}
          </svg>
        </div>

        {/* MAIN BUTTON - Reduced count text size */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleTap}
          className="relative w-60 h-60 md:w-72 md:h-72 rounded-full bg-white dark:bg-slate-900 shadow-xl dark:shadow-[0_0_60px_rgba(0,0,0,0.5)] border-[10px] border-slate-50 dark:border-slate-800 flex flex-col items-center justify-center z-10"
        >
          {/* Progress Ring - Theme Color Logic */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r="46%" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-800/40" />
            <motion.circle 
              cx="50%" cy="50%" r="46%" fill="transparent" 
              strokeWidth="10"
              strokeDasharray="100" pathLength="100"
              animate={{ strokeDashoffset: 100 - (count / 108) * 100 }}
              className="stroke-teal-600 dark:stroke-orange-500 transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>

          {/* Count Size Reduced to text-6xl */}
          <span className="text-6xl md:text-7xl font-black text-slate-800 dark:text-white tabular-nums z-20 leading-none">
            {count}
          </span>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] z-20 mt-1">Taps</span>
        </motion.button>
      </div>

      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mt-auto pb-4">
        Target: 108 beads per Mala
      </p>

      {/* Completion Popup - Theme Sync */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 bg-teal-600 dark:bg-orange-600 text-white px-8 py-3 rounded-[2rem] shadow-2xl flex items-center gap-4 z-[100]"
          >
            <CheckCircle2 size={24} />
            <div className="text-left">
               <h4 className="font-bold text-base leading-tight uppercase tracking-tight">Excellent!</h4>
               <p className="text-[10px] opacity-80 italic">One Mala complete. ✨</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-slate-900/60 p-3 md:p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm">
    <div className="mb-1">{icon}</div>
    <span className="text-[9px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">{label}</span>
    <span className="text-base font-black tabular-nums dark:text-slate-200">{value}</span>
  </div>
);

export default Chanting;