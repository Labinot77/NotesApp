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