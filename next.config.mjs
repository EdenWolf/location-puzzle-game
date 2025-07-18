/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configure basePath if your GitHub Pages site is deployed to a subfolder
  // basePath: '/location-puzzle-game',
};

export default nextConfig;
