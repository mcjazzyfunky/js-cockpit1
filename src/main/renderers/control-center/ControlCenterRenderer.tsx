import React, { SFC } from 'react'
import { defineComponent } from 'js-react-utils'
import defineRenderer from '../defineRenderer'
import { ControlCenterModel } from '../../api/components/control-center/ControlCenter'
import Brand from './components/Brand'
import defineStyle from '../../api/styling/defineStyle'
import { css, ITheme, getNativeProps } from 'office-ui-fabric-react'
import DefaultAvatar from './icons/DefaultAvatar'
import LogoutIcon from './icons/LogoutIcon'
import Color from 'color'

const ControlCenterStyle: React.ComponentType<any> = defineStyle((theme: ITheme) => {
  return {
    controlCenter: {
      width: '100%'
    },

    header: {
      display: 'flex',
      width: '100%',
      color: theme.palette.white,
      backgroundColor: theme.palette.themePrimary
    },

    headerStart: {
      padding: '0.1rem 0.3rem'
    },

    headerCenter: {
      flexGrow: 1,
      padding: '0.2rem 2rem 0.2rem 4rem'
    },

    headerEnd: {
      display: 'flex',
      alignItems: 'center',

      selectors: {
        '& > *': {
          marginLeft: '0.7rem'
        }
      }
    },
  }
})

function render(model: ControlCenterModel) {
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
                header-center
              </div>
              <div className={classes.headerEnd}>
                { <DefaultAvatar/> }
                { UserMenu({ username: 'Jane Doe' }) }
                { <LogoutButton/> }
              </div>
            </div>
          </div>
      }
    </ControlCenterStyle>
  )
}

// --- exports ------------------------------------------------------

export default defineRenderer(render)

// ------------------------------------------------------------------

type UserMenuProps = {
  username: string
}

const UserMenu: SFC<UserMenuProps> = props => {
  return (
    <div>
      { props.username }
    </div>
  )
}

const LogoutButtonStyle = defineStyle((theme: ITheme) => ({
  button: {
    backgroundColor: Color(theme.palette.themePrimary).darken(0),
    border: 'none',
    width: '40px',
    height: '40px',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderWidth: '0 0 0 1px',
    borderColor: 'white',
    borderStyle: 'dotted',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    selectors: {
      '&:hover': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.4)
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
