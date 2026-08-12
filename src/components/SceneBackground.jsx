import backgroundImage from '../assets/kk.png'
import mobileBackgroundImage from '../assets/mobile-hero.png'
import SideRays from './SideRays'

export default function SceneBackground() {
  const isMobile = window.innerWidth < 768
  const bgImage = isMobile ? mobileBackgroundImage : backgroundImage

  return (
    <div className="absolute inset-0 z-0">
      {/* Background Image */}
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        
        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-amber-900/20"></div>

        {/* Left-side rays effect (full-screen range, less intensity) */}
        <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
          <SideRays
            speed={2.5}
            rayColor1="#FFD54F"
            rayColor2="#FF8A00"
            intensity={1.2}
            spread={3}
            origin="top-left"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.5}
            opacity={0.8}
          />
        </div>
      </div>
    </div>
  )
}
