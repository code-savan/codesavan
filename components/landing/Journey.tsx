'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const timelineYears = ['2024', '2023', '2022', '2021', '2020', '2019'];

const journeyData = [
  {
    role: 'Web/IT Executive',
    company: 'BritishAUC',
    period: '2024 - Current'
  },
  {
    role: 'No-Code Developer',
    company: 'ICIR',
    period: '2021 - 2023'
  },
  {
    role: 'Full-Stack Developer',
    company: 'KSolutions',
    period: '2014 - 2021'
  }
];

const Journey = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-start px-2 md:px-0 mx-auto py-[90px]'>
      {/* Timeline Years */}
      <div className="w-full flex items-center gap-2 mb-10">
        <div className="flex items-center justify-between w-full relative">
          {/* Dots and years */}
          {timelineYears.map((year, index) => (
            <motion.div
              key={year}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {index > 0 && (
                <motion.div
                  className="h-3 mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full relative transition-colors
                    ${index === 1 ? 'bg-gray-300' :
                      index === 2 ? 'bg-gray-200' :
                      index === 3 ? 'bg-gray-100 opacity-70' :
                      'bg-gray-100 opacity-30'}`}
                  />
                </motion.div>
              )}
              <motion.span
                className={`transition-all
                ${index === 0 ? 'text-black font-bold text-[45px] md:text-[64px]' :
                  index === 1 ? 'text-gray-400 text-lg' :
                  index === 2 ? 'text-gray-300 text-lg' :
                  index === 3 ? 'text-gray-200 text-lg' :
                  'text-gray-100 text-lg'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
              >
                {year}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Journey Title */}
      <div className="text-left w-full mb-4">
        <motion.h2
          className="text-[26px] font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Journey
        </motion.h2>
        <motion.p
          className="text-[#8b8b8b] text-[18px] font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore the milestones and experiences that have <br className='hidden md:block' /> shaped my career, year by year.
        </motion.p>
      </div>

      {/* Journey Items */}
      <div className="w-full space-y-3 md:space-y-5">
        {journeyData.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 border-b border-gray-200 last:border-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="flex flex-col leading-tight md:leading-normal"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <h3 className="text-[18px] font-bold mb-2">{item.role}</h3>
              <p className="text-[14px] font-medium text-gray-600">{item.company}</p>
            </motion.div>
            <motion.p
              className="text-[#8b8b8b] text-[18px] font-medium"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {item.period}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Contact Button */}
      <Link href="#contact">
        <motion.button
          className="text-white rounded-[30px] pl-[30px] pr-[4px] h-[58px] bg-[#2424f9] hover:bg-[#3c3cfb] transition-colors duration-300 flex items-center justify-between group"
          initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        Contact Me
        <div className='w-[52px] h-[52px] ml-[15px] bg-white rounded-full flex items-center justify-center'>
            <ArrowRight className='w-[20px] h-[20px] text-[#2a29ff] -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out' />
        </div>
      </motion.button>
      </Link>
    </div>
  );
};

export default Journey;
