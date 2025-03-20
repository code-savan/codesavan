'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Users, Mail, Settings, ChevronRight, Briefcase, Folder } from "lucide-react";

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const { userId } = useAuth();
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  useEffect(() => {
    // Fetch project count on mount
    const fetchProjectCount = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const projects = await res.json();
          setProjectCount(projects.length);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchProjectCount();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 text-lg font-bold">{user?.firstName?.charAt(0) || 'A'}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-1 text-gray-900">Welcome, {user?.firstName || 'Admin'}</h1>
            <p className="text-sm text-gray-600">
              Manage your website content here
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 p-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-blue-900 mb-1">Projects</h3>
              <p className="text-2xl font-bold text-blue-700">
                {isLoadingCount ? (
                  <span className="inline-block w-10 h-6 bg-blue-200 rounded animate-pulse"></span>
                ) : (
                  projectCount || '0'
                )}
              </p>
            </div>
            <div className="p-2 bg-blue-200 rounded-lg">
              <Briefcase className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              href="/admin/projects"
              className="inline-flex items-center text-xs font-medium text-blue-700 hover:text-blue-800 transition-colors"
            >
              Manage Projects
              <ChevronRight className="ml-1 w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 p-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-purple-900 mb-1">Blog Posts</h3>
              <p className="text-2xl font-bold text-purple-700">0</p>
            </div>
            <div className="p-2 bg-purple-200 rounded-lg">
              <FileText className="w-4 h-4 text-purple-700" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              href="/admin/blog"
              className="inline-flex items-center text-xs font-medium text-purple-700 hover:text-purple-800 transition-colors"
            >
              Manage Blog
              <ChevronRight className="ml-1 w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/admin/projects/new"
            className="flex flex-col p-3 rounded-lg border border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50 shadow-sm hover:shadow transition-all duration-300"
          >
            <div className="p-2 bg-blue-100 rounded-md w-fit mb-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-medium text-sm">New Project</h3>
            <p className="text-xs text-gray-500 mt-1">Add portfolio item</p>
          </Link>

          <Link
            href="/admin/blog/new"
            className="flex flex-col p-3 rounded-lg border border-gray-200 hover:border-purple-200 bg-white hover:bg-purple-50 shadow-sm hover:shadow transition-all duration-300"
          >
            <div className="p-2 bg-purple-100 rounded-md w-fit mb-2">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-medium text-sm">New Blog Post</h3>
            <p className="text-xs text-gray-500 mt-1">Write article</p>
          </Link>
        </div>
      </motion.div>

      {/* Recent Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5"
      >
        <h2 className="text-lg font-bold mb-3 text-gray-900">Recent Updates</h2>
        <div className="space-y-2">
          <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-100 rounded-md">
                <Folder className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Admin dashboard updated</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
          </div>
          <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-green-100 rounded-md">
                <Users className="w-3.5 h-3.5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Auth configured</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
