// external imports
import { defineComponent } from 'js-react-utils'

// internal imports
import UserMenuProps from './types/UserMenuProps'
import renderUserMenu from './view/renderUserMenu'

// --- UserMenu -----------------------------------------------------

const UserMenu = defineComponent<UserMenuProps>({
  displayName: 'UserMenu',

  properties: {
    username: {
      type: String
    },

    fullName: {
      type: String
    }
  },

  render(props) {
    return renderUserMenu(props)
  }
})

// --- exports ------------------------------------------------------

export default UserMenu
