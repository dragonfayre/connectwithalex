import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { content } from '../content'

interface HeroProps {
  visible: boolean
}

export default function Hero({ visible }: HeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const name = nameRef.current
    const role = roleRef.current
    const meta = metaRef.current
    if (!name || !role || !meta) return

    const nameChars = name.querySelectorAll<HTMLElement>('.char')
    const roleChars = role.querySelectorAll<HTMLElement>('.char')

    animate(nameChars, {
      opacity: [0, 1],
      translateY: ['0.4em', '0'],
      duration: 800,
      delay: stagger(40),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    animate(roleChars, {
      opacity: [0, 1],
      translateY: ['0.3em', '0'],
      duration: 600,
      delay: stagger(30, { start: 400 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    animate(meta, {
      opacity: [0, 1],
      translateY: ['1rem', '0'],
      duration: 500,
      delay: 900,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
  }, [visible])

  const splitChars = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block', opacity: 0 }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <>
      {/* Primary content column: col 5–12 */}
      <div
        style={{
          gridColumn: 'content-start / content-end',
          gridRow: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(3rem, 8vh, 6rem)',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
        }}
      >
        <h1
          ref={nameRef}
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.06em',
            fontWeight: 300,
            color: 'var(--text)',
            marginBottom: '-1.6rem',
          }}
        >
          {splitChars(content.hero.name)}
        </h1>

        <p
          ref={roleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontWeight: 300,
            color: 'var(--primary)',
            marginBottom: '3rem',
          }}
        >
          {splitChars(content.hero.role)}
        </p>
      </div>

      {/* Meta column: col 2–4, anchored to grid line */}
      <div
        ref={metaRef}
        style={{
          gridColumn: 'meta-start / meta-end',
          gridRow: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
          opacity: 0,
          gap: '0.75rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {content.hero.location}
        </span>
        <a
          href={`mailto:${content.hero.email}`}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          {content.hero.email}
        </a>
        <a
          href={content.hero.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          LinkedIn
        </a>
        <a
          href={content.hero.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          GitHub
        </a>
      </div>
    </>
  )
}
