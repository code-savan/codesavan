'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: '⚡️',
    title: 'Web Design',
    description: 'Crafting visually appealing, user-friendly designs that reflect your brand. From wireframes to final prototypes, every detail is considered.'
  },
  {
    icon: '{ }',
    title: 'Web Development',
    description: 'Building functional, No-Code/FullStack websites that are easy to manage and optimized for performance across devices.'
  },
  {
    icon: '💎',
    title: 'Brand Identity',
    description: 'Crafting cohesive visual branding, including logos, color palettes, and typography, to establish a strong brand presence.'
  },
  {
    icon: '🎨',
    title: 'UX/UI Design',
    description: 'Designing intuitive user interfaces and seamless user experiences to enhance engagement and usability.'
  },
  {
    icon: '📊',
    title: 'Consultation Services',
    description: 'Providing expert advice and actionable insights to help you plan and execute your design projects effectively.'
  }
];

const Services = () => {
  return (
    <div className='mx-auto px-2 md:px-4'>
      <div className='flex flex-col gap-4 justify-center items-center py-[90px]'>
        <motion.p
          className='text-[50px] font-bold mx-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My services
        </motion.p>
        <motion.p
          className='text-gray-500 text-[17px] leading-tight font-medium text-center mb-[20px]'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here's how I can help <br />bring your vision to life:
        </motion.p>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full md:space-y-4 space-y-2"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="border-b border-gray-200"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-4 md:py-8 text-left">
                    <motion.div
                      className="flex items-center gap-6"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-3xl">{service.icon}</span>
                      <span className="text-2xl font-medium">{service.title}</span>
                    </motion.div>
                    <motion.div
                      className="h-8 w-8 flex items-center justify-center"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="h-4 w-4 transition-transform group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 transition-transform hidden group-data-[state=open]:block" />
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <motion.div
                    className="pb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default Services;
