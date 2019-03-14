// externals imports
import React, { ReactNode } from 'react'

// internal imports
import HBoxProps from '../types/HBoxProps'

// --- renderHBox ---------------------------------------------------

function renderHBox(props: HBoxProps) {
  return (
    <div data-component="HBox" className={props.className} style={props.style}>
      <div style={{ display: 'flex' }}>
        {props.children}
      </div>
    </div>
  )
}

// --- exports -----------------------------------------------------

export default renderHBox
