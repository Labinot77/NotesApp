/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "utfs.io", "lh3.googleusercontent.com"],
    unoptimized: true,
  },
};

export default nextConfig;
