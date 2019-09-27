// inernal imports

import ActionEvent from '../../../../events/ActionEvent'

// --- MenuBarProps --------------------------------------------------

type MenuBarProps = {
  items: (Menu | Item | Divider)[],
  onAction?: (ev: ActionEvent) => void
}

// --- locals -------------------------------------------------------

type Menu = {
  type: 'menu',
  id: string, 
  text: string,
  items: (Menu | Item | Divider)[] 
}

type Item = {
  type: 'item',
  id: string,
  text: string,
  disabled?: boolean,
  onAction?: (ev: ActionEvent) => void
}

type Divider = {
  type: 'divider'
}

// --- exports ------------------------------------------------------

export default MenuBarProps
