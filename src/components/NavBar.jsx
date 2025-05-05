import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ford from '../assets/ford.jpg'; 
import { MdClose, MdMenu } from 'react-icons/md';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  const linkClasses = ({ isActive }) =>
    `px-5 py-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
      isActive
        ? 'bg-indigo-500 text-white shadow-sm font-medium '
        : 'text-indigo-500 hover:bg-indigo-500 hover:text-white'
    }`;

  return (
    <motion.nav
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="container mx-auto flex items-center justify-between py-2 px-6 md:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={ford} alt="Car" className="h-10 w-10 rounded-full border-2 border-white" />
          <span className="font-semibold text-lg tracking-wide">SpeedCar</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 bg-blue-50 p-5 rounded-full ">
          <li>
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cars" className={linkClasses}>
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClasses}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
        {isOpen? <MdClose color='blue'/> : <MdMenu color='blue'/>}
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cars" className={linkClasses} onClick={() => setIsOpen(false)}>
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}

export default NavBar;
