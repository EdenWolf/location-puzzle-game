'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import puzzles from '../../data/puzzles';
import GameContainer from '../../components/pages/GameContainer';
import styled from 'styled-components';

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

export default function PuzzlePage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
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
  
  // Render the GameContainer component which will handle the puzzle based on the URL slug
  return <GameContainer />;
}
