// external imports
import React from 'react'
import { IoMdPerson as DefaultAvatarIcon } from 'react-icons/io'

// internal imports
import styleUserMenu from './styleUserMenu'
import UserMenuProps from '../types/UserMenuProps'

// --- renderUserMenu -----------------------------------------------

function renderUserMenu(props: UserMenuProps) {
  return styleUserMenu(classes => {
    return (
      <div className={classes.container}>
        <div>
          <DefaultAvatarIcon className={classes.avatar}/>
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
