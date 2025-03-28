'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const Success = () => {
  return (
    <div className='relative h-[450px] md:h-[600px] w-[98%] md:full mx-auto rounded-[35px]
    shadow-md overflow-hidden px-2 md:px-0 md:mt-16'>
      {/* Background Image */}
      <Image
        src="/profile.jpeg"
        alt="Laptop with coffee"
        fill
        className='object-cover'
        priority
      />

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full p-12 pb-16'>
        <h2 className='text-white md:text-[50px] text-[40px] font-medium leading-[1.1] mb-4 text-center'>
          Your success <br className='hidden md:block' />is my goal
        </h2>

        <p className='text-white/80 text-[17px] mb-8 max-w-[500px] text-center'>
          I&apos;ve worked with 20 clients to build <br className='hidden md:block' /> impactful websites that drive results
        </p>

        <Link href="#contact">
        <motion.button
                        className="text-white rounded-[30px] pl-[30px] pr-[4px] h-[58px] bg-[#2424f9] hover:bg-[#3c3cfb] transition-colors duration-300 flex items-center justify-between group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get Started
                        <div className='w-[52px] h-[52px] ml-[15px] bg-white rounded-full flex items-center justify-center'>
                            <ArrowRight className='w-[20px] h-[20px] text-[#2a29ff] -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out' />
                        </div>
                    </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
