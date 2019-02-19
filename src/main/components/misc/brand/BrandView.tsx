// external imports
import React from 'react'
import { css } from 'office-ui-fabric-react' 
import { FiLoader  as DefaultLogo } from 'react-icons/fi'

// internal imports
import BrandProps from './BrandProps'
import defineStyle from '../../../styling/defineStyle'

// --- style of Brand -----------------------------------------------

const styleBrand = defineStyle(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },

  firstColumn: {
    justify: 'stretch',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    margin: '0 0 0 2px',
  },
  
  vendorHuge: {
    fontSize: theme.fonts.mediumPlus.fontSize + ' !important',
    margin: '0 0 0 8px', 
  },

  title: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    padding: 0,
    margin: '-3px 0 0 0',
    lineHeight: '1.25rem',
  },

  titleLarge: {
    fontSize: theme.fonts.large.fontSize + ' !important',
    margin: '-3px 0 0 2px',
  },
  
  titleHuge: {
    fontSize: theme.fonts.xLarge.fontSize + ' !important',
    margin: '-1px 0 0 8px', 
  },

  logo: {
    width: '24px',
    height: '24px',
    padding: '1px 0 0 0',
  },

  logoLarge: {
    width: '28px',
    height: '28px',
    padding: 0
  },

  logoHuge: {
    width: '32px',
    height: '32px',
    padding: 0
  },
}))

// --- BrandView ----------------------------------------------------

function BrandView(props: BrandProps) {
  return styleBrand(classes => {
    const
      size = props.size,
      sizePascalCase = size[0].toUpperCase() + size.substring(1),
      vendorClassName: string = css(classes.vendor, (classes as any)[`vendor${sizePascalCase}`]),
      titleClassName: string = css(classes.title, (classes as any)[`title${sizePascalCase}`]),
      logoClassName: string = css(classes.logo, (classes as any)[`logo${sizePascalCase}`])

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
        {props.logo  || <DefaultLogo className={logoClassName}/>}
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
