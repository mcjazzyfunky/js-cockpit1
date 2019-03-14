// externals imports
import React, { ReactNode } from 'react'

// internal imports
import CompoundProps from '../types/CompoundProps'

// --- Compound -----------------------------------------------------

function renderCompound(props: CompoundProps) {
  return (
    <div data-component="Compound" className={props.className} style={props.style}>
      <div style={{ display: 'flex' }}>
        {props.children}
      </div>
    </div>
  )
}

// --- exports -----------------------------------------------------

export default renderCompound
