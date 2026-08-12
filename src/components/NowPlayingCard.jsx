import { useState, useEffect } from 'react'
import { usePlaylist } from '../context/PlaylistContext'
import logoImage from '../assets/logo.png'

export default function NowPlayingCard() {
  const {
    isPlaying,
    currentTime,
    duration,
    progress,
    currentTitle,
    currentSinger,
    currentYear,
    currentVideoId,
    getThumbnailUrl,
    togglePlay,
    nextSong,
    prevSong,
    seekTo,
    formatTime
  } = usePlaylist()

  const [barHeights, setBarHeights] = useState([4, 4, 4, 4, 4])

  const thumbnailUrl = getThumbnailUrl()

  useEffect(() => {
    if (!isPlaying) {
      setBarHeights([4, 4, 4, 4, 4])
      return
    }

    const interval = setInterval(() => {
      setBarHeights(barHeights.map(() => 8 + Math.random() * 12))
    }, 200)

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'ArrowRight') {
        nextSong()
      } else if (e.code === 'ArrowLeft') {
        prevSong()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [togglePlay, nextSong, prevSong])

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    seekTo(percentage)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-full p-1.5 md:p-2 shadow-2xl relative overflow-hidden">
        {/* Glass effect shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>
        
        {/* Main Content Layout */}
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
          {/* Album Art - Circular like CD - Left side */}
          <div className="relative flex-shrink-0 translate-y-6">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-xl"
            >
              <img
                src={logoImage}
                alt="Swarnayugam Logo"
                className="w-full h-full object-cover"
              />
            </div>
            {/* CD center hole effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-red-900/50 rounded-full border-2 border-white/30"></div>
            </div>
          </div>
          
          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base md:text-lg truncate mb-1">
              {currentTitle}
            </h3>
            <p className="text-white/80 text-sm md:text-base truncate">
              {currentSinger} {currentYear && `• ${currentYear}`}
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 translate-y-5">
            {/* Visualizer */}
            <div className="flex items-end gap-1 h-6">
              {barHeights.map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/60 rounded-full transition-all duration-100"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>

            <button
              className="text-white/80 hover:text-white transition-colors"
              onClick={prevSong}
              aria-label="Previous song"
              tabIndex={0}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            <button
              className="w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-white/90 rounded-full flex items-center justify-center text-red-800 transition-all shadow-lg"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              tabIndex={0}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            
            <button
              className="text-white/80 hover:text-white transition-colors"
              onClick={nextSong}
              aria-label="Next song"
              tabIndex={0}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-1 relative z-10 max-w-lg mx-auto">
          <div className="flex justify-between text-xs md:text-sm text-white/90 mb-2 font-semibold">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="h-2 md:h-3 bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
