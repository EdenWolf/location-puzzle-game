import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Puzzle = ({ puzzle, onSolve }) => {
  const [visibleElements, setVisibleElements] = useState(puzzle.elements.length > 3 ? 3 : puzzle.elements.length);
  const [solutionInput, setSolutionInput] = useState('');
  const [solutionStatus, setSolutionStatus] = useState(null); // null, 'correct', 'incorrect'
  const router = useRouter();

  // Show more puzzle elements one by one
  const revealMoreElements = () => {
    if (visibleElements < puzzle.elements.length) {
      setVisibleElements(prevCount => prevCount + 1);
    }
  };

  // Handle solution submission
  const checkSolution = (solutionElement) => {
    if (solutionInput.toLowerCase() === solutionElement.answer.toLowerCase()) {
      setSolutionStatus('correct');
      // Wait a moment then solve the puzzle
      setTimeout(() => {
        if (onSolve) onSolve();
      }, 1500);
    } else {
      setSolutionStatus('incorrect');
      setTimeout(() => setSolutionStatus(null), 2000);
    }
  };

  // Handle button actions
  const handleButtonAction = (action) => {
    if (action === 'next' && onSolve) {
      onSolve();
    } else if (action === 'reset') {
      router.push(`/${puzzles[0].slug}`);
    } else if (action === 'reveal') {
      revealMoreElements();
    }
  };

  // Render individual puzzle elements
  const renderElement = (element, index) => {
    switch (element.type) {
      case 'text':
        return <TextElement key={index}>{element.content}</TextElement>;
      
      case 'image':
        return (
          <ImageContainer key={index}>
            <PuzzleImage src={element.src} alt={element.alt || 'Puzzle image'} />
          </ImageContainer>
        );
      
      case 'hint':
        return (
          <HintContainer key={index}>
            <HintTitle>Hint</HintTitle>
            <HintText>{element.content}</HintText>
          </HintContainer>
        );
      
      case 'solution':
        return (
          <SolutionContainer key={index} status={solutionStatus}>
            <SolutionQuestion>{element.question}</SolutionQuestion>
            <SolutionInput 
              type="text"
              value={solutionInput}
              onChange={(e) => setSolutionInput(e.target.value)}
              placeholder={element.placeholder || 'Enter solution'}
              disabled={solutionStatus === 'correct'}
            />
            {solutionStatus === 'correct' && <SolutionFeedback>Correct! Well done!</SolutionFeedback>}
            {solutionStatus === 'incorrect' && <SolutionFeedback error>Incorrect. Try again.</SolutionFeedback>}
            <ActionButton 
              onClick={() => checkSolution(element)} 
              disabled={!solutionInput || solutionStatus === 'correct'}
            >
              Submit Answer
            </ActionButton>
          </SolutionContainer>
        );
      
      case 'button':
        return (
          <ActionButtonContainer key={index}>
            <ActionButton onClick={() => handleButtonAction(element.action)}>
              {element.label}
            </ActionButton>
          </ActionButtonContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <PuzzleContainer>
      <PuzzleTitle>{puzzle.title}</PuzzleTitle>
      
      <ContentWrapper>
        {puzzle.elements.slice(0, visibleElements).map((element, index) => (
          renderElement(element, index)
        ))}
      </ContentWrapper>
      
      {/* Show reveal more button if there are hidden elements */}
      {visibleElements < puzzle.elements.length && (
        <RevealButton onClick={revealMoreElements}>
          Read More
        </RevealButton>
      )}
      
      {/* For location puzzles, show location message */}
      {puzzle.type === 'location' && (
        <LocationNote>
          <LocationText>
            Navigate to the marked location to solve this puzzle
          </LocationText>
        </LocationNote>
      )}
      
      {/* For manual puzzles that don't have a solution element, show solve button */}
      {puzzle.type === 'manual' && 
       !puzzle.elements.some(el => el.type === 'solution' || el.type === 'button') && (
        <SolveButton onClick={onSolve}>
          I&apos;ve Solved This Puzzle
        </SolveButton>
      )}
    </PuzzleContainer>
  );
};

// Styled Components for dark theme
const PuzzleContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.medium};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: transform ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PuzzleTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.title};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  padding-bottom: ${props => props.theme.spacing.xs};
  display: inline-block;
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TextElement = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.body};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ImageContainer = styled.div`
  margin: ${props => props.theme.spacing.md} 0;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
`;

const PuzzleImage = styled.img`
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border};
`;

const HintContainer = styled.div`
  background-color: ${props => props.theme.colors.surfaceLight};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin: ${props => props.theme.spacing.md} 0;
  border-left: 4px solid ${props => props.theme.colors.warning};
`;

const HintTitle = styled.h4`
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.warning};
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const HintText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

const LocationNote = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.md};
`;

const LocationText = styled.p`
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.colors.textSecondary};
`;

const SolveButton = styled.button`
  width: 100%;
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: background-color ${props => props.theme.transitions.short};
  cursor: pointer;
  border: none;
  font-size: ${props => props.theme.typography.fontSizes.body};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

const RevealButton = styled.button`
  background: none;
  color: ${props => props.theme.colors.primary};
  border: none;
  font-size: ${props => props.theme.typography.fontSizes.body};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  margin: 0 auto;
  display: block;
  
  &:hover {
    color: ${props => props.theme.colors.primaryLight};
    text-decoration: underline;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.disabled 
    ? props.theme.colors.surfaceLight 
    : props.theme.colors.primary};
  color: ${props => props.disabled 
    ? props.theme.colors.textHint 
    : 'white'};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: none;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  font-size: ${props => props.theme.typography.fontSizes.body};
  transition: background-color ${props => props.theme.transitions.short}, 
              transform ${props => props.theme.transitions.short};
              
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
  }
`;

const SolutionContainer = styled.div`
  background-color: ${props => props.theme.colors.surfaceLight};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: ${props => props.theme.spacing.md};
  border: 1px solid ${props => {
    if (props.status === 'correct') return props.theme.colors.success;
    if (props.status === 'incorrect') return props.theme.colors.error;
    return props.theme.colors.border;
  }};
`;

const SolutionQuestion = styled.h4`
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SolutionInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.body};
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const SolutionFeedback = styled.div`
  color: ${props => props.error ? props.theme.colors.error : props.theme.colors.success};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  text-align: center;
`;

export default Puzzle;