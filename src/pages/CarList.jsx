import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCar, FaGasPump, FaSnowflake, FaChair } from "react-icons/fa";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import NavBar from "../components/NavBar";

const cars = [
  {
    id: 1,
    name: "Toyota Crown 2023",
    image: car1,
    seats: 3,
    fuel: "Diesel",
    mileage: "15k",
    ac: true,
  },
  {
    id: 2,
    name: "Grand Highlander Hybrid",
    image: car2,
    seats: 3,
    fuel: "Diesel",
    mileage: "15k",
    ac: true,
  },
  {
    id: 3,
    name: "Corolla Civic Hybrid",
    image: car3,
    seats: 3,
    fuel: "Diesel",
    mileage: "15k",
    ac: true,
  },
];

const CarList = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
        <NavBar />
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Choose Your Ride
      </h2>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              when: "beforeChildren",
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cars.map((car) => (
          <motion.div
            key={car.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl shadow-lg p-5 cursor-pointer"
          >
            <motion.img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover mb-5 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{car.name}</h3>

            <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-4">
              <div className="flex items-center gap-1">
                <FaChair /> {car.seats} Seat
              </div>
              <div className="flex items-center gap-1">
                <FaGasPump /> {car.fuel}
              </div>
              <div className="flex items-center gap-1">
                <FaCar /> {car.mileage}
              </div>
              <div className="flex items-center gap-1">
                <FaSnowflake /> {car.ac ? "AC" : "No AC"}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Rent Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CarList;