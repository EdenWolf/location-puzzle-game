"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import puzzles from '../../data/puzzles';
import LocationDetector from '../LocationDetector';
import Puzzle from '../Puzzle';
import GameProgress from '../GameProgress';

export default function GameContainer({ forcedSlug }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  
  // Find current puzzle based on the forcedSlug or URL path
  const getCurrentPuzzleFromPath = () => {
    // Use forcedSlug if available, otherwise extract from pathname
    const currentSlug = forcedSlug || (() => {
      const pathSegments = pathname.split('/');
      return pathSegments[pathSegments.length - 1] || '';
    })();
    
    console.log('GameContainer currentSlug:', currentSlug); // Debug log
    
    // Find the puzzle with matching slug, default to first puzzle if none found
    const puzzleIndex = puzzles.findIndex(puzzle => puzzle.slug === currentSlug);
    return puzzleIndex >= 0 ? puzzleIndex : 0;
  };
  
  // Keep track of the current puzzle with state to ensure it updates
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(getCurrentPuzzleFromPath());
  const currentPuzzle = puzzles[currentPuzzleIndex];
  const gameComplete = currentPuzzle?.type === 'completion';
  
  // React to forcedSlug changes
  useEffect(() => {
    if (forcedSlug) {
      const index = puzzles.findIndex(p => p.slug === forcedSlug);
      if (index >= 0) {
        console.log('Updating puzzle to:', forcedSlug, 'index:', index);
        setCurrentPuzzleIndex(index);
      }
    }
  }, [forcedSlug]);
  
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
    console.log('!!! puzzle solved');
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
        {gameComplete ? (
          <CompletionMessage>
            <CompletionTitle>ברכות!</CompletionTitle>
            <CompletionInfo>סיימת את כל החידות!</CompletionInfo>
            {completionTime && (
              <CompletionDate>
                הושלם בתאריך: {completionTime.toLocaleDateString('he-IL')} בשעה {completionTime.toLocaleTimeString('he-IL')}
              </CompletionDate>
            )}
            <ResetButton onClick={resetGame}>
              שחק שוב
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
              onSolve={currentPuzzle.type === 'manual' ? handlePuzzleSolved : console.log('!!! current puzzle:', currentPuzzle)} 
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
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const CompletionMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} 0;
  color: ${props => props.theme.colors.text};
`;

const CompletionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.title};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const CompletionInfo = styled.p`
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.typography.fontSizes.subtitle};
`;

const CompletionDate = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.small};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ResetButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  font-size: ${props => props.theme.typography.fontSizes.body};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }
  
  &:active {
    transform: translateY(0);
  }
`;
