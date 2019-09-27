// external imports
import { component } from 'js-react-utils'

// internal imports
import MenuBarProps from './types/MenuBarProps'
import MenuBarView from './view/MenuBarView'
import validateMenuBarProps from './validation/validateMenuBarProps'

// --- MenuBar --------------------------------------------------------

const MenuBar = component<MenuBarProps>({
  displayName: 'MenuBar',
  validate: validateMenuBarProps,
  render: MenuBarView
})

// --- exports ------------------------------------------------------

export default MenuBar
