// externals imports
import React, { ReactNode } from 'react'
import { Nav, INavLink, IRenderFunction, INavLinkGroup } from 'office-ui-fabric-react'

// internal imports
import styleSideNav from './styleSideNav'
import SideNavProps from '../types/SideNavProps'

// --- SideNav View -------------------------------------------------

function SideNavView(props: SideNavProps) {
  let ret = undefined

  if (props.items) {
    const
      linkGroups = getLinkGroups(props.items)

    ret = styleSideNav(classes => { 
      let onRenderGroupHeader: IRenderFunction<INavLinkGroup> | undefined = undefined 

      if (linkGroups.length === 1 && typeof linkGroups[0].name === 'string') {
        onRenderGroupHeader = ((linkGroup: INavLinkGroup) => {
          return <div className={classes.header}>{linkGroup.name}</div>
        }) as any // TODO
      }

      return (
        <div className={classes.container}>
          <div className={classes.navigation}>
            <Nav
              groups={linkGroups}
              onRenderGroupHeader={onRenderGroupHeader}
              selectedKey={props.activeItemId}
            />
          </div>
        </div>
      )
    })
  }

  return ret
}

// --- helpers ------------------------------------------------------

function getLinkGroups(items: any): INavLinkGroup[] { // TODO
  const
    linkGroups: INavLinkGroup[] = [],
    itemCount = items.length

  for (let i = 0; i < itemCount; ++i) {
    const item = items[i]

    if (item.type === 'menu') {
      linkGroups.push({
        name: item.text,
        links: getLinks(item.items)
      })
    } else {
      const links: INavLink[] = []

      for (; i < itemCount; ++i) {
        const subItem = items[i]

        if (subItem.type === 'menu') {
          --i
          break
        }

        links.push({
          key: subItem.id,
          name: subItem.text,
          url: ''
        }) 
      }

      linkGroups.push({
        links
      })
    }
  } 

  return linkGroups
}

function getLinks(items: any): INavLink[] {
  const links: INavLink[] = []

  items.forEach((item: any, idx: number) => { // TODO
    const link: INavLink = {
      key: item.id,
      name: item.text,
      isExpanded: true,
      url: '' 
    }

    links.push(link)
  })

  return links
}

// --- exports ------------------------------------------------------

export default SideNavView


