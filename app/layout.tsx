import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const manrope = Manrope({
    subsets: ['latin'], // Specify the character subset
    weight: ['200', '300', '400', '500', '600', '700', '800'], // Specify weights
  });

export const metadata: Metadata = {
  title: 'Code Savan - Web Designer & Developer',
  description: 'Professional web design and development services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <div className="relative md:w-[550px] w-full mx-auto ">
            {/* Fixed header for auth controls - only visible on non-auth pages */}
            {/* <SignedOut>
              <div className="fixed top-4 right-4 z-50 flex space-x-3">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut> */}

            {/* User button shown when signed in */}
            {/* <SignedIn>
              <div className="flex items-center space-x-3">
                <Link href="/admin" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full hover:bg-gray-100 transition-colors">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn> */}

            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
