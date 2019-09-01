// external imports
import { component } from 'js-react-utils'

// internal imports
import UserMenuProps from './types/UserMenuProps'
import UserMenuView from './view/renderUserMenu'
import validateUserMenuProps from './validation/validateUserMenuProps'

// --- UserMenu -----------------------------------------------------

const UserMenu = component<UserMenuProps>({
  displayName: 'UserMenu',
  validate: validateUserMenuProps,
  render: UserMenuView
})

// --- exports ------------------------------------------------------

export default UserMenu
