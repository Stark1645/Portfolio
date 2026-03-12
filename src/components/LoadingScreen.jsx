import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-[99999] bg-[#0d1117] flex flex-col items-center justify-center p-6"
    >
      <div className="relative w-full max-w-xs md:max-w-md flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl md:text-5xl font-bold gradient-text mb-8 tracking-tighter text-center"
        >
          Ruthragurubaran
        </motion.div>

        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700 p-[1px] shadow-lg">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 rounded-full"
          />
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm font-mono tracking-widest uppercase">
                {progress === 100 ? 'Systems Initialized' : 'Generating Innovation'}
            </span>
            <span className="text-blue-500 font-bold text-xl">{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
