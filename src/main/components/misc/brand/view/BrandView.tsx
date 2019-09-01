// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { css } from 'office-ui-fabric-react' 
import { IoIosApps  as DefaultLogo } from 'react-icons/io'

// internal imports
import styleBrand from './styleBrand'
import BrandViewProps from '../types/BrandViewProps'

// --- BrandView ----------------------------------------------------

const BrandView = component<BrandViewProps>('BrandView', props => {
  return styleBrand(classes => {
    const
      sizePascalCase = !props.size ? null : props.size[0].toUpperCase() + props.size.substring(1),
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
      <div data-component="Brand" className={classes.container}>
        <div className={classes.firstColumn}>
            {firstColumnContent}
        </div>
        <div className={classes.secondColumn}>
          {secondColumnContent}
        </div>
      </div>
    )
  })
})

// --- exports ------------------------------------------------------

export default BrandView
