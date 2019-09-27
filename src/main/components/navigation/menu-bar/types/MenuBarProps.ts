// --- MenuBarProps --------------------------------------------------

type MenuBarProps = {
  items: (Menu | Item | Divider)[],
  onAction?: () => void
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
  onAction?: () => void
}

type Divider = {
  type: 'divider'
}

// --- exports ------------------------------------------------------

export default MenuBarProps
