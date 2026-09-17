import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { content } from '../content'

export default function Experiences({ visible }: { visible: boolean }) {
  const [entryIndex, setEntryIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const entryRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const entries = content.experiences

  useEffect(() => {
    if (!entryRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      entryRef.current.style.opacity = '1'
      return
    }
    entryRef.current.style.opacity = '0'
    entryRef.current.style.transform = 'translateY(1.5rem)'
    animate(entryRef.current, {
      opacity: [0, 1],
      translateY: ['1.5rem', '0'],
      duration: 500,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
  }, [animKey, visible])

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true
    setAnimKey(k => k + 1)
  }, [visible])

  const goTo = (dir: 1 | -1) => {
    const next = entryIndex + dir
    if (next < 0 || next >= entries.length) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced && entryRef.current) {
      animate(entryRef.current, {
        opacity: [1, 0],
        translateY: ['0', '-1rem'],
        duration: 250,
        easing: 'cubicBezier(0.7, 0, 0.84, 0)',
        complete: () => {
          setEntryIndex(next)
          setAnimKey(k => k + 1)
        },
      })
    } else {
      setEntryIndex(next)
      setAnimKey(k => k + 1)
    }
  }

  const entry = entries[entryIndex]

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    background: 'none',
    border: '1px solid',
    borderColor: disabled ? 'var(--text-muted)' : 'var(--text)',
    borderRadius: '50%',
    color: disabled ? 'var(--text-muted)' : 'var(--text)',
    cursor: disabled ? 'default' : 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: '1.1rem',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.3 : 1,
    transition: 'opacity 200ms, border-color 200ms, color 200ms',
    flexShrink: 0,
  })

  return (
    <>
      {/* Label + nav — meta column, centered */}
      <div
        style={{
          gridColumn: 'meta-start / meta-end',
          gridRow: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.5rem',
          paddingTop: 'clamp(3rem, 8vh, 6rem)',
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
            alignSelf: 'flex-start',
          }}
        >
          Experiences
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => goTo(-1)} disabled={entryIndex === 0} style={btnStyle(entryIndex === 0)}>↑</button>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {entryIndex + 1}/{entries.length}
          </span>
          <button onClick={() => goTo(1)} disabled={entryIndex === entries.length - 1} style={btnStyle(entryIndex === entries.length - 1)}>↓</button>
        </div>
      </div>

      {/* Entry — primary content column */}
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
        <div ref={entryRef} style={{ opacity: 0 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            {entry.period}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '0.25rem',
            }}
          >
            {entry.role}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
            {entry.company}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {entry.outcomes.map((outcome, i) => (
              <li
                key={i}
                style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '52ch' }}
              >
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
