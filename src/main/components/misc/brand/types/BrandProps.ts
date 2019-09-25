// external imports
import { CSSProperties, ReactNode } from 'react'

// --- BrandProps ---------------------------------------------------

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  size?: 'medium' | 'large' | 'huge',
  colorization?: 'neutral' | 'theme'
}

// --- exports ------------------------------------------------------

export default BrandProps
