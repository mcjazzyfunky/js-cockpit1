// external imports
import { CSSProperties, ReactNode } from 'react'

// --- BrandProps ---------------------------------------------------

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  size?: 'medium' | 'large' | 'huge'
}

// --- exports ------------------------------------------------------

export default BrandProps
