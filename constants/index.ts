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
  {
    color: getTextColor('#FF5733'), // Dynamically set text color based on background color brightness
    backgroundColor: '#FF5733',
  },
  {
    color: getTextColor('#33FF57'),
    backgroundColor: '#33FF57',
  },
  {
    color: getTextColor('#5733FF'),
    backgroundColor: '#5733FF',
  },
  {
    color: getTextColor('#FFD700'),
    backgroundColor: '#FFD700',
  },
  {
    color: getTextColor('#00FFFF'),
    backgroundColor: '#00FFFF',
  },
];

// CHAT GPT STUFF
function getTextColor(backgroundColor: string) {
  const rgb = hexToRgb(backgroundColor);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  
  // Return dark color for bright backgrounds and light color for dark backgrounds
  return brightness > 150 ? '#000000' : '#FFFFFF';
}

function hexToRgb(hex: string) {
  // Remove the hash (#) if it exists
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
