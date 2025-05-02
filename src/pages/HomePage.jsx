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
      <div className="container mx-auto   px-4">
      
        <div  >
          <ErrorBoundary>
            <BMWCanvas />
          </ErrorBoundary>
        </div>
        <div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Add your car cards here */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold">Car Model 1</h3>
              <p className="mt-2 text-gray-600">Description of Car Model 1.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold">Car Model 2</h3>
              <p className="mt-2 text-gray-600">Description of Car Model 2.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold">Car Model 3</h3>
              <p className="mt-2 text-gray-600">Description of Car Model 3.</p>
            </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold">Car Model 4</h3>
            <p className="mt-2 text-gray-600">Description of Car Model 4.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;