// TODO - please fix this mess

import React, { ComponentType, StatelessComponent } from 'react'
import { classNamesFunction, customizable } from 'office-ui-fabric-react'

const getClasses = classNamesFunction()

let styleId = 0

export default function defineStyle(getStyles: any): ComponentType<any> {
  const
    render = ({ props, theme, children }: any): any => {
      const classes = getClasses(getStyles, { props, theme })
console.log(props, theme)  
      return children(classes as any)  
    },

	  Style: ComponentType<any> = customizable('Classes', ['theme', 'props'])(render as any)
 
  Style.displayName = 'Style-' + (++styleId)
  
  return Style
}
