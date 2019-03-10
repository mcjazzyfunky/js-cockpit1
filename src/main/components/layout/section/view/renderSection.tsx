// externals imports
import React, { ReactNode } from 'react'

// internal imports
import styleSection from './styleSection'
import SectionProps from '../types/SectionProps'

// --- renderSection ------------------------------------------------

function renderSection(props: SectionProps) {
  return (
    styleSection(classes =>
      <div>
        <label className={classes.title}>
          {props.title}
        </label>
      </div>
    )
  )
}

// --- exports -----------------------------------------------------

export default renderSection
