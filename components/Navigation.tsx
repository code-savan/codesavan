'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        console.log("ScrollY:", window.scrollY); // Debugging
      }
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
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <nav className="bg-[#666666] rounded-full h-[60px] px-6 flex items-center gap-8 shadow-lg">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-white/80 hover:text-white transition-colors ${activeSection === 'home' ? 'text-white' : ''}`}
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToSection('work')}
              className={`text-white/80 hover:text-white transition-colors text-[17px] ${activeSection === 'work' ? 'text-white' : ''}`}
            >
              Projects
            </button>

            <button
              onClick={() => scrollToSection('testimonials')}
              className={`text-white/80 hover:text-white transition-colors text-[17px] ${activeSection === 'testimonials' ? 'text-white' : ''}`}
            >
              Testimonials
            </button>

            <div className="bg-white rounded-full px-6 py-2">
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-black text-[17px] font-medium ${activeSection === 'contact' ? 'opacity-80' : ''}`}
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
