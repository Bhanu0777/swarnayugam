import { createContext, useContext, useState, useRef, useEffect } from 'react'

const PlaylistContext = createContext()

const PLAYLIST_ID = 'PLB2VKvIUTa6xD-HvyWw0dyo3N0FlnDFX1'

export function PlaylistProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('')
  const [currentTitle, setCurrentTitle] = useState('Song Title')
  const [currentSinger, setCurrentSinger] = useState('Telugu Evergreen Classic')
  const [currentYear, setCurrentYear] = useState('')
  const [playerReady, setPlayerReady] = useState(false)
  
  const playerRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const isApiLoadedRef = useRef(false)

  // Load YouTube IFrame API
  useEffect(() => {
    if (!isApiLoadedRef.current) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      const firstScriptTag = document.getElementsByTagName('script')[0]
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
      isApiLoadedRef.current = true
    }

    window.onYouTubeIframeAPIReady = () => {
      // API is ready, will be handled by YouTubePlayer component
    }

    if (window.YT && window.YT.Player) {
      // API already loaded
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Set player instance
  const setPlayer = (player) => {
    playerRef.current = player
  }

  // Update progress while playing
  const startProgressUpdate = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
        try {
          const time = playerRef.current.getCurrentTime()
          const dur = playerRef.current.getDuration()
          const prog = (time / dur) * 100
          setCurrentTime(time)
          setDuration(dur)
          setProgress(prog)
        } catch (error) {
          // Silently handle progress errors
        }
      }
    }, 500)
  }

  const stopProgressUpdate = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }

  // Play/Pause
  const togglePlay = () => {
    if (!playerRef.current) return
    
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo()
        setIsPlaying(false)
        stopProgressUpdate()
      } else {
        playerRef.current.playVideo()
        setIsPlaying(true)
        startProgressUpdate()
      }
    } catch (error) {
      // Silently handle play errors
    }
  }

  // Next song
  const nextSong = () => {
    if (!playerRef.current) return
    
    try {
      playerRef.current.nextVideo()
      setIsPlaying(true)
      startProgressUpdate()
    } catch (error) {
      // Silently handle next song errors
    }
  }

  // Previous song
  const prevSong = () => {
    if (!playerRef.current) return
    
    try {
      if (currentTime > 3) {
        // Restart current song
        playerRef.current.seekTo(0)
        if (!isPlaying) {
          playerRef.current.playVideo()
          setIsPlaying(true)
          startProgressUpdate()
        }
      } else {
        // Go to previous song
        playerRef.current.previousVideo()
        setIsPlaying(true)
        startProgressUpdate()
      }
    } catch (error) {
      // Silently handle previous song errors
    }
  }

  // Seek
  const seekTo = (percentage) => {
    if (!playerRef.current || !duration) return
    
    try {
      const targetTime = (percentage / 100) * duration
      playerRef.current.seekTo(targetTime, true)
      setCurrentTime(targetTime)
      setProgress(percentage)
    } catch (error) {
      // Silently handle seek errors
    }
  }

  // Get YouTube URL for current video
  const getYoutubeUrl = () => {
    if (currentVideoId) {
      return `https://www.youtube.com/watch?v=${currentVideoId}`
    }
    return `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`
  }

  // Get thumbnail URL
  const getThumbnailUrl = () => {
    if (currentVideoId) {
      return `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`
    }
    return null
  }

  // Update current song info
  const updateCurrentSong = (videoId, title, singer, year) => {
    setCurrentVideoId(videoId)
    setCurrentTitle(title || 'Telugu Song')
    setCurrentSinger(singer || 'Telugu Evergreen Classic')
    setCurrentYear(year || '')
  }

  // Set player ready
  const setPlayerReadyState = (ready) => {
    setPlayerReady(ready)
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlistId: PLAYLIST_ID,
        currentIndex,
        isPlaying,
        currentTime,
        duration,
        progress,
        currentVideoId,
        currentTitle,
        currentSinger,
        currentYear,
        playerReady,
        setPlayer,
        togglePlay,
        nextSong,
        prevSong,
        seekTo,
        formatTime,
        getYoutubeUrl,
        getThumbnailUrl,
        updateCurrentSong,
        setPlayerReady: setPlayerReadyState
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  const context = useContext(PlaylistContext)
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}
