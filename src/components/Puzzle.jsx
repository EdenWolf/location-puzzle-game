import React from 'react';
import styled from 'styled-components';


const Puzzle = ({ puzzle, onSolve }) => {
  return (
    <PuzzleContainer>
      <PuzzleTitle>{puzzle.title}</PuzzleTitle>
      
      <ContentWrapper>
        <p>{puzzle.description}</p>
        
        {puzzle.imageUrl && (
          <ImageContainer>
            <PuzzleImage 
              src={puzzle.imageUrl} 
              alt={puzzle.title}
            />
          </ImageContainer>
        )}
        
        {puzzle.hint && (
          <HintContainer>
            <HintTitle>Hint:</HintTitle>
            <HintText>{puzzle.hint}</HintText>
          </HintContainer>
        )}
      </ContentWrapper>
      
      {puzzle.type === 'location' ? (
        <LocationNote>
          <LocationText>
            Navigate to the correct location to solve this puzzle!
          </LocationText>
        </LocationNote>
      ) : (
        <SolveButton onClick={onSolve}>
          I&apos;ve Solved This Puzzle
        </SolveButton>
      )}
    </PuzzleContainer>
  );
};

export default Puzzle;

const PuzzleContainer = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PuzzleTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const PuzzleImage = styled.img`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.375rem;
  max-height: 20rem;
  object-fit: contain;
`;

const HintContainer = styled.div`
  background-color: #fefce8;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
  border-left: 4px solid #facc15;
`;

const HintTitle = styled.h4`
  font-weight: 600;
  color: #854d0e;
`;

const HintText = styled.p`
  color: #a16207;
`;

const LocationNote = styled.div`
  margin-top: 1rem;
`;

const LocationText = styled.p`
  text-align: center;
  font-style: italic;
  color: #4b5563;
`;

const SolveButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
  border: none;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;