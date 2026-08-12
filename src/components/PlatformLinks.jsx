import { useEffect } from 'react'

export default function PlatformLinks() {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'y' || e.key === 'Y') {
        window.open('https://www.youtube.com/watch?v=RMoUYGnu02w&list=PLB2VKvIUTa6xD-HvyWw0dyo3N0FlnDFX1', '_blank')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="flex gap-2 md:gap-3">
      <a
        href="https://www.youtube.com/watch?v=RMoUYGnu02w&list=PLB2VKvIUTa6xD-HvyWw0dyo3N0FlnDFX1"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs md:text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-1 md:gap-2"
        title="YouTube (Press Y)"
      >
        YouTube
        <span className="hidden md:inline">↗</span>
      </a>
    </div>
  )
}
