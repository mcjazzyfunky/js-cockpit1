import Styles from '../styling/Styles'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isNode, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec/dev-only'

type SectorProps = {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

const sectorPropsConfig = {
  className: {
    type: String,
    optional: true
  },

  style: {
    type: Object,
    optional: true
  },

  children: {
    validate: withChildren(Spec.all(isNode)),
    optional: true
  }
}


const
  TopStart = defineSectorComponent('TopStart'),
  TopCenter = defineSectorComponent('TopCenter'),
  TopEnd = defineSectorComponent('TopEnd'),
  MiddleStart = defineSectorComponent('MiddleStart'),
  MiddleCenter = defineSectorComponent('MiddleCenter'),
  MiddleEnd = defineSectorComponent('MiddleEnd'),
  BottomStart = defineSectorComponent('BottomStart'),
  BottomCenter = defineSectorComponent('BottomCenter'),
  BottomEnd = defineSectorComponent('BottomEnd')

type BorderLayoutProps = {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

const styles: Styles = {
  borderLayout: {
    position: 'absolute', // TODO
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },

  top: {
    display: 'flex',
  },

  middle: {
    display: 'flex',
    flex: 1
  },

  bottom: {
    display: 'flex',
  },

  topStart: {
  },

  topCenter: {
    flexGrow: 1,
  },

  topEnd: {
  },

  middleStart: {
    display: 'flex',
  },

  middleCenter: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },

  middleEnd: {
    display: 'flex',
  },

  bottomStart: {
  },

  bottomCenter: {
    flex: 1
  },

  bottomEnd: {
  }
}

const BorderLayout = defineComponent<BorderLayoutProps>({
  displayName: 'BorderLayout',

  properties: {
    className: {
      type: String,
      optional: true
    },

    children: {
      optional: true,
      
      validate: withChildren(Spec.all(isElementOfType([
        TopStart,
        TopCenter,
        TopEnd,
        MiddleStart,
        MiddleCenter,
        MiddleEnd,
        BottomStart,
        BottomCenter,
        BottomEnd
      ]))),
    }
  },

  render: ({ className, style, children }) => {
    let
      topStart: ReactNode = null,
      topCenter: ReactNode  = null,
      topEnd: ReactNode = null,
      middleStart: ReactNode = null,
      middleCenter: ReactNode = null,
      middleEnd: ReactNode = null,
      bottomStart: ReactNode = null,
      bottomCenter: ReactNode = null,
      bottomEnd: ReactNode = null

    React.Children.forEach(children, sector => {
      const { type, props } = sector as any 

      let style = props.style

      if (type === MiddleCenter) {
        style = props.style ? { ...props.style } : {}
        style.height = '100%'
      }

      const content =
        <div className={props.className} style={style}>
          {props.children}
        </div>

      if (type === TopStart) {
        topStart = content
      } else if (type === TopCenter) {
        topCenter = content
      } else if (type === TopEnd) {
        topEnd = content
      } else if (type === MiddleStart) {
        middleStart = content; 
      } else if (type === MiddleCenter) {
        middleCenter = content
      } else if (type === MiddleEnd) {
        middleEnd = content
      } else if (type === BottomStart) {
        bottomStart = content
      } else if (type === BottomCenter) {
        bottomCenter = content
      } else if (type === BottomEnd) {
        bottomEnd = content
      }
    })

    return (
      <div data-component="BorderLayout" className={className} style={style}>
        <div style={styles.borderLayout}>
          { (topStart || topCenter || topEnd) && (
            <div style={styles.top}>
              <div data-sector="top-start" style={styles.topStart}>
                {topStart}
              </div>
              <div data-sector="top-center" style={styles.topCenter}>
                {topCenter}
              </div>
              <div data-sector="top-end" style={styles.topEnd}>
                {topEnd}
              </div>
            </div>)
          }
          { (middleStart || middleCenter || middleEnd) && (
            <div style={styles.middle}>
              <div data-sector="middle-start" style={styles.middleStart}>
                {middleStart}
              </div>
              <div data-sector="middle-center" style={styles.middleCenter}>
                {middleCenter}
              </div>
              <div data-sector="middle-end" style={styles.middleEnd}>
                {middleEnd}
              </div>
            </div>)
          }
          { (bottomStart || bottomCenter || bottomEnd) && (
            <div style={styles.bottom}>
              <div data-sector="bottom-start" style={styles.bottomStart}>
                {bottomStart}
              </div>
              <div data-sector="bottom-center" style={styles.bottomCenter}>
                {bottomCenter}
              </div>
              <div data-sector="bottom-end" style={styles.bottomEnd}>
                {bottomEnd}
              </div>
            </div>)
          }
        </div>
      </div>
    )
  }
})

export default Object.assign(BorderLayout, {
  TopStart,
  TopCenter,
  TopEnd,
  MiddleStart,
  MiddleCenter,
  MiddleEnd,
  BottomStart,
  BottomCenter,
  BottomEnd
})

Object.freeze(BorderLayout)

// ------------------------------------------------------------------

function defineSectorComponent(displayName: string) {
  return defineComponent<SectorProps>({
    displayName,
    properties: sectorPropsConfig,

    render() {
      throw new Error(`Components of type BorderLayout.${displayName} `
        + 'can only be used as direct children of BorderLayout components')
    }
  })
}
