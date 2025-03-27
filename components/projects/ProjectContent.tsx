'use client';

import { motion } from 'framer-motion';
import { portfolioProjects } from '@/constants';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { ArrowLeft, ArrowRight, Github, Link as LinkIcon, Calendar, Tag, Folder } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Project {
  key: string;
  title: string;
  logoImage: string;
  logoColor: string;
  image: string;
  projectLink: string;
  client: string;
  category: string;
  type: string;
  date: string;
  website: string;
  description: string;
  desImages: string[];
  year: string;
  technologies: string[];
  features: string[];
  github?: string;
  liveUrl?: string;
}

export default function ProjectContent({ slug }: { slug: string }) {
  const project = portfolioProjects.find(p => p.key === slug) as Project | undefined;
  const [introduction, setIntroduction] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      const lines = project.description.split('\n').filter(line => line.trim() !== '');

      // First line is the introduction
      if (lines.length > 0) {
        setIntroduction(lines[0].trim());
      }

      const extractedQuestions: string[] = [];
      const extractedAnswers: string[] = [];

      // Process remaining lines
      for (let i = 1; i < lines.length; i += 2) {
        if (i < lines.length) {
          extractedQuestions.push(lines[i].trim());
        }

        if (i + 1 < lines.length) {
          extractedAnswers.push(lines[i + 1].trim());
        }
      }

      setQuestions(extractedQuestions);
      setAnswers(extractedAnswers);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-blue-600 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative h-[60vh] md:h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Back Button */}
        <Link
          href="/projects"
          className="absolute top-4 md:top-8 left-4 md:left-8 flex items-center gap-2 text-white hover:text-gray-200 transition-colors z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm md:text-base">Back to Projects</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-full w-full"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div
              className="w-[48px] h-[48px] md:w-[54px] md:h-[54px] relative rounded-full overflow-hidden flex justify-center items-center"
              style={{ backgroundColor: project.logoColor }}
            >
              <Image
                src={project.logoImage}
                alt={project.title}
                fill
                className="object-contain p-2"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mt-2 md:mt-0">{project.title}</h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-gray-200 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{project.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{project.category}</span>
            </div>
          </div>

          {/* Project Links */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mt-6 md:mt-8 px-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-black/80 text-white text-sm md:text-base rounded-full hover:bg-black transition-colors border border-white/20"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
                <span>GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/80 text-black text-sm md:text-base rounded-full hover:bg-white transition-colors border border-white/20"
              >
                <LinkIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Project Details */}
      <section className="w-full py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Project Info Bar */}
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-8">
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">Client</span>
              <span className="text-xl font-medium">{project.client}</span>
            </div>

            <div className="flex flex-col mb-4 md:mb-0">
              <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">Category</span>
              <span className="text-xl font-medium">{project.category}</span>
            </div>

            <div className="flex flex-col mb-4 md:mb-0">
              <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">Date</span>
              <span className="text-xl font-medium">{project.date}</span>
            </div>

            {project.website && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">Website</span>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                >
                  Visit Site
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Introduction and first two images */}
          <div className="mb-20">
            <p className="text-[16px] text-gray-700 mb-16 leading-relaxed md:max-w-[50%] mx-auto">{introduction}</p>

            {project.desImages.length >= 2 && (
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={project.desImages[0]}
                    alt={`${project.title} image 1`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={project.desImages[1]}
                    alt={`${project.title} image 2`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* First question-answer pair with image */}
          {questions.length > 0 && answers.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4 mt-20 md:max-w-[50%] mx-auto">{questions[0]}</h3>
              <p className="text-gray-700 mb-20 leading-relaxed md:max-w-[50%] mx-auto">{answers[0]}</p>

              {project.desImages.length >= 3 && (
                <div className="relative h-[400px] md:h-[700px] rounded-xl overflow-hidden my-8">
                  <Image
                    src={project.desImages[2]}
                    alt={`${project.title} image 3`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Second question-answer pair with images */}
          {questions.length > 1 && answers.length > 1 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 mt-20 md:max-w-[50%] mx-auto">{questions[1]}</h3>
              <p className="text-gray-700 mb-20 leading-relaxed md:max-w-[50%] mx-auto">{answers[1]}</p>

              {project.desImages.length >= 5 && (
                <div className="grid md:grid-cols-2 gap-4 my-8">
                  <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
                    <Image
                      src={project.desImages[3]}
                      alt={`${project.title} image 4`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
                    <Image
                      src={project.desImages[4]}
                      alt={`${project.title} image 5`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other Projects Section */}
          <div className="mt-32 mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-16 text-center relative"
            >
              <span>Other Projects</span>
              <div className="absolute left-1/2 -bottom-4 w-16 h-1 bg-black transform -translate-x-1/2"></div>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioProjects
                .filter(p => p.key !== project.key)
                .slice(0, 3)
                .map((otherProject, index) => (
                  <motion.div
                    key={otherProject.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative rounded-3xl overflow-hidden bg-white h-[450px] shadow-lg hover:shadow-xl"
                  >
                    <Link href={`/projects/${otherProject.key}`}>
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-60"></div>

                      {/* Project Image */}
                      <div className="h-full w-full">
                        <Image
                          src={otherProject.image}
                          alt={otherProject.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: otherProject.logoColor }}
                          >
                            <Image
                              src={otherProject.logoImage}
                              alt={otherProject.title}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <span className="text-white/80 text-sm">{otherProject.category}</span>
                        </div>

                        <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                          {otherProject.title}
                        </h3>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            {otherProject.technologies.slice(0, 2).map((tech, idx) => (
                              <span key={idx} className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRight className="w-5 h-5 text-white/80" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Navigation />
    </div>
  );
}
