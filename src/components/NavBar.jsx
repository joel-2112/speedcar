import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  return (
    <motion.nav
      className="bg-blue-800 text-white p-4 sticky top-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src="/images/logo.png" alt="Car Showroom Logo" className="h-10" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
            >
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
            >
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
              onClick={() => setIsOpen(false)}
            >
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}

export default NavBar;