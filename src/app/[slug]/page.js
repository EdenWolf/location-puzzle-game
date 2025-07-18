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
  console.log('!!! params', await params);
  const { slug } = await params;
  const puzzle = puzzles.find(p => p.slug === slug);
  
  return {
    title: puzzle ? `${puzzle.title}` : 'Puzzle Not Found',
  };
}

// This is the server component - we just pass the slug to the client component
export default async function PuzzlePage({ params }) {
  const { slug } = await params;
  console.log('!!! slug', slug);
  return <PuzzleClient slug={slug} />;
}
