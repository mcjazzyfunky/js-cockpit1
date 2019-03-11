// external imports
import React, { ReactNode } from 'react'
import { css, Callout } from 'office-ui-fabric-react' 
import { FiLoader } from 'react-icons/fi'

// internal imports
import styleAppSelector from './styleAppSelector'
import AppSelectorProps from '../types/AppSelectorProps'
import AppSelectorIcon from './AppSelectorIcon'
import ChevronDownIcon from '../../../../system-icons/ChevronDownIcon'

// --- renderAppSelector --------------------------------------------

function renderAppSelector(props: AppSelectorProps) {
  const
    ref = React.useRef(null),
    [calloutVisible, setCalloutVisible] = React.useState(false)
  
  return styleAppSelector(classes => {
    const
      calloutContent: ReactNode[] = []

    for (let i = 0; i < props.apps.length; ++i) {
      const app = props.apps[i]

      calloutContent.push(
        <div key={app.id} className={classes.appLink}>
          <div className={classes.appLinkTitle}>
            {app.title}
          </div>
          {
            app.description &&
              <div className={classes.appLinkDescription}>
                {app.description}
              </div>
          }
        </div>)
    }

    return styleAppSelector(classes =>
      <div className={classes.container} onClick={() => setCalloutVisible(true)}>
        <div ref={ref}>
          <div className={classes.icon}>
              <AppSelectorIcon/>
          </div>
          <label className={classes.label}>
            Web Shop 
          </label>
          <ChevronDownIcon/>
        </div>
        <Callout
          target={ ref.current }
          hidden={!calloutVisible}
          className={classes.callout}
          gapSpace={1}
          setInitialFocus={true}
          onDismiss={() => setCalloutVisible(false)}
        >
        { calloutContent } 
        </Callout>
      </div>
    )
  })
}

// --- experts ------------------------------------------------------

export default renderAppSelector
