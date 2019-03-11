// external imports
import { CSSProperties, ReactNode } from 'react'

//internal imports
import AppSelectionEvent from '../../../../events/AppSelectionEvent'

// --- AppSelectorProps ------------------------------------------------

type AppSelectorProps = {
  apps: {
    type: 'app'
    id: string,
    title: string,
    description?: string
  }[],

  showCallout?: boolean,

  onSelection?: (ev: AppSelectionEvent) => void
}

// --- exports ------------------------------------------------------

export default AppSelectorProps
