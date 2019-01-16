// external imports
import { CSSProperties, ReactNode } from 'react'

//internal imports
import AppSelectionEvent from '../../../events/AppSelectionEvent'

// --- AppSelectorProps ------------------------------------------------

type AppSelectorProps = {
  apps: Array<{
    id: string,
    title: string,
    description?: string
  }> 

  onSelection?: (ev: AppSelectionEvent) => void
}

// --- exports ------------------------------------------------------

export default AppSelectorProps
