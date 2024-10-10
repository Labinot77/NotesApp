"use client"

import { usePathname } from 'next/navigation'
import { FooterLinks } from '@/constants'

const Navbar = () => {
  const pathname = usePathname()

  const currentPage = FooterLinks.find((link) => link.href === pathname)


  return (
    <nav className='p-4 flex items-center justify-start rounded-t-3xl backdrop-blur-3xl'>
        <p className='text-2xl font-bold text-neutral-600 dark:text-white'>{currentPage?.name}</p>
    </nav>
  )
}

export default Navbar