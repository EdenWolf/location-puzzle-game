"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import puzzles from '../data/puzzles';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
`;

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the first puzzle on the root page
    router.replace(`/${puzzles[0].slug}`);
  }, [router]);
  
  // Show a loading message while redirecting
  return (
    <LoadingContainer>
      <LoadingText>Loading puzzle adventure...</LoadingText>
    </LoadingContainer>
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
