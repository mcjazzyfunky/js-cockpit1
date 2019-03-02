// external imports
import React from 'react'

// internal imports
import styleUserMenu from './styleUserMenu'
import UserMenuProps from '../types/UserMenuProps'
import DefaultAvatar from './DefaultAvatarIcon'

// --- renderUserMenu -----------------------------------------------

function renderUserMenu(props: UserMenuProps) {
  return styleUserMenu(classes => {
    return (
      <div className={classes.container}>
        <div className={classes.avatar}>
          <DefaultAvatar/>
        </div>
        <div className={classes.displayName}>
          { props.fullName ? props.fullName : props.username || '???'}
        </div>
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default renderUserMenu
