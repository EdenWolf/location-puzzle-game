// Dark theme definition for the location puzzle game

const theme = {
  colors: {
    background: '#121212',
    surface: '#1e1e1e',
    surfaceLight: '#2d2d2d',
    primary: '#6200ee',
    primaryLight: '#8133ff', 
    secondary: '#03DAC6',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textHint: '#9e9e9e',
    error: '#CF6679',
    warning: '#ffab40',
    success: '#4CAF50',
    border: '#333333',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSizes: {
      small: '0.875rem',
      body: '1rem',
      subtitle: '1.125rem',
      title: '1.5rem',
      heading: '2rem',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '0.75rem',
  },
  transitions: {
    short: '0.2s',
    medium: '0.3s',
    long: '0.5s',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
};

export default theme;
