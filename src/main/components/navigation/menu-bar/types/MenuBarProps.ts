// external imports
import { ReactNode } from 'react'

// --- MenuBarProps --------------------------------------------------

type MenuBarProps = {
  onAction?: () => void,
  items: (Menu | Item)[]
}

type Menu = {
  type: 'menu',
  id: string, 
  text: string,
  items: (Menu | Item)[] 
}

type Item = {
  type: 'item',
  id: string,
  text: string,
  disabled?: boolean,
  onAction?: () => void
}

// --- exports ------------------------------------------------------

export default MenuBarProps