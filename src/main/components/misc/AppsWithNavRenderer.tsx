import React from 'react'
import { AppsWithNavData, AppsWithNavAppGroupData, AppsWithNavAppData } from './AppsWithNav'
import { Nav } from 'office-ui-fabric-react'
import defineStyle from '../../styling/defineStyle'

// TODO
import DataNavigator from '../data-views/DataNavigator'
import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'
import faker from 'faker'
import { FaBeer } from 'react-icons/fa'
import { MdAddCircleOutline, MdEdit, MdRemove, MdAddCircle, MdRemoveCircle } from 'react-icons/md'
import { FiPlusSquare, FiEdit, FiMinusSquare, FiPlusCircle, FiMinusCircle } from 'react-icons/fi'

const data: any[] = []

for(let i = 0; i < 1213; ++i) {
  data.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
    postalCode: faker.address.zipCode(),
    country: faker.address.country()
  })
}



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
            <DataNavigator
              title="Back-office users"

              loadData={
                (params: { offset: number, count: number, sortBy: string | null, sortDesc: boolean }) => {


                  if (params.sortBy) {
                    data.sort((recs1, recs2) => {
                      let ret = 0

                      const
                        v1 = recs1[params.sortBy],
                        v2 = recs2[params.sortBy];

                      if (v1 > v2) {
                        ret = 1
                      } else if (v1 < v2) {
                        ret = -1
                      } else {
                        ret = 0
                      }

                      if (params.sortDesc) {
                        ret = -ret
                      }

                      return ret
                    })
                  }

                  const newData = data.slice(params.offset, params.offset + params.count)

                  return observableOf({data: newData, totalItemCount: data.length })
                    .pipe(delay(1000))
                }
              }
            >
              <DataNavigator.Actions>
                <DataNavigator.GeneralAction
                  title="Add"
                  icon={<FiPlusCircle/>}
                />
                <DataNavigator.SingleRowAction
                  title="Edit"
                  icon={<FiEdit/>}
                />
                <DataNavigator.MultiRowAction
                  title="Delete"
                  icon={<FiMinusCircle/>}
                />
              </DataNavigator.Actions>
              <DataNavigator.Columns>
                <DataNavigator.Column
                  title="First name"
                  field="firstName"
                  sortable={true}
                />
                <DataNavigator.Column
                  title="Last name"
                  field="lastName"
                  sortable={true}
                />
                <DataNavigator.Column
                  title="Postal code"
                  field="postalCode"
                  sortable={true}
                />
                <DataNavigator.Column
                  title="City"
                  field="city"
                  sortable={true}
                />
                <DataNavigator.Column
                  title="Country"
                  field="country"
                  sortable={true}
                />
              </DataNavigator.Columns>
            </DataNavigator>
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
