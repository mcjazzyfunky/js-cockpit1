// external imports
import { CSSProperties, ReactNode } from 'react'

//internal imports
import AppSelectionEvent from '../../../../events/AppSelectionEvent'

// --- AppMenuProps ------------------------------------------------

type AppMenuProps = {
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

export default AppMenuProps
