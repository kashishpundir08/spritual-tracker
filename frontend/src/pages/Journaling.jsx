import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenLine, Sparkles, History, Calendar, Trash2, Save, 
  Quote, CheckCircle2, ChevronDown, ChevronUp, Type 
} from 'lucide-react';

const Journaling = () => {
  // 1. Core States
  const [entries, setEntries] = useState([
    { 
      id: 1, 
      text: "Today's chanting session was deeply meditative. I felt a sense of clarity I haven't felt in weeks. The morning sun added to the peace. I realized that consistency is the key to spiritual growth, even on days when the mind is restless.", 
      mood: "Peaceful", 
      moodIcon: "😌",
      date: "30 April 2024",
      prompt: "When did you feel most peaceful today?"
    }
  ]);

  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState("Peaceful");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false); // 🌿 Focus Mode
  const [isSaved, setIsSaved] = useState(false);    // 🔄 Save Feedback
  const [expandedId, setExpandedId] = useState(null); // 📜 Expand Entry

  const prompts = [
    "What did you learn today?",
    "When did you feel most peaceful today?",
    "What distracted you today?",
    "What are you grateful for in this moment?",
    "How did you serve someone today?"
  ];

  const moodBg = {
    Peaceful: "bg-teal-50/50 dark:bg-teal-500/5 border-teal-100 dark:border-teal-500/20",
    Happy: "bg-orange-50/50 dark:bg-orange-500/5 border-orange-100 dark:border-orange-500/20",
    Neutral: "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700",
    Stressed: "bg-rose-50/50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/20"
  };

  const moods = [
    { label: "Peaceful", icon: "😌", color: "text-teal-600" },
    { label: "Happy", icon: "🙂", color: "text-orange-600" },
    { label: "Neutral", icon: "😐", color: "text-slate-600" },
    { label: "Stressed", icon: "😓", color: "text-rose-600" },
  ];

  useEffect(() => {
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  // 🧠 5. Auto Word Count
  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  const saveEntry = () => {
    if (!text.trim()) return;
    const newEntry = {
      id: Date.now(),
      text,
      mood: selectedMood,
      moodIcon: moods.find(m => m.label === selectedMood).icon,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
      prompt: currentPrompt
    };
    setEntries([newEntry, ...entries]);
    setText("");
    setIsSaved(true); // 🔄 Feedback
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="relative min-h-screen pb-20 px-4 pt-4">
      {/* 🌙 8. Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '24px 24px' }} />

      <div className={`flex flex-col w-full max-w-6xl mx-auto space-y-8 relative z-10 transition-all duration-700 ${isFocused ? 'blur-sm opacity-20 scale-[0.98]' : ''}`}>
        
        {/* HEADER */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Journaling</h1>
              {/* 🧘 9. Quote of the Day */}
              <p className="text-xs italic text-slate-400 mt-1 flex items-center gap-2">
                <Quote size={12} className="text-teal-500"/> “The mind is everything. What you think you become.”
              </p>
            </div>
            <StatBox icon={<History size={16}/>} label="Entries" value={entries.length} />
          </div>

          {/* 🧠 6. Insight Bar */}
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 p-3 rounded-2xl flex items-center gap-3">
            <Sparkles className="text-teal-600 dark:text-orange-500" size={16} />
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 italic">
              “You feel more peaceful on days you chant longer.”
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 w-full max-w-6xl mx-auto relative z-20">
        
        {/* WRITING AREA (LEFT) */}
        <div className={`lg:col-span-7 transition-all duration-500 ease-in-out ${isFocused ? 'scale-105 z-50' : 'z-20'}`}>
          
          {/* 🎨 3. Gradient Glow Wrapper */}
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500 to-orange-500 rounded-[2.6rem] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
            
            {/* 🌈 4. Mood-Based Tinted Card */}
            <div className={`relative p-8 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 ${moodBg[selectedMood]} shadow-2xl`}>
              
              <div className="flex flex-col space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-teal-600 dark:text-orange-500 uppercase tracking-widest">Today's Prompt</span>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic leading-tight">
                    "{currentPrompt}"
                  </h2>
                </div>

                <div className="relative">
                  <textarea
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Pour your soul here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-80 bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 resize-none leading-relaxed text-base font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  />
                  
                  {/* ✨ 2. Typing Indicator & Word Count */}
                  <div className="absolute bottom-0 right-0 flex items-center gap-4">
                    <AnimatePresence>
                      {text && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-2">
                          <span className="flex gap-1">
                             <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce" />
                             <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Writing</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      {wordCount} WORDS
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex gap-2">
                    {moods.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => setSelectedMood(m.label)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                          selectedMood === m.label 
                            ? 'bg-white dark:bg-slate-800 shadow-lg scale-110 ring-2 ring-teal-500/20' 
                            : 'opacity-40 grayscale hover:grayscale-0'
                        }`}
                      >
                        <span className="text-xl">{m.icon}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <AnimatePresence>
                      {isSaved && (
                        <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                          <CheckCircle2 size={14}/> Saved
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={saveEntry}
                      disabled={!text.trim()}
                      className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 active:scale-95 disabled:opacity-20 transition-all"
                    >
                      <Save size={14} /> Save Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📜 7. PAST ENTRIES (RIGHT - DIARY) */}
        <div className={`lg:col-span-5 space-y-6 transition-opacity duration-500 ${isFocused ? 'opacity-10 blur-sm pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-2">
                <Type className="text-slate-400" size={16}/>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personal Diary</h3>
             </div>
             <span className="text-[10px] font-bold text-slate-300">SORT BY NEWEST</span>
          </div>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode='popLayout'>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{entry.moodIcon}</span>
                        <div>
                            <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-tighter">{entry.date}</p>
                            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate w-32 italic">"{entry.prompt}"</h4>
                        </div>
                    </div>
                    <button onClick={() => setEntries(entries.filter(e => e.id !== entry.id))} className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-all duration-300 ${expandedId === entry.id ? '' : 'line-clamp-3'}`}>
                    {entry.text}
                  </p>
                  
                  <button 
                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                    className="mt-3 flex items-center gap-1 text-[10px] font-black text-teal-600 dark:text-orange-500 uppercase tracking-widest"
                  >
                    {expandedId === entry.id ? <><ChevronUp size={12}/> Show Less</> : <><ChevronDown size={12}/> Read More</>}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
    <div className="text-teal-600 dark:text-orange-500">{icon}</div>
    <div className="flex flex-col">
        <span className="text-[8px] uppercase font-black text-slate-400 tracking-tighter leading-none">{label}</span>
        <span className="text-xs font-black dark:text-slate-200">{value}</span>
    </div>
  </div>
);

export default Journaling;