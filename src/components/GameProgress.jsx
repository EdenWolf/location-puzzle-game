import React from 'react';

const GameProgress = ({ currentPuzzleIndex, totalPuzzles }) => {
  // Calculate completion percentage
  const completionPercentage = Math.round((currentPuzzleIndex / totalPuzzles) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Puzzle {currentPuzzleIndex + 1} of {totalPuzzles}</span>
        <span>{completionPercentage}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GameProgress;
