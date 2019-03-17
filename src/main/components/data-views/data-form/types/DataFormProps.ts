// external imports
import { ReactNode } from 'react'

// --- DataFormProps ------------------------------------------------

type DataFormProps = {
  title?: string | null,
  actions?: (Action)[] | null,
  compact?: boolean,
  onClose?: () => void,
  children?: ReactNode,
}

// --- locals -------------------------------------------------------

type Action = {
  type: 'default',
  text: string,
  icon?: ReactNode,
  disabled?: boolean
}

// --- exports ------------------------------------------------------

export default DataFormProps
