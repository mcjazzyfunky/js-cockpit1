// externals imports
import React, { ReactNode } from 'react'

// internal imports
import HBoxProps from './HboxProps'

// --- HBoxView -----------------------------------------------------

function HBoxView(props: HBoxProps) {
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
          <div data-component="HBox.Cell" style={{ flexGrow: props.grow, flexShrink: props.shrink }}>
            <div style={{ ...props.style, height: '100%', display: 'flex', alignItems, justifyContent }} className={props.className}>
              <div>
                {props.children}
              </div>
            </div>
          </div>
        )
      }),

    container: ReactNode =
      <div style={{ display: 'flex' }}>
        {cells}
      </div>

  return (
    <div data-component="HBox" className={props.className} style={props.style}>
      {container}
    </div>
  )
}

// --- expports -----------------------------------------------------

export default HBoxView
