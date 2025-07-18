import React from 'react';
import styled from 'styled-components';

const GameProgress = ({ currentPuzzleIndex, totalPuzzles }) => {
  // Calculate completion percentage
  const completionPercentage = Math.round((currentPuzzleIndex / totalPuzzles) * 100);
  
  return (
    <ProgressContainer>
      <InfoBar>
        <span>Puzzle {currentPuzzleIndex + 1} of {totalPuzzles}</span>
        <span>{completionPercentage}% Complete</span>
      </InfoBar>
      
      <ProgressBarContainer>
        <ProgressBarFill percentage={completionPercentage} />
      </ProgressBarContainer>
    </ProgressContainer>
  );
};

export default GameProgress;

const ProgressContainer = styled.div`
  margin-bottom: 2rem;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.625rem;
`;

const ProgressBarFill = styled.div`
  background-color: #2563eb;
  height: 0.625rem;
  border-radius: 9999px;
  transition: width 0.5s ease-in-out;
  width: ${props => props.percentage}%;
`;
