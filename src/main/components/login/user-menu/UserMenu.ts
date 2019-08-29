// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import UserMenuProps from './types/UserMenuProps'
import UserMenuView from './view/renderUserMenu'

// --- UserMenu -----------------------------------------------------

const UserMenu = component<UserMenuProps>({
  displayName: 'UserMenu',

  validate: Spec.checkProps({
    optional: {
      userName: Spec.string,
      fullName: Spec.string,
    }
  }),

  render: UserMenuView
})

// --- exports ------------------------------------------------------

export default UserMenu
