import React from 'react';
import styled from 'styled-components';

const GameProgress = ({ currentPuzzleIndex, totalPuzzles }) => {
  // Calculate completion percentage
  const completionPercentage = Math.round((currentPuzzleIndex / totalPuzzles) * 100);
  
  return (
    <ProgressContainer>
      <InfoBar>
        <span>שלב {currentPuzzleIndex} מתוך {totalPuzzles}</span>
        <span>{completionPercentage}% הושלם</span>
      </InfoBar>
      
      <ProgressBarContainer>
        <ProgressBarFill percentage={completionPercentage} />
      </ProgressBarContainer>
    </ProgressContainer>
  );
};

export default GameProgress;

const ProgressContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  direction: rtl;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${props => props.theme.typography.fontSizes.small};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.surfaceLight};
  border-radius: 9999px;
  height: 0.625rem;
  box-shadow: inset 0 1px 2px ${props => props.theme.colors.shadow};
`;

const ProgressBarFill = styled.div`
  background-color: ${props => props.theme.colors.primary};
  height: 0.625rem;
  border-radius: 9999px;
  transition: width 0.5s ease-in-out;
  width: ${props => props.percentage}%;
  box-shadow: 0 0 8px ${props => props.theme.colors.primary};
`;
