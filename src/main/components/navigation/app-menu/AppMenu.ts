// external imports
import { component } from 'js-react-utils'

// internal imports
import AppMenuProps from './types/AppMenuProps'
import AppMenuView from './view/AppMenuView'
import validateAppMenuProps from './validation/validateAppMenuProps'

// --- AppMenu -----------------------------------------------------

const AppMenu = component<AppMenuProps>({
  displayName: 'AppMenu',
  validate: validateAppMenuProps,
  render: AppMenuView
})

// --- exports ------------------------------------------------------

export default AppMenu
