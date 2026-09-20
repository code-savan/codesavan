import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { SiteJsonLd } from '@/components/JsonLd';

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
    <html lang="en">
      <body className={manrope.className}>
        <SiteJsonLd />
        <div className="relative w-full mx-auto ">
          {children}
        </div>
      </body>
    </html>
  );
}
