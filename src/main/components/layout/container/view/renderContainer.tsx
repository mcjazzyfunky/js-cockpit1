// externals imports
import React, { ReactNode } from 'react'

// internal imports
import ContainerProps from '../types/ContainerProps'

// --- renderHBox ---------------------------------------------------

function renderContainer(props: ContainerProps) {
  const
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
    <div data-component="Container" style={{ flexGrow: props.grow, flexShrink: props.shrink }}>
      <div style={{ ...props.style, height: '100%', display: 'flex', alignItems, justifyContent }} className={props.className}>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

// --- exports -----------------------------------------------------

export default renderContainer
