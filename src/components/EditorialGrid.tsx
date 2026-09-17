import type { ReactNode } from 'react'

interface EditorialGridProps {
  children: ReactNode
}

/**
 * The ONE shared Swiss editorial grid.
 * 12-column asymmetric layout — content is intentionally off-center.
 * All sections render their content inside this grid; they do not define their own.
 *
 * Column map (1-indexed):
 *   col 1        — narrow left margin / rule anchor
 *   col 2–4      — secondary / meta column
 *   col 5–12     — primary content column (wide, off-center right)
 */
export default function EditorialGrid({ children }: EditorialGridProps) {
  return (
    <div
      className="editorial-grid"
      style={{
        display: 'grid',
        gridTemplateColumns:
          '[margin] 4vw [meta-start] 1fr 1fr 1fr [meta-end content-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [content-end] 4vw',
        gridTemplateRows: '1fr',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}
