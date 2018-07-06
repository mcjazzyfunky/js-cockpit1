import React from 'react';
import ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react';

import LoginScreen from '../main/components/login/LoginScreen';
import LoginForm from '../main/components/login/LoginForm';
import BorderLayout from '../main/components/layout/BorderLayout';
import Logo from '../main/components/misc/Logo';
import UserMenu from '../main/components/misc/UserMenu';
import SideMenu from '../main/components/sidebar/SideMenu';
import DataNavigator from '../main/components/data-views/DataNavigator';
import DataForm from '../main/components/data-views/DataForm';
import LogoIcon from 'svg-react-loader?name=LogoIcon!../../node_modules/material-design-icons/file/svg/production/ic_cloud_queue_24px.svg';

import initSystem from '../main/system/initSystem';
import TextField from '../main/components/form/TextField';

initSystem();

const
  loginScreen =
    <LoginScreen>
      <LoginScreen.Main>
        <LoginForm
          performLogin={
            ({ username, password, remember }) => {
              console.log(`Logging in (${username}, ${password}, ${remember})`);

              return new Promise(resolve => {
                setTimeout(() => resolve({ status: 'succces' }), 1500);
              });
            }
          }
          header={
            <Logo
              vendor="meet+greet"
              title="Back Office - Login"
              icon={
                <LogoIcon
                  style={{
                    margin: '0.4rem 0.125rem 0 0',
                    fill: 'rgb(0, 120, 212)'
                  }}
                />}
            />
          }
        />
      </LoginScreen.Main>
    </LoginScreen>,

  dataNavigator =
    <DataNavigator
      title="Customer"

      style={{ padding: '0.5rem 0.75rem' }}

      commands={[
        {
          type: 'general',
          text: 'New',
          icon: 'add',
        },
        {
          type: 'multi',
          text: 'Delete',
          icon: 'delete',
        },
        {
          type: 'menu',
          text: 'Export',
          icon: 'download',

          items: [
            {
              type: 'single',
              text: 'Export as CSV file',
            },
            {
              type: 'single',
              text: 'Export as Excel file',
            }
          ]
        }
      ]}
    />,

  dataForm =
    <DataForm
      title="Customer"
      subtitle="Edit"

      commands={[
        {
          key: 'save',
          text: 'Save',
          icon: 'add'
        },
        {
          key: 'reset',
          text: 'Reset',
          icon: 'remove'
        }
      ]}

      parts={[
        {
          type: 'default',

          sections: [
            {
              type: 'default',

              fields: [
                {
                  type: 'default',
                  label: 'Customer no.',
                  component: <TextField />
                }
              ]
            }
          ]
        },
        {
          type: 'tabbed',

          tabs: [
            {
              title: 'General',
      
              sections: [
                {
                  type: 'default',
                  title: 'Personal information',

                  fields: [
                    {
                      type: 'default',
                      label: 'First name',

                      component:
                        <TextField
                          key="firstName"
                          name="firstName"
                        />,
                    },
                    { 
                      type: 'default',
                      label: 'Last name',

                      component:
                        <TextField
                          key="lastName"
                          name="firstName"
                        />,
                    },
                    {
                      type: 'default',
                      label: 'City',

                      component:
                        <TextField
                          key="city"
                          name="city"
                        />
                    }
                  ]
                },
                {
                  type: 'default',

                  fields: [
                    {
                      type: 'default',
                      label: 'First name',

                      component:
                        <TextField
                          key="firstName"
                          name="firstName"
                        />,
                    },
                    { 
                      type: 'default',
                      label: 'Last name',

                      component:
                        <TextField
                          key="lastName"
                          name="firstName"
                        />,
                    },
                    {
                      type: 'default',
                      label: 'City',

                      component:
                        <TextField
                          key="city"
                          name="city"
                        />
                    }
                  ]
                },
                {
                  type: 'default',
                  title: 'Account information',

                  fields: [
                    {
                      type: 'default',
                      label: 'E-Mail',
                      component: <TextField/>
                    }
                  ]
                }
              ]
            },
            {
              title: 'Contacts'
            },
            {
              title: 'Extras'
            }
          ]
        }
      ]}
    />,

  controlCenter =
    <BorderLayout>
      <BorderLayout.TopStart
        style={{
          padding: '0.125rem 0.625rem 0 0.625rem',
          color: 'white',
          backgroundColor: 'rgb(0, 120, 212)',
          height: '3rem',
          boxSizing: 'border-box',
        }}
      >
        <Logo
          icon={
            <i
              className="icon ion-ios-cloud-outline"
              style={{ fontSize: '1.5rem' }}
            />
          }

          vendor="meet+greet"
          title="Back Office"
        />
      </BorderLayout.TopStart>
      <BorderLayout.TopCenter
        style={{
          color: 'white',
          fill: 'white',
          backgroundColor: 'rgb(0, 120, 212)',
          height: '3rem',
          overflow: 'hidden',
        }}
      >
      </BorderLayout.TopCenter>
      <BorderLayout.TopEnd
        style={{
          color: 'white',
          fill: 'white',
          backgroundColor: 'rgb(0, 120, 212)',
          height: '3rem',
          verticalAlign: 'middle',
        }}
      >
        <UserMenu username="Jane Doe"/>
      </BorderLayout.TopEnd>
      <BorderLayout.MiddleStart
        style={{
          borderWidth: '0 1px 0 0',
          borderStyle: 'solid',
          borderColor: '#d8d8d8',
          whiteSpace: 'nowrap',
          minHeight: '100%',
          minWidth: '12rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <SideMenu
          title="Main menu"
          activeItemId={2}
          onSelect={ (ev) => console.log(ev)}

          menu={{
            type: 'itemGroups',

            itemGroups: [
              {
                title: 'User management',
                id: 'group-1',

                items: [
                  {
                    title: 'Users',
                    id: 1 
                  },
                  {
                    title: 'User groups',
                    id: 2 
                  }
                ]
              },
              {
                title: 'Content managment',
                id: 'group-2',

                items: [
                  {
                    title: 'Pages',
                    id: 11
                  },
                  {
                    title: 'Categories',
                    id: 12 
                  },
                  {
                    title: 'Assets',
                    id: 13 
                  },
                ]
              }
            ]
          }}
        />
      </BorderLayout.MiddleStart>
      <BorderLayout.MiddleCenter
        style={{
          height: '100%'
        }}
      >
        { dataForm }
      </BorderLayout.MiddleCenter>
    </BorderLayout>;

const
  content = controlCenter; 

ReactDOM.render(
  <Fabric>
    {content}
  </Fabric>,

  document.getElementById('main-content'));
