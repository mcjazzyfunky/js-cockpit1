import React from 'react'
import defineRenderer from '../defineRenderer'
import { Model_AppsWithNav, Model_AppsWithNav_AppGroup, Model_AppsWithNav_App } from '../../api/components/misc/AppsWithNav'
import { Nav } from 'office-ui-fabric-react'
import defineStyle from '../../api/styling/defineStyle'

// --- AppWithNavStyle --------------------------------------------

const AppsWithNavStyle = defineStyle({
  container: {
    display: 'flex',
    width: '100%',
    padding: '0.375rem'
  },

  navigation: {
    width: '15rem',
    borderColor: '#ddd',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
  },

  main: {
    flexGrow: '1',
    border: '1px solid yellow'
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
                      links: model.menu.map(getItemProps)
                    }]
                  }
                />
              </div>
            </div>
        }
      </AppsWithNavStyle>
  }

  return ret
})

// --- helpers ------------------------------------------------------

function getItemProps(model: Model_AppsWithNav_AppGroup | Model_AppsWithNav_App) {
  const ret: any = { // TODO
    key: model.name,
    name: model.title,
  }

  if (model.kind === 'Model_AppsWithNav_AppGroup') {
    const menu = model as Model_AppsWithNav_AppGroup

    if (menu.items.length > 0) {
      ret.links = menu.items.map(it => {
        return getItemProps(it)
      })
    }
  } else if (model.kind === 'Model_AppsWithNav_App') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}
