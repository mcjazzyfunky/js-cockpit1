// externals imports
import React, { ReactNode } from 'react'

// internal imports
import styleSection from './styleSection'
import SectionProps from '../types/SectionProps'
import CssClassesOf from '../../../../styling/types/CssClassesOf'

// derived imports
type SectionClasses = CssClassesOf<typeof styleSection>

// --- renderSection ------------------------------------------------

function renderSection(props: SectionProps) {
  return (
    styleSection(classes =>
      <div className={classes.container}>
        {renderLabel(props, classes)}
        <div className={classes.content}>
          {props.children}
        </div>
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

function renderLabel(props: SectionProps, classes: SectionClasses) {
  let ret: ReactNode = null

  if (typeof props.title === 'string' && props.title.trim().length > 0) {
    ret =
      <div className={classes.title}>
        {props.title}
      </div>
  }

  return ret
}

// --- exports -----------------------------------------------------

export default renderSection
