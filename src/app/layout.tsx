import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from 'sonner'; // Ensure this import path matches your project structure

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cloudinary Oktopost Tagging',
  description: 'Tagging Cloudinary Posts on Oktopost',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <style>{inter.className}</style>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
        <Toaster /> {/* Include Toaster component here */}
      </body>
    </html>
  );
}
