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
        <PageTitle>משחק חידות מבוסס מיקום</PageTitle>
        <PageSubtitle>פתרו חידות על ידי מציאת מיקומים בעולם האמיתי!</PageSubtitle>
      </Header>
      
      <MainContent>
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
        <p>נבנה באמצעות Next.js ו-styled-components</p>
      </Footer>
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

const Header = styled.header`
  max-width: 42rem;
  margin: 0 auto ${props => props.theme.spacing.xl} auto;
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.heading};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
  text-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
`;

const PageSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  font-size: ${props => props.theme.typography.fontSizes.subtitle};
`;

const MainContent = styled.main`
  max-width: 42rem;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.large};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
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

const Footer = styled.footer`
  max-width: 42rem;
  margin: ${props => props.theme.spacing.xl} auto 0 auto;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSizes.small};
  padding-bottom: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;
