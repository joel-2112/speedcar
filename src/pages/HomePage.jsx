import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import BMWCanvas from '../canvas/BMWCanvas';
import ErrorBoundary from '../components/ErrorBoundary';

const HomePage = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto mt-10 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-gray-800"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Welcome to the Car Showroom
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-center text-gray-600"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Explore our collection of amazing cars!
        </motion.p>
        <div  >
          <ErrorBoundary>
            <BMWCanvas />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default HomePage;