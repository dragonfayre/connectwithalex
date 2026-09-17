import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { content } from '../content'

interface ContactProps {
  visible: boolean
}

export default function Contact({ visible }: ContactProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !contentRef.current) return

    const items = contentRef.current.querySelectorAll<HTMLElement>('.contact-item')
    animate(items, {
      opacity: [0, 1],
      translateY: ['1.5rem', '0'],
      duration: 600,
      delay: stagger(100),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
  }, [visible])

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 300,
    letterSpacing: '-0.01em',
    color: 'var(--text)',
    textDecoration: 'none',
    display: 'block',
    transition: 'color 200ms',
  }

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
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '0.08em',
          }}
        >
          Contact
        </span>
      </div>

      {/* Links — primary content column */}
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
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p
            className="contact-item"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
              maxWidth: '40ch',
              opacity: 0,
            }}
          >
            {content.contact.line}
          </p>
          <a
            className="contact-item"
            href={`mailto:${content.contact.email}`}
            style={{ ...linkStyle, opacity: 0 }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--primary)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
          >
            {content.contact.email}
          </a>
          <a
            className="contact-item"
            href={content.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...linkStyle, opacity: 0 }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--accent)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
          >
            LinkedIn 
          </a>
          <a
            className="contact-item"
            href={content.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...linkStyle, opacity: 0 }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--accent)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  )
}
