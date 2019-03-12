// external imports
import { ReactNode } from 'react'

// --- MenuBarProps --------------------------------------------------

type MenuBarProps = {
  onAction?: () => void,
  items: (Menu | Item | Divider)[],
  showMenuBeaks?: boolean
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