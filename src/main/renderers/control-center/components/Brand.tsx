import DefaultAppIcon from '../../../internal/components/icons/DefaultAppIcon'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isNode } from 'js-react-utils'
import defineStyle from '../../../api/styling/defineStyle'

const Style = defineStyle(() => {
  return {
    container: {
      display: 'table',
      margin: 0,
      padding: 0
    },

    icon: {
      fontSize: '1rem'
    },
    
    vendor: {
      fontSize: '0.875rem',
      padding: 0,
      margin: 0,
    },

    title: {
      fontSize: '1.125rem',
      padding: 0,
      lineHeight: '1.25rem',
    },

    cells: {
      display: 'table-row'
    },

    cellLeft: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '0.25rem 0.5rem 0 0',
      overflow: 'hidden'
    },

    cellRight: {
      display: 'table-cell',
      padding: '0.125rem 0',
      textAlign: 'left',
      verticalAlign: 'middle'
    }
  }
})

type Props = {
  icon?: ReactNode,
  vendor?: string,
  title?: string,
  className?: string,
  style?: CSSProperties
}

export default defineComponent<Props>({
  displayName: 'Brand',

  properties: {
    icon: {
      validate: isNode
    },

    vendor: {
      type: String
    },

    title: {
      type: String
    },

    className: {
      type: String
    },

    style: {
      type: Object,
    }
  },

  render({ icon, vendor, title, className, style }) {
    return (
      <Style>
        {
          (classes: any) => { // TODO
            let
              leftContent = null,
              rightContent = null

            if (vendor) {
              rightContent =
                <div key="vendor" className={classes.vendor}>
                  {vendor}
                </div>
            }

            if (title) {
              const titleContent =
                <div key="title" className={classes.title}>
                  {title}
                </div>

              if (!rightContent) {
                rightContent = titleContent
              } else {
                rightContent =
                  <React.Fragment>
                    {rightContent}
                    {titleContent}
                  </React.Fragment>
              }
            }
            
            leftContent =
              <div className={classes.icon}>
                {icon  ||<DefaultAppIcon/>}
              </div>

            return (
              <div className={className} style={style}>
                <div className={classes.container}>
                  <div className={classes.cells}>
                    <div className={classes.cellLeft}>
                      {leftContent}
                    </div>
                    <div className={classes.cellRight}>
                      {rightContent}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </Style>
    )
  }
})
