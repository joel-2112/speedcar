import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import car1 from '../assets/car1.png';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import car4 from '../assets/car4.jpg';
import car5 from '../assets/car5.png';

const FeaturedCars = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('left');

  const cars = [
    {
      image: car5,
      name: 'Tukson GT',
      type: 'LUXURY CAR | ELECTRIC CAR',
      features: ['Autonomous Driving', '600km Range', '0-100km/h in 2.9s']
    },
    {
      image: car1,
      name: 'Tarla Medica',
      type: 'LUXURY CAR | ELECTRIC CAR',
      features: ['Autonomous Driving', '600km Range', '0-100km/h in 2.9s']
    },
    {
      image: car2,
      name: 'Nexus Velocity',
      type: 'SPORTS CAR | HYBRID',
      features: ['Aerodynamic Design', '450HP Engine', 'Carbon Fiber Body']
    },
    {
      image: car3,
      name: 'Aurora EV',
      type: 'ELECTRIC SUV | FAMILY',
      features: ['7-Seater', 'Solar Roof', '400km Range']
    },
    {
      image: car4,
      name: 'Prestige Elite',
      type: 'LIMITED EDITION | LUXURY',
      features: ['Handcrafted Interior', 'V12 Engine', 'Exclusive Finish']
    }
  ];

  // Auto-rotate cars every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % cars.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cars.length]);

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    exit: (direction) => ({
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.8, ease: 'easeInOut' }
    })
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black">
      {/* Flash Sale Banner */}
      <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1.05 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
          className="font-bold text-lg"
        >
          FLASH SALE
        </motion.div>
      </div>

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            {/* Car Image */}
            <img
              src={cars[currentIndex].image}
              alt={cars[currentIndex].name}
              className="w-full h-full object-cover brightness-75"
            />

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white"
              >
                <div className="text-sm font-semibold tracking-wider text-red-400 mb-1">
                  {cars[currentIndex].type}
                </div>
                <h2 className="text-4xl font-bold mb-4">{cars[currentIndex].name}</h2>
                <ul className="flex gap-4">
                  {cars[currentIndex].features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                      className="bg-black/40 px-3 py-1 rounded-full text-sm border border-white/20"
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'right' : 'left');
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-6' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;