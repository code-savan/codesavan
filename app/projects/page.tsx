'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects } from '@/constants';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const heroImages = [
  {
    src: "/ph.png",
    alt: "Project Hero 1"
  },
  {
    src: "/ph2.png",
    alt: "Project Hero 2"
  },
  {
    src: "/ph3.png",
    alt: "Project Hero 3"
  },
  {
    src: "/ph4.png",
    alt: "Project Hero 4"
  }
];

const ProjectsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="md:h-[88vh] h-[50vh] relative flex items-center justify-center w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentImageIndex === index ? 1 : 0,
                transition: {
                  duration: 1,
                  ease: "easeInOut"
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          ))}
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">My Projects</h1>
          <p className="text-xl md:text-2xl text-gray-200 mx-auto">
            A collection of my work, experiments, and creative endeavors
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Projects Grid */}
          <div className="flex flex-col gap-12 relative min-h-[1200px]">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.key}
                className={`rounded-[40px] md:h-[500px] md:w-[600px] mx-auto h-[350px] w-full overflow-hidden cursor-pointer group
                          sticky top-[120px]`}
                style={{
                  zIndex: index + 1,
                  marginBottom: '50px'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href={`/projects/${project.key}`}>
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <motion.div
                    className='w-full h-full flex flex-col justify-end p-6'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                  >
                    <div className="flex justify-between bg-white rounded-[40px] p-4 items-center">
                      <div className="flex gap-4 items-center">
                        <div
                          className="w-[54px] h-[54px] relative rounded-full overflow-hidden flex justify-center items-center"
                          style={{ backgroundColor: project.logoColor }}
                        >
                          <Image
                            src={project.logoImage}
                            alt={project.title}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-[18px] text-[#171717]">{project.title}</p>
                          <p className="text-gray-700 text-[14px] leading-tight font-medium">{project.category}</p>
                        </div>
                      </div>

                      <div className="w-[54px] h-[54px] bg-[#f6f6f6] rounded-full flex justify-center items-center">
                        <ArrowRight className='w-[20px] h-[20px] text-black -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out' />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Navigation />
    </div>
  );
};

export default ProjectsPage;
