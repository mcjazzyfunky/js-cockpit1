import React from 'react'
import { AppsWithNavData, AppsWithNavAppGroupData, AppsWithNavAppData } from './AppsWithNav'
import { Nav } from 'office-ui-fabric-react'
import defineStyle from '../../styling/defineStyle'

// TODO
import DataNavigator from '../data-views/DataNavigator'

// --- AppWithNavStyle --------------------------------------------

const styleAppsWithNav = defineStyle({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '0.375rem',
    fontSize: '80%',
  },

  navigation: {
    width: '15rem',
    borderColor: '#e8e8e8',
    borderWidth: '0 0.5px 0 0',
    borderStyle: 'solid',
    padding: '0 3px',
  },

  content: {
    flexGrow: 1,
    marginLeft: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
})


export default {
  render(model: AppsWithNavData) {
    let ret = null

    if (model.menu.length > 0) {
      ret = styleAppsWithNav(classes => 
        <div className={classes.container}>
          <div className={classes.navigation}>
            <Nav
              groups={
                model.menu.map(getLinkProps)
              }

              selectedKey="categories" // TODO
            />
          </div>
          <div className={classes.content}>
            <DataNavigator config={{}} data={null}/>
          </div>
        </div>
      )
    }

    return ret
  }
}

// --- helpers ------------------------------------------------------

function getLinkProps(model: AppsWithNavAppGroupData | AppsWithNavAppData) {
  const ret: any = { // TODO
    key: model.name,
    name: model.title,
    isExpanded: true
  }

  if (model.$kind === 'AppsWithNavAppGroupData') {
    const menu = model as AppsWithNavAppGroupData

    if (menu.items.length > 0) {
      ret.links = menu.items.map(it => {
        return getLinkProps(it)
      })
    }
  } else if (model.$kind === 'AppsWithNavAppData') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}
