import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { loadThemeByName, initSystemIcons, Brand, AppMenu, DataExplorer, DataExplorerQueryParams, DataForm, HBox, Section, SideNav, LoginForm, LogoutButton, MenuBar, Cockpit, TextField, Tabs, UserMenu } from '../main/js-cockpit'
import { loadTheme, createTheme } from 'office-ui-fabric-react'

import { MdAdd, MdEdit, MdRemove } from 'react-icons/md'

import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'

import faker from 'faker'
import { FiEdit, FiPlus, FiMinus, FiTrash, FiTrash2 } from 'react-icons/fi'

initSystemIcons()
loadThemeByName('orange', true)

const menuBar = 
  <MenuBar
    onAction={() => alert('Juhu')}
    showMenuBeaks={true}
   
    items={[
      {
        type: 'menu',
        id: '1',
        text: 'Users',
        
        items: [
          { type: 'item', id: '1.1', text: 'Item-1.1'},
          { type: 'item', id: '1.2', text: 'Item-1.2', disabled: true },
          { type: 'item', id: '1.3', text: 'Item-1.3'},
          { type: 'item', id: '1.4', text: 'Item-1.4'},
        ]
      },
      {
        type: 'menu',
        id: '2',
        text: 'Content',
        
        items: [
          { type: 'item', id: '2.1', text: 'Item-2.1'},
          { type: 'item', id: '2.2', text: 'Item-2.2', disabled: true },
          { type: 'item', id: '2.3', text: 'Item-2.3'},
          { type: 'divider' },
          { type: 'item', id: '2.4', text: 'Item-2.4'},
        ]
      },
      {
        type: 'menu',
        id: '3',
        text: 'Media',
        
        items: [
          { type: 'item', id: '3.1', text: 'Item-3.1'},
          { type: 'item', id: '3.2', text: 'Item-3.2', disabled: true },
          { type: 'item', id: '3.3', text: 'Item-3.3'},

          {
            type: 'menu',
            id: '3.4',
            text: 'Item-3.4',

            items: [
              { type: 'item', id: '3.4.1', text: 'Item-3.4.1' }
            ]
          },
        ]
      },
      {
        type: 'menu',
        id: '4',
        text: 'Help',
        
        items: [
          { type: 'item', id: '4.1', text: 'About...'},
        ]
      }
    ]}
    />

const appMenu = 
  <AppMenu
    apps={[
      {
        type: 'app',
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Some description for the Dashboard'
      },
      {
        type: 'app',
        id: 'catalog',
        title: 'Catalog',
        description: 'Some description for the Catalog'
      },
      {
        type: 'app',
        id: 'cms',
        title: 'CMS',
        description: 'Some description for the CMS'
      },
      {
        type: 'app',
        id: 'cms',
        title: 'Media management',
        description: 'Some description for the media'
      }
    ]}
  />

const sideNav =
  <SideNav
    activeItemId="userGroups"

    items={[
      {
        type: 'menu',
        text: 'Menu 1',

        items: [
          { type: 'item', id: 'users', text: 'Users' },
          { type: 'item', id: 'userGroups', text: 'User groups' }
        ]
      },
      {
        type: 'menu',
        text: 'Menu 2',

        items: [
          { type: 'item', id: 'users2', text: 'Users' },
          { type: 'item', id: 'userGroups2', text: 'User groups' }
        ]
      }
    ]}
  />

function Demo() {
  const loginScreen =
    <Cockpit>
      <Cockpit.Brand>
        <Brand
          vendor="meet+greet"
          title="Back office"
          size="medium"
        />
      </Cockpit.Brand>
      <Cockpit.TopNav>
        <AppMenu
          apps={[
            {
              type: 'app',
              id: '0',
              title: 'User Login'
            }
          ]}
        />
      </Cockpit.TopNav>
      <Cockpit.Center>
        <LoginForm fullSize={true}>
          <LoginForm.Below>
            &copy; 2019, meet+greet
          </LoginForm.Below>
        </LoginForm>
      </Cockpit.Center>
    </Cockpit>

  const dataExplorer =
    <DataExplorer
      title="Back-office users"

      loadData={loadData}

      columns={[
        { type: 'column', title: 'First name', field: 'firstName', sortable: true },
        { type: 'column', title: 'Last name', field: 'lastName', sortable: true },
        { type: 'column', title: 'Postal code', field: 'postalCold', sortable: true },
        { type: 'column', title: 'City', field: 'city', sortable: true },
        { type: 'column', title: 'Country', field: 'country', sortable: true }
      ]}

      actions={[
        { type: 'default', text: 'Add', icon: <FiPlus/> },
        { type: 'singleRow', text: 'Edit', icon: <FiEdit/> },
        { type: 'multiRow', text: 'Delete', icon: <FiTrash2/> }
      ]}

      search={{
        type: 'default',

        basic: {
          type: 'fullText',
          name: 'fullText'
        },

        advanced: {
          type: 'filters',

          filters: [
            { type: 'text', name: 'firstName', label: 'First name' },
            { type: 'text', name: 'lastName', label: 'Last name' },
            { type: 'text', name: 'city', label: 'City' },
            { type: 'text', name: 'coutry', label: 'Country' }
          ]
        }
      }}
    >
    </DataExplorer>

  const dataForm =
    <DataForm
      title="Customer"
      
      actions={[
        { type: 'default', text: 'Add', icon: <FiPlus/> },
        { type: 'default', text: 'Edit', icon: <FiEdit/> },
        { type: 'default', text: 'Delete', icon: <FiTrash2/> }
      ]}
    >
      <Section>
        <TextField label="Customer no."></TextField>
      </Section>

      <Tabs>
        <Tabs.Page title="Contact data">
          <Section title="Section-1">
            <TextField label="First name"/>
            <TextField label="Last name"/>
            <TextField label="Postal code"/>
            <TextField label="City"/>
            <TextField label="Country"/>
          </Section>
          <Section title="Section-2">
          </Section>
        </Tabs.Page>
        <Tabs.Page title="Documents">
          This is page 2....
        </Tabs.Page>
        <Tabs.Page title="Images">
          This is page 3....
        </Tabs.Page>
      </Tabs>
    </DataForm>

  const cockpit =
    <Cockpit>
      <Cockpit.Brand>
        <Brand
          vendor="meet+greet"
          title="Back Office"
        />
      </Cockpit.Brand>
      <Cockpit.TopNav>
        {appMenu}
      </Cockpit.TopNav>
      <Cockpit.UserNav>
        <UserMenu
          fullName="Jane Doe"
        />
        <LogoutButton/>
      </Cockpit.UserNav>
      <Cockpit.Menu>
      </Cockpit.Menu>
      <Cockpit.SideNav>
        {sideNav}
      </Cockpit.SideNav>
      <Cockpit.Center style={{ padding: '5px' }}>
        {dataExplorer}
      </Cockpit.Center>
    </Cockpit>

  return cockpit 
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

function loadData(params: DataExplorerQueryParams) {
  const totalItemCount = 1241
  
  let data = fakeData(totalItemCount)

if (params.sortBy) {
  data.sort((recs1, recs2) => {
    let ret = 0

    const
      v1 = recs1[params.sortBy!],
      v2 = recs2[params.sortBy!];

    if (v1 > v2) {
      ret = 1
    } else if (v1 < v2) {
      ret = -1
    } else {
      ret = 0
    }

    if (params.sortDir === 'desc') {
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

