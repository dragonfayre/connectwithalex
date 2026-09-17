import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { content } from '../content'

interface AboutProps {
  visible: boolean
}

export default function About({ visible }: AboutProps) {
  const bioRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    animate([labelRef.current, bioRef.current], {
      opacity: [0, 1],
      translateY: ['1.5rem', '0'],
      duration: 700,
      delay: stagger(120),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
  }, [visible])

  return (
    <>
      {/* Label — meta column */}
      <div
        style={{
          gridColumn: 'meta-start / meta-end',
          gridRow: '1',
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            opacity: 0,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '0.08em',
          }}
        >
          About
        </span>
      </div>

      {/* Bio — primary content column */}
      <div
        style={{
          gridColumn: 'content-start / content-end',
          gridRow: '1',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'clamp(3rem, 8vh, 6rem)',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
        }}
      >
        <p
          ref={bioRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            lineHeight: 1.6,
            color: 'var(--text)',
            maxWidth: '52ch',
            opacity: 0,
          }}
        >
          {content.about.bio}
        </p>
      </div>
    </>
  )
}
