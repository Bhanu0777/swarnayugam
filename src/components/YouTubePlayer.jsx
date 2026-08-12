import { useEffect, useRef, useState } from 'react'
import { usePlaylist } from '../context/PlaylistContext'

export default function YouTubePlayer() {
  const { playlistId, setPlayer, updateCurrentSong, setPlayerReady: setPlayerReadyState } = usePlaylist()
  const playerRef = useRef(null)
  const playerInstanceRef = useRef(null)
  const [apiReady, setApiReady] = useState(false)
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null)

  useEffect(() => {
    // Check if API is loaded
    const checkApi = setInterval(() => {
      if (window.YT && window.YT.Player) {
        setApiReady(true)
        clearInterval(checkApi)
      }
    }, 100)

    return () => clearInterval(checkApi)
  }, [])

  // Initialize player when API is ready and playlist ID is set
  useEffect(() => {
    if (apiReady && playlistId && playlistId !== currentPlaylistId) {
      setCurrentPlaylistId(playlistId)
      initializePlayer()
    }
  }, [apiReady, playlistId, currentPlaylistId])

  function initializePlayer() {
    if (!playerRef.current || !playlistId) return

    // Destroy existing player if it exists
    if (playerInstanceRef.current) {
      try {
        playerInstanceRef.current.destroy()
      } catch (error) {
        // Silently handle player destruction errors
      }
      playerInstanceRef.current = null
    }

    try {
      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        height: '0',
        width: '0',
        playerVars: {
          'listType': 'playlist',
          'list': playlistId,
          'index': 0,
          'playsinline': 1,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'modestbranding': 1,
          'rel': 0,
          'origin': window.location.origin,
          'enablejsapi': 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      })
    } catch (error) {
      // Silently handle player initialization errors
    }
  }

  const onPlayerReady = (event) => {
    const player = event.target
    setPlayer(player)
    setPlayerReadyState(true)
    
    try {
      const videoId = player.getVideoUrl()?.match(/v=([^&]+)/)?.[1]
      if (videoId) {
        const videoData = player.getVideoData()
        const title = videoData?.title || 'Telugu Song'
        updateCurrentSong(videoId, title, 'Telugu Evergreen Classic', '')
      }
    } catch (error) {
      // Silently handle video info errors
    }
  }

  const onPlayerStateChange = (event) => {
    const player = event.target
    const playerState = player.getPlayerState()
    
    if (playerState === window.YT.PlayerState.PLAYING) {
      try {
        const videoUrl = player.getVideoUrl()
        const videoId = videoUrl?.match(/v=([^&]+)/)?.[1]
        if (videoId) {
          const videoData = player.getVideoData()
          const title = videoData?.title || 'Telugu Song'
          updateCurrentSong(videoId, title, 'Telugu Evergreen Classic', '')
        }
      } catch (error) {
        // Silently handle state change errors
      }
    }
    
    if (playerState === window.YT.PlayerState.ENDED) {
      // Auto-next is handled by YouTube playlist
    }
  }

  const onPlayerError = (event) => {
    // Silently handle YouTube player errors
  }

  return <div ref={playerRef} style={{ display: 'none' }} />
}
