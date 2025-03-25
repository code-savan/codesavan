'use client';

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { portfolioProjects } from '@/constants'
import Image from 'next/image'

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
            {portfolioProjects.slice(0, 4).map((project, index) => (
                <motion.div
                    key={project.key}
                    className={`rounded-[40px] md:h-[400px] h-[350px] w-full overflow-hidden cursor-pointer group
                              sticky top-[80px] `}
                    style={{
                        zIndex: index + 1,
                        marginBottom: '10px'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        {/* <div className="absolute inset-0 " /> */}
                    </div>

                    {/* Content */}
                    <motion.div
                        className='w-full h-full flex flex-col justify-end p-2 '
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                    >
                        <div className="flex justify-between bg-white rounded-[40px] p-1 items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-[54px] h-[54px] relative rounded-full overflow-hidden flex justify-center items-center bg-blue-500">
                                    <Image
                                        src={project.logoImage}
                                        alt={project.title}
                                        className="object-contain w-[50%] h-[50%]"
                                        width={20}
                                        height={20}
                                    />
                                </div>

                                <div className="">
                                    <p className="font-semibold text-[16px] text-[#171717]">{project.title}</p>
                                    <p className="text-gray-700 text-[14px] leading-tight font-medium">{project.category}</p>
                                </div>
                            </div>

                            <div className="w-[54px] h-[54px] bg-[#f6f6f6] rounded-full flex justify-center items-center">
                                <ArrowRight className='w-[20px] h-[20px] text-black -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out' />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </section>
    </div>
  )
}

export default Work
