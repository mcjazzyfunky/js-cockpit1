// external imports
import { ReactNode } from 'react'

// --- MenuBarProps --------------------------------------------------

type MenuBarProps = {
  onAction?: () => void,
  items: (Menu | Item)[]
}

type Menu = {
  kind: 'menu',
  text: string,
  items: (Menu | Item)[] 
}

type Item = {
  kind: 'item',
  text: string,
  id?: string,
  disabled?: boolean,
  onAction?: () => void
}

// --- exports ------------------------------------------------------

export default MenuBarProps