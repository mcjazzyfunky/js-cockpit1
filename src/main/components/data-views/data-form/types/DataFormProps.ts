// external imports
import { ReactNode } from 'react'

// --- DataFormProps ------------------------------------------------

type DataFormProps = {
  title?: string,
  actions?: (Action)[],
  children?: ReactNode
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