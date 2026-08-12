# Swarnayugam - Telugu Golden Era Song Player

A nostalgic, portfolio-grade web experience celebrating classic Telugu film music with a glassmorphic UI and beautiful animations.

## Features

- **Glassmorphic Design**: Beautiful frosted-glass player card with backdrop blur effects
- **Live Clock**: Real-time clock display in the top-left corner
- **Online Counter**: Simulated visitor count with pulsing indicator
- **YouTube Playlist Integration**: Plays curated Telugu classic songs via YouTube IFrame API
- **Playback Controls**: Play/pause, next/previous song navigation
- **Progress Bar**: Animated progress bar showing playback position with seek functionality
- **Platform Links**: Quick-launch button for YouTube
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion animations throughout the interface
- **Telugu Typography**: Stylized Telugu hero title
- **Rotating Album Art**: CD-style rotation when playing
- **Auto-next**: Automatically plays next song when current ends

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **YouTube API**: IFrame API for music playback
- **Icons**: Inline SVG icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd swarnayugam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
swarnayugam/
├── src/
│   ├── components/
│   │   ├── HeroTitle.jsx          # Main Telugu title component
│   │   ├── LiveClock.jsx          # Real-time clock display
│   │   ├── NowPlayingCard.jsx     # Glassmorphic player card
│   │   ├── OnlineCounter.jsx      # Simulated visitor counter
│   │   ├── PlatformLinks.jsx      # YouTube quick link
│   │   ├── SceneBackground.jsx    # Illustrated background scene
│   │   └── YouTubePlayer.jsx      # YouTube IFrame API player
│   ├── context/
│   │   └── PlaylistContext.jsx    # Playlist state management
│   ├── assets/
│   │   ├── backgroundimage.png    # Background image
│   │   └── hero.png               # Hero illustration
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles with Tailwind
├── public/                        # Static assets
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

## YouTube Integration

The app uses the YouTube IFrame API for:
- **Playlist playback** from curated YouTube playlists
- **Real video metadata** (title, duration, thumbnail)
- **Auto-play and auto-next** functionality
- **Progress tracking** synchronized with actual video duration
- **Seek functionality** via progress bar

### How it works:
1. YouTube IFrame API loads dynamically
2. Player initializes with playlist ID
3. Custom UI controls the hidden YouTube player
4. Progress updates every 500ms for smooth UX
5. Auto-advance when video ends

## Design System

### Glassmorphism
- Card background: `bg-white/15` with `backdrop-blur-xl`
- Border: `border-white/25`
- Shadow: `shadow-2xl`
- Gradient overlay for depth

### Color Palette
- Background: Custom image with amber/orange/red gradient overlay
- Text: White with varying opacity for hierarchy
- Accent: Amber/Orange tones for nostalgic feel

### Typography
- Telugu title: Lakki Reddy font for authentic feel
- UI text: System sans-serif for readability
- Size hierarchy maintained with responsive scaling

## License

This is a personal portfolio project. Song metadata and references are for educational purposes.

## Credits

- Celebrating legends like S.P. Balasubrahmanyam, Ghantasala, P. Susheela, and others
- Music content sourced from YouTube playlists
