'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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


    </div>
  );
};

export default Newsletter;
