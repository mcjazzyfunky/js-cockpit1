// external imports
import React, { ReactNode } from 'react'

// internal imports
import VBoxProps from '../types/VBoxProps'

// --- renderVBox ---------------------------------------------------

function renderVBox(props: VBoxProps) {
  return (
    <div data-component="VBox" className={props.className} style={props.style}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {props.children}
      </div>
    </div>
  )
}

// --- exports ------------------------------------------------------

export default renderVBox
