// external imports
import { component } from 'js-react-utils'

// internal imports
import LoginFormTextFieldView from './LoginFormTextFieldView'

// --- LoginFormTextField -------------------------------------------

const LoginFormTextField = component({
  displayName: 'LoginFormTextField',
  memoize: true,
  render: LoginFormTextFieldView
})

// --- exports ------------------------------------------------------

export default LoginFormTextField