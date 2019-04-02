// external imports
import React, { ReactNode } from 'react'

// internal imports
import styleCockpit from './styleCockpit'
import CockpitProps from '../types/CockpitProps'

// --- renderCockpit ------------------------------------------------

function renderCockpit(props: CockpitProps) {
  return styleCockpit(classes => {
    const header =
      !props.slotBrand && !props.slotTopNav && !props.slotUserNav
        ? null
        : <div className={classes.header}>
            <div className={classes.headerStart}>
              {props.slotBrand}
            </div>
            <div className={classes.headerCenter}>
              {props.slotTopNav}
            </div>
            <div className={classes.headerEnd}>
              {props.slotUserNav}
            </div>
          </div>

    return (
      <div data-component="Cockpit" className={classes.container}>
        {header}
        <div>
          {props.slotMenu}
        </div>
        <div className={classes.content}>
          <div className={classes.sidebar}>
            {props.slotSidebar}
          </div>
          <div className={classes.center}>
            {props.slotCenter}
          </div>
        </div>
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default renderCockpit 
