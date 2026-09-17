import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const smileyRef = useRef<HTMLDivElement>(null)
  const drawInRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const smiley = smileyRef.current
    const drawIn = drawInRef.current
    const container = containerRef.current
    if (!dot || !smiley || !drawIn || !container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      onComplete()
      return
    }

    // Phase 1: dot grows into smiley
    animate(dot, {
      scale: [0.2, 1],
      opacity: [0, 1],
      duration: 400,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      complete: () => {
        // swap dot → smiley
        dot.style.opacity = '0'
        smiley.style.opacity = '1'

        // Phase 2: smiley holds briefly then CRT blip-out
        animate(smiley, {
          scaleY: [1, 0.05, 0],
          scaleX: [1, 1.4, 0],
          opacity: [1, 1, 0],
          duration: 350,
          delay: 500,
          easing: 'cubicBezier(0.7, 0, 0.84, 0)',
          complete: () => {
            // Phase 3: Borel draw-in
            drawIn.style.opacity = '1'
            const chars = drawIn.querySelectorAll<HTMLElement>('.char')
            animate(chars, {
              opacity: [0, 1],
              translateY: ['0.3em', '0'],
              duration: 600,
              delay: stagger(60),
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              complete: () => {
                // Phase 4: fade out entire loader
                animate(container, {
                  opacity: [1, 0],
                  duration: 500,
                  delay: 300,
                  easing: 'cubicBezier(0.7, 0, 0.84, 0)',
                  complete: onComplete,
                })
              },
            })
          },
        })
      },
    })
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        gap: '2rem',
      }}
    >
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          position: 'absolute',
        }}
      />

      {/* Smiley — hidden until dot phase completes */}
      <div
        ref={smileyRef}
        style={{
          fontSize: '3rem',
          lineHeight: 1,
          opacity: 0,
          position: 'absolute',
          userSelect: 'none',
        }}
      >
        :)
      </div>

      {/* Borel draw-in text */}
      <span
        ref={drawInRef}
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'clamp(1.25rem, 3vw, 2rem)',
          color: 'var(--text-muted)',
          opacity: 0,
          display: 'flex',
          gap: '0.05em',
          marginTop: '6rem',
        }}
      >
        {'hello.'.split('').map((char, i) => (
          <span
            key={i}
            className="char"
            style={{ display: 'inline-block', opacity: 0 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  )
}
