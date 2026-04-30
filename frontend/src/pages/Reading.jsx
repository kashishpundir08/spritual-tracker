import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Flame, Clock, Plus, Trash2, Sparkles, Book, StickyNote, ExternalLink, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

const Reading = () => {
  // 1. Predefined Scriptures Library
  const [library, setLibrary] = useState([
    { 
      id: 1, 
      title: "Bhagavad Gita", 
      image: "https://m.media-amazon.com/images/I/91o--qQpzQL.jpg", 
      link: "https://www.bhagavad-gita.org/index-english.html" 
    },
    { 
      id: 2, 
      title: "Ramayan", 
      image: "https://m.media-amazon.com/images/I/71j8k-rvhKL._AC_UF1000,1000_QL80_.jpg", 
      link: "https://ebooks.tirumala.org/downloads/valmiki_ramayanam.pdf" 
    },
    { 
      id: 3, 
      title: "Sant Vani", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP64rsH3PYxW9VvDQ44grCllQKIqyzQnLeSg&s", 
      link: "https://sufinama.org/sant-vani?wref=rweb" 
    },
    { 
      id: 4, 
      title: "Sant Vani", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP64rsH3PYxW9VvDQ44grCllQKIqyzQnLeSg&s", 
      link: "https://sufinama.org/sant-vani?wref=rweb" 
    }
  ]);

  // 2. States for Logging and Library
  const [sessions, setSessions] = useState([
    { id: 1, book: "Bhagavad Gita", pages: 12, time: 25, note: "Focused on chapter 2.", date: "Today" }
  ]);
  const [formData, setFormData] = useState({ book: '', pages: '', time: '', note: '' });
  const [libFormData, setLibFormData] = useState({ title: '', link: '', image: '' });
  
  const [showLogForm, setShowLogForm] = useState(false);
  const [showLibForm, setShowLibForm] = useState(false);

  // 3. Handlers
  const handleAddSession = (e) => {
    e.preventDefault();
    const newSession = { id: Date.now(), ...formData, date: "Just now" };
    setSessions([newSession, ...sessions]);
    setFormData({ book: '', pages: '', time: '', note: '' });
    setShowLogForm(false);
  };

  const handleAddScripture = (e) => {
    e.preventDefault();
    const newScripture = { 
        id: Date.now(), 
        ...libFormData, 
        image: libFormData.image || "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop" 
    };
    setLibrary([...library, newScripture]);
    setLibFormData({ title: '', link: '', image: '' });
    setShowLibForm(false);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 pb-20 px-4">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Reading</h1>
            <p className="text-slate-500 font-medium">Sacred wisdom at your fingertips.</p>
          </div>
          <div className="flex gap-2">
             <button onClick={() => setShowLibForm(!showLibForm)} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">
                <LinkIcon size={14}/> Add Scripture
             </button>
             <button onClick={() => setShowLogForm(!showLogForm)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 dark:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">
                <Plus size={14}/> Log Session
             </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatBox icon={<Clock size={20} className="text-blue-500" />} label="Reading Time" value="45m" />
          <StatBox icon={<Flame size={20} className="text-teal-600 dark:text-orange-500" />} label="Streak" value="8 Days" />
          <StatBox icon={<BookOpen size={20} className="text-purple-500" />} label="Pages Today" value="18" />
        </div>

        <InsightBar text="You read more consistently in the evening 🌙" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-8">
          
          {/* SCRIPTURES LIBRARY */}
          <section>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Sacred Library</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {library.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-[2rem] bg-slate-200 aspect-[4/5] shadow-xl"
                >
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <h4 className="text-white font-black text-lg leading-tight">{item.title}</h4>
                    <div className="flex items-center gap-1 text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">
                        <ExternalLink size={10} /> Open Scripture
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          {/* READING HISTORY */}
          <section>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Reading History</h3>
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                      <Book size={20} className="text-teal-600 dark:text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white">{s.book}</h4>
                      <p className="text-xs text-slate-500">{s.pages} pages • {s.time} min • <span className="italic">"{s.note}"</span></p>
                    </div>
                  </div>
                  <button onClick={() => setSessions(sessions.filter(x => x.id !== s.id))} className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: FORMS (Floating/Sticky) */}
        <div className="lg:col-span-4 space-y-6">
          <AnimatePresence>
            {showLogForm && (
              <motion.form 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleAddSession} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl"
              >
                <h3 className="font-black dark:text-white mb-4">Log Daily Progress</h3>
                <div className="space-y-4">
                  <Input label="Book Name" placeholder="e.g. Bhagavad Gita" value={formData.book} onChange={(v) => setFormData({...formData, book: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Pages" type="number" placeholder="0" value={formData.pages} onChange={(v) => setFormData({...formData, pages: v})} />
                    <Input label="Time (min)" type="number" placeholder="0" value={formData.time} onChange={(v) => setFormData({...formData, time: v})} />
                  </div>
                  <Input label="Short Note" placeholder="What did you learn?" value={formData.note} onChange={(v) => setFormData({...formData, note: v})} />
                  <button className="w-full py-3 bg-teal-600 dark:bg-orange-600 text-white rounded-xl font-bold text-sm">Save Progress</button>
                </div>
              </motion.form>
            )}

            {showLibForm && (
              <motion.form 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleAddScripture} className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800 shadow-2xl"
              >
                <h3 className="font-black dark:text-white mb-4 flex items-center gap-2"><LinkIcon size={18}/> Add to Library</h3>
                <div className="space-y-4">
                  <Input label="Scripture Title" placeholder="e.g. Yoga Vasishtha" value={libFormData.title} onChange={(v) => setLibFormData({...libFormData, title: v})} />
                  <Input label="Reading Link (URL)" placeholder="https://..." value={libFormData.link} onChange={(v) => setLibFormData({...libFormData, link: v})} />
                  <Input label="Image URL (Optional)" placeholder="https://..." value={libFormData.image} onChange={(v) => setLibFormData({...libFormData, image: v})} />
                  <button className="w-full py-3 bg-slate-800 dark:bg-white dark:text-black text-white rounded-xl font-bold text-sm">Add to Library</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// HELPER COMPONENTS
const StatBox = ({ icon, label, value }) => (
  <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm backdrop-blur-md">
    <div className="mb-2">{icon}</div>
    <span className="text-[9px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">{label}</span>
    <span className="text-lg font-black dark:text-slate-200">{value}</span>
  </div>
);

const InsightBar = ({ text }) => (
  <div className="bg-teal-50/50 dark:bg-orange-500/5 border border-teal-100/50 dark:border-orange-500/10 p-3 rounded-2xl flex items-center gap-3">
    <Sparkles className="text-teal-600 dark:text-orange-500" size={16} />
    <p className="text-xs font-bold text-slate-600 dark:text-slate-400 italic">{text}</p>
  </div>
);

const Input = ({ label, type="text", placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{label}</label>
    <input 
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="bg-slate-50 dark:bg-slate-950 border-none rounded-xl p-3 text-xs focus:ring-2 focus:ring-teal-500 dark:text-white"
      placeholder={placeholder}
    />
  </div>
);

export default Reading;