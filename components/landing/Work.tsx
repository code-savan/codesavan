'use client';

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Work = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center px-2 md:px-0 py-[100px]' id='work'>
        <motion.p
            className='text-[50px] font-bold'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            My work
        </motion.p>
        <motion.p
            className='text-gray-500 text-[17px] leading-tight font-medium text-center mb-[20px]'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            Check out some of my favorite <br /> & most recent projects.
        </motion.p>

        <section className='flex flex-col gap-4 w-full relative min-h-[1200px]'>
            {[1, 2, 3].map((_, index) => (
                <motion.div
                    key={index}
                    className={`rounded-[40px] md:h-[400px] h-[350px] w-full bg-gray-500 p-[6px] flex flex-col justify-end cursor-pointer group
                              sticky top-[80px]`}
                    style={{
                        zIndex: index + 1,
                        marginBottom: '10px'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <motion.div
                        className='w-full bg-white rounded-[40px] p-[6px] flex justify-between'
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                    >
                        <div className="flex gap-3 items-center">
                            <div className="w-[54px] h-[54px] bg-purple-500 rounded-full">
                            </div>

                            <div className="">
                                <p className="font-medium text-[16px]">Project {index + 1}</p>
                                <p className="text-gray-500 text-[14px] leading-tight font-medium">Sub Project Description</p>
                            </div>
                        </div>

                        <div className="w-[54px] h-[54px] bg-[#f6f6f6] rounded-full flex justify-center items-center">
                            <ArrowRight className='w-[20px] h-[20px] text-black -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out' />
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </section>
    </div>
  )
}

export default Work
