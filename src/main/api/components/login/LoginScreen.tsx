import Css from '../styling/Css'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isNode, isElementOfType, withChildren } from 'js-react-utils'
import { ITheme } from 'office-ui-fabric-react'
import { Spec } from 'js-spec'
import Color from 'color'

function getStyles({ theme }: { theme: ITheme }): Object { // TODO
  const
    gradientStartColor = Color(theme.palette.themePrimary).lighten(0.2).desaturate(0.4),
    gradientEndColor = Color(theme.palette.themePrimary).darken(0.2).desaturate(0.4)

  return {
    outerContainer: {
      position: 'absolute',
      display: 'block',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundImage: `linear-gradient(120deg, ${gradientStartColor}, ${gradientEndColor})`
    },

    innerContainer: {
      position: 'relative',
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'middle',
      left: '50%',
      right: '50%',
      top: '30%',
      bottom: '50%',
      transform: 'translate(-50%, -30%)'
    }
  }
}

type LoginScreenContentProps = {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

const Content = defineComponent<LoginScreenContentProps>({
  displayName: 'LoginScreen.Content',

  properties: {
    className: {
      type: String,
      optional: true
    },

    style: {
      //type: Object,
      optional: true
    },

    children: {
      //validate: isNode,
      optional: true
    }
  },

  render() {
    throw new Error('Components of type LoginScreen.Content can only be '
      + 'used as children of LoginScreen')
  }
})

type LoginScreenProps = {
  children?: ReactNode
}

const LoginScreen = defineComponent<LoginScreenProps>({
  displayName: 'LoginScreen',

  properties: {
    children: {
      optional: true, 
      validate: withChildren(Spec.all(isElementOfType(Content)))
    }
  },

  render({ children }) {
    let mainContent: ReactNode = null

    React.Children.forEach(children, ({ type, props }: any) => { // TODO
      const content =
        <div className={props.className} style={props.style}>
          {props.children}
        </div>

      if (type === Content) {
        mainContent = content
      }
    })

    return (
      <Css getStyles={getStyles}>
        {(classes: any) => 
          <div className={classes.outerContainer}>
            <div className={classes.innerContainer}>
              {mainContent}
            </div>
          </div>
        }
      </Css>
    )
  }
})

export default Object.assign(LoginScreen, {
  Content
})
