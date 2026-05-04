import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Timer, Hash, Plus, ChevronDown, CheckCircle2, Play, Pause } from 'lucide-react';

const Chanting = () => {
  const [count, setCount] = useState(0);
  const [malaCount, setMalaCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isChanting, setIsChanting] = useState(false);
  const [language, setLanguage] = useState('English');
  const [selectedMantra, setSelectedMantra] = useState('Hare Krishna Hare Krishna Krsna Krsna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeBubble, setActiveBubble] = useState(null);

  const mantras = {
    English: [
      'Hare Krishna Hare Krishna Krsna Krsna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare',
      'Shambh Sada Shiv',
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

  const createBubble = useCallback(() => {
    const bubbleConfigs = [
      { color: 'border-teal-500 text-teal-600', glow: 'rgba(20, 184, 166, 0.15)' },
      { color: 'border-orange-500 text-orange-600', glow: 'rgba(249, 115, 22, 0.15)' },
      { color: 'border-rose-500 text-rose-600', glow: 'rgba(244, 63, 94, 0.15)' },
      { color: 'border-blue-500 text-blue-600', glow: 'rgba(59, 130, 246, 0.15)' },
      { color: 'border-purple-500 text-purple-600', glow: 'rgba(168, 85, 247, 0.15)' },
    ];

    const config = bubbleConfigs[Math.floor(Math.random() * bubbleConfigs.length)];
    
    // Create a path of 5 random points to float through
    const generatePoints = () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 60) + 10);
 
    const bubble = {
      id: Date.now(),
      pathX: generatePoints(),
      pathY: generatePoints(),
      ...config,
      duration: 15, // Slow, meditative movement  
    };
    setActiveBubble(bubble);
  }, []);

  useEffect(() => {
    if (isChanting && !activeBubble) {
      createBubble();
    } else if (!isChanting) {
      setActiveBubble(null);
    }
  }, [isChanting, activeBubble, createBubble]);

  const handlePop = () => {
    const nextCount = count + 1;
    setActiveBubble(null);
    
    if (nextCount === 108) {
      setCount(0);
      setMalaCount((prev) => prev + 1);
      setShowPopup(true);
      setIsChanting(false);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setCount(nextCount);
      setTimeout(createBubble, 100);
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto h-[calc(100vh-140px)] overflow-hidden">
      
      {/* 1. Stats Bar */}
      <div className="grid grid-cols-3 gap-3 w-full mb-4 z-20">
        <StatBox icon={<Flame size={18} className="text-teal-600 dark:text-orange-500" />} label="Streak" value="5 Days" />
        <StatBox icon={<Timer size={18} className="text-blue-500" />} label="Time" value={formatTime(timer)} />
        <StatBox icon={<Hash size={18} className="text-teal-600 dark:text-orange-500" />} label="Malas" value={malaCount} />
      </div>

      {/* 2. Control Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 mb-4 shadow-sm z-20">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')} className="px-2 py-1 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase">
            {language}
          </button>
          <div className="relative flex-1 md:min-w-[280px]">
            <select value={selectedMantra} onChange={(e) => { setSelectedMantra(e.target.value); setActiveBubble(null); }} className="w-full bg-transparent border-none outline-none text-xs font-bold dark:text-slate-200 cursor-pointer">
              {mantras[language].map(m => <option key={m} value={m} className="dark:bg-slate-950">{m}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowCustomInput(!showCustomInput)} className="text-xs font-black text-teal-600 dark:text-orange-500 flex items-center gap-1">
            <Plus size={14} /> {showCustomInput ? "Done" : "Custom"}
          </button>
          <button onClick={() => setIsChanting(!isChanting)} className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all ${isChanting ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20' : 'bg-teal-600 text-white dark:bg-orange-600'}`}>
            {isChanting ? <><Pause size={14} fill="currentColor"/> Stop</> : <><Play size={14} fill="currentColor"/> Start</>}
          </button>
        </div>
      </div>

      {showCustomInput && (
        <input autoFocus className="w-full mb-4 p-2 bg-transparent border-b border-teal-500/20 dark:border-orange-500/40 outline-none text-center text-sm font-medium z-20 dark:text-white" placeholder="Enter custom mantra..." onChange={(e) => setSelectedMantra(e.target.value)} />
      )}

      {/* 3. Meditation Space */}
      <div className="flex-1 w-full relative overflow-hidden bg-slate-50/20 dark:bg-slate-950/40 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 mb-4 shadow-inner">
        
        {/* Background Large Counter */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-200/50 dark:text-slate-800/20 select-none tabular-nums">
                {count}
            </h1>
        </div>

        <AnimatePresence>
          {isChanting && activeBubble && (
            <motion.div
              key={activeBubble.id}
              initial={{ 
                left: `${activeBubble.pathX[0]}%`, 
                top: `${activeBubble.pathY[0]}%`,  
                scale: 0, 
                opacity: 0 
              }}
              animate={{ 
                left: activeBubble.pathX.map(p => `${p}%`),     
                top: activeBubble.pathY.map(p => `${p}%`),
                scale: 1, 
                opacity: 1 
              }}
              exit={{ scale: 0, opacity: 0, filter: 'blur(20px)' }}
              transition={{ 
                left: { duration: activeBubble.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                top: { duration: activeBubble.duration * 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                scale: { duration: 0.5 } 
              }}
              onMouseDown={handlePop}
              className={`absolute cursor-pointer rounded-full border-[3px] backdrop-blur-md flex items-center justify-center p-6 text-center z-30 transition-shadow ${activeBubble.color}`}
              style={{ 
                width: 'min(220px, 60vw)', 
                height: 'min(220px, 60vw)',
                boxShadow: `inset 0 0 30px ${activeBubble.glow}, 0 10px 30px rgba(0,0,0,0.1)`,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)`
              }}
            >
              <span className="text-xs md:text-sm font-black uppercase leading-tight select-none tracking-tight px-2">
                {selectedMantra}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {!isChanting && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-10">
                <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] text-xs">
                    Press Start to Begin
                </p>
            </div>
        )}
      </div>

      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest text-center pb-4">
        {108 - count} remaining for Mala #{malaCount + 1}
      </p>

      {/* Completion Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 bg-teal-600 dark:bg-orange-600 text-white px-8 py-3 rounded-[2rem] shadow-2xl flex items-center gap-4 z-[100]">
            <CheckCircle2 size={24} />
            <div className="text-left">
               <h4 className="font-bold text-base uppercase">Mala Complete!</h4>
               <p className="text-[10px] opacity-80">108 Chants finished successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm backdrop-blur-md">
    <div className="mb-1">{icon}</div>
    <span className="text-[9px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">{label}</span>
    <span className="text-base font-black dark:text-slate-200 tabular-nums">{value}</span>
  </div>
);

export default Chanting; 