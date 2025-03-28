'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isProjectsPage = pathname === '/projects';

  useEffect(() => {
    const handleScroll = () => {
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
            {isProjectsPage ? (
                <nav className='flex w-fit items-center gap-3 justify-between bg-[#1c1c1cdc] backdrop-blur-3xl rounded-full h-fit p-1 pr-6 mx-auto border-none shadow-sm'>
                  <Link href="/" className="text-black/80 hover:text-black transition-colors">
                  <div className='bg-white rounded-full p-4'>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 hover:rotate-45 transition-transform duration-300" />
                  </div>
                  </Link>

                  <button
                    onClick={() => scrollToSection('all')}
                    className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'all' ? 'text-white' : ''}`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => scrollToSection('top')}
                    className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'top' ? 'text-white' : ''}`}
                  >
                    Top
                  </button>

                  <button
                    onClick={() => scrollToSection('native')}
                    className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'native' ? 'text-white' : ''}`}
                  >
                    Native
                  </button>

                  <button
                    onClick={() => scrollToSection('client')}
                    className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'client' ? 'text-white' : ''}`}
                  >
                    Client
                  </button>
                </nav>
              ) :
               (
            <nav className="bg-[#1c1c1cdc] backdrop-blur-3xl rounded-full h-fit p-1 pl-6 flex items-center justify-between">

                  <button
                    onClick={() => scrollToSection('home')}
                    className={`text-white/80 hover:text-white transition-colors ${activeSection === 'home' ? 'text-white' : ''}`}
                  >
                    <Link href={"/"}>
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </button>

                  <button
                    onClick={() => scrollToSection('work')}
                    className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'work' ? 'text-white' : ''}`}
                  >
                    <Link href="/projects" className="flex items-center gap-2">
                      <span>Projects</span>
                    </Link>
                  </button>

                  <Link href="#testimonials">
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className={`text-white/80 hover:text-white transition-colors text-[15px] ${activeSection === 'testimonials' ? 'text-white' : ''}`}
                  >
                    Testimonials

                  </button>
                  </Link>

                  <Link href="#contact">
                  <div className="bg-white transition-colors rounded-full px-5 py-2.5">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className={`text-black text-[15px] font-medium ${activeSection === 'contact' ? 'opacity-90' : ''}`}
                    >
                      Contact
                    </button>
                  </div>
                  </Link>
            </nav>
              )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
