"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import puzzles from '@/data/puzzles';
import LocationDetector from '@/components/LocationDetector';
import Puzzle from '@/components/Puzzle';
import GameProgress from '@/components/GameProgress';

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <header className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Location Puzzle Game</h1>
        <p className="text-gray-600 text-center">Solve puzzles by finding real-world locations!</p>
      </header>
      
      <main className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {gameComplete ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-6">You&apos;ve completed all the puzzles!</p>
            <p className="text-sm text-gray-600 mb-8">
              Completed on: {lastCompletedTime?.toLocaleDateString()} at {lastCompletedTime?.toLocaleTimeString()}
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Play Again
            </button>
          </div>
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
      </main>
      
      <footer className="max-w-2xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Created with Next.js</p>
      </footer>
    </div>
  );
}
