// external imports
import { defineComponent } from 'js-react-utils'

// internal imports
import LogoutButtonProps from './types/LogoutButtonProps'
import renderLogoutButton from './view/renderLogoutButton'

// --- LogoutButton -----------------------------------------------------

const LogoutButton = defineComponent<LogoutButtonProps>({
  displayName: 'LogoutButton',

  properties: {
    onClick: {
      type: Function
    }
  },

  render(props) {
    return renderLogoutButton(props)
  }
})

// --- exports ------------------------------------------------------

export default LogoutButton
