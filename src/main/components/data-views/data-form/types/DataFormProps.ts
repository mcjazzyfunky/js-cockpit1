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
  type: 'action',
  title: string,
  icon?: ReactNode
}

// --- exports ------------------------------------------------------

export default DataFormProps
