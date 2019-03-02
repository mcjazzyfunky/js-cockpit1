// external imports
import React, { ReactNode } from 'react'

// internal imports
import styleCockpit from './styleCockpit'
import Cockpit from '../Cockpit'
import CockpitProps from '../types/CockpitProps'
import LogoutIcon from './LogoutIcon'

// --- renderCockpit ------------------------------------------------

function renderCockpit(props: CockpitProps) {
  const
    onLogout = React.useCallback(
      () => props.onLogout ? props.onLogout() : null, [props.onLogout])

  let
    brand: ReactNode = null,
    topNav: ReactNode = null,
    userNav: ReactNode = null,
    menu: ReactNode = null,
    sideNav: ReactNode = null,
    Center: ReactNode = null,
    logoutButton: ReactNode = null

  const getContent = (child: any, type: any) => {
    let ret = null

    if (child && child.type === type
      && child.hasOwnProperty('props')
      && child.props && child.props.children) {

      ret =
        <div
          className={child.props.chlassName}
          style={child.props.style}
        >
          {child.props.children}
        </div>
    }

    return ret
  }

  React.Children.forEach(props.children, (child: any) => {
    brand = brand || getContent(child, Cockpit.Brand)
    topNav = topNav || getContent(child, Cockpit.TopNav)
    userNav = userNav || getContent(child, Cockpit.UserNav)
    menu = menu || getContent(child, Cockpit.Menu)
    sideNav = sideNav || getContent(child, Cockpit.SideNav)
    Center = Center || getContent(child, Cockpit.Center)
  })

  return styleCockpit(classes => {
    if (props.onLogout) {
      logoutButton =
        <button className={classes.logoutButton}>
          <LogoutIcon/> 
        </button>
    }

    return (
      <div className={classes.cockpit}>
        <div className={classes.header}>
          <div className={classes.headerStart}>
            {brand}
          </div>
          <div className={classes.headerCenter}>
            {topNav}
          </div>
          <div className={classes.headerEnd}>
            {userNav}
            {logoutButton}
          </div>
        </div>
        <div>
          {menu}
        </div>
        <div className={classes.content}>
          <div className={classes.sideNav}>
            {sideNav}
          </div>
          <div className={classes.Center}>
            {Center}
          </div>
        </div>
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default renderCockpit 
