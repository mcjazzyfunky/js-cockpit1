import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { initSystemIcons, Brand, AppSelector, DataExplorer, HBox, SideNav, LoginForm, ControlCenter, UserMenu } from '../main/js-cockpit'
import { loadTheme } from 'office-ui-fabric-react'

import { MdAdd, MdEdit, MdRemove } from 'react-icons/md'

import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'

import faker from 'faker'
import Color from 'color'
import { FaHandshake, FaRetweet } from 'react-icons/fa'

initSystemIcons()

const primaryColor = '#e6522c'

loadTheme({
  palette: {
    // 'themePrimary': primaryColor,
    // 'themeSecondary': Color(primaryColor).lighten(0.2).string(),
    // 'themeTertiary': Color(primaryColor).lighten(0.4).string(),
  }
})

function Demo() {
  const loginForm =
    <LoginForm fullSize={true}>
      <LoginForm.Header>
        <Brand
          vendor="meet+greet"
          title="Back office - Login"
          size="large"
        />
      </LoginForm.Header>
    </LoginForm>

  const controlCenter =
    <ControlCenter onLogout={() => alert('Juhu')}>
      <ControlCenter.Brand>
        <Brand
          vendor="meet+greet"
          title="Back Office"
        />
      </ControlCenter.Brand>
      <ControlCenter.TopNav>
        <AppSelector apps={[
          {
            id: 'cms',
            title: 'Content management',
            description: 'Some description for the CMS'
          },
          {
            id: 'mms',
            title: 'Media management',
            description: 'Some description for the MMS'
          }
        ]}/>
      </ControlCenter.TopNav>
      <ControlCenter.UserNav>
        <UserMenu
          fullName="Jane Doe"
        />
      </ControlCenter.UserNav>
      <ControlCenter.SideNav>
        <SideNav>
            <SideNav.Item
              id="users"
              title="Users"
            />
            <SideNav.Item
              id="user-groups"
              title="User groups"
            />
        </SideNav>
      </ControlCenter.SideNav>
      <ControlCenter.MainContent style={{ padding: '5px' }}>
         <DataExplorer
              title="Back-office users"

              loadData={loadData}
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
      </ControlCenter.MainContent>
    </ControlCenter>

  return controlCenter 
}

function fakeData(count: number) {
  const ret: any[] = []

  for(let i = 0; i < count; ++i) {
    ret.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      city: faker.address.city(),
      postalCode: faker.address.zipCode(),
      country: faker.address.country()
    })
  }

  return ret
}

function loadData(params: {offset: number, count: number, sortBy: string | null, sortDesc: boolean}) {
  const totalItemCount = 1241
  
  let data = fakeData(totalItemCount)

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

  data = data.slice(params.offset, params.offset + params.count)

  return observableOf({data, totalItemCount })
                    .pipe(delay(1000))

}


ReactDOM.render(<Demo/>, document.getElementById('main-content'))

