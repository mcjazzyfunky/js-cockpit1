// externals imports
import React, { ReactNode } from 'react'

// internal imports
import CompoundProps from '../types/CompoundProps'

// --- Compound -----------------------------------------------------

function renderCompound(props: CompoundProps) {
  const
    content =
      React.Children.map(props.children, (child, idx)  => {
        const cellStyle: any = { flexGrow: 1 }

        if (idx > 0) {
          cellStyle.marginLeft = '5px'
        }

        return <span style={cellStyle}>{child}</span>
      }),

    style = { ...props.style, flexGrow: 1, display: 'inline-flex' } 
    
  
  return (
    <div data-component="Compound" className={props.className} style={style}>
      <div style={{ display: 'flex' }}>
        {content}
      </div>
    </div>
  )
}

// --- exports -----------------------------------------------------

export default renderCompound
