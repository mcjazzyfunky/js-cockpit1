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
console.log(1111, getLinkGroups(props.items))
  return ret
}

// --- helpers ------------------------------------------------------

function getLinkGroups(items: any): INavLinkGroup[] { // TODO
  const linkGroups: any[] = [{
    text: 'xxx',
    links: []
  }]

  items.forEach((item: any, idx: any) => {
    const itemX: any = {
      name: item.text,
      key: item.id,
      url: '#'
    }

    if (item.items) {
      itemX.links = getLinks(item.items)
      itemX.isExpanded = true
    }

    linkGroups[0].links.push(itemX)
  })

  return linkGroups
}

function getLinks(items: any): INavLink[] {
  const links: INavLink[] = []

  if (items) {
    items.forEach((item: any, idx: number) => { // TODO
      const link: any = {
        key: item.id,
        name: item.text,
        isExpanded: true,
        link: null as any,
        url: null as any
      }

     links.push(link)
    })
  }

  return links
}

// --- exports ------------------------------------------------------

export default SideNavView


