// external imports
import React, { ReactNode } from 'react'
import { css, Callout } from 'office-ui-fabric-react' 
import { FiLoader } from 'react-icons/fi'

// internal imports
import AppSelectorProps from './AppSelectorProps'
import defineStyle from '../../../styling/defineStyle'
import AppsIcon from './internal/AppsIcon'
import ChevronDownIcon from '../../../system-icons/ChevronDownIcon'

// --- style of AppSelector --------------------------------------------

const styleAppSelector = defineStyle(theme => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '42px',
    borderColor: 'white',
    borderWidth: '0 0 0 1px',
    paddingLeft: '1rem',
    cursor: 'pointer',
  },

  icon: {
    display: 'inline-block',
    color: theme.palette.themePrimary,
  },

  label: {
    margin: '0 0.5rem',
    cursor: 'pointer',
  },

  callout: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1px',
    minWidth: '300px',
    boxSizing: 'border-box',
  },

  appLink: {
    margin: '4px 4px',
    padding: '4px 8px',
    color: theme.palette.black,
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralLight,
    cursor: 'pointer',

    selectors: {
      ':first-child': {
        borderTopWidth: 0
      },

      ':hover': {
        color: theme.palette.themeDarker,
        backgroundColor: theme.palette.themeLight,
      }
    }
  },

  appLinkTitle: {
    display: 'inline-block',
    fontSize: theme.fonts.medium.fontSize,
  },

  appLinkDescription: {
    display: 'block',
    fontSize: theme.fonts.smallPlus.fontSize,
    fontStyle: 'italic',
  }
}))

// --- AppSelectorView -------------------------------------------------

function AppSelectorView(props: AppSelectorProps) {
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
              <AppsIcon/>
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

export default AppSelectorView
