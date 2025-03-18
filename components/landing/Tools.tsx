'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Tools = () => {
  return (
    <div className='flex flex-col gap-4 py-[90px] justify-center items-center px-2 md:px-0'>
      <motion.p
        className='text-gray-500 text-[14px] font-medium leading-tight'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Proudly work with:
      </motion.p>
    </div>
  )
}

export default Tools
