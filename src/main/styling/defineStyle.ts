// TODO - please fix this mess

import React, { ComponentType, StatelessComponent } from 'react'
import { IStyle, ITheme, classNamesFunction, customizable } from 'office-ui-fabric-react'

const getClasses = classNamesFunction()

let styleId = 0

function defineStyle(styles: any): any
function defineStyle(getStyles: (theme: ITheme, props?: any) => any): any
function defineStyle(arg: any): any {
  let StyleComponent: any

  if (typeof arg == 'function') {
    const
      render = ({ props, theme, children }: any): any => {
        const classes = getClasses((params: any) => arg(params.theme, params.props), { props, theme })

        return children(classes)  
      }

    StyleComponent = customizable('Classes', ['theme', 'props'])(render)
  } else {
    let classes: any = null

    StyleComponent = ({ children }: any) => {
      if (!classes) {
        classes = getClasses(() => arg)
      }

      return children(classes)
    }
  } 
  
  StyleComponent.displayName = 'Style-' + (++styleId)
  
  return (f: (classes: any) => any): any =>
    React.createElement(StyleComponent, null, (classes: any) => f(classes))
}

export default defineStyle
