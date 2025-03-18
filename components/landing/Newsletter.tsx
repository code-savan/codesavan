'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const brandLogos = [
  '/brands/logo1.svg',
  '/brands/logo2.svg',
  '/brands/logo3.svg',
  '/brands/logo4.svg',
  '/brands/logo5.svg',
  // Duplicate for seamless loop
  '/brands/logo1.svg',
  '/brands/logo2.svg',
  '/brands/logo3.svg',
  '/brands/logo4.svg',
  '/brands/logo5.svg',
];

const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <div className='flex flex-col items-center justify-center py-[90px] px-2 md:px-0 '>
      {/* Main Content */}
      <div className='mx-auto text-center mb-16'>
        <p className='text-[#171717] text-[49px] font-semibold leading-[1.1] mb-6'>
          Join 150+ professionals <br className='hidden md:block' />
          elevating their brand
        </p>

        <p className='text-[#171717] text-[17px] leading-relaxed mb-16'>
          Discover design insights, project updates, and tips to <br />
          elevate your work straight to your inbox.
        </p>

        {/* Email Input */}
        <div className='relative mx-auto mb-4'>
          <div className='relative flex items-center w-fit mx-auto'>
            <div className='absolute left-6 text-gray-400 text-xl'>@</div>
            <input
              type='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full md:w-[380px] h-[70px] pl-[50px] pr-24 rounded-full bg-white border border-gray-100
              text-[18px] placeholder:text-gray-400 focus:outline-none focus:border-[#2424f9]
              transition-colors'
            />
            <button
              className='absolute right-2 w-[58px] h-[58px] bg-[#2424f9] rounded-full flex items-center
              justify-center hover:bg-[#2424f9]/90 transition-colors'
            >
              <ArrowRight className='w-5 h-5 text-white -rotate-45' />
            </button>
          </div>
        </div>

        <p className='text-gray-500 text-[13px]'>
          Unsubscribe at any time.
        </p>
      </div>

      {/* Sliding Logos */}
      <div className='w-full overflow-hidden relative'>
        <div className='absolute left-0 w-[150px] h-full bg-gradient-to-r from-white to-transparent z-10'></div>
        <div className='absolute right-0 w-[150px] h-full bg-gradient-to-l from-white to-transparent z-10'></div>
        <motion.div
          className='flex gap-16 items-center'
          animate={{
            x: [0, -1920]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-[120px] h-[40px] relative grayscale opacity-50'
            >
              <img
                src={logo}
                alt={`Brand logo ${(index % brandLogos.length) + 1}`}
                className='w-full h-full object-contain'
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;
