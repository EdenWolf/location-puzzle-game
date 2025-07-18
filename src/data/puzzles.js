// Sample puzzle data with dynamic content elements
// Each puzzle now contains an array of content elements that appear sequentially

const puzzles = [
  {
    id: 1,
    slug: "waterfront", // URL slug related to solution
    title: "First Clue",
    type: "location",
    elements: [
      { type: "text", content: "Find the place where water meets the sky, where people gather to watch the sunset." },
      { type: "text", content: "Look for a bench facing west near the water." },
      { type: "image", src: "/images/waterfront-hint.jpg", alt: "Sunset at waterfront" },
      { type: "hint", content: "It's a popular waterfront spot in the city." }
    ],
    targetLocation: {
      latitude: 31.2489,
      longitude: 34.7700, 
      name: "Waterfront Park"
    }
  },
  {
    id: 2,
    slug: "message", // URL slug related to solution
    title: "The Hidden Message",
    type: "narrative", // New type for story advancement
    elements: [
      { type: "text", content: "You've found the first location! The sunset casts long shadows across the park." },
      { type: "text", content: "As you sit on the bench, you notice something etched into the wooden slats." },
      { type: "image", src: "/images/bench-clue.jpg", alt: "Hidden message on bench" },
      { type: "text", content: "The message reads: 'Knowledge awaits where the stone guardians watch.'" },
      { type: "button", label: "Continue the Journey", action: "next" }
    ]
  },
  {
    id: 3,
    slug: "library", // URL slug related to solution
    title: "Follow the Path",
    type: "location",
    elements: [
      { type: "text", content: "The message leads you to a place where knowledge is kept." },
      { type: "text", content: "Find the building with stone lions guarding its entrance." },
      { type: "hint", content: "This place houses thousands of books and ancient wisdom." },
      { type: "text", content: "The local library has stood for over a century in the heart of the city." }
    ],
    targetLocation: {
      latitude: 31.2420, 
      longitude: 34.8122, 
      name: "Public Library"
    }
  },
  {
    id: 4,
    slug: "final", // URL slug for completion page
    title: "The Final Discovery",
    type: "manual",
    elements: [
      { type: "text", content: "You've arrived at the library, where the stone lions stand guard at the entrance." },
      { type: "image", src: "/images/library-entrance.jpg", alt: "Library entrance" },
      { type: "text", content: "Inside, you find an old manuscript that reveals the city's hidden history." },
      { type: "text", content: "The mystery is solved - you've discovered the secret that connects all these places." },
      { type: "solution", question: "What word connects all the clues?", answer: "heritage", placeholder: "Enter the secret word" },
      { type: "hint", content: "Think about what links the waterfront, the message, and the library together." }
    ]
  },
  {
    id: 5,
    slug: "completion", // URL slug for completion page
    title: "Journey Complete",
    type: "completion",
    elements: [
      { type: "text", content: "Congratulations! You've completed all the puzzles and uncovered the city's hidden story." },
      { type: "image", src: "/images/completion.jpg", alt: "Completion certificate" },
      { type: "text", content: "Your journey through history and mystery has come to an end." },
      { type: "button", label: "Start Again", action: "reset" }
    ]
  }
  // Add more puzzles as needed
];

export default puzzles;
