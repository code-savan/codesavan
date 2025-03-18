'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

const Stats = () => {
  return (
    <div className='flex flex-col gap-1 px-2 md:px-0'>
      {/* Years of Experience - Full Width */}
      <motion.div
        className='bg-white rounded-[40px] p-8 flex gap-1 items-end border w-full'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-start gap-1'>
          <span className='text-[100px] font-bold leading-none'>6</span>
          <span className='text-[#2424f9] text-4xl font-bold mt-1'>+</span>
        </div>
        <div className='space-y-1 mb-3'>
          <p className='text-gray-500 text-[14px] font-medium'>Years of experience</p>
          <p className='text-gray-800 text-[14px] font-medium'>in design and development</p>
        </div>
      </motion.div>

      <div className='relative grid md:grid-cols-2 gap-1'>
        {/* Circle with Check Mark */}
        <div
          className='absolute w-[40px] h-[40px] bg-[#00000063] backdrop-blur-lg rounded-full
          flex items-center justify-center z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
        //   initial={{ scale: 0 }}
        //   whileInView={{ scale: 1 }}
        //   transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="w-full bg-transparent">
          <motion.div
           className='flex items-center justify-center w-full h-full'
             initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
           >
            <Check className='w-5 h-5 text-white' />
            <Check className='w-5 h-5 text-white -ml-[11px]' />
          </motion.div>
            </div>
        </div>

        {/* Analytics Image Card */}
        <motion.div
          className='bg-white rounded-[40px] h-[273px] md:w-[273px] border overflow-hidden'
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/analytics.avif"
            alt="Analytics Dashboard"
            width={300}
            height={300}
            className='w-full h-[273px] object-fill object-center'
          />
        </motion.div>

        {/* Client Satisfaction Card */}
        <motion.div
          className='bg-[#2424f9] rounded-[40px] h-[271px] md:w-[271px] p-8 relative overflow-hidden'
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Dot Pattern Background */}
          <div className='absolute top-4 right-6 left-6 flex flex-wrap gap-1'>
            {[...Array(168)].map((_, index) => (
              <div
                key={index}
                className='w-1 h-1 rounded-full bg-[#2affff]'
              />
            ))}
          </div>

          {/* Content */}
          <div className='relative z-10 h-full flex flex-col justify-end'>
            <div className='flex items-end text-white mb-2'>
              <span className='text-[60px] font-medium leading-none'>95</span>
              <span className='text-4xl font-medium mt-4'>%</span>
            </div>
            <div className='space-y-1 text-medium leading-tight'>
              <p className='text-[14px] text-white/70'>Client satisfaction rate</p>
              <p className='text-[14px] text-white'>built on trust and results.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
