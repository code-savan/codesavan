'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className='flex flex-col items-center text-center px-4 md:px-0 py-[90px]' id='contact'>
      {/* Profile Section */}
      <div className='mb-8'>
        <div className='w-[80px] h-[80px] rounded-full overflow-hidden mx-auto mb-4'>
          <Image
            src="/profile.jpeg"
            alt="Code Savan"
            width={80}
            height={80}
            className='object-cover'
          />
        </div>
        <h2 className='text-[24px] font-medium mb-1'>Code Savan</h2>
        <p className='text-[17px] text-gray-500 mb-4'>Web-designer, developer</p>

        {/* Social Links */}
        <div className='flex items-center justify-center gap-3'>
          <Link href="https://twitter.com" target="_blank" className='w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'>
            <Twitter className='w-5 h-5 text-gray-600' />
          </Link>
          <Link href="https://instagram.com" target="_blank" className='w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'>
            <Instagram className='w-5 h-5 text-gray-600' />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className='w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'>
            <Linkedin className='w-5 h-5 text-gray-600' />
          </Link>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='w-full bg-white rounded-[35px] p-8 md:p-12'>
        <h1 className='text-[49px] font-medium mb-3'>Contact</h1>
        <p className='text-[17px] text-gray-600 mb-8'>
          Fill out the form, or reach out directly.<br />
          I'll respond within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <div className='absolute left-6 top-1/2 -translate-y-1/2'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.6 2.4C12.2 1 10.2 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className='w-full h-[70px] bg-gray-50 rounded-full pl-[50px] pr-6 text-[17px]
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20'
            />
          </div>

          <div className='relative'>
            <div className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400'>@</div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className='w-full h-[70px] bg-gray-50 rounded-full pl-[50px] pr-6 text-[17px]
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20'
            />
          </div>

          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className='w-full h-[180px] bg-gray-50 rounded-[25px] p-6 text-[17px]
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 resize-none'
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className='w-full h-[70px] bg-[#2424f9] text-white rounded-full text-[17px]
              hover:bg-[#2424f9]/90 transition-colors disabled:opacity-70'
          >
            Send message
          </button>
        </form>

        {/* Contact Info */}
        <div className='mt-12 text-center'>
          <p className='text-[17px] text-gray-600 mb-4'>Let's chat!</p>
          <p className='text-[20px] font-medium mb-2'>+ (234) 90 4614 3330</p>
          <p className='text-[20px] font-medium mb-12'>codesavan@proton.me</p>
          <p className='text-[15px] text-gray-500'>© Copyright 2024. All rights Reserved.</p>
        </div>
      </div>

      {/* Created By */}
      <div className='mt-8 flex items-center justify-center gap-2'>
        <span className='text-gray-500'>Created by</span>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 rounded-full overflow-hidden'>
            <Image
              src="/profile.jpeg"
              alt="Code Savan"
              width={24}
              height={24}
              className='object-cover'
            />
          </div>
          <span className='font-medium'>Code Savan</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
