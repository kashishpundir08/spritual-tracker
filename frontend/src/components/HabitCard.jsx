import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const HabitCard = ({ title, icon, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">Daily Goal: 20 mins</p>
        </div>
      </div>
      <CheckCircle className="text-slate-300 hover:text-green-500 transition-colors" size={28} />
    </motion.div>
  );
};

export default HabitCard;