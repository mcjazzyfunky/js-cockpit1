import React from 'react'
import { AppsWithNavData, AppsWithNavAppGroupData, AppsWithNavAppData } from './AppsWithNav'
import { Nav } from 'office-ui-fabric-react'
import defineStyle from '../../styling/defineStyle'

// TODO
import DataExplorer from '../data-views/DataExplorer'
import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'
import faker from 'faker'
import { FaBeer, FaMinusCircle, FaPencilAlt, FaPlus, FaMinus } from 'react-icons/fa'
import { MdAddCircleOutline, MdEdit, MdRemove, MdAddCircle, MdRemoveCircle, MdArrowDropDownCircle, MdRemoveCircleOutline, MdAdd } from 'react-icons/md'
import { FiPlusSquare, FiEdit, FiMinusSquare, FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { FaPlusCircle } from 'react-icons/fa'

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

const styleAppsWithNav = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.white,

    selectors: {

      '& .ms-Nav-compositeLink.is-expanded.is-selected > button': {
        backgroundColor: theme.palette.themeLighterAlt
      },

      '& .ms-Nav-groupContent': {
        backgroundColor: 'transparent', //'white !important',
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '0 !important',

        selectors: {
          '*': {
            backgroundColor: 'transparent !important',
          }
        }
      }
    }
  },

  navigation: {
    width: '15rem',
    padding: '0 6px',
    margin: '0',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.neutralLighterAlt,
    borderColor: theme.palette.neutralQuaternary,
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',

    selectors: {
      '& .ms-Nav-chevronButton': {
        fontSize: theme.fonts.mediumPlus.fontSize,
        color: theme.palette.neutralDark,
        backgroundColor: 'transparent',

        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralQuaternaryAlt,
        borderStyle: 'solid',
        marginBottom: '0',

        selectors: {
          '& *': {
            //color: theme.palette.neutralDark + ' !important',
          },

          ':hover': {
            backgroundColor: theme.palette.neutralLight, 
          }
        }
      },
      
      '.ms-Nav-compositeLink.is-expanded': {
      
        selectors: {
          '*': {
            cursor: 'default !important',

          },

          ':hover': {
            backgroundColor: theme.palette.neutralLight + ' !important'
          }
        }
      },

      '.ms-Nav-navItems': {
        margin: '0.325rem 0 1.25rem 0',
      },

      '.ms-Nav-compositeLink.is-expanded.is-selected': {
        backgroundColor: theme.palette.themeLight + ' !important',

        selectors: {
          ':hover *': {
            color: theme.palette.themeSecondary + ' !important',
            backgroundColor: theme.palette.themeLighter + ' !important',
          }
        }
      }
    }
  },

  content: {
    flexGrow: 1,
    marginLeft: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '4px 6px'
  }
}))


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
            <DataExplorer
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
              <DataExplorer.Actions>
                <DataExplorer.GeneralAction
                  title="Add"
                  icon={<MdAdd/>}
                />
                <DataExplorer.SingleRowAction
                  title="Edit"
                  icon={<MdEdit/>}
                />
                <DataExplorer.MultiRowAction
                  title="Delete"
                  icon={<MdRemove/>}
                />
              </DataExplorer.Actions>
              <DataExplorer.Columns>
                <DataExplorer.Column
                  title="First name"
                  field="firstName"
                  sortable={true}
                />
                <DataExplorer.Column
                  title="Last name"
                  field="lastName"
                  sortable={true}
                />
                <DataExplorer.Column
                  title="Postal code"
                  field="postalCode"
                  sortable={true}
                />
                <DataExplorer.Column
                  title="City"
                  field="city"
                  sortable={true}
                />
                <DataExplorer.Column
                  title="Country"
                  field="country"
                  sortable={true}
                />
              </DataExplorer.Columns>
            </DataExplorer>
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
