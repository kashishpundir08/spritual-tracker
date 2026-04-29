import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import WeeklyChart from '../components/WeeklyChart';
import { Clock, CheckCircle, Flame, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  // Mock Data
  const stats = [
    { label: 'Total Time', value: 120, unit: 'm', icon: <Clock className="text-blue-500" />, color: 'bg-blue-500' },
    { label: 'Habits Done', value: 8, unit: '/10', icon: <CheckCircle className="text-green-500" />, color: 'bg-green-500' },
    { label: 'Streak', value: 14, unit: ' days', icon: <Flame className="text-orange-500" />, color: 'bg-orange-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 max-w-6xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Peaceful Morning, User ✨</h1>
          <p className="opacity-60 text-sm">Your spiritual progress for today.</p>
        </div>
      </header>

      {/* 1. Today Summary  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Single Line AI Thought */}
        <motion.div 
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 }}}
          className="lg:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 opacity-10">
            <Lightbulb size={120} />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-2">AI Insight</h3>
          <p className="text-lg italic font-medium leading-relaxed">
            “You are most consistent in the morning 🌅”
          </p>
        </motion.div>

        {/* 3. Weekly Chart */}
        <motion.div 
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 }}}
          className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Weekly Activity</h3>
            <span className="text-xs opacity-50 font-medium italic">Spiritual Energy Levels</span>
          </div>
          <WeeklyChart />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;