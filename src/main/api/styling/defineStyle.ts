// TODO - please fix this mess

import React, { ComponentType, StatelessComponent } from 'react'
import { classNamesFunction, customizable } from 'office-ui-fabric-react'

const getClasses = classNamesFunction()

let styleId = 0

function defineStyle(styles: any): ComponentType<any>
function defineStyle(getStyles: any): ComponentType<any>
function defineStyle(arg: any): ComponentType<any> {
  let ret: any

  if (typeof arg == 'function') {
    const
      render = ({ props, theme, children }: any): any => {
        const classes = getClasses(arg, { props, theme })

        return children(classes)  
      }

    ret = customizable('Classes', ['theme', 'props'])(render)
  } else {
    let classes: any = null

    ret = ({ children }: any) => {
      if (!classes) {
        classes = getClasses(() => arg)
      }

      return children(classes)
    }
  } 
  
  ret.displayName = 'Style-' + (++styleId)
  
  return ret
}

export default defineStyle
