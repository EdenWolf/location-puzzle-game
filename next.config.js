/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  // GitHub Pages configuration
  basePath: '',
  assetPrefix: './',
  // Ensures the application works on GitHub Pages
  trailingSlash: true
}
