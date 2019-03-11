// external imports
import React, { ReactNode } from 'react'
import { css, Callout, Pivot, PivotItem } from 'office-ui-fabric-react' 
import { FiLoader } from 'react-icons/fi'

// internal imports
import styleAppSelector from './styleAppSelector'
import AppSelectorProps from '../types/AppSelectorProps'
import AppSelectorIcon from './AppSelectorIcon'
import ChevronDownIcon from '../../../../system-icons/ChevronDownIcon'
import CssClassesOf from '../../../../styling/types/CssClassesOf'

// derived imports
type AppSelectorClasses = CssClassesOf<typeof styleAppSelector>

// --- renderAppSelector --------------------------------------------

function renderAppSelector(props: AppSelectorProps) {
  return styleAppSelector(classes =>
    <div data-component="AppSelector" className={classes.container}>
      <div data-component="AppSelector:inner" className={classes.inner}>
        <div className={classes.icon}>
          <AppSelectorIcon/>
        </div>
        {
          props.showCallout
            ? renderWithCallout(props, classes)
            : renderDefault(props, classes)
        }
      </div>
    </div>)
}

function renderDefault(props: AppSelectorProps, classes: AppSelectorClasses) {
  return (
    <Pivot>
      {
        props.apps.map((app, i) => 
          <PivotItem key={i} headerText={app.title}/>
        )
      }
    </Pivot>
  )
}

function renderWithCallout(props: AppSelectorProps, classes: AppSelectorClasses) {
  const
    ref = React.useRef(null),
    [calloutVisible, setCalloutVisible] = React.useState(false),
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

  return (
    <div onClick={() => setCalloutVisible(true)}>
      <div ref={ref}>
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
}

// --- experts ------------------------------------------------------

export default renderAppSelector
