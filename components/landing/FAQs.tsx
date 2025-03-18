'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "I specialize in UX/UI design, web development, and branding for individuals and businesses."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary depending on complexity and scope. A typical website takes 2-4 weeks, while larger projects may take 6-8 weeks. I'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Can I request additional revisions?",
    answer: "Yes, I offer revision rounds as part of every project. We'll work together until you're completely satisfied with the final result."
  },
  {
    question: "What tools do you use for design?",
    answer: "I use industry-standard tools including Figma, Adobe Creative Suite, and modern web technologies like React, Next.js, and Tailwind CSS."
  },
  {
    question: "Is coding required to manage the designs you create?",
    answer: "No, I provide user-friendly content management systems that allow you to update your website without any coding knowledge."
  }
];

const FAQs = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-1 px-2 md:px-0 py-[90px] '>
      <p className='text-[#171717] text-center text-[50px] font-medium mb-16'>
        FAQ
      </p>

      <div className='w-full'>
        <Accordion.Root
          type="single"
          defaultValue="item-0"
          collapsible
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-[32px] overflow-hidden border border-gray-100"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex items-center justify-between w-full p-6 text-left">
                  <span className="text-[20px] font-medium text-[#171717]">
                    {faq.question}
                  </span>
                  <div className="relative w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                    <Plus className="w-5 h-5 text-[#171717] absolute group-data-[state=open]:opacity-0 transition-opacity" />
                    <Minus className="w-5 h-5 text-[#171717] absolute opacity-0 group-data-[state=open]:opacity-100 transition-opacity" />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="p-6 pt-0">
                  <p className="text-[18px] text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="text-center mt-10 leading-tight">
          <p className="text-gray-600 text-[13px] font-medium mb-1">
            Do you have any other questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-[#171717] text-[14px] font-medium hover:opacity-80
            transition-opacity group"
          >
            Ask me directly
            <ArrowRight className="w-4 h-4 ml-1 mt-1 -rotate-45 group-hover:rotate-0 text-[#2424f9] transition duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
