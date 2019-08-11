// TODO - please fix this mess

import React, { ReactNode, CSSProperties  } from 'react'
import { ITheme, classNamesFunction, customizable } from 'office-ui-fabric-react'


let styleId = 0

type Styles = {
  [name: string]: any, // TODO!!!
}

type Classes<S extends Styles> = {
  [name in keyof S]: string
}

type Return<S extends Styles> =
  (f: (classes: Classes<S>) => ReactNode) => ReactNode


function defineStyle<S extends Styles>(getStyles: (theme: ITheme, props?: any) => S): Return<S>
function defineStyle<S extends Styles>(styles: S): Return<S>
function defineStyle(arg: any): any {
  let StyleComponent: any
  const getClasses = classNamesFunction()

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
  
  return (f: (classes: any) => any) =>
    React.createElement(StyleComponent, null, (classes: any) => f(classes))
}

export default defineStyle
