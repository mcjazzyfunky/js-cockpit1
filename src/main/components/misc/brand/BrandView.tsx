// external imports
import React from 'react'
import { css } from 'office-ui-fabric-react' 
import { FiLoader } from 'react-icons/fi'

// internal imports
import BrandProps from './BrandProps'
import defineStyle from '../../../styling/defineStyle'

// --- style of Brand -----------------------------------------------

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

// --- BrandView ----------------------------------------------------

function BrandView(props: BrandProps) {
  return styleBrand(classes => {
    const
      isLarge = props.size === 'large',

      vendorClassName =
        css(classes.vendor, isLarge ? classes.vendorLarge : null),
      
      titleClassName =
        css(classes.title, isLarge ? classes.titleLarge : null),

      logoClassName =
        css(classes.logo, isLarge ? classes.logoLarge : null)

    let
      firstColumnContent = null,
      secondColumnContent = null

    if (props.vendor) {
      secondColumnContent =
        <div key="vendor" className={vendorClassName}>
          {props.vendor}
        </div>
    }

    if (props.title) {
      const titleContent =
        <div key="title" className={titleClassName}>
          {props.title}
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
        {props.logo  ||<FiLoader className={logoClassName}/>}
      </div>

    return (
      <div className={props.className} style={props.style}>
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

// --- exports ------------------------------------------------------

export default BrandView
