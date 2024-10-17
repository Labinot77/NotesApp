"use client"

import { FooterLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathname = usePathname()

  return (
    <div className='absolute bottom-0 w-full p-3 group'>
    <main className='flex gap-16 items-center p-2 w-max mx-auto bg-gray-800/50 rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 '>
      {FooterLinks.map((link, index) => (
        <Link key={index} href={link.href}>
          <div className={`flex p-2 rounded-2xl items-center justify-center  ${link.href === pathname ? "bg-purple-700 shadow-purple-700 shadow-sm " : "" }`}>
            <link.icon size={22} className='text-white' />
          </div>
        </Link>
      ))}
    </main>
    </div>
  )
}

export default Footer