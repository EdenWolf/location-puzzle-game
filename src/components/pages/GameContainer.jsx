"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import puzzles from '../../data/puzzles';
import LocationDetector from '../LocationDetector';
import Puzzle from '../Puzzle';
import GameProgress from '../GameProgress';

export default function GameContainer() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  
  // Find current puzzle based on the URL path
  const getCurrentPuzzleFromPath = () => {
    // Extract the slug from the path
    const pathSegments = pathname.split('/');
    const currentSlug = pathSegments[pathSegments.length - 1] || '';
    
    // Find the puzzle with matching slug, default to first puzzle if none found
    const puzzleIndex = puzzles.findIndex(puzzle => puzzle.slug === currentSlug);
    return puzzleIndex >= 0 ? puzzleIndex : 0;
  };
  
  const currentPuzzleIndex = getCurrentPuzzleFromPath();
  const currentPuzzle = puzzles[currentPuzzleIndex];
  const gameComplete = currentPuzzle?.type === 'completion';
  
  useEffect(() => {
    // If no slug in URL (root path), redirect to the first puzzle
    if (pathname === '/') {
      router.replace(`/${puzzles[0].slug}`);
    }
    
    // If completion puzzle is reached, set completion time
    if (gameComplete && !completionTime) {
      setCompletionTime(new Date());
    }
  }, [pathname, router, gameComplete, completionTime]);
  
  // Handle puzzle solve
  const handlePuzzleSolved = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      // Navigate to the next puzzle using its slug
      const nextPuzzle = puzzles[currentPuzzleIndex + 1];
      router.push(`/${nextPuzzle.slug}`);
    }
  };
  
  // Handle location match
  const handleLocationMatch = (location) => {
    if (currentPuzzle.type === 'location') {
      handlePuzzleSolved();
    }
  };
  
  // Handle location updates
  const handleLocationUpdate = (location) => {
    setCurrentLocation(location);
  };
  
  // Handle game reset
  const resetGame = () => {
    setCompletionTime(null);
    router.push(`/${puzzles[0].slug}`);
  };

  if (!currentPuzzle) {
    return <div>Loading puzzle...</div>;
  }

  return (
    <PageContainer>
      <Header>
        <PageTitle>Location Puzzle Game</PageTitle>
        <PageSubtitle>Solve puzzles by finding real-world locations!</PageSubtitle>
      </Header>
      
      <MainContent>
        {gameComplete ? (
          <CompletionMessage>
            <CompletionTitle>Congratulations!</CompletionTitle>
            <CompletionInfo>You&apos;ve completed all the puzzles!</CompletionInfo>
            {completionTime && (
              <CompletionDate>
                Completed on: {completionTime.toLocaleDateString()} at {completionTime.toLocaleTimeString()}
              </CompletionDate>
            )}
            <ResetButton onClick={resetGame}>
              Play Again
            </ResetButton>
          </CompletionMessage>
        ) : (
          <>
            <GameProgress 
              currentPuzzleIndex={currentPuzzleIndex} 
              totalPuzzles={puzzles.length - 1} // Subtract 1 for completion "puzzle" 
            />
            
            <Puzzle 
              puzzle={currentPuzzle} 
              onSolve={currentPuzzle.type === 'manual' ? handlePuzzleSolved : undefined} 
            />
            
            {currentPuzzle.type === 'location' && (
              <LocationDetector 
                targetLocation={currentPuzzle.targetLocation} 
                onLocationMatch={handleLocationMatch}
                onLocationUpdate={handleLocationUpdate}
              />
            )}
          </>
        )}
      </MainContent>
      
      <Footer>
        <p>Created with Next.js and styled-components</p>
      </Footer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const Header = styled.header`
  max-width: 42rem;
  margin: 0 auto 2rem auto;
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #6b7280;
  text-align: center;
`;

const MainContent = styled.main`
  max-width: 42rem;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const CompletionMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const CompletionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CompletionInfo = styled.p`
  margin-bottom: 1.5rem;
`;

const CompletionDate = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const ResetButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

const Footer = styled.footer`
  max-width: 42rem;
  margin: 2rem auto 0 auto;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
`;
