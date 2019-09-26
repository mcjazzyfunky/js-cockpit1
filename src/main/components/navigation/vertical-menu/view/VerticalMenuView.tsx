// externals imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'
import { Nav, INavLink, IRenderFunction, INavLinkGroup } from 'office-ui-fabric-react'

// internal imports
import VerticalMenuViewProps from '../types/VerticalMenuViewProps'
import getVerticalMenuClasses from './getVerticalMenuClasses'

// derived imports
type VerticalMenuClasses = ReturnType<typeof getVerticalMenuClasses>

// --- VerticalMenuView ---------------------------------------------

const VerticalMenuView = component<VerticalMenuViewProps>(
  'VerticalMenuView', props => {

  let ret = undefined

  if (props.items) {
    const
      classes = getVerticalMenuClasses(),
      linkGroups = getLinkGroups(props.items)

    let onRenderGroupHeader: IRenderFunction<INavLinkGroup> | undefined = undefined 

    if (props.collapsible === false || linkGroups.length === 1 && typeof linkGroups[0].name === 'string') {
      onRenderGroupHeader =
        ((linkGroup: INavLinkGroup) => renderGroupHeader(linkGroup, classes)) as any
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
  }

  return ret
})

// --- locals -------------------------------------------------------

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

function renderGroupHeader(linkGroup: INavLinkGroup, classes: VerticalMenuClasses) {
  return <div className={classes.header}>{linkGroup.name}</div>
}

// --- exports ------------------------------------------------------

export default VerticalMenuView


