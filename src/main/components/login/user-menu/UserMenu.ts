// external imports
import { component } from 'js-react-utils'

// internal imports
import UserMenuProps from './types/UserMenuProps'
import UserMenuView from './view/UserMenuView'
import validateUserMenuProps from './validation/validateUserMenuProps'

// --- UserMenu ------------------------------------------------------

const UserMenu = component<UserMenuProps>({
  displayName: 'UserMenu',
  memoize: true,
  validate: validateUserMenuProps,
  render: UserMenuView
})

// --- exports -------------------------------------------------------

export default UserMenu
