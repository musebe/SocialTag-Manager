'use client';
import React, { useState, useEffect } from 'react';

// Components
import Nav from './Nav';
import MobileNav from './MobileNav';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isShrunk
          ? 'py-4 bg-white shadow-lg dark:bg-accent'
          : 'py-6 dark:bg-transparent'
      } sticky top-0 z-30 transition-all ${pathname === '/' && 'bg-[#fef9f5]'}`}
    >
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-6'>
            {/* Desktop Navigation */}
            <Nav
              containerStyles='hidden xl:flex gap-x-8 items-center'
              linkStyles='relative hover:text-primary transition-all'
              underlineStyles='absolute left-0 top-full h-[2px] bg-primary w-full'
            />
            {/* Mobile Navigation */}
            <div className='xl:hidden'>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
