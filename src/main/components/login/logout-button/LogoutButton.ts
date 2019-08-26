// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import LogoutButtonProps from './types/LogoutButtonProps'
import renderLogoutButton from './view/renderLogoutButton'

// --- LogoutButton -----------------------------------------------------

const LogoutButton = component<LogoutButtonProps>('LogoutButton')
  .validate(
    Spec.checkProps({
      optional: {
        onClick: Spec.function
      }
    })
  )
  .render(renderLogoutButton)

// --- exports ------------------------------------------------------

export default LogoutButton
