import { Home, NotebookIcon, Settings } from "lucide-react";

export const FooterLinks = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Create Note',
    href: '/dashboard/new',
    icon: NotebookIcon,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export const TitleColors = [
  'bg-green-600',
  'bg-yellow-600',
  'bg-red-600',
  'bg-purple-600',
  'bg-pink-600',
]