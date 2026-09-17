import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { content } from '../content'

interface SkillsProps {
  visible: boolean
}

const groups: { label: string; key: keyof typeof content.skills }[] = [
  { label: 'Languages', key: 'languages' },
  { label: 'Tools & Platforms', key: 'tools' },
  { label: 'Focus Areas', key: 'focus' },
]

export default function Skills({ visible }: SkillsProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !listRef.current) return

    const items = listRef.current.querySelectorAll<HTMLElement>('.skill-group')
    animate(items, {
      opacity: [0, 1],
      translateY: ['1.5rem', '0'],
      duration: 600,
      delay: stagger(100),
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
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '0.08em',
          }}
        >
          Skills
        </span>
      </div>

      {/* Grouped list — primary content column */}
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
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {groups.map(({ label, key }) => (
            <div key={key} className="skill-group" style={{ opacity: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {content.skills[key].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      color: 'var(--text)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
