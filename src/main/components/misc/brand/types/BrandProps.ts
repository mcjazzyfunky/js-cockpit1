// external imports
import { CSSProperties, ReactNode } from 'react'

// --- BrandProps ----------------------------------------------------

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  size?: 'small' | 'medium' | 'large' | 'huge',
  coloring?: 'neutral' | 'theme'
}

// --- exports -------------------------------------------------------

export default BrandProps
