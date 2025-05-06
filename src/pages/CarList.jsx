import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCar, FaGasPump, FaSnowflake, FaChair, FaSearch } from "react-icons/fa";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import NavBar from "../components/NavBar";

// Unique car data
const cars = [
  {
    id: 1,
    name: "Toyota Crown 2023",
    image: car1,
    seats: 3,
    fuel: "Diesel",
    mileage: "15k",
    ac: true,
    price: "$120/day"
  },
  {
    id: 2,
    name: "Grand Highlander Hybrid",
    image: car2,
    seats: 5,
    fuel: "Hybrid",
    mileage: "12k",
    ac: true,
    price: "$150/day"
  },
  {
    id: 3,
    name: "Luxury Sedan Elite",
    image: car1,
    seats: 4,
    fuel: "Premium",
    mileage: "8k",
    ac: true,
    price: "$200/day"
  },
  {
    id: 4,
    name: "Corolla Civic Hybrid",
    image: car3,
    seats: 4,
    fuel: "Electric",
    mileage: "20k",
    ac: true,
    price: "$90/day"
  },
  {
    id: 5,
    name: "SUV Adventure Pro",
    image: car2,
    seats: 7,
    fuel: "Diesel",
    mileage: "18k",
    ac: true,
    price: "$180/day"
  },
  {
    id: 6,
    name: "Sports Coupe GT",
    image: car3,
    seats: 2,
    fuel: "Premium",
    mileage: "10k",
    ac: true,
    price: "$250/day"
  },
];

// 3D Ball Component with Pointer
const ThreeDBall = ({ mouse }) => {
  const meshRef = useRef();
  const pointerRef = useRef();
  const { viewport, mouse: threeMouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth follow for the mouse position
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (mouse.x * viewport.width) / 2,
        0.1
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (mouse.y * viewport.height) / 2,
        0.1
      );

      // Pulsing animation
      meshRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      meshRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      meshRef.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }

    if (pointerRef.current) {
      // Pointer follows mouse with slight offset
      pointerRef.current.position.x = THREE.MathUtils.lerp(
        pointerRef.current.position.x,
        (mouse.x * viewport.width) / 2 + 2,
        0.15
      );
      pointerRef.current.position.y = THREE.MathUtils.lerp(
        pointerRef.current.position.y,
        (mouse.y * viewport.height) / 2 + 2,
        0.15
      );
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={pointerRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#ff6b6b" 
          emissive="#ff6b6b"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  );
};

const CarList = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const mouse = useMotionValue({ x: 0, y: 0 });
  const canvasRef = useRef();
  const containerRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = canvasRef.current.getBoundingClientRect();
    
    mouse.set({
      x: (clientX - left - width / 2) / (width / 2),
      y: -(clientY - top - height / 2) / (height / 2)
    });
  };

  // Handle scroll for fade effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Enhanced fade animation with easing
  const getFadeAnimation = (index) => {
    const baseDelay = index * 0.15;
    return {
      hidden: { 
        opacity: 0, 
        y: 50, 
        scale: 0.95 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.6,
          delay: baseDelay,
          ease: [0.6, -0.05, 0.01, 0.99]
        } 
      },
      exit: {
        opacity: 0,
        y: -50,
        scale: 0.95,
        transition: { 
          duration: 0.4,
          ease: [0.6, -0.05, 0.01, 0.99]
        }
      }
    };
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={canvasRef}
    >
      {/* Full width NavBar */}
      <div className="w-full">
        <NavBar />
      </div>

      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <ThreeDBall mouse={mouse} />
        </Canvas>
      </div>

      {/* Content with proper spacing from NavBar */}
      <div className="relative z-10 pt-20 px-5 md:px-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Ride
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our premium collection of vehicles tailored for every journey
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-12 relative"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a car..."
              className="w-full py-3 px-5 pr-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Car Grid with scroll-based animations */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                when: "beforeChildren",
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
        >
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              variants={getFadeAnimation(index)}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer relative overflow-hidden group"
              onMouseEnter={() => setHoveredCard(car.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <motion.img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-white font-medium">{car.price}</span>
                </motion.div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">{car.name}</h3>

              <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-6">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaChair className="text-blue-500" /> {car.seats} Seats
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaGasPump className="text-green-500" /> {car.fuel}
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaCar className="text-purple-500" /> {car.mileage}
                </div>
                {car.ac && (
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <FaSnowflake className="text-cyan-500" /> AC
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ 
                  backgroundColor: "#3b82f6",
                  boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.3)"
                }}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium transition-all"
              >
                Rent Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-medium text-gray-700 mb-2">
              No cars found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarList;