# TypeScript Pong Game

A modern 4-player Pong game implementation using TypeScript and HTML5 Canvas.

## Features

- Four-player gameplay
- Smooth paddle and ball movement
- Score tracking for all players
- Increasing ball speed as the game progresses
- Modern visual style with quadrant layout
- Cross-platform controls

## Setup

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The game will open automatically in your default browser at `http://localhost:9000`.

### Production

1. Build for production:
```bash
npm run build
```

2. The optimized files will be in the `public` directory. You can serve them using any web server. For example:
```bash
# Using Python 3
python -m http.server --directory public 8080

# Or using Node.js serve package
npx serve public
```

The production build includes:
- Minified JavaScript and HTML
- Content hashing for better caching
- Optimized bundle splitting
- Tree-shaking for smaller bundle size

## Controls

- Player 1 (Left Paddle):
  - W: Move paddle up
  - S: Move paddle down

- Player 2 (Right Paddle):
  - ↑ (Up Arrow): Move paddle up
  - ↓ (Down Arrow): Move paddle down

- Player 3 (Top Paddle):
  - A: Move paddle left
  - D: Move paddle right

- Player 4 (Bottom Paddle):
  - ← (Left Arrow): Move paddle left
  - → (Right Arrow): Move paddle right

## Game Rules

- Each player controls a paddle on their side of the screen
- The ball bounces off all paddles and can travel in any direction
- When a player misses the ball, all other players score a point
- The ball speed increases slightly with each paddle hit
- The ball resets to the center with a random direction after each point
- First player to reach the agreed-upon score wins!