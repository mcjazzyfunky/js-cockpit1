// external imports
import React from 'react'

// internal imports
import LogoutButtonViewProps from '../types/LogoutButtonViewProps'
import LogoutIcon from './LogoutIcon'
import getLogoutButtonClasses from './getLogoutButtonClasses'
import ActionEvent from '../../../../events/ActionEvent'

// derived imports
const { useCallback } = React

// --- LogoutButtonView ---------------------------------------------

function LogoutButtonView({
  onAction
}: LogoutButtonViewProps) {
  const
    classes = getLogoutButtonClasses(),

    onClick = useCallback(() => {
      if (onAction) {
        onAction(logoutActionEvent)
      }
    }, [onAction])

  return (
    <div data-component="LogoutButton" className={classes.root}>
      <button className={classes.button} onClick={onClick}>
        <LogoutIcon/>
      </button>
    </div>
  )
}

// --- locals -------------------------------------------------------

const logoutActionEvent: ActionEvent = Object.freeze({
  type: 'action',
  kind: 'logout',
  id: null
})

// --- exports ------------------------------------------------------

export default LogoutButtonView
