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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >

        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;