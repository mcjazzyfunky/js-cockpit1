// internal imports
import defineStyle from '../../../../../styling/defineStyle'
import AppsIcon from '../icons/AppsIcon'
import ChevronDownIcon from '../../../../../system-icons/ChevronDownIcon'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { ITheme, Callout } from 'office-ui-fabric-react'
import { Spec } from 'js-spec'

// --- AppSelector --------------------------------------------------

const styleAppSelector = defineStyle((theme: ITheme) => ({
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

type AppSelectorProps = {
  apps: {
    id: string,
    title: string,
    description?: string | null
  }[]
}

type AppSelectorState = {
  calloutVisible: boolean
}

const AppSelector = defineComponent<AppSelectorProps>({
  displayName: 'AppSelector',

  properties: {
    apps: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.strictShape({
            id: Spec.string,
            title: Spec.string,
            description: Spec.optional(Spec.string)
          }))
    }
  },

  main: class extends React.Component<AppSelectorProps, AppSelectorState> {
    private _ref: any = null

    constructor(props: AppSelectorProps) {
      super(props)

      this.state = {
        calloutVisible: false
      }
    }

    render() {
      return styleAppSelector(classes => {
        const
          calloutContent: ReactNode[] = []

        for (let i = 0; i < this.props.apps.length; ++i) {
          const app = this.props.apps[i]

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
          <div className={classes.container} onClick={() => this.setState(state => ({ calloutVisible: true }))}>
            <div ref={(it: any) => this._ref = it}>
              <div className={classes.icon}>
                  <AppsIcon/>
              </div>
              <label className={classes.label}>
                Content Management
              </label>
              <ChevronDownIcon/>
            </div>
            <Callout
              target={ this._ref }
              hidden={!this.state.calloutVisible}
              className={classes.callout}
              gapSpace={1}
              setInitialFocus={true}
              onDismiss={() => this._closeCallout()}
            >
            { calloutContent } 
            </Callout>
          </div>
        )
      })
    }

    _closeCallout() {
      this.setState({ calloutVisible: false })
    }
  }
})

// --- experts ------------------------------------------------------

export default AppSelector
