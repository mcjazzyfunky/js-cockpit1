// external imports
import { ReactNode } from 'react'

// --- MenuBarProps --------------------------------------------------

type MenuBarProps = {
  onAction?: () => void,
  items: (Menu | Item)[]
}

type Menu = {
  type: 'menu',
  text: string,
  items: (Menu | Item)[] 
}

type Item = {
  type: 'item',
  text: string,
  id?: string,
  disabled?: boolean,
  onAction?: () => void
}

// --- exports ------------------------------------------------------

export default MenuBarProps