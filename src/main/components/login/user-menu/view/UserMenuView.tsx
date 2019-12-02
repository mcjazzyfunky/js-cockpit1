// external imports
import React from 'react'
import { FiUser as DefaultAvatarIcon } from 'react-icons/fi'

// internal imports
import getUserMenuClasses from './getUserMenuClasses'
import UserMenuViewProps from '../types/UserMenuViewProps'

// --- UserMenuView --------------------------------------------------

function UserMenuView({
  fullName,
  username
}: UserMenuViewProps) {
  const classes = getUserMenuClasses()
  return (
    <div data-component="UserMenu" className={classes.root}>
      <div>
        <DefaultAvatarIcon className={classes.avatar}/>
      </div>
      <div className={classes.displayName}>
        { fullName ? fullName : username || '???'}
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default UserMenuView
