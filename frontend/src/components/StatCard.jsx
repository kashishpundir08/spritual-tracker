import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const StatCard = ({ label, value, unit, icon, color }) => {
  // Number Count Animation logic
  const spring = useSpring(0, { mass: 1, stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800">
          {icon}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-1">{label}</h4>
        <div className="flex items-baseline gap-1">
          <motion.span className="text-4xl font-bold tracking-tighter">
            {display}
          </motion.span>
          <span className="text-lg opacity-50 font-medium">{unit}</span>
        </div>
      </div>

      {/* Progress Bar Animation */}
      <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '70%' }} // Example progress
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;