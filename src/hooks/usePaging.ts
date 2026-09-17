import { useState, useEffect, useCallback, useRef } from 'react'

export function usePaging(totalSections: number) {
  const [current, setCurrent] = useState(0)
  const cooldown = useRef(false)
  const touchStartY = useRef(0)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (cooldown.current) return
      setCurrent(prev => {
        const next = prev + dir
        if (next < 0 || next >= totalSections) return prev
        return next
      })
      cooldown.current = true
      setTimeout(() => { cooldown.current = false }, 900)
    },
    [totalSections]
  )

  useEffect(() => {
    if (prefersReduced.current) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // ignore small trackpad inertia ticks
      if (Math.abs(e.deltaY) < 30) return
      advance(e.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 40) return
      advance(delta > 0 ? 1 : -1)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); advance(1) }
      if (e.key === 'ArrowUp') { e.preventDefault(); advance(-1) }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [advance])

  return current
}
