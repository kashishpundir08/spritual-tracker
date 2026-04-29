import React from 'react';
import { motion } from 'framer-motion';

const WeeklyChart = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const values = [40, 70, 45, 90, 65, 30, 80]; 

  return (
    <div className="flex items-end justify-between h-32 pt-4 px-2">
      {values.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-2 group w-full">
          <div className="relative w-full flex justify-center">
             {/* Tooltip on hover */}
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded">
              {val}%
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
              className="w-8 md:w-10 rounded-t-lg bg-indigo-500/20 dark:bg-indigo-400/20 group-hover:bg-indigo-500 transition-colors"
            />
          </div>
          <span className="text-[10px] font-bold opacity-40 uppercase">{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyChart;