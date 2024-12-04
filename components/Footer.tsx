"use client";

import { FooterLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowFooter(true);

      const timeout = setTimeout(() => setShowFooter(false), 3000);
      return () => clearTimeout(timeout); // Cleanup
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove); // Cleanup
  }, [pathname]);

  return (
      <main className={`flex gap-16 items-center p-2 w-max mx-auto bg-gray-800/50 rounded-3xl backdrop-blur-sm transition-opacity duration-300 
        ${showFooter ? "opacity-100" : "opacity-0"}`}>
        {FooterLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            <div
              className={`flex p-2 rounded-2xl items-center justify-center ${
                link.href === pathname
                  ? "bg-purple-700 shadow-purple-700 shadow-sm"
                  : ""
              }`}
            >
              <link.icon size={22} className='text-white' />
            </div>
          </Link>
        ))}
      </main>
  );
};

export default Footer;
