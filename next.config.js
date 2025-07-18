/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable styled-components with better debugging in development
  compiler: {
    styledComponents: true
  },
  // These settings are only used when building for static export
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    basePath: '/location-puzzle-game',
    assetPrefix: '/location-puzzle-game/',
    trailingSlash: true,
    images: { unoptimized: true }
  } : {})
};

module.exports = nextConfig;
