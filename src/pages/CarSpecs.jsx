import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useScroll, useTransform } from 'framer-motion';
import carImage from '../assets/car1.png';
import FloatingBackgroundShapes from '../components/FloatingBackgroundShapes';
import HistoryCard from '../components/HistoryCard';
import FeaturedCars from '../components/FeaturedCars';
import CarList from './CarList';

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


const SpecCard = ({ label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
    }}
    className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/70 p-6 rounded-2xl backdrop-blur-md border border-indigo-700/30 transition-all"
  >
    <h2 className="text-xl font-semibold mb-2 text-indigo-200">{label}</h2>
    <p className="text-2xl font-bold text-white">{value}</p>
  </motion.div>
);



const CarSpecs = () => {
  const { scrollYProgress } = useScroll();
  const carOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.5, 0]);
  const carScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const carRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (carRef.current) {
        const rect = carRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x - 30); // Center the orb
        mouseY.set(y - 30);
      }
    };

    const currentRef = carRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-gray-900  text-white px-6 py-10 relative overflow-hidden">
      <FloatingBackgroundShapes />
      
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Future</span> of Driving
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-indigo-100"
        >
          Step into the future with our latest electric vehicle. Experience unparalleled performance, cutting-edge technology, and a design that redefines luxury.
        </motion.p>
      </motion.div>

      {/* Car Image with Scroll Effects */}
      <motion.div 
        className="flex justify-center mb-12 relative"
        ref={carRef}
      >
        <motion.div
          className="relative rounded-xl overflow-hidden"
          style={{ opacity: carOpacity, scale: carScale }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <motion.img 
            src={carImage} 
            alt="Car" 
            className="rounded-xl"
            width={900}
            height={500}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-indigo-400 rounded-xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [0.95, 1, 0.95]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Floating orb that follows mouse */}
        <motion.div
          className="absolute w-16 h-16 bg-indigo-400 rounded-full pointer-events-none"
          style={{ 
            x: mouseX, 
            y: mouseY,
            background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)"
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </motion.div>

      {/* Car Name Floating Overlay */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0.7, 1, 0.7],
          y: [20, 0, 20]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      >
        <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-80">
          Indigo
        </h2>
      </motion.div>

      {/* Specs Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
      >
        {specs.map((spec, index) => (
          <SpecCard key={index} index={index} {...spec} />
        ))}
      </motion.div>



       <FeaturedCars />
             {/* History Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-indigo-400">Journey</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((item, index) => (
            <HistoryCard key={index} index={index} {...item} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default CarSpecs;