// Sample puzzle data
// In a real application, you would replace these with your actual puzzles and locations

const puzzles = [
  {
    id: 1,
    title: "First Clue",
    description: "Find the place where water meets the sky, where people gather to watch the sunset. Look for a bench facing west.",
    type: "location",
    hint: "It's a popular waterfront spot in the city.",
    targetLocation: {
      latitude: 31.2420, 
      longitude: 34.8122, 
      name: "Waterfront Park"
    }
  },
  {
    id: 2,
    title: "The Hidden Message",
    description: "You've found the first location! Now look for a hidden message on the back of the bench.",
    type: "manual",
    hint: "The message might be small or partially hidden. Look carefully.",
    imageUrl: "/images/bench-clue.jpg" // You would add this image to the public folder
  },
  {
    id: 3,
    title: "Follow the Path",
    description: "The message leads you to a place where knowledge is kept. Find the building with stone lions guarding its entrance.",
    type: "location",
    targetLocation: {
      latitude: 0, // Replace with actual coordinates
      longitude: 0, // Replace with actual coordinates
      name: "Public Library"
    }
  },
  // Add more puzzles as needed
];

export default puzzles;
