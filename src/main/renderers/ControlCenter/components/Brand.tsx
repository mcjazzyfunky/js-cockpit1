import DefaultLogo from '../icons/DefaultLogo'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isNode } from 'js-react-utils'
import defineStyle from '../../../api/styling/defineStyle'

const BrandStyle = defineStyle({
  container: {
    display: 'table',
    margin: 0,
    padding: 0
  },

  vendor: {
    fontSize: '0.75rem',
    padding: 0,
    margin: 0,
  },

  title: {
    fontSize: '1.125rem',
    padding: 0,
    margin: '-1px 0 0 0',
    lineHeight: '1.25rem',
  },

  logo: {
    fontSize: '1rem'
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
})

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  className?: string,
  style?: CSSProperties
}

export default defineComponent<BrandProps>({
  displayName: 'Brand',

  properties: {
    logo: {
      nullable: true,
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

  render({ logo, vendor, title, className, style }) {
    return (
      <BrandStyle>
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
              <div className={classes.logo}>
                {logo  ||<DefaultLogo/>}
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
      </BrandStyle>
    )
  }
})
