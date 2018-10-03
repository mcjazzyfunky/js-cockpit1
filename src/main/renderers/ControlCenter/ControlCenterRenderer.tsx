import React, { SFC } from 'react'
import { defineComponent } from 'js-react-utils'
import defineRenderer from '../defineRenderer'
import { ControlCenterModel } from '../../api/components/misc/ControlCenter'
import Brand from './components/Brand'
import defineStyle from '../../api/styling/defineStyle'
import { css, ITheme, Callout, classNamesFunction } from 'office-ui-fabric-react'
import DefaultAvatar from './icons/DefaultAvatar'
import LogoutIcon from './icons/LogoutIcon'
import AppsIcon from './icons/AppsIcon'
import ChevronDownIcon from '../../system-icons/ChevronDownIcon'
import Color from 'color'

const ControlCenterStyle: React.ComponentType<any> = defineStyle((theme: ITheme) => {
  return {
    controlCenter: {
      width: '100%'
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '42px',
      color: theme.palette.white,
      backgroundColor: theme.palette.themePrimary,
    },

    headerStart: {
      padding: '0.1rem 0.3rem',
      whiteSpace: 'nowrap',
    },

    headerCenter: {
      flexGrow: 1,
      padding: '0.2rem 2rem 0.2rem 4rem',
      whiteSpace: 'nowrap',
    },

    headerEnd: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',

      selectors: {
        '& > *': {
          marginLeft: '0.9rem'
        }
      }
    },
  }
})

function render(model: ControlCenterModel) {
  const main =
    model.apps.length === 0
      ? null
      : model.apps[0]

  return (
    <ControlCenterStyle>
      {
        (classes: any) =>
          <div className={classes.controlCenter}>
            <div className={classes.header}>
              <div className={classes.headerStart}>
                <Brand vendor={model.vendor} title={model.title} logo={model.logo}/>
              </div>
              <div className={classes.headerCenter}>
                <AppSelector/>
              </div>
              <div className={classes.headerEnd}>
                { <DefaultAvatar/> }
                { UserMenu({ username: 'Jane Doe' }) }
                { <LogoutButton/> }
              </div>
            </div>
            <div>
              { model.apps.length > 0 ? model.apps[0].content : null }
            </div>
          </div>
      }
    </ControlCenterStyle>
  )
}

// --- exports ------------------------------------------------------

export default defineRenderer(render)

// ------------------------------------------------------------------

const AppSelectorStyle = defineStyle({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    borderColor: 'white',
    borderWidth: '0 0 0 1px',
    paddingLeft: '1rem',
    cursor: 'pointer',

    selectors: {
      '& > *': {
        margin: '0.1rem 0.1rem'
      }
    }
  },

  label: {
    fontSize: '0.9rem',
  }
})

type AppSelectorProps = {
}

const AppSelector = defineComponent<AppSelectorProps>({
  displayName: 'AppSelector',

  render() {
    return (
      <AppSelectorStyle>
        {
          (classes: any) =>
            <div>
              <div className={classes.container}>
                <AppsIcon/>
                <label className={classes.label}>Content Management</label>
                <ChevronDownIcon/>
              </div>
            </div>
        }
      </AppSelectorStyle>
    )
  }
})


// ------------------------------------------------------------------

const UserMenuStyle = defineStyle({
  container: {
    fontSize: '0.875rem'
  }
})

type UserMenuProps = {
  username: string
}

const UserMenu: SFC<UserMenuProps> = props => {
  return (
    <UserMenuStyle>
      {
        (classes: any) =>
          <div className={classes.container}>
            { props.username }
          </div>
      }
    </UserMenuStyle>
  )
}

const LogoutButtonStyle = defineStyle((theme: ITheme) => ({
  button: {
    backgroundColor: Color(theme.palette.themePrimary).darken(0),
    border: 'none',
    width: '42px',
    height: '42px',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderWidth: '0 0 0 1px',
    borderColor: 'white',
    borderStyle: 'dotted',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    
    selectors: {
      '&:hover': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.2)
      },

      '&:active': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.1)
      }
    }
  }
}))

type LogoutButtonProps = {
}

const LogoutButton = defineComponent<LogoutButtonProps>({
  displayName: 'LogoutButton',

  render() {
    return (
      <LogoutButtonStyle>
        {
          (classes: any) => {
            return (
              <a className={classes.button}>
                <LogoutIcon/>
              </a>
            )
          }
        }
      </LogoutButtonStyle>
    )
  }
})
