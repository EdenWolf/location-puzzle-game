/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Base path configured for GitHub Pages
  basePath: '/location-puzzle-game',
  // Setting asset prefix to match the GitHub Pages URL structure
  assetPrefix: '/location-puzzle-game',
};

export default nextConfig;
