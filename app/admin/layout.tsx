'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';
import { X, Menu, LayoutDashboard, FolderKanban, FileText, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    // If Clerk has loaded and there's no user, redirect to sign-in
    if (isLoaded && !userId) {
      window.location.href = '/sign-in';
    } else if (isLoaded) {
      // Clerk has loaded and there is a user (or not), so we're done loading
      setIsLoading(false);
    }
  }, [isLoaded, userId]);

  // Show loading state while checking auth
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <header className="bg-white sticky top-0 z-20">
        <div className="admin-container mx-auto">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="font-bold text-xl">Code Savan</Link>

            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            />

            {/* Menu */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white shadow-xl z-40 p-6"
            >
              <div className="flex flex-col gap-3 mt-16">
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/admin/projects"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FolderKanban size={20} />
                  <span>Projects</span>
                </Link>
                <Link
                  href="/admin/blog"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText size={20} />
                  <span>Blog</span>
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="admin-container mx-auto py-6">
        {children}
      </main>
    </div>
  );
}
