// internal imports
import LoginFormProps from './LoginFormProps'
import LoginFormStore from './LoginFormStore'

// --- LoginFormViewProps -------------------------------------------

type LoginFormViewProps =
  LoginFormProps & { store: LoginFormStore }

// --- exports ------------------------------------------------------

export default LoginFormViewProps
