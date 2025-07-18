/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/location-puzzle-game' : '',
  images: { unoptimized: true }
}
