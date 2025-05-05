import React from 'react';
import { motion } from 'framer-motion';


const FloatingBackgroundShapes = () => {
  // Define shape configurations with proper Tailwind class names
  const shapes = [
    {
      size: 'w-24 h-24', // small
      color: 'bg-indigo-500',
      initial: { y: -100, x: '20%' },
      animate: { y: 100, x: '20%' }
    },
    {
      size: 'w-32 h-32', // medium
      color: 'bg-indigo-400',
      initial: { x: -150, y: '30%' },
      animate: { x: 150, y: '30%' }
    },
    {
      size: 'w-40 h-40', // large
      color: 'bg-indigo-600',
      initial: { y: -120, right: '15%' },
      animate: { y: 120, right: '15%' }
    },
    {
      size: 'w-20 h-20', // small
      color: 'bg-indigo-700',
      initial: { x: -100, bottom: '20%' },
      animate: { x: 100, bottom: '20%' }
    },
    {
      size: 'w-28 h-28', // medium
      color: 'bg-indigo-500',
      initial: { y: -80, left: '25%' },
      animate: { y: 80, left: '25%' }
    },
    {
      size: 'w-36 h-36', // large
      color: 'bg-indigo-400',
      initial: { x: -180, top: '15%' },
      animate: { x: 180, top: '15%' }
    },
    {
      size: 'w-16 h-16', // extra small
      color: 'bg-indigo-300',
      initial: { y: -60, x: '70%' },
      animate: { y: 60, x: '70%' }
    },
    {
      size: 'w-44 h-44', // extra large
      color: 'bg-indigo-600',
      initial: { x: -200, y: '60%' },
      animate: { x: 200, y: '60%' }
    }
  ];

  return (
    <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.size} ${shape.color} rounded-full blur-sm opacity-70`}
          initial={{ opacity: 0, ...shape.initial }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            ...shape.animate 
          }}
          transition={{ 
            duration: 8 + Math.random() * 7, 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </motion.div>
  );
};

export default FloatingBackgroundShapes;