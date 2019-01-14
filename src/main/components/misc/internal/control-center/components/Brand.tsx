// internal imports
import defineStyle from '../../../../../styling/defineStyle'

// external imports
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isNode } from 'js-react-utils'
import { css } from 'office-ui-fabric-react' 
import { Spec } from 'js-spec/dev-only'
import { FiLoader } from 'react-icons/fi'

// --- Brand --------------------------------------------------------

const styleBrand = defineStyle(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  firstColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 7px',
  },

  vendor: {
    fontSize: theme.fonts.smallPlus.fontSize,
    padding: 0,
    margin: 0,
  },

  vendorLarge: {
    fontSize: theme.fonts.medium.fontSize + ' !important',
  },

  title: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    padding: 0,
    margin: '-1px 0 0 0',
    lineHeight: '1.25rem',
  },

  titleLarge: {
    fontSize: theme.fonts.large.fontSize + ' !important',
    margin: 0
  },

  logo: {
    width: '24px',
    height: '24px',
  },

  logoLarge: {
    width: '24px',
    height: '24px',
  },
}))

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  size?: 'medium' | 'large',
  className?: string,
  style?: CSSProperties
}

export default defineComponent<BrandProps>({
  displayName: 'Brand',

  properties: {
    logo: {
      nullable: true,
      validate: isNode,
    },

    vendor: {
      type: String
    },

    title: {
      type: String
    },

    size: {
      type: String,
      validate: Spec.oneOf('medium', 'large'),
      defaultValue: 'medium'
    },

    className: {
      type: String
    },

    style: {
      type: Object,
    }
  },

  render({ logo, vendor, title, size, className, style }) {
    return styleBrand(classes => {
      const
        isLarge = size === 'large',

        vendorClassName =
          css(classes.vendor, isLarge ? classes.vendorLarge : null),
        
        titleClassName =
          css(classes.title, isLarge ? classes.titleLarge : null),

        logoClassName =
          css(classes.logo, isLarge ? classes.logoLarge : null)


      let
        firstColumnContent = null,
        secondColumnContent = null

      if (vendor) {
        secondColumnContent =
          <div key="vendor" className={vendorClassName}>
            {vendor}
          </div>
      }

      if (title) {
        const titleContent =
          <div key="title" className={titleClassName}>
            {title}
          </div>

        if (!secondColumnContent) {
          secondColumnContent = titleContent
        } else {
          secondColumnContent =
            <React.Fragment>
              {secondColumnContent}
              {titleContent}
            </React.Fragment>
        }
      }
     
      firstColumnContent =
        <div className={classes.logo}>
          {logo  ||<FiLoader className={logoClassName}/>}
        </div>

      return (
        <div className={className} style={style}>
          <div className={classes.container}>
            <div className={classes.firstColumn}>
                {firstColumnContent}
            </div>
            <div className={classes.secondColumn}>
              {secondColumnContent}
            </div>
          </div>
        </div>
      )
    })
  }
})
