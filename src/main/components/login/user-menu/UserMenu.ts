// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import UserMenuProps from './types/UserMenuProps'
import renderUserMenu from './view/renderUserMenu'

// --- UserMenu -----------------------------------------------------

const UserMenu = component<UserMenuProps>('UserMenu')
  .validate(
    Spec.checkProps({
      optional: {
        userName: Spec.string,
        fullName: Spec.string,
      }
    })
  )
  .render(renderUserMenu)

// --- exports ------------------------------------------------------

export default UserMenu
