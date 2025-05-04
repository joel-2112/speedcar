import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import BMWCanvas from '../canvas/BMWCanvas';
import ErrorBoundary from '../components/ErrorBoundary';

const HomePage = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  const carCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4">
        <div>
          <ErrorBoundary>
            <BMWCanvas />
          </ErrorBoundary>
        </div>
        <motion.div
          className="mt-10 text-center"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800">Featured Cars</h2>
          <p className="mt-2 text-lg text-gray-600">Check out our latest models!</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Car Cards */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-4"
            variants={carCardVariants}
          >
            <h3 className="text-xl font-semibold">Car Model 1</h3>
            <p className="mt-2 text-gray-600">Description of Car Model 1.</p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg rounded-lg p-4"
            variants={carCardVariants}
          >
            <h3 className="text-xl font-semibold">Car Model 2</h3>
            <p className="mt-2 text-gray-600">Description of Car Model 2.</p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg rounded-lg p-4"
            variants={carCardVariants}
          >
            <h3 className="text-xl font-semibold">Car Model 3</h3>
            <p className="mt-2 text-gray-600">Description of Car Model 3.</p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg rounded-lg p-4"
            variants={carCardVariants}
          >
            <h3 className="text-xl font-semibold">Car Model 4</h3>
            <p className="mt-2 text-gray-600">Description of Car Model 4.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;