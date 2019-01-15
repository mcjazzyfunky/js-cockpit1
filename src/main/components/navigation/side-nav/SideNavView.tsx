// externals imports
import React from 'react'
import { Nav, INavLink } from 'office-ui-fabric-react'

// internal imports
import SideNav from './SideNav'
import SideNavProps from './SideNavProps'
import defineStyle from '../../../styling/defineStyle'

// --- styleSideNav -------------------------------------------------

const styleSideNav = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.white,

  },

  navigation: {
    width: '15rem',
    padding: '0 6px',
    margin: '0',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.neutralLighterAlt,
    borderColor: theme.palette.neutralQuaternary,
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',

    selectors: {
      '.ms-Nav-groupContent': {
        backgroundColor: 'transparent',
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '0 !important',
      },
    
      '.ms-Nav-navItems *': {
        backgroundColor: 'transparent !important',
      },

      '& .ms-Nav-chevronButton': {
        fontSize: theme.fonts.mediumPlus.fontSize,
        color: theme.palette.neutralDark,
        backgroundColor: 'transparent',

        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralQuaternaryAlt,
        borderStyle: 'solid',
        marginBottom: '0',

        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight, 
          }
        }
      },
      
      '.ms-Nav-compositeLink.is-expanded': {
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight + ' !important',
          },
          
          ':active': {
            backgroundColor: theme.palette.neutralQuaternary + ' !important',
          }
        }
      },

      '.ms-Nav-navItems': {
        margin: '0.325rem 0 1rem 0',
      },

      '.ms-Nav-compositeLink.is-expanded.is-selected': {
        backgroundColor: theme.palette.neutralLight + ' !important',

        selectors: {
          '*': {
            color: theme.palette.black + ' !important',
            cursor: 'default !important',
          },

          '> button:after': {
            borderColor: theme.palette.neutralSecondaryAlt,
          },

          ':hover *': {
            color: theme.palette.black + ' !important',
            backgroundColor: theme.palette.neutralLight + ' !important',
          }
        }
      }
    }
  },

  content: {
    flexGrow: 1,
    marginLeft: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '4px 6px'
  }
}))

// --- SideNav View -------------------------------------------------

function SideNavView(props: SideNavProps) {
  let ret = null

  if (props.children) {
    ret = styleSideNav(classes => 
      <div className={classes.container}>
        <div className={classes.navigation}>
          <Nav
            groups={
              React.Children.map(props.children, getLinkProps) as any // TODO
            }

            selectedKey={props.activeItemId}
          />
        </div>
      </div>
    )
  }

  return ret
}

// --- helpers ------------------------------------------------------

function getLinkProps(child: any): INavLink {
  return {
    key: '1',
    name: 'xxx',
    isExpanded: true,
    link: null,
    url: null
  }
  /*
  const
    type = child.type,
    props = child.props,
    isGroup = type === SideNav.ItemGroup 

  const ret: INavLink = { 
    key: isGroup ? props.groupId : props.id,
    name: props.title,
    isExpanded: true,
    link: null, // TODO
    url: null
  }

  if (isGroup) {
    const menu = model as AppsWithNavAppGroupModel

    if (menu.items.length > 0) {
      ret.links = menu.items.map(it => {
        return getLinkProps(it)
      })
    }
  } else if (model.$kind === 'AppsWithNavAppModel') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
  */
}

// --- exports ------------------------------------------------------

export default SideNavView


