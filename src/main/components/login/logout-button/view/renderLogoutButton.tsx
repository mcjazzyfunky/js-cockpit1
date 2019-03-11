// external imports
import React from 'react'

// internal imports
import styleUserMenu from './styleLogoutButton'
import LogoutButtonProps from '../types/LogoutButtonProps'
import LogoutIcon from './LogoutIcon'

// --- renderUserMenu -----------------------------------------------

function renderLogoutButton(props: LogoutButtonProps) {
  return styleUserMenu(classes => {
    return (
      <button className={classes.logoutButton}>
        <LogoutIcon/>
      </button>
    )
  })
}

// --- exports ------------------------------------------------------

export default renderLogoutButton
