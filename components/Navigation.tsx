'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

const Navigation = () => {
  // Always show navigation by default
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation regardless of scroll position
      setIsVisible(true);
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
        <div className="fixed bottom-4 flex justify-center z-50 w-[350px]">
          <motion.div
            className="w-full max-w-[550px]"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <nav className="bg-[#1c1c1cdc] backdrop-blur-3xl rounded-full h-fit p-1 pl-6 flex items-center justify-between  ">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-white/80 hover:text-white transition-colors ${activeSection === 'home' ? 'text-white' : ''}`}
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => scrollToSection('work')}
                className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'work' ? 'text-white' : ''}`}
              >
                Projects
              </button>

              <button
                onClick={() => scrollToSection('testimonials')}
                className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'testimonials' ? 'text-white' : ''}`}
              >
                Testimonials
              </button>

              <div className="bg-white transition-colors rounded-full px-5 py-2.5">
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`text-black text-[15px] font-medium ${activeSection === 'contact' ? 'opacity-90' : ''}`}
                >
                  Contact
                </button>
              </div>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
