'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb, MessageSquare, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Web Design',
    description: 'Crafting visually appealing, user-friendly designs that reflect your brand. From wireframes to final prototypes, every detail is considered.'
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Web Development',
    description: 'Building functional, No-Code/FullStack websites that are easy to manage and optimized for performance across devices.'
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Brand Identity',
    description: 'Crafting cohesive visual branding, including logos, color palettes, and typography, to establish a strong brand presence.'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'UX/UI Design',
    description: 'Designing intuitive user interfaces and seamless user experiences to enhance engagement and usability.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Consultation Services',
    description: 'Providing expert advice and actionable insights to help you plan and execute your design projects effectively.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Here's how I can help bring your vision to life
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-xl bg-gray-50 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <div className="text-gray-900">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
