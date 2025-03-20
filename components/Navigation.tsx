'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2 w-full max-w-[550px]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <nav className="bg-[#666666] rounded-full h-12 px-3 sm:px-5 flex items-center justify-between sm:justify-center sm:gap-6 shadow-lg">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-white/80 hover:text-white transition-colors ${activeSection === 'home' ? 'text-white' : ''}`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => scrollToSection('work')}
              className={`text-white/80 hover:text-white transition-colors text-sm sm:text-base ${activeSection === 'work' ? 'text-white' : ''}`}
            >
              Projects
            </button>

            <button
              onClick={() => scrollToSection('testimonials')}
              className={`text-white/80 hover:text-white transition-colors text-sm sm:text-base ${activeSection === 'testimonials' ? 'text-white' : ''}`}
            >
              Testimonials
            </button>

            <div className="bg-white rounded-full px-3 py-1.5">
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-black text-sm sm:text-base font-medium ${activeSection === 'contact' ? 'opacity-80' : ''}`}
              >
                Contact
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
