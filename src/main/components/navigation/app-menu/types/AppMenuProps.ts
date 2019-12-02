//internal imports
import ActionEvent from '../../../../events/ActionEvent'

// --- AppMenuProps -------------------------------------------------

type AppMenuProps = {
  items: {
    type: 'item'
    id: string,
    title: string,
    description?: string
  }[],

  mode: 'default' | 'callout',

  onAction?: (ev: ActionEvent) => void
}

// --- exports -------------------------------------------------------

export default AppMenuProps
