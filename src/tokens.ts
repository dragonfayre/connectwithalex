export const colors = {
  bg: '#1f1d1c',
  text: '#ffffff',
  primary: '#c65252',
  secondary: '#504e75',
  accent: '#7f82e0',
  panel: '#2a2726',
  'text-muted': '#a8a49f',
}

export const fontFamily = {
  display: ['Fraunces', 'serif'],
  body: ['Outfit', 'sans-serif'],
  accent: ['Borel', 'cursive'],
}

export const fontSize = {
  'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
  'display-lg': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
  'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6' }],
  'body-md': ['1rem', { lineHeight: '1.6' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5' }],
  meta: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
}

export const spacing = {
  'grid-gap': '2rem',
  'section-pad': 'clamp(3rem, 8vh, 6rem)',
}

export const transitionTimingFunction = {
  'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
  'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
}

export const transitionDuration = {
  fast: '200ms',
  base: '400ms',
  slow: '700ms',
  xslow: '1200ms',
}

// Raw values for use in Anime.js (not Tailwind)
export const easing = {
  outExpo: 'cubicBezier(0.16, 1, 0.3, 1)',
  inExpo: 'cubicBezier(0.7, 0, 0.84, 0)',
  inOutExpo: 'cubicBezier(0.87, 0, 0.13, 1)',
}

export const duration = {
  fast: 200,
  base: 400,
  slow: 700,
  xslow: 1200,
}
