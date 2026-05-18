import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Timer, Hash, Plus, CheckCircle2, Play, Pause, Trash2 } from 'lucide-react';
import { saveChantingSession, getChantingStats } from '../api/chantingApi';
import { addCustomMantra, getCustomMantras, deleteCustomMantra } from '../api/mantraApi';

const Chanting = () => {
  const [count, setCount] = useState(0);
  const [malaCount, setMalaCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isChanting, setIsChanting] = useState(false);
  const [language, setLanguage] = useState('English');
  const [selectedMantra, setSelectedMantra] = useState('Hare Krishna Hare Krishna Krsna Krsna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [customLanguage, setCustomLanguage] = useState('English');
  const [showPopup, setShowPopup] = useState(false);
  const [activeBubble, setActiveBubble] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [customMantras, setCustomMantras] = useState([]);
  const [savingMantra, setSavingMantra] = useState(false);

  const defaultMantras = {
    English: [
      'Hare Krishna Hare Krishna Krsna Krsna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare',
      'Shambh Sada Shiv',
      'Om Namo Bhagavate Vasudevaya',
      'Om Gam Ganapataye Namaha'
    ],
    Hindi: ['ॐ नमः शिवाय', 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे', 'ॐ नमो भगवते वासुदेवाय']
  };

  // Filter custom mantras by language
  const customByLanguage = customMantras.filter(m => m.language === language);

  // Load stats and custom mantras on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, mantras] = await Promise.all([
          getChantingStats(),
          getCustomMantras()
        ]);
        setStreak(stats.streak || 0);
        setMalaCount(stats.totalMalas || 0);
        setCustomMantras(mantras);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save custom mantra to DB
  const handleSaveCustomMantra = async () => {
    if (!customInput.trim()) return;
    setSavingMantra(true);
    try {
      const saved = await addCustomMantra(customInput.trim(), customLanguage);
      setCustomMantras(prev => [saved, ...prev]);
      setSelectedMantra(customInput.trim());
      setLanguage(customLanguage);
      setCustomInput('');
      setShowCustomInput(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save mantra!');
    } finally {
      setSavingMantra(false);
    }
  };

  // Delete custom mantra from DB
  const handleDeleteMantra = async (id, mantra) => {
    try {
      await deleteCustomMantra(id);
      setCustomMantras(prev => prev.filter(m => m.id !== id));
      if (selectedMantra === mantra) {
        setSelectedMantra(defaultMantras.English[0]);
      }
    } catch (error) {
      console.error('Failed to delete mantra:', error);
    }
  };

  // Timer
  useEffect(() => {
    let interval;
    if (isChanting) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
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
    const generatePoints = () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 60) + 10);
    setActiveBubble({
      id: Date.now(),
      pathX: generatePoints(),
      pathY: generatePoints(),
      ...config,
      duration: 15,
    });
  }, []);

  useEffect(() => {
    if (isChanting && !activeBubble) createBubble();
    else if (!isChanting) setActiveBubble(null);
  }, [isChanting, activeBubble, createBubble]);

  const handlePop = async () => {
    const nextCount = count + 1;
    setActiveBubble(null);

    if (nextCount === 108) {
      setCount(0);
      setMalaCount(prev => prev + 1);
      setShowPopup(true);
      setIsChanting(false);
      setTimeout(() => setShowPopup(false), 3000);

      try {
        const saved = await saveChantingSession(selectedMantra, 1, timer);
        setStreak(saved.streak || streak);
        setTimer(0);
      } catch (error) {
        console.error('Failed to save session:', error);
      }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto h-[calc(100vh-140px)] overflow-hidden">

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 w-full mb-4 z-20">
        <StatBox icon={<Flame size={18} className="text-teal-600 dark:text-orange-500" />} label="Streak" value={`${streak} Days`} />
        <StatBox icon={<Timer size={18} className="text-blue-500" />} label="Time" value={formatTime(timer)} />
        <StatBox icon={<Hash size={18} className="text-teal-600 dark:text-orange-500" />} label="Malas" value={malaCount} />
      </div>

      {/* Control Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 mb-2 shadow-sm z-20">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
            className="px-2 py-1 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase"
          >
            {language}
          </button>
          <div className="relative flex-1 md:min-w-[280px]">
            <select
              value={selectedMantra}
              onChange={(e) => { setSelectedMantra(e.target.value); setActiveBubble(null); }}
              className="w-full bg-transparent border-none outline-none text-xs font-bold dark:text-slate-200 cursor-pointer"
            >
              <optgroup label="Default">
                {defaultMantras[language].map(m => (
                  <option key={m} value={m} className="dark:bg-slate-950">{m}</option>
                ))}
              </optgroup>
              {customByLanguage.length > 0 && (
                <optgroup label="My Mantras">
                  {customByLanguage.map(m => (
                    <option key={m.id} value={m.mantra} className="dark:bg-slate-950">{m.mantra}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-xs font-black text-teal-600 dark:text-orange-500 flex items-center gap-1"
          >
            <Plus size={14} /> {showCustomInput ? "Close" : "Custom"}
          </button>
          <button
            onClick={() => setIsChanting(!isChanting)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all ${
              isChanting
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20'
                : 'bg-teal-600 text-white dark:bg-orange-600'
            }`}
          >
            {isChanting ? <><Pause size={14} fill="currentColor" /> Stop</> : <><Play size={14} fill="currentColor" /> Start</>}
          </button>
        </div>
      </div>

      {/* Custom Mantra Panel */}
      {showCustomInput && (
        <div className="w-full mb-3 p-3 bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 z-20">
          {/* Input row */}
          <div className="flex gap-2 mb-3">
            <select
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
              className="px-2 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold dark:text-white border-none outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
            <input
              autoFocus
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveCustomMantra()}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm font-medium dark:text-white"
              placeholder="Type your mantra..."
            />
            <button
              onClick={handleSaveCustomMantra}
              disabled={savingMantra}
              className="px-4 py-2 bg-teal-600 dark:bg-orange-600 text-white text-xs font-black rounded-xl disabled:opacity-60"
            >
              {savingMantra ? '...' : 'Save'}
            </button>
          </div>

          {/* Custom mantras list */}
          {customMantras.length > 0 && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {customMantras.map(m => (
                <div key={m.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
                  <div>
                    <span className="text-xs dark:text-slate-300 truncate block max-w-[200px]">{m.mantra}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">{m.language}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteMantra(m.id, m.mantra)}
                    className="text-rose-500 hover:text-rose-700 ml-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {customMantras.length === 0 && (
            <p className="text-center text-[10px] text-slate-400 uppercase font-bold">
              No custom mantras yet — add one above!
            </p>
          )}
        </div>
      )}

      {/* Meditation Space */}
      <div className="flex-1 w-full relative overflow-hidden bg-slate-50/20 dark:bg-slate-950/40 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 mb-4 shadow-inner">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-200/50 dark:text-slate-800/20 select-none tabular-nums">
            {count}
          </h1>
        </div>

        <AnimatePresence>
          {isChanting && activeBubble && (
            <motion.div
              key={activeBubble.id}
              initial={{ left: `${activeBubble.pathX[0]}%`, top: `${activeBubble.pathY[0]}%`, scale: 0, opacity: 0 }}
              animate={{ left: activeBubble.pathX.map(p => `${p}%`), top: activeBubble.pathY.map(p => `${p}%`), scale: 1, opacity: 1 }}
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
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 bg-teal-600 dark:bg-orange-600 text-white px-8 py-3 rounded-[2rem] shadow-2xl flex items-center gap-4 z-[100]"
          >
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