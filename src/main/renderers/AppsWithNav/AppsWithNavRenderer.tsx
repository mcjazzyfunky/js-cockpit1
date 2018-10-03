import React from 'react'
import defineRenderer from '../defineRenderer'
import { Model_AppsWithNav, Model_AppsWithNav_AppGroup, Model_AppsWithNav_App } from '../../api/components/misc/AppsWithNav'
import { Nav } from 'office-ui-fabric-react'
import defineStyle from '../../api/styling/defineStyle'

// TODO
import DataNavigator from '../../api/components/data-views/DataNavigator'

// --- AppWithNavStyle --------------------------------------------

const AppsWithNavStyle = defineStyle({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '0.375rem',
  },

  navigation: {
    width: '15rem',
    borderColor: '#ddd',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
  },

  content: {
    flexGrow: '1',
    marginLeft: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
})


export default defineRenderer((model: Model_AppsWithNav) => {
  let ret = null

  if (model.menu.length > 0) {
    ret =
      <AppsWithNavStyle>
        {
          (classes: any) => 
            <div className={classes.container}>
              <div className={classes.navigation}>
                <Nav
                  groups={
                    [{
                      links: model.menu.map(getLinkProps)
                    }]
                  }

                  selectedKey="categories" // TODO
                />
              </div>
              <div className={classes.content}>
                <DataNavigator/>
              </div>
            </div>
        }
      </AppsWithNavStyle>
  }

  return ret
})

// --- helpers ------------------------------------------------------

function getLinkProps(model: Model_AppsWithNav_AppGroup | Model_AppsWithNav_App) {
  const ret: any = { // TODO
    key: model.name,
    name: model.title,
    isExpanded: true
  }

  if (model.kind === 'Model_AppsWithNav_AppGroup') {
    const menu = model as Model_AppsWithNav_AppGroup

    if (menu.items.length > 0) {
      ret.links = menu.items.map(it => {
        return getLinkProps(it)
      })
    }
  } else if (model.kind === 'Model_AppsWithNav_App') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}
