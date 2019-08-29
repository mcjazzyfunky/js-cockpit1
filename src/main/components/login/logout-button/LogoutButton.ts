// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import LogoutButtonProps from './types/LogoutButtonProps'
import LogoutButtonView from './view/renderLogoutButton'

// --- LogoutButton -----------------------------------------------------

const LogoutButton = component<LogoutButtonProps>({
  displayName: 'LogoutButton',

  validate: Spec.checkProps({
    optional: {
      onClick: Spec.function
    }
  }),

  render: LogoutButtonView
})

// --- exports ------------------------------------------------------

export default LogoutButton
