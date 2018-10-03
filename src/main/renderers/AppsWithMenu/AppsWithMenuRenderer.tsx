import React from 'react'
import defineRenderer from '../defineRenderer'
import { Model_AppsWithMenu, Model_AppsWithMenu_AppGroup, Model_AppsWithMenu_App } from '../../api/components/misc/AppsWithMenu'
import { CommandBar } from 'office-ui-fabric-react'

// TODO
import AppsWithNav from '../../api/components/misc/AppsWithNav'

export default defineRenderer((model: Model_AppsWithMenu) => {
  let ret = null

  if (model.menu.length > 0) {
    ret = (
      <div style={{height: '100%'}}> { /* TODO */ }
        <CommandBar
          items={
            model.menu.map(getItemProps)
          }
        />

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
    )
  }

  return ret
})

// --- helpers ------------------------------------------------------

function getItemProps(model: Model_AppsWithMenu_AppGroup | Model_AppsWithMenu_App) {
  const ret: any = { // TODO
    key: model.name,
    name: model.title,
  }

  if (model.kind === 'Model_AppsWithMenu_AppGroup') {
    const menu = model as Model_AppsWithMenu_AppGroup

    if (menu.items.length > 0) {
      ret.subMenuProps = {
        items: menu.items.map(it => {
          return getItemProps(it)
        })
      }
    }
  } else if (model.kind === 'Model_AppsWithMenu_App') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}
