// externals imports
import { CSSProperties, ReactNode } from 'react'

// --- VBoxCellProps ------------------------------------------------

type VBoxCellProps = {
  grow?: number,
  shrink?: number,
  horizontalAlign?: 'start' | 'center' | 'end',
  verticalAlign?: 'top' | 'middle' | 'bottom',
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

// --- exports ------------------------------------------------------

export default VBoxCellProps
