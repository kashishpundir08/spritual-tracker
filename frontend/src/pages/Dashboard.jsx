import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { 
  Flower2, BookOpen, Wind, Sparkles, TrendingUp, 
  Zap, CheckCircle2, Clock, Calendar, Trophy 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const Dashboard = () => {
  const weeklyData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 52 },
    { day: 'Wed', minutes: 38 },
    { day: 'Thu', minutes: 65 },
    { day: 'Fri', minutes: 48 },
    { day: 'Sat', minutes: 70 },
    { day: 'Sun', minutes: 40 },
  ];

  const goals = [
    { name: "Chanting", current: 20, target: 30, color: "bg-orange-500" },
    { name: "Meditation", current: 15, target: 15, color: "bg-purple-500" },
    { name: "Reading", current: 5, target: 20, color: "bg-blue-500" },
  ];

  return (
      <div className="space-y-6 pb-10 w-full text-slate-800">
        
        {/* --- 1. HEADER SECTION --- */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-extrabold"
            >
              Hare Krishna 🙏
            </motion.h1>
            <p className="text-slate-500">Your spiritual momentum is high today.</p>
          </div>
          
          {/* SPIRITUAL SCORE GAUGE */}
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset="25.1" className="text-teal-500" />
              </svg>
              <span className="absolute text-xs font-bold">82</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Spiritual Score</p>
              <p className="text-sm font-bold text-teal-600">Focused 🧘</p>
            </div>
          </div>
        </section>

        {/* --- 2. TODAY OVERVIEW (STAT CARDS) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<CheckCircle2 />} label="Completed" value="2/3" color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={<Clock />} label="Time Spent" value="45 min" color="text-blue-600" bg="bg-blue-50" />
          <StatCard icon={<Zap />} label="Streak" value="12 Days" color="text-orange-600" bg="bg-orange-50" />
          <StatCard icon={<Trophy />} label="Level" value="Sadhaka" color="text-purple-600" bg="bg-purple-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- 3. WEEKLY PROGRESS (CHART) --- */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Calendar size={18} className="text-slate-400" /> Weekly Activity
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="minutes" radius={[6, 6, 6, 6]} barSize={30}>
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.minutes > 50 ? '#0d9488' : '#99f6e4'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- 4. GOAL TRACKER --- */}
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Daily Goals</h3>
            <div className="space-y-6">
              {goals.map((goal, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-600">{goal.name}</span>
                    <span className="text-slate-400">{goal.current}/{goal.target} min</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${goal.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- 5. AI INSIGHTS --- */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-[32px] p-6 text-white shadow-lg flex flex-col md:flex-row items-center gap-6"
        >
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-xl">
            <Sparkles size={32} className="text-teal-100" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-1">AI Smart Insight</h4>
            <p className="text-teal-50 opacity-90 leading-relaxed">
              "Your concentration is highest between <span className="font-bold">5:00 AM - 7:00 AM</span>. You've completed 90% of your chanting sessions during this window. Keep it up!"
            </p>
          </div>
        </motion.div>

        {/* --- 6. HABIT HISTORY TABLE --- */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent History</h3>
            <button className="text-sm text-teal-600 font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Habit</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <HistoryRow date="28 Apr" habit="Chanting" time="20 min" status="Completed" />
                <HistoryRow date="27 Apr" habit="Meditation" time="15 min" status="Completed" />
                <HistoryRow date="27 Apr" habit="Reading" time="5 min" status="Partial" />
              </tbody>
            </table>
          </div>
        </div>

      </div>
  );
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4"
  >
    <div className={`p-3 rounded-2xl ${bg} ${color}`}>{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{label}</p>
      <p className="text-xl font-extrabold text-slate-800">{value}</p>
    </div>
  </motion.div>
);

const HistoryRow = ({ date, habit, time, status }) => (
  <tr className="hover:bg-slate-50/50 transition-colors">
    <td className="px-6 py-4 text-sm font-medium text-slate-500">{date}</td>
    <td className="px-6 py-4 text-sm font-bold text-slate-800">{habit}</td>
    <td className="px-6 py-4 text-sm text-slate-600">{time}</td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
        status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

export default Dashboard;