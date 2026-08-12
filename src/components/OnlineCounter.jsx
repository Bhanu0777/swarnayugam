import { useState, useEffect } from 'react'

export default function OnlineCounter() {
  const [count, setCount] = useState(32)

  useEffect(() => {
    // Simulate realistic visitor count changes more frequently
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        return Math.max(20, Math.min(60, prev + change))
      })
    }, 2000) // Update every 2 seconds for more real-time feel
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="hidden sm:inline">{count} online</span>
      <span className="sm:hidden">{count}</span>
    </div>
  )
}
