"use client"

import { FooterLinks } from '@/constants'
import { Camera } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathname = usePathname()

  return (
    <div className='absolute bottom-0 w-full p-2'>
    <main className='flex justify-between items-center p-2 w-[95%] mx-auto bg-gray-800/50 rounded-3xl backdrop-blur-sm '>
      {FooterLinks.map((link, index) => (
        <Link key={index} href={link.href}>
          <div className={`flex p-2 rounded-full items-center justify-center ${link.href === pathname ? "bg-purple-700" : "" }`}>
            <Camera size={20} className='text-white' />
            <p className="text-white ml-2 ">{link.name}</p>
          </div>
        </Link>
      ))}
    </main>
    </div>
  )
}

export default Footer