'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import puzzles from '../../data/puzzles';
import GameContainer from '../../components/pages/GameContainer';

// This is the client component that handles the UI
export default function PuzzleClient({ slug }) {
  const router = useRouter();
  const params = useParams();
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [key, setKey] = useState(Date.now()); // Cache-busting key
  
  // Effect to handle puzzle navigation and force refresh
  useEffect(() => {
    // Find the current puzzle data
    const puzzle = puzzles.find(p => p.slug === slug);
    if (puzzle) {
      setCurrentPuzzle(puzzle);
      // Force a re-render with a new key when slug changes
      setKey(Date.now());
      
      // Force a hard refresh if we're on GitHub Pages to avoid cache issues
      if (typeof window !== 'undefined' && 
          window.location.hostname.includes('github.io') && 
          localStorage.getItem('lastSlug') !== slug) {
        localStorage.setItem('lastSlug', slug);
        // Use a timeout to ensure the state updates first
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  }, [slug]);
  
  // Validate if the slug exists in puzzles
  const puzzleExists = puzzles.some(puzzle => puzzle.slug === slug);
  
  // If slug doesn't exist, show an error with a button to return to the first puzzle
  if (!puzzleExists) {
    return (
      <ErrorContainer>
        <ErrorTitle>Invalid Puzzle Key</ErrorTitle>
        <ErrorMessage>
          The puzzle key &quot;{slug}&quot; does not exist. Please return to the beginning of the adventure.
        </ErrorMessage>
        <ReturnButton onClick={() => router.push(`/${puzzles[0].slug}`)}>
          Return to Start
        </ReturnButton>
      </ErrorContainer>
    );
  }
  
  // Render the GameContainer component with a key to force re-render on puzzle change
  return <GameContainer key={key} />;
}

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const ReturnButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;
