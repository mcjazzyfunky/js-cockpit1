// external imports
import { defineComponent } from 'js-react-utils'

// internal imports
import UserMenuProps from './UserMenuProps'
import UserMenuView from './UserMenuView'

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
    return UserMenuView(props)
  }
})

// --- exports ------------------------------------------------------

export default UserMenu
