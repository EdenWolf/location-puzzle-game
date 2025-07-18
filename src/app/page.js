"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
// Fix imports with correct paths
import puzzles from '../data/puzzles';
import LocationDetector from '../components/LocationDetector';
import Puzzle from '../components/Puzzle';
import GameProgress from '../components/GameProgress';

// Styled Components
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

export default function Home() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [lastCompletedTime, setLastCompletedTime] = useState(null);
  
  // Get current puzzle
  const currentPuzzle = puzzles[currentPuzzleIndex];
  
  // Load game progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('puzzleGameProgress');
    if (savedProgress) {
      const { currentIndex, completionTime } = JSON.parse(savedProgress);
      setCurrentPuzzleIndex(currentIndex);
      if (completionTime) {
        setLastCompletedTime(new Date(completionTime));
        setGameComplete(true);
      }
    }
  }, []);
  
  // Save progress to localStorage when it changes
  useEffect(() => {
    const progressData = {
      currentIndex: currentPuzzleIndex,
      completionTime: lastCompletedTime ? lastCompletedTime.toISOString() : null
    };
    localStorage.setItem('puzzleGameProgress', JSON.stringify(progressData));
  }, [currentPuzzleIndex, lastCompletedTime]);
  
  // Handle puzzle solve
  const handlePuzzleSolved = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      setGameComplete(true);
      setLastCompletedTime(new Date());
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
    setCurrentPuzzleIndex(0);
    setGameComplete(false);
    setLastCompletedTime(null);
    localStorage.removeItem('puzzleGameProgress');
  };

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
            <CompletionDate>
              Completed on: {lastCompletedTime?.toLocaleDateString()} at {lastCompletedTime?.toLocaleTimeString()}
            </CompletionDate>
            <ResetButton onClick={resetGame}>
              Play Again
            </ResetButton>
          </CompletionMessage>
        ) : (
          <>
            <GameProgress 
              currentPuzzleIndex={currentPuzzleIndex} 
              totalPuzzles={puzzles.length} 
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
        <p>Created with Next.js</p>
      </Footer>
    </PageContainer>
  );
}
