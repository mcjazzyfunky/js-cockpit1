import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { loadThemeByName, initSystemIcons, Brand, CheckGroup, Choice, RadioGroup, Compound, DateInput, AppMenu, DataExplorer, DataExplorerQueryParams, HBox, VBox, DataForm, FieldSet, VerticalMenu, LoginForm, LogoutButton, MenuBar, Cockpit, TextInput, Tabs, UserMenu } from '../main/js-cockpit'

import { MdAdd, MdEdit, MdRemove } from 'react-icons/md'

import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'

import Chance from 'chance'
import { FiEdit, FiPlus, FiMinus, FiTrash, FiTrash2 } from 'react-icons/fi'

initSystemIcons()
loadThemeByName('default', true)

const menuBar = 
  <MenuBar
    onAction={() => alert('Juhu')}
    showMenuBeaks={false}
   
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
    items={[
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

    showCallout={true}
  />

const verticalMenu =
  <VerticalMenu
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
    <Cockpit
      slotBrand={
        <Brand
          vendor="meet+greet"
          title="Back office"
          size="medium"
        />
      }

      slotTopNav={
        <AppMenu
          items={[
            {
              type: 'app',
              id: '0',
              title: 'Login'
            }
          ]}
        />
      }

      slotCenter={
        <LoginForm
          fullSize={true}
          extraFields={[
            {
              type: 'text',
              key: 'host',
              label: 'Host',
              defaultValue: 'hhh'
            },
            {
              type: 'text',
              key: 'client',
              label: 'Client',
              defaultValue: 'ccc'
            },
            {
              type: 'choice',
              key: 'langage',
              label: 'Language',
              defaultValue: 'en',

              options: [
                { value: 'en', text: 'English' },
                { value: 'fr', text: 'France' },
                { value: 'de', text: 'German' }
              ]
            }
            /*
            */
          ]}
         
          slotAbove={
            <Brand
              vendor="meet+greet"
              title="Back office"
              size="huge"
            />
          }

          slotBelow={
            <div>&copy; 2019, meet+greet</div>
          }
        />
      }
    />

  const dataExplorer =
    <DataExplorer
      title="Back-office users"

      loadData={loadData}

      columns={[
        { type: 'column', title: 'First name', field: 'firstName', sortable: true },
        { type: 'column', title: 'Last name', field: 'lastName', sortable: true },
        { type: 'column', title: 'Postal code', field: 'postalCode', sortable: true },
        { type: 'column', title: 'City', field: 'city', sortable: true },
        { type: 'column', title: 'Country', field: 'country', sortable: true }
      ]}

      actions={[
        { type: 'default', text: 'Add', icon: <FiPlus/> },
        { type: 'singleRow', text: 'Edit', icon: <FiEdit/> },
        { type: 'multiRow', text: 'Delete', icon: <FiTrash2/> }
      ]}
/*
      search={{
        type: 'filters',

        filters: [
          {
            type: 'text',
            name: 'firstName',
            label: 'First name'
          },
          {
            type: 'text',
            name: 'lastName',
            label: 'Last name'
          }
        ]
      }}

*/

      search={{
        type: 'section',

        contents: [
          {
            type: 'filterSet',

            filters: [
              {
                type: 'text',
                name: 'firstName',
                label: 'First name'
              },
              {
                type: 'text',
                name: 'lastName',
                label: 'Last name'
              }
            ]
          },
          {
            type: 'filterSet',

            filters: [
              {
                type: 'text',
                name: 'postalCode',
                label: 'Postal code'
              },
              {
                type: 'text',
                name: 'city',
                label: 'City'
              }
            ]
          }
        ]
      }}
/*
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
*/
    />

  const dataForm =
    <DataForm
      title="Customer"
      compact={true}

      onClose={() => alert('close')}
      
      actions={[
        { type: 'default', text: 'Add', icon: <FiPlus/> },
        { type: 'default', text: 'Edit', icon: <FiEdit/> },
        { type: 'default', text: 'Delete', icon: <FiTrash2/> }
      ]}
    >
      <FieldSet>
        <Compound>
          <TextInput label="Customer no." grow={1}></TextInput>
          <TextInput label="Display name" grow={5}></TextInput>
        </Compound>
      </FieldSet>

      <Tabs>
        <Tabs.Page title="Contact data">
          <Compound>
            <FieldSet title="Primary contact">
              <RadioGroup
                label="Salutation"
                defaultSelectedKey={'ms'}
                orientation="horizontal"
                options={[
                  { key: 'ms', text: 'Ms' },
                  { key: 'mr', text: 'Mr' },
                ]}
              />
              <TextInput name="firstName" label="First name"/>
              <Choice
                label="Country"

                options={[
                  { key: 'de', text: 'Germany' },
                  { key: 'de', text: 'Great Britain' },
                  { key: 'us', text: 'United States' }
                ]}
              />
              <TextInput name="lastName" label="Last name"/>
              <Compound>
                <TextInput name="postalCode" label="Postal code"/>
                <TextInput name="city" label="City" disabled={ (data: any, tempData: any) => {
                  return tempData.postalCode === '111'
                 }}/>
              </Compound>
              <DateInput name="dateOfBirth" label="Date of birth"/>
            </FieldSet>
            <FieldSet title="Secondary contact">
              <RadioGroup
                label="Salutation"
                defaultSelectedKey={'ms'}
                orientation="horizontal"
                options={[
                  { key: 'ms', text: 'Ms' },
                  { key: 'mr', text: 'Mr' },
                ]}
              />
              <TextInput label="First name"/>
              <TextInput label="Last name"/>
              <Compound>
                <TextInput name="postalCode" label="Postal code"/>
                <TextInput name="city" label="City" disabled={ (data: any) => data.postalCode === '111'}/>
              </Compound>
              <CheckGroup
                label="Options"

                selectedKeys={['a', 'c']}

                options={[
                  { key: 'a', text: 'is regular customer' },
                  { key: 'b', text: 'highly priorized' },
                  { key: 'c', text: 'receives newsletter' }
                ]}
              />
            </FieldSet>
          </Compound>
          <FieldSet title="Tertiary contact">
            <TextInput label="First xxx yy name"/>
            <TextInput label="Last name"/>
            <Compound>
              <TextInput label="Postal code"/>
              <TextInput label="City"/>
            </Compound>
            <Choice
              label="Country"

              options={[
                { key: 'de', text: 'Germany' },
                { key: 'de', text: 'Great Britain' },
                { key: 'us', text: 'United States' }
              ]}
            />
          </FieldSet>
          <FieldSet title="FieldSet-2">
          </FieldSet>
        </Tabs.Page>
        <Tabs.Page title="Documents">
          {dataExplorer}
        </Tabs.Page>
        <Tabs.Page title="Images">
          This is page 3....
        </Tabs.Page>
        <Tabs.Page title="Settings">
          This is page 4
        </Tabs.Page>
        <Tabs.Page title="Permissions">
          This is page 5 
        </Tabs.Page>
      </Tabs>
    </DataForm>

  const cockpit =
    <Cockpit
      slotBrand={
        <Brand
          vendor="meet+greet"
          title="Back Office"
        />
      }

      slotTopNav={
        appMenu
      }

      slotUserNav={
        <>
          <UserMenu
            fullName="Jane Doe"
          />
          <LogoutButton/>
        </>
      }

      slotMenu={
        null
        //menuBar 
      }

      slotSidebar={
        //null
        verticalMenu
      }

      slotCenter={
        // dataForm
        dataExplorer
      }
    />

  //return loginScreen
  return cockpit 
}

function fakeData(count: number) {
  const
    ret: any[] = [],
    chance = typeof Chance === 'function' ? new Chance() : new (window as any).Chance() // TODO

  for(let i = 0; i < count; ++i) {
    ret.push({
      firstName: chance.first(),
      lastName: chance.last(),
      city: chance.city(),
      postalCode: chance.zip(),
      country: chance.country()
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

export default Demo

