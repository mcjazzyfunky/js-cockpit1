// external imports
import React from 'react'
import { css } from 'office-ui-fabric-react' 
import { FiLoader } from 'react-icons/fi'

// internal imports
import UserMenuProps from './UserMenuProps'
import defineStyle from '../../../styling/defineStyle'
import DefaultAvatar from './internal/DefaultAvatar'

// --- styles of UserMenu -------------------------------------------

const styleUserMenu = defineStyle(theme => ({
  container: {
    display: 'flex',
    adjustItems: 'center',
  },

  avatar: {
    margin: '0 1rem',
  },

  displayName: {
    margin: '0 1rem 0 0',
  }
}))

// --- UserMenuView -------------------------------------------------

function UserMenuView(props: UserMenuProps) {
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

export default UserMenuView
