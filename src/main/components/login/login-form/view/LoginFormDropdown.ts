// external imports
import React from 'react'
import { component } from 'js-react-utils'

// internal imports
import LoginFormDropdownView from './LoginFormDropdownView'

// --- LoginFormDropdown ---------------------------------------------

const LoginFormDropdown = component({
  displayName: 'LoginFormDropdownField',
  memoize: true,
  render: LoginFormDropdownView
})

// --- exports -------------------------------------------------------

export default LoginFormDropdown
