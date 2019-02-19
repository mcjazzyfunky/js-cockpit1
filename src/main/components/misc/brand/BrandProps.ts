// external imports
import { CSSProperties, ReactNode } from 'react'

// --- BrandProps ---------------------------------------------------

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  size?: 'medium' | 'large' | 'huge',
  className?: string,
  style?: CSSProperties
}

// --- exports ------------------------------------------------------

export default BrandProps
