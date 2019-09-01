// external imports
import { component } from 'js-react-utils'

// internal imports
import LogoutButtonProps from './types/LogoutButtonProps'
import LogoutButtonView from './view/LogoutButtonView'
import validateLogoutButtonProps from './validation/validateLogoutButtonProps'

// --- LogoutButton -----------------------------------------------------

const LogoutButton = component<LogoutButtonProps>({
  displayName: 'LogoutButton',
  validate: validateLogoutButtonProps,
  render: LogoutButtonView
})

// --- exports ------------------------------------------------------

export default LogoutButton
