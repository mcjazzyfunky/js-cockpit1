// externals imports
import React, { ReactNode } from 'react'

// internal imports
import styleSection from './styleSection'
import SectionProps from '../types/SectionProps'

// derived imports


// --- renderSection ------------------------------------------------

function renderSection(props: SectionProps) {
  return (
    styleSection(classes =>
      <div className={classes.container}>
        {renderLabel(props)}
        <div className={classes.content}>
          {props.children}
        </div>
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

function renderLabel(props: SectionProps) {
  let ret: ReactNode = null

  if (typeof props.title === 'string' && props.title.trim().length > 0) {
    ret =
      <div>
        {props.title}
      </div>
  }

  return ret
}

// --- exports -----------------------------------------------------

export default renderSection
