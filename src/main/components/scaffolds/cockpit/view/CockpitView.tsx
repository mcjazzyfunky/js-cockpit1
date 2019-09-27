// external imports
import React from 'react'
import { component } from 'js-react-utils'

// internal imports
import getCockpitClasses from './getCockpitClasses'
import CockpitViewProps from '../types/CockpitViewProps'

// --- CockpitView --------------------------------------------------

function CockpitView({
  look = 'default',
  slotBrand,
  slotCenter,
  slotMenu,
  slotSidebar,
  slotTopNav,
  slotUserNav
}: CockpitViewProps) {
  const classes = getCockpitClasses(look)

  const header =
    !slotBrand && !slotTopNav && !slotUserNav
      ? null
      : <div className={classes.header}>
          <div className={classes.headerStart}>
            {slotBrand}
          </div>
          <div className={classes.headerCenter}>
            {slotTopNav}
          </div>
          <div className={classes.headerEnd}>
            {slotUserNav}
          </div>
        </div>

  return (
    <div data-component="Cockpit" className={classes.root}>
      {header}
      <div className={classes.menu}>
        {slotMenu}
      </div>
      <div className={classes.content}>
        <div className={classes.sidebar}>
          {slotSidebar}
        </div>
        <div className={classes.center}>
          {slotCenter}
        </div>
      </div>
    </div>
  )
}

// --- exports ------------------------------------------------------

export default CockpitView 
