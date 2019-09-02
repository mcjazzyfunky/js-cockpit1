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
      <div data-component="LogoutButton">
        <button className={classes.logoutButton}>
          <LogoutIcon/>
        </button>
      </div>
    )
  })
})

// --- exports ------------------------------------------------------

export default LogoutButtonView
