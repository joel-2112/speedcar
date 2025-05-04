import React from 'react';
import { motion } from 'framer-motion';
import carImage from '../assets/car1.jpg';

const specs = [
  { label: 'Top Speed', value: '250 km/h' },
  { label: '0-100 km/h', value: '3.5 sec' },
  { label: 'Range', value: '520 km' },
  { label: 'Horsepower', value: '670 HP' },
  { label: 'Battery', value: '100 kWh' },
  { label: 'Drive', value: 'All-Wheel Drive' },
];

const history = [
  { year: '2020', description: 'First prototype unveiled at the Auto Expo.' },
  { year: '2021', description: 'Beta testing with select customers.' },
  { year: '2022', description: 'Official launch and global availability.' },
  { year: '2023', description: 'Received multiple awards for innovation and design.' },
];

const CarSpecs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10">
      
      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center mb-12"
      >
        Explore the <span className="text-red-600">Future</span> of Driving
      </motion.h1>

      {/* Car Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1 }}
        className="flex justify-center mb-12"
      >
        <motion.img 
          src={carImage} 
          alt="Car" 
          className="rounded-xl shadow-2xl" 
          width={900}
          height={500}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Description */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-lg md:text-xl">
          Step into the future with our latest electric vehicle. Experience unparalleled performance, cutting-edge technology, and a design that redefines luxury.
        </p>
      </motion.div>

      {/* Specs */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {specs.map((spec, index) => (
          <motion.div 
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 bg-opacity-50 p-6 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{spec.label}</h2>
            <p className="text-2xl font-bold text-red-500">{spec.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* History */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center mt-16 mb-12"
      >
        <h2 className="text-3xl font-bold mb-6">History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {history.map((item, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 bg-opacity-50 p-6 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{item.year}</h3>
              <p className="text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-16"
      >
        <button className="bg-red-600 hover:bg-red-700 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-lg transition duration-300">
          Reserve Now
        </button>
      </motion.div>

    </div>
  );
};

export default CarSpecs;