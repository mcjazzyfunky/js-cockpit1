import React from 'react'
import { AppsWithMenuData, AppsWithMenuAppGroupData, AppsWithMenuAppData } from './AppsWithMenu'
import { CommandBar } from 'office-ui-fabric-react'
import defineStyle from '../../styling/defineStyle'

// TODO
import AppsWithNav from './AppsWithNav'

// --- AppsWithNavStyle ---------------------------------------------

const styledAppsWithMenu = defineStyle({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  content: {
    display: 'flex',
    flexGrow: 1,
  }
})

// --- AppsWithMenuRenderer -----------------------------------------

const AppsWithMenuRenderer = {
  render(model: AppsWithMenuData) {
    let ret = null

    if (model.menu.length > 0) {
      ret = styledAppsWithMenu((classes: any) =>
        <div className={classes.container}>
          <CommandBar
            items={
              model.menu.map(getItemProps)
            }
          />
          <div className={classes.content}>
            <AppsWithNav>
              <AppsWithNav.Apps>
                <AppsWithNav.AppGroup name="catalog" title="Catalog data">
                  <AppsWithNav.App name="products" title="Products">
                  </AppsWithNav.App>
                  <AppsWithNav.App name="variants" title="Variants">
                  </AppsWithNav.App>
                  <AppsWithNav.App name="categories" title="Categories">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
                <AppsWithNav.AppGroup name="yyy" title="Media">
                  <AppsWithNav.App name="images" title="Images">
                  </AppsWithNav.App>
                  <AppsWithNav.App name="videos" title="Videos">
                  </AppsWithNav.App>
                  <AppsWithNav.App name="presentations" title="Presentations">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
              </AppsWithNav.Apps>
            </AppsWithNav>
          </div>
        </div>
      )
    }

    return ret
  }
}

// --- helpers ------------------------------------------------------

function getItemProps(model: AppsWithMenuAppGroupData | AppsWithMenuAppData) {
  const ret: any = { // TODO
    key: model.name,
    name: model.title,
  }

  if (model.kind === 'AppsWithMenuAppGroupData') {
    const menu = model as AppsWithMenuAppGroupData

    if (menu.items.length > 0) {
      ret.subMenuProps = {
        items: menu.items.map(it => {
          return getItemProps(it)
        })
      }
    }
  } else if (model.kind === 'AppsWithMenuAppData') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}

// --- exports ------------------------------------------------------

export default AppsWithMenuRenderer
