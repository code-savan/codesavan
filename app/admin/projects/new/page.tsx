// @ts-nocheck
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { X, Upload, Loader, Calendar, ArrowUpRight, ExternalLink, ArrowLeft, User, Layers, CalendarCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';
// @ts-ignore - Import NotionLikeEditor dynamically to avoid type errors
import NotionLikeEditor from '@/components/notion-like-editor';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    client: 'Framer Inc.',
    category: 'Web design, Framer',
    date: new Date('2024-10-11'),
    websiteUrl: '',
    body: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
  });

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date,
      }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      body: content,
    }));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload a project image');
      return;
    }

    if (!formData.title || !formData.client || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // First, upload the image
      const imageData = new FormData();
      imageData.append('file', image);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: imageData,
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload image');
      }

      const { imageUrl } = await uploadRes.json();

      // Then, create the project with the image URL
      const projectData = {
        title: formData.title,
        subtitle: formData.subtitle,
        client: formData.client,
        image: imageUrl,
        category: formData.category.split(',').map(cat => cat.trim()),
        date: format(formData.date, 'MMMM dd, yyyy'),
        links: {
          website: formData.websiteUrl || undefined,
        },
        body: formData.body,
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        throw new Error('Failed to create project');
      }

      toast.success('Project created successfully!');

      // Redirect to projects list
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);

    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/admin/projects"
            className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-full bg-white  border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Project Card - Top Part with Image */}

          <div className="mb-8 rounded-[35px] px-2 bg-[#f6f6f6] py-6 border border-gray-200">
          <div className="rounded-[35px] overflow-hidden bg-white border border-gray-100 mb-8">
            {/* Project Image */}
            <div className="relative">
              {!imagePreview ? (
                <div
                  {...getRootProps()}
                  className={`relative aspect-[16/9] cursor-pointer ${
                    isDragActive ? 'bg-blue-50' : 'bg-[url("/bg.png")] bg-cover bg-center'
                  }`}
                >
                  <input {...getInputProps()} />
                  {/* <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Upload className="mx-auto h-12 w-12 text-white mb-4" />
                    <p className="text-base text-white font-medium">
                      Drop your project image here
                    </p>
                  </div> */}
                </div>
              ) : (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={imagePreview}
                    alt="Project preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Project Title - Only appears when image is uploaded */}
                  {/* <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="relative">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Digital Design Studio"
                        className="w-full bg-transparent text-5xl font-bold text-yellow-300 border-none outline-none p-0 focus:ring-0 focus:border-0 placeholder-yellow-200/70"
                        required
                      />
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>

          {/* Client Card */}
          <div className="mb-2 rounded-[35px] h-fit overflow-hidden bg-white border border-gray-100 ">
            <div className="flex items-center p-2 pr-4">
              <div className="w-[60px] h-[60px] flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center mr-4">
                <User className='text-gray-400 w-5 h-5' />
              </div>
              <span className="text-[14px] text-gray-500 font-medium">Client</span>
              <div className="flex-grow"></div>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="text-right text-[16px] text-gray-900 overflow-hidden font-semibold bg-transparent border-none outline-none p-0 focus:ring-0 focus:border-0"
                required
              />
            </div>
          </div>

          {/* Category Card */}
          <div className="mb-2 rounded-[35px] h-fit overflow-hidden bg-white border border-gray-100 ">
            <div className="flex items-center p-2 pr-4">
              <div className="w-[60px] h-[60px] flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center mr-4">
                <Layers className='text-gray-400 w-5 h-5' />
              </div>
              <span className="text-[14px] text-gray-500 font-medium">Category</span>
              <div className="flex-grow"></div>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="text-right text-[16px] overflow-hidden text-gray-900 font-semibold bg-transparent border-none outline-none p-0 focus:ring-0 focus:border-0"
                required
              />
            </div>
          </div>

          {/* Date Card */}
          <div className="mb-2 rounded-[35px] h-fit overflow-hidden bg-white border border-gray-100 ">
            <div className="flex items-center p-2 pr-4">
              <div className="w-[60px] h-[60px] flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center mr-4">
                <Calendar className='text-gray-400 w-5 h-5' />
              </div>
              <span className="text-[14px] text-gray-500 font-medium">Date</span>
              <div className="flex-grow"></div>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="MMM d, yyyy"
                className="text-right text-[16px] overflow-hidden text-gray-900 font-semibold bg-transparent border-none outline-none p-0 focus:ring-0 focus:border-0"
              />
            </div>
          </div>

          {/* Visit Website Card */}
          <div className="mt-4">
            <div className="py-1 px-4">
              <div className="flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center text-gray-900 hover:text-blue-600 text-[14px] font-medium transition-colors"
                  onClick={() => {
                    if (formData.websiteUrl) {
                      window.open(formData.websiteUrl, '_blank');
                    } else {
                      // Prompt for URL if not set
                      const url = window.prompt('Enter website URL');
                      if (url) {
                        setFormData(prev => ({...prev, websiteUrl: url}));
                      }
                    }
                  }}
                >
                  Visit website
                  <svg className="ml-2 w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          </div>


        {/* Second part */}
          <div className='mt-20'>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="text-left text-[35px] text-gray-900 font-semibold bg-transparent border-none outline-none p-0 focus:ring-0 focus:border-0 placeholder:text-gray-800 placeholder:uppercase"
            />

          </div>

          {/* Third part - Rich Text Editor */}
          <div className='mt-10'>
            <NotionLikeEditor
              content={formData.body}
              // @ts-ignore
              onChange={(content) => handleEditorChange(content)}
              placeholder="Type / to browse options"
            />
          </div>

          {/* Submit Button */}
          <div className="flex mt-16">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Saving project...</span>
                </>
              ) : (
                <span>Create Project</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
