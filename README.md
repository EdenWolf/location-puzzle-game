# Location-Based Puzzle Game

A Next.js application that creates an interactive puzzle hunt game using geolocation. This game allows you to create a series of puzzles where players must physically visit specific locations to progress to the next challenge.

## Features

- Location detection using browser geolocation API
- Progress tracking with local storage persistence
- Both location-based puzzles and manual puzzles
- Distance calculation to target locations
- Mobile-friendly UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn
- A modern browser with geolocation support
- Mobile device for testing on location (recommended)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing Puzzles

Edit the `/src/data/puzzles.js` file to create your own puzzle hunt. Each puzzle should have the following structure:

```javascript
{
  id: 1, // Unique identifier
  title: "Your Puzzle Title",
  description: "A detailed description of the puzzle or clue",
  type: "location", // 'location' or 'manual'
  hint: "Optional hint to help users", // Optional
  imageUrl: "/images/your-image.jpg", // Optional, place images in /public/images/
  targetLocation: { // Only required for 'location' type puzzles
    latitude: 12.345678,
    longitude: 23.456789,
    name: "Location Name" // Optional, for your reference
  }
}
```

### Puzzle Types

- **Location-based puzzles** (`type: "location"`) - Require the player to physically visit a specific location to proceed
- **Manual puzzles** (`type: "manual"`) - Require the player to solve a puzzle and click a button when they have the answer

## Deployment to GitHub Pages

To deploy to GitHub Pages:

1. Install the `next-gh-pages` package:

```bash
npm install --save-dev gh-pages
```

2. Add the following scripts to your `package.json`:

```json
"scripts": {
  "build": "next build",
  "export": "next export",
  "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out -t true"
}
```

3. Create a custom Next.js configuration file at the root of your project called `next.config.js`:

```javascript
module.exports = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/location-puzzle-game' : '',
  images: { unoptimized: true }
}
```

4. Run the deploy command:

```bash
npm run deploy
```

## Testing on Mobile Devices

When testing the location features, you'll need to use either:

1. A real mobile device (recommended)
2. Chrome's device emulation with custom geolocation settings

Note that for security reasons, geolocation API only works on secure origins (HTTPS or localhost).

## License

This project is licensed under the MIT License.
