// external imports
import React, { ReactNode } from 'react'
import { ITheme } from 'office-ui-fabric-react'
import Color from 'color'

// internal imports
import ControlCenter from './ControlCenter'
import ControlCenterProps from './ControlCenterProps'
import defineStyle from '../../../styling/defineStyle'
import LogoutIcon from './internal/icons/LogoutIcon'

// --- styles for ControlCenter -------------------------------------

const styleControlCenter = defineStyle((theme: ITheme) => {
  return {
    controlCenter: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '100%',
      position: 'absolute',
      height: '100%',
      justifyContent: 'stretch',
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      height: '46px',
      minWidth: '100%',
      color: '#f0f0f0',
      backgroundColor: 'rgb(50,50,50)' 
    },

    headerStart: {
      padding: '0.1rem 0.5rem',
      whiteSpace: 'nowrap',
    },

    headerCenter: {
      flexGrow: 1,
      padding: '0 2rem 0.2rem 4rem',
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

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
    },

    sideNav: {
      display: 'flex',

      selectors: {
        '> div': {
          flexGrow: 1
        }
      }
    },

    mainContent: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      
      selectors: {
        '> div': {
          flexGrow: 1
        }
      }
    },

    logoutButton: {
      color: theme.palette.white,
      backgroundColor: theme.palette.themePrimary,
      border: 'none',
      width: '46px',
      height: '46px',
      textAlign: 'center',
      verticalAlign: 'middle',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      //borderWidth: '0 0 0 0.5px',
      //borderStyle: 'solid',
      //borderColor: Color(theme.palette.themePrimary).lighten(0.5),
     
      selectors: {
        '&:hover': {
          backgroundColor: Color(theme.palette.themePrimary).darken(0.2)
        },
 
        '&:active': {
          backgroundColor: Color(theme.palette.themePrimary).darken(0.1)
        }
      }
    }
  }
})

// --- ControlCenterView --------------------------------------------

function ControlCenterView(props: ControlCenterProps) {
  const
    onLogout = React.useCallback(
      () => props.onLogout ? props.onLogout() : null, [props.onLogout])

  let
    brand: ReactNode = null,
    topNav: ReactNode = null,
    userNav: ReactNode = null,
    menu: ReactNode = null,
    sideNav: ReactNode = null,
    mainContent: ReactNode = null,
    logoutButton: ReactNode = null

  const getContent = (child: any, type: any) => {
    let ret = null

    if (child && child.type === type
      && child.hasOwnProperty('props')
      && child.props && child.props.children) {

      ret =
        <div
          className={child.props.chlassName}
          style={child.props.style}
        >
          {child.props.children}
        </div>
    }

    return ret
  }

  React.Children.forEach(props.children, (child: any) => {
    brand = brand || getContent(child, ControlCenter.Brand)
    topNav = topNav || getContent(child, ControlCenter.TopNav)
    userNav = userNav || getContent(child, ControlCenter.UserNav)
    menu = menu || getContent(child, ControlCenter.Menu)
    sideNav = sideNav || getContent(child, ControlCenter.SideNav)
    mainContent = mainContent || getContent(child, ControlCenter.MainContent)
  })

  return styleControlCenter(classes => {
    if (props.onLogout) {
      logoutButton =
        <button className={classes.logoutButton}>
          <LogoutIcon/> 
        </button>
    }

    return (
      <div className={classes.controlCenter}>
        <div className={classes.header}>
          <div className={classes.headerStart}>
            {brand}
          </div>
          <div className={classes.headerCenter}>
            {topNav}
          </div>
          <div className={classes.headerEnd}>
            {userNav}
            {logoutButton}
          </div>
        </div>
        <div>
          {menu}
        </div>
        <div className={classes.content}>
          <div className={classes.sideNav}>
            {sideNav}
          </div>
          <div className={classes.mainContent}>
            {mainContent}
          </div>
        </div>
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default ControlCenterView 
