import puzzles from '../../data/puzzles';
import PuzzleClient from './puzzle-client';

// This function tells Next.js what static paths to generate during build
export function generateStaticParams() {
  return puzzles.map(puzzle => ({
    slug: puzzle.slug,
  }));
}

// Server component with metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const puzzle = puzzles.find(p => p.slug === slug);
  
  return {
    title: puzzle ? `${puzzle.title} - Location Puzzle Game` : 'Puzzle Not Found',
  };
}

// This is the server component - we just pass the slug to the client component
export default async function PuzzlePage({ params }) {
  const { slug } = await params;
  return <PuzzleClient slug={slug} />;
}
