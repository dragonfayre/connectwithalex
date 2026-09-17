import type { Config } from 'tailwindcss'
import { colors, fontFamily, fontSize, spacing, transitionTimingFunction, transitionDuration } from './src/tokens'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      spacing,
      transitionTimingFunction,
      transitionDuration,
    },
  },
} satisfies Config
