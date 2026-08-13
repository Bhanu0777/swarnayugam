import LiveClock from './components/LiveClock'
import OnlineCounter from './components/OnlineCounter'
import NowPlayingCard from './components/NowPlayingCard'
import PlatformLinks from './components/PlatformLinks'
import HeroTitle from './components/HeroTitle'
import SceneBackground from './components/SceneBackground'
import YouTubePlayer from './components/YouTubePlayer'
import SideRays from './components/SideRays'

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
      {/* Illustrated Scene Background */}
      <SceneBackground />
      
      {/* Full Screen Left Side Rays */}
      <div className="absolute inset-0 z-[1]">
        <SideRays
          speed={2.5}
          rayColor1="#FFB84D"
          rayColor2="#FFA500"
          intensity={2.5}
          spread={2.5}
          origin="top-left"
          tilt={0}
          saturation={1.2}
          blend={0.5}
          falloff={1.2}
          opacity={0.7}
        />
      </div>
      
      {/* YouTube Player (Hidden) */}
      <YouTubePlayer />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <LiveClock />
          <OnlineCounter />
        </div>
        <PlatformLinks />
      </div>
      
      {/* Hero Title */}
      <div className="absolute inset-0 flex items-start justify-center pt-32 md:pt-40 z-5 px-4">
        <HeroTitle />
      </div>
      
      {/* Glassmorphic Now Playing Card */}
      <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-20 w-full px-4">
        <NowPlayingCard />
      </div>
    </div>
  )
}

export default App
