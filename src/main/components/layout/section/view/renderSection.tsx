// externals imports
import React, { ReactNode } from 'react'
import { isElement, isElementOfType } from 'js-react-utils'

// internal imports
import styleSection from './styleSection'
import SectionProps from '../types/SectionProps'
import CssClassesOf from '../../../../styling/types/CssClassesOf'
import Compound from '../../compound/Compound'

// derived imports
const { cloneElement, createElement: h, Children, Fragment } = React
type SectionClasses = CssClassesOf<typeof styleSection>

// --- renderSection ------------------------------------------------

function renderSection(props: SectionProps) {
  const compact = true

  return (
    styleSection(classes =>
      <div className={classes.container}>
        {renderLabel(props, classes)}
        {
          compact
            ? renderCompactContent(props, classes)
            : renderContent(props, classes)
        }
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

function renderContent(props: SectionProps, classes: SectionClasses) {
  return (
    <div className={classes.content}>
      {props.children}
    </div>
  )
}

function renderCompactContent(props: SectionProps, classes: SectionClasses) {
  const tableRows = Children.map(props.children, child => {
    let
      label: any = null,
      node: any = child

    if (isElementOfType(Compound, node)) {
      const subNodes: any[] = []

      Children.forEach(node.props.children, (child2, idx) => {
        let
          label2: any,
          node2: any

        if (isElement(child2) && child2.props.label) {
          label2 = child2.props.label

          if (idx === 0) {
            label = label2
          } else {
            subNodes.push(label2)
          }

          node2 = cloneElement(child2, { label: undefined })
        } else {
          node2 = child2
        }

        subNodes.push(node2)
      })

      node = <Compound>{subNodes}</Compound>
    } else if (node && node.props && node.props.label) {
      label = node.props.label
      node = cloneElement(node, { label: undefined })
    }

    console.log('label', label)
    console.log('node', node)

    return (
      <tr>
        <td>{label}</td>
        <td>{node}</td>
      </tr>
    )
  })

  return (
    <table>
      <tbody>
        {tableRows} 
      </tbody>
    </table>
  )
}
// --- exports -----------------------------------------------------

export default renderSection
