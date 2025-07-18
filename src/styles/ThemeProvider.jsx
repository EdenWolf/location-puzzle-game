'use client';

import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    min-height: 100vh;
  }
  
  * {
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight};
    }
  }
  
  button {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
  
  input {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surfaceLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textHint};
    }
  }
`;

export const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
