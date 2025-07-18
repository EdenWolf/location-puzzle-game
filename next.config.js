/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  // GitHub Pages configuration
  basePath: '/location-puzzle-game',
  assetPrefix: '/location-puzzle-game/',
  // Ensures the application works on GitHub Pages
  trailingSlash: true
}
