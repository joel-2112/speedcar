import { motion } from 'framer-motion';

const CanvasLoader = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <motion.div
        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        variants={spinnerVariants}
        animate="animate"
      />
      <motion.p
        className="mt-4 text-lg text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
      >
        Loading Car Model...
      </motion.p>
    </div>
  );
};

export default CanvasLoader;