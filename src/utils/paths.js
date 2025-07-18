// Path helpers for GitHub Pages compatibility

// Base path for GitHub Pages (repository name)
export const BASE_PATH = '/location-puzzle-game';

/**
 * Gets the correct asset path for both development and production (GitHub Pages) environments
 * This function is designed to work with static images in Next.js
 */
export const getAssetPath = (path) => {
  // Check for GitHub Pages domain
  const isGitHubPages = typeof window !== 'undefined' && 
    (window.location.hostname.includes('github.io') || 
     window.location.hostname.includes('github.dev'));
  
  // Apply the base path prefix if on GitHub Pages
  if (isGitHubPages) {
    return `${BASE_PATH}${path}`;
  }
  
  // For local development, just use the path as is
  return path;
};
