import React from 'react'
import { AppsWithNavModel, AppsWithNavAppGroupModel, AppsWithNavAppModel } from './AppsWithNav'
import { Nav, INavLink } from 'office-ui-fabric-react'
import defineStyle from '../../styling/defineStyle'

// TODO
import DataExplorer from '../data-views/DataExplorer'
import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'
import faker from 'faker'
import { MdAdd, MdEdit, MdRemove } from 'react-icons/md'

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
      '.ms-Nav-groupContent': {
        backgroundColor: 'transparent',
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '0 !important',
      },
    
      '.ms-Nav-navItems *': {
        backgroundColor: 'transparent !important',
      },

      '& .ms-Nav-chevronButton': {
        fontSize: theme.fonts.mediumPlus.fontSize,
        color: theme.palette.neutralDark,
        backgroundColor: 'transparent',

        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralQuaternaryAlt,
        borderStyle: 'solid',
        marginBottom: '0',

        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight, 
          }
        }
      },
      
      '.ms-Nav-compositeLink.is-expanded': {
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight + ' !important',
          },
          
          ':active': {
            backgroundColor: theme.palette.neutralQuaternary + ' !important',
          }
        }
      },

      '.ms-Nav-navItems': {
        margin: '0.325rem 0 1rem 0',
      },

      '.ms-Nav-compositeLink.is-expanded.is-selected': {
        backgroundColor: theme.palette.neutralLight + ' !important',

        selectors: {
          '*': {
            color: theme.palette.black + ' !important',
            cursor: 'default !important',
          },

          '> button:after': {
            borderColor: theme.palette.neutralSecondaryAlt,
          },

          ':hover *': {
            color: theme.palette.black + ' !important',
            backgroundColor: theme.palette.neutralLight + ' !important',
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
  render(model: AppsWithNavModel) {
    let ret = null

    if (model.menu.length > 0) {
      ret = styleAppsWithNav(classes => 
        <div className={classes.container}>
          <div className={classes.navigation}>
            <Nav
              groups={
                model.menu.map(getLinkProps) as any // TODO
              }

              selectedKey={model.selectedId}
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

                  const newModel = data.slice(params.offset, params.offset + params.count)

                  return observableOf({data: newModel, totalItemCount: data.length })
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

function getLinkProps(model: AppsWithNavAppGroupModel | AppsWithNavAppModel): INavLink {
  const ret: INavLink = { 
    key: model.$kind === 'AppsWithNavAppGroupModel' ? model.groupId : model.id,
    name: model.title,
    isExpanded: true,
    link: null, // TODO
    url: null
  }

  if (model.$kind === 'AppsWithNavAppGroupModel') {
    const menu = model as AppsWithNavAppGroupModel

    if (menu.items.length > 0) {
      ret.links = menu.items.map(it => {
        return getLinkProps(it)
      })
    }
  } else if (model.$kind === 'AppsWithNavAppModel') {
    // TODO
  } else {
    throw new Error('This should never happen')
  }

  return ret
}
