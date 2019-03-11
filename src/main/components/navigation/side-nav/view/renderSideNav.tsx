// externals imports
import React from 'react'
import { Nav, INavLink, INavLinkGroup } from 'office-ui-fabric-react'

// internal imports
import styleSideNav from './styleSideNav'
import SideNavProps from '../types/SideNavProps'

// --- SideNav View -------------------------------------------------

function SideNavView(props: SideNavProps) {
  let ret = null

  if (props.items) {
    ret = styleSideNav(classes => 
      <div className={classes.container}>
        <div className={classes.navigation}>
          <Nav
            groups={getLinkGroups(props.items)}

            selectedKey={props.activeItemId}
          />
        </div>
      </div>
    )
  }

  return ret
}

// --- helpers ------------------------------------------------------

function getLinkGroups(items: any): INavLinkGroup[] { // TODO
  const linkGroups: INavLinkGroup[] = []

  items.forEach((item: any, idx: any) => {
    const linkGroup: INavLinkGroup = {
      name: item.text,
      links: getLinks(item.items)
    }

    linkGroups.push(linkGroup)
  })

  return linkGroups
}

function getLinks(items: any): INavLink[] {
  const links: INavLink[] = []

  items.forEach((item: any, idx: number) => { // TODO
    const link: INavLink = {
      key: item.id,
      name: item.text,
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


