'use client';

import Image from 'next/image';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Map, Star } from 'lucide-react';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="relative min-h-screen flex-col items-center justify-center overflow-hidden px-2 md:px-0" id='hero'>
        {/* handle  */}
        <motion.div
            className="w-fit mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-[53px] md:h-[93px] h-[30px] bg-[#2a28ff] mx-auto"></div>
            <div className="w-[63px] h-[44px] bg-[#171717] rounded-[6px] shadow-md shadow-slate-500"></div>
            <div className="w-[31px] h-[26px] bg-[#171717] rounded-b-[4px] shadow-md mx-auto"></div>
        </motion.div>

        <motion.div
            className="border rounded-[40px] border-gray-200/50 bg-[#f6f6f6] pt-[22px] px-[4px] md:px-[9px] pb-[12px] -mt-[4px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className='rounded-[30px] bg-white py-[30px] md:px-[50px] px-[20px] shadow-lg'>
                {/* first 3 lines...  */}
                <motion.div
                    className="flex gap-2 mb-[50px]"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="rounded-full w-full h-[4px] bg-[#a0f34a]"></div>
                    <div className="rounded-full w-full h-[4px] bg-[#a0f34a]"></div>
                    <div className="rounded-full w-full h-[4px] bg-[#efefef]"></div>
                </motion.div>

                {/* user Info  */}
                <motion.div
                    className='flex md:flex-row flex-col-reverse justify-between mb-[30px] md:mb-0'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className='flex gap-4'>
                        <Image src="/profile.png" className='rounded-full object-cover w-[60px] h-[60px]' alt="user" width={60} height={60} />
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-700 font-semibold text-[20px]'>@Codesavan</p>
                            <p className='text-sm text-gray-500 text-[13px]'>Full Stack Engineer, Developer</p>
                            <div className="flex gap-2 cursor-pointer opacity-65 mt-2">
                                <Image src="/x.svg" alt="facebook" width={20} height={20} />
                                <Image src="/instagram.svg" alt="instagram" width={20} height={20} />
                                <Image src="/linkedin.png" alt="twitter" width={20} height={20} />
                            </div>
                        </div>
                    </div>

                    {/* user projects  */}
                    <motion.div
                        className='md:mb-[90px] mb-[20px]'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <div className="flex gap-1 cursor-pointer items-start">
                            <div className='w-[10px] h-[10px] rounded-full mt-[3px] animate-pulse hover:bg-[#bdf787] bg-[#9ae752]' />
                            <div className='flex items-center md:flex-col'>
                                <p className='font-medium text-gray-700 text-[13px] leading-tight'>+10 Projects</p>
                                <p className='md:text-gray-500 text-gray-700 md:text-[12px] text-[13px] font-medium md:ml-[6px] ml-[3px] leading-tight'>this Month</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* user bio  */}
                <motion.p
                    className='text-medium md:font-bold font-semibold md:text-[63px] text-[40px] md:mb-[50px] mb-[30px] md:leading-[65px] leading-[40px]'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    I create websites that work as hard as you do
                </motion.p>

                {/* user rating  */}
                <motion.div
                    className="h-fit w-fit rounded-[30px] p-[8px] items-center bg-[#f6f6f6] flex gap-2 mb-[25px]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-[14px] h-[14px] text-yellow-400"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </div>

                    <p className='text-gray-700 text-[13px] font-medium leading-tight'>20+ Customers</p>
                </motion.div>

                <motion.p
                    className='font-medium text-gray-500 text-[18px] leading-tight mb-[40px]'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                >
                    I build designs that solve problems, <br /> inspire action, and drive success.
                </motion.p>

                <motion.div
                    className="flex mb-[30px] gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                >
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
                    <Link href="/projects">
                    <motion.button
                        className="text-gray-800 h-[58px] rounded-[30px] px-[20px] flex items-center justify-center bg-[#f6f6f6] font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        My Work
                    </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* location  */}
            <motion.div
                className='flex gap-2 ml-[55px] pt-[20px] pb-[8px]'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
            >
                <Coffee className='w-[14px] h-[14px] text-gray-700' />
                <p className='text-gray-500 text-[12px] font-medium leading-tight'>Located in <strong className='text-gray-700'>Abuja, Nigeria</strong>, available worldwide..</p>
            </motion.div>
        </motion.div>
    </section>
  );
}
