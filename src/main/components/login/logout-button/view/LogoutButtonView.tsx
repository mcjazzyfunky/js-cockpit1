// external imports
import React from 'react'
import { component } from 'js-react-utils'

// internal imports
import LogoutButtonViewProps from '../types/LogoutButtonViewProps'
import LogoutIcon from './LogoutIcon'
import styleUserMenu from './styleLogoutButton'

// --- LogoutButtonView ---------------------------------------------

const LogoutButtonView = component<LogoutButtonViewProps>(
  'LogoutButtonView', props => {

  return styleUserMenu(classes => {
    return (
      <button className={classes.logoutButton}>
        <LogoutIcon/>
      </button>
    )
  })
})

// --- exports ------------------------------------------------------

export default LogoutButtonView
