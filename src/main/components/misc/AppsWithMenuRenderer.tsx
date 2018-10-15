import React from 'react'
import { AppsWithMenuData, AppsWithMenuAppGroupData, AppsWithMenuAppData } from './AppsWithMenu'
import { CommandBar } from 'office-ui-fabric-react'
import defineStyle from '../../styling/defineStyle'

// TODO
import AppsWithNav from './AppsWithNav'

// --- AppsWithNavStyle ---------------------------------------------

const styleAppsWithMenu = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  menuBar: {
    backgroundColor: 'rgb(225, 225, 225)', // TODO
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,

    selectors: {
      '& *:not(:hover):not(:active)': {
        backgroundColor: 'transparent !important'
      }
    }
  },


  content: {
    display: 'flex',
    flexGrow: 1,
  }
}))

// --- AppsWithMenuRenderer -----------------------------------------

const AppsWithMenuRenderer = {
  render(model: AppsWithMenuData) {
    let ret = null

    if (model.menu.length > 0) {
      ret = styleAppsWithMenu(classes =>
        <div className={classes.container}>
          <CommandBar
            items={
              model.menu.map(getItemProps)
            }
            className={classes.menuBar}
          />
          <div className={classes.content}>
            <AppsWithNav selectedId='be-users'>
              <AppsWithNav.Apps>
                <AppsWithNav.AppGroup groupId="users" title="User Management">
                  <AppsWithNav.App id="be-users" title="Back office users">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="fe-users" title="Front end users">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
                <AppsWithNav.AppGroup groupId="catalog" title="Catalog data">
                  <AppsWithNav.App id="products" title="Products">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="variants" title="Variants">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="categories" title="Categories">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
                <AppsWithNav.AppGroup groupId="yyy" title="Media">
                  <AppsWithNav.App id="images" title="Images">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="videos" title="Videos">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="presentations" title="Presentations">
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

  if (model.$kind === 'AppsWithMenuAppGroupData') {
    const menu = model as AppsWithMenuAppGroupData

    if (menu.items.length > 0) {
      ret.subMenuProps = {
        items: menu.items.map(it => {
          return getItemProps(it)
        })
      }
    }
  } else if (model.$kind === 'AppsWithMenuAppData') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}

// --- exports ------------------------------------------------------

export default AppsWithMenuRenderer
