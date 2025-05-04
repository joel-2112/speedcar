import React, { useEffect } from 'react';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import carImage from '../assets/toyota.png';

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
  const { scrollYProgress } = useViewportScroll();
  const controls = useAnimation();

  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      controls.start({ opacity: latest < 0.1 ? 1 : 0 });
    });
  }, [controls, scrollYProgress]);

  return (
    <div className="min-h-screen bg-indigo-900 text-white px-6 py-10 relative overflow-hidden">
      
      {/* Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute w-24 h-24 bg-indigo-500 rounded-full blur-sm"
          initial={{ y: -200, x: '50%' }}
          animate={{ y: 200, x: '50%' }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-indigo-400 rounded-full blur-sm"
          initial={{ x: -200, y: '50%' }}
          animate={{ x: 200, y: '50%' }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute w-40 h-40 bg-indigo-600 rounded-full blur-sm"
          initial={{ y: -200, right: '10%' }}
          animate={{ y: 200, right: '10%' }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute w-20 h-20 bg-indigo-700 rounded-full blur-sm"
          initial={{ x: -200, bottom: '10%' }}
          animate={{ x: 200, bottom: '10%' }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute w-28 h-28 bg-indigo-500 rounded-full blur-sm"
          initial={{ y: -200, left: '10%' }}
          animate={{ y: 200, left: '10%' }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute w-36 h-36 bg-indigo-400 rounded-full blur-sm"
          initial={{ x: -200, top: '10%' }}
          animate={{ x: 200, top: '10%' }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.div>

      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center mb-12"
      >
        Explore the <span className="text-indigo-400">Future</span> of Driving
      </motion.h1>

      {/* Car Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1 }}
        className="flex justify-center mb-12 relative"
      >
        <motion.div
          className="relative rounded-xl shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src={carImage} 
            alt="Car" 
            className="rounded-xl shadow-2xl" 
            width={900}
            height={500}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-4 border-indigo-400 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-4 border-indigo-400 rounded-xl blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Car Name */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-indigo-400"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <p>Indigo</p>
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
            className="bg-indigo-800 bg-opacity-50 p-6 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{spec.label}</h2>
            <p className="text-2xl font-bold text-indigo-400">{spec.value}</p>
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
              className="bg-indigo-800 bg-opacity-50 p-6 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 transform transition duration-300"
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
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-lg transition duration-300">
          Reserve Now
        </button>
      </motion.div>

    </div>
  );
};

export default CarSpecs;