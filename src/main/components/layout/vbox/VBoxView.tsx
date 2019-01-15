// external imports
import React, { ReactNode } from 'react'

// internal imports
import VBoxProps from './VBoxProps'

// --- VBoxView -----------------------------------------------------

function VBoxView(props: VBoxProps) {
  const
    cells =
      React.Children.map(props.children, child => {
        const
          { props } = child as any,
         
          justifyContent =
            props.horizontalAlign === 'start'
              ? 'flex-start'
              : props.horizontalAlign === 'end'
              ? 'flex-end'
              : 'center',

          alignItems =
            props.verticalAlign === 'top'
              ? 'flex-start'
              : props.verticalAlign === 'bottom'
              ? 'flex-end'
              : 'center'

        return (
          <div data-component="VBox.Cell" style={{ display: 'flex', flexDirection: 'column', flexGrow: props.grow, flexShrink: props.shrink }}>
            <div style={{ ...props.style, width: '100%', display: 'flex', alignItems, justifyContent }} className={props.className}>
              <div>
                {props.children}
              </div>
            </div>
          </div>
        )
      }),

    container: ReactNode =
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {cells}
      </div>

  return (
    <div data-component="VBox" className={props.className} style={props.style}>
      {container}
    </div>
  )
}

// --- exports ------------------------------------------------------

export default VBoxView
