// external imports
import React from 'react'
//import { IoMdPerson as DefaultAvatarIcon } from 'react-icons/io'
import { FiUser as DefaultAvatarIcon } from 'react-icons/fi'

// internal imports
import getUserMenuClasses from './getUserMenuClasses'
import UserMenuProps from '../types/UserMenuProps'

// --- UserMenuView -------------------------------------------------

function UserMenuView(props: UserMenuProps) {
  const classes = getUserMenuClasses()
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
}

// --- exports ------------------------------------------------------

export default UserMenuView
