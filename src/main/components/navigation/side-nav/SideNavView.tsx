// externals imports
import React from 'react'
import { Nav, INavLink, INavLinkGroup } from 'office-ui-fabric-react'

// internal imports
import SideNav from './SideNav'
import SideNavProps from './SideNavProps'
import defineStyle from '../../../styling/defineStyle'

// --- styleSideNav -------------------------------------------------

const styleSideNav = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },

  navigation: {
    width: '12rem',
    padding: '0 8px',
    margin: '6px',
    boxSizing: 'border-box',
    borderColor: theme.palette.neutralLight,
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
        backgroundColor: theme.palette.neutralLighter + ' !important',

        selectors: {
          '*': {
            color: theme.palette.black + ' !important',
            cursor: 'default !important',
          },

          '> button:after': {
            borderColor: theme.palette.themeSecondary,
          },

          ':hover *': {
            color: theme.palette.black + ' !important',
            backgroundColor: theme.palette.neutralLighter + ' !important',
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
            groups={getLinkGroups(props.children)}

            selectedKey={props.activeItemId}
          />
        </div>
      </div>
    )
  }

  return ret
}

// --- helpers ------------------------------------------------------

function getLinkGroups(children: any): INavLinkGroup[] {
  const linkGroups: INavLinkGroup[] = []

  React.Children.forEach(children, (child: any, idx: any) => {
    const childProps = child && child.props ? child.props : null

    const linkGroup: INavLinkGroup = {
      name: childProps.text,
      links: getLinks(childProps.children)
    }

    linkGroups.push(linkGroup)
  })

  return linkGroups
}

function getLinks(children: any): INavLink[] {
  const links: INavLink[] = []

  React.Children.forEach(children, (child: any, idx: any) => {
    const childProps = child && child.props ? child.props : null

    const link: INavLink = {
      key: childProps.id,
      name: childProps.text,
      isExpanded: true,
      link: null as any,
      url: null as any
    }

    links.push(link)
  })

  return links
}

// --- exports ------------------------------------------------------

export default SideNavView


