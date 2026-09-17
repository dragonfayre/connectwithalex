import { useState, useEffect, useRef } from 'react'
import { animate } from 'animejs'
import EditorialGrid from './components/EditorialGrid'
import Loader from './components/Loader'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Experiences from './components/Experiences'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { usePaging } from './hooks/usePaging'

const SECTIONS = ['hero', 'about', 'rolepreferences', 'experiences', 'skills', 'contact'] as const

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const current = usePaging(loaderDone ? SECTIONS.length : 0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const prevSection = useRef(0)

  // Animate section transitions
  useEffect(() => {
    if (!loaderDone || !sectionRef.current) return
    const dir = current > prevSection.current ? 1 : -1
    prevSection.current = current

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    animate(sectionRef.current, {
      opacity: [0, 1],
      translateY: [`${dir * 3}vh`, '0'],
      duration: 700,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
  }, [current, loaderDone])

  return (
    <div style={{ overflow: 'hidden', height: '100vh', backgroundColor: 'var(--bg)' }}>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      {loaderDone && (
        <div ref={sectionRef} style={{ height: '100vh' }}>
          <EditorialGrid>
            {SECTIONS[current] === 'hero' && <Hero visible />}
            {SECTIONS[current] === 'about' && <About visible />}
            {SECTIONS[current] === 'experiences' && <Experiences visible />}
            {SECTIONS[current] === 'rolepreferences' && <Experience visible />}
            {SECTIONS[current] === 'skills' && <Skills visible />}
            {SECTIONS[current] === 'contact' && <Contact visible />}
          </EditorialGrid>
        </div>
      )}

      {/* Section indicator */}
      {loaderDone && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '4vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            zIndex: 10,
          }}
        >
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: i === current ? '1.5rem' : '4px',
                borderRadius: '2px',
                backgroundColor: i === current ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'height 300ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms',
                opacity: i === current ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
