'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Ene Esther Ali',
    role: 'Lawyer and Barrister',
    image: '/testimonials/testimonial1.jpeg',
    content: "I had the pleasure of working with Marvellous on the design of my personal website, and I couldn't be more impressed with the results.",
    rating: 5
  },
  {
    id: 2,
    name: 'Oke udoko',
    role: 'Senior Product Designer',
    image: '/testimonials/testimonial2.jpeg',
    content: 'Working with Code Savan is like having a secret weapon for your business! 🚀',
    rating: 5
  },
  {
    id: 3,
    name: 'Victory Osonyeokele',
    role: 'Virtual Assistant | Customer Support',
    image: '/testimonials/testimonial3.jpeg',
    content: 'I had the pleasure of partnering with Code Savan on a web development project, and I cannot recommend him highly enough.',
    rating: 5
  }
];

const SLIDE_DURATION = 3000; // 3 seconds in milliseconds
const PROGRESS_INTERVAL = 30; // Update progress every 30ms
const PROGRESS_STEP = (100 * PROGRESS_INTERVAL) / SLIDE_DURATION; // Calculate step size

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setProgress(0);
    setIsTransitioning(false);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % testimonials.length);
  }, [currentSlide, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isTransitioning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + PROGRESS_STEP;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isTransitioning, nextSlide]);

  return (
    <div className='flex flex-col items-center justify-center gap-1 px-2 md:px-0 py-[90px]' id='testimonials'>
      {/* Avatars Strip */}
      <div className='w-fit h-[46px] bg-white rounded-full border border-gray-100
        relative flex items-center justify-start px-1'>
        <div className='flex -space-x-3'>
          {[1, 2, 3, 4].map((num) => (
            <Image
              key={num}
              src={`/avatars/avatar${num}.jpg`}
              alt="Client Avatar"
              width={36}
              height={36}
              className='w-9 h-9 rounded-full border-2 border-white object-cover'
            />
          ))}
          <div className='w-9 h-9 rounded-full bg-[#2affff] flex items-center justify-center'>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className='w-4 h-4 text-[#2424f9] animate-heartbeat'
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className='leading-tight mt-[25px] font-medium'>
        <p className='text-[#171717] text-center'>Loved by those</p>
        <p className='text-gray-500 text-center'>who value thoughtful design.</p>
      </div>

      <div className='flex flex-col items-center justify-center gap-1 py-[25px]'>
        <p className='text-[#171717] text-center text-[50px] font-medium leading-[55px]'>
          Words from <br /> my clients
        </p>

        {/* Hand and Phone Container */}
        <div className='mt-16 w-full'>
          {/* Phone Mockup */}
          <div className='relative w-full'>
            {/* Side Gradient Panels */}
            <div className='w-[380px] hidden md:block h-[760px] rounded-[45px] absolute z-0 -left-[110%] bg-gradient-to-l from-[#f3f3f3] via-[#f4f4f4] via-[#f5f5f5] via-[#f6f6f6] via-[#f7f7f7] via-[#f8f8f8] via-[#f9f9f9] to-[#fff]'/>
            <div className='w-[380px] hidden md:block h-[760px] rounded-[45px] absolute z-0 -right-[110%] bg-gradient-to-r from-[#f3f3f3] via-[#f4f4f4] via-[#f5f5f5] via-[#f6f6f6] via-[#f7f7f7] via-[#f8f8f8] via-[#f9f9f9] to-[#fff]'/>

            {/* Hand Background */}
            <div className='hidden md:block absolute top-0 left-[75%] -mt-10
            -translate-x-1/2 md:w-[731px] w-full h-[968px] z-[1]'>
              <div className='absolute hidden md:block inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-white via-white/80 to-transparent z-10' />
              <Image
                src="/hand.avif"
                alt="Hand holding phone"
                fill
                className='object-contain'
                priority
              />
            </div>

            <div className='relative w-[380px] h-[760px] rounded-[45px] border-[12px] border-black overflow-hidden bg-black z-[2]'>
              {/* Navigation Buttons */}
              <button
                onClick={previousSlide}
                className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
                aria-label="Previous slide"
              />
              <button
                onClick={nextSlide}
                className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer"
                aria-label="Next slide"
              />

              {/* Dynamic Background Image with Overlay */}
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src={testimonials[currentSlide].image}
                  alt="Testimonial background"
                  fill
                  className='object-cover transition-opacity duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-[#2424f9]/95 to-[#2424f9]/85' />
              </div>

              {/* Notch */}
              <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[20px]' />

              {/* Content */}
              <div className='relative h-full text-white p-8 flex flex-col items-stretch'>
                {/* Top Section */}
                <div className='space-y-8'>
                  {/* Progress Bars */}
                  <div className='flex gap-2 mt-4'>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className='h-[3px] flex-1 bg-white/40 rounded-full cursor-pointer'
                      >
                        <div
                          className='h-full bg-white/70 rounded-full transition-all duration-100'
                          style={{
                            width: currentSlide === index ? `${progress}%` :
                                   currentSlide > index ? '100%' : '0%'
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Profile */}
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className='flex items-center gap-3'
                    >
                      <Image
                        src={testimonials[currentSlide].image}
                        alt={testimonials[currentSlide].name}
                        width={32}
                        height={32}
                        className='rounded-full'
                      />
                      <div>
                        <h3 className='text-sm font-medium'>{testimonials[currentSlide].name}</h3>
                        <p className='text-xs text-white/70'>{testimonials[currentSlide].role}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className='mt-auto'>
                {/* Middle Section - Testimonial */}
                <div className='flex-1 flex flex-col justify-center space-y-6 mb-[35px]'>
                  {/* Rating */}
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className='flex gap-1'
                    >
                      {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                        <Star key={i} className='w-4 h-4 fill-[#2affff] text-[#2affff]' />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial Text */}
                  <AnimatePresence mode='wait'>
                    <motion.p
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className='text-[22px] leading-[1.2] font-medium tracking-tight'
                    >
                      {testimonials[currentSlide].content}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Bottom Section */}
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h4 className='font-medium text-lg'>{testimonials[currentSlide].name}</h4>
                    <p className='text-white/70'>{testimonials[currentSlide].role}</p>
                  </motion.div>
                </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Testimonials;
