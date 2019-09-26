// external imports
import React, { ReactNode } from 'react'
import { Callout, Pivot, PivotItem } from 'office-ui-fabric-react' 

// internal imports
import getAppMenuClasses from './getAppMenuClasses'
import AppMenuIcon from './AppMenuIcon'
import ChevronDownIcon from '../../../../system-icons/ChevronDownIcon'
import AppMenuProps from '../types/AppMenuProps'

// derived imports
type AppMenuClasses = ReturnType<typeof getAppMenuClasses>

// --- AppMenuView --------------------------------------------------

function AppMenuView(props: AppMenuProps) {
  const classes = getAppMenuClasses()

  return (
    <div data-component="AppMenu" className={classes.container}>
      <div data-component="AppMenu:inner" className={classes.inner}>
        <div className={classes.icon}>
          <AppMenuIcon/>
        </div>
        {
          props.showCallout
            ? renderWithCallout(props, classes)
            : renderDefault(props, classes)
        }
      </div>
    </div>
  )
}

function renderDefault(props: AppMenuProps, classes: AppMenuClasses) {
  return (
    <Pivot>
      {
        props.items.map((item, i) => 
          <PivotItem key={i} headerText={item.title}/>
        )
      }
    </Pivot>
  )
}

function renderWithCallout(props: AppMenuProps, classes: AppMenuClasses) {
  const
    ref = React.useRef(null),
    [calloutVisible, setCalloutVisible] = React.useState(false),
    calloutContent: ReactNode[] = []

  for (let i = 0; i < props.items.length; ++i) {
    const app = props.items[i]

    calloutContent.push(
      <div key={app.id} className={classes.appLink}>
        <div className={classes.iconInCallout}>
          <AppMenuIcon/>
        </div>
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
    <div onClick={() => setCalloutVisible(true)} className={classes.label}>
      <div ref={ref}>
        <label className={classes.label}>
          {props.items[0].title}
        </label>
        <ChevronDownIcon/>
      </div>
      <Callout
        target={ ref.current }
        hidden={!calloutVisible}
        className={classes.callout}
        gapSpace={7}
        setInitialFocus={true}
        onDismiss={() => setCalloutVisible(false)}
      >
      { calloutContent } 
      </Callout>
    </div>
  )
}

// --- experts ------------------------------------------------------

export default AppMenuView
