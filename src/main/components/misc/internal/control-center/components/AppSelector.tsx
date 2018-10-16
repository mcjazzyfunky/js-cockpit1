// internal imports
import defineStyle from '../../../../../styling/defineStyle'
import AppsIcon from '../icons/AppsIcon'
import ChevronDownIcon from '../../../../../system-icons/ChevronDownIcon'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { ITheme, Callout, CommandBar } from 'office-ui-fabric-react'
import { Spec } from 'js-spec'
import { MdCancel } from 'react-icons/md'

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
  },

  callout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    minWidth: '300px',
    minHeight: '200px',
    padding: '1px',
  },

  calloutContent: {
    flexGrow: 1,
    alignSelf: 'stretch'
  },

  appLink: {
    margin: '6px 6px',
    padding: '4px 8px',
    color: theme.palette.black,
    cursor: 'pointer',

    selectors: {
      ':hover': {
        color: theme.palette.themeDarker,
        backgroundColor: theme.palette.themeLight,
      }
    }
  },

  appLinkIcon: {
    display: 'inline-block',
    width: '0px',
    overflow: 'hidden',
  },

  appLinkTitle: {
    display: 'inline-block',
    fontSize: theme.fonts.mediumPlus.fontSize,
  },

  appLinkDescription: {
    display: 'block',
    margin: '0',
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

  base: class extends React.Component<AppSelectorProps, AppSelectorState> {
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
              <div className={classes.appLinkIcon}>
                <AppsIcon/>
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

        return styleAppSelector(classes =>
          <div className={classes.container}>
            <div ref={(it: any) => this._ref = it}>
              <div className={classes.icon}>
                  <AppsIcon/>
              </div>
              <label className={classes.label} onClick={() => this.setState(state => ({ calloutVisible: true }))}>
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
              <div className={classes.calloutContent}>
                { calloutContent } 
              </div>
              <CommandBar
                items={[]}

                farItems={[
                  {
                    text: 'Close',
                    key: '1',
                    onRenderIcon: () => <MdCancel/>,
                    onClick: () => this._closeCallout()
                  }
                ]}
              />
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
