import React from 'react';
import ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react';

import LoginScreen from '../main/components/login/LoginScreen';
import LoginForm from '../main/components/login/LoginForm';
import ControlCenter from '../main/components/control-center/ControlCenter';
import Logo from '../main/components/misc/Logo';
import UserCtrl from '../main/components/misc/UserCtrl';
import SideMenu from '../main/components/sidebar/SideMenu';
import DataNavigator from '../main/components/data-table/DataNavigator';
import LogoIcon from 'svg-react-loader?name=LogoIcon!../../node_modules/material-design-icons/file/svg/production/ic_cloud_queue_24px.svg';

import initSystem from '../main/system/initSystem';

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

  controlCenter =
    <ControlCenter>
      <ControlCenter.NorthWest
        style={{
          padding: '0.25rem 1rem 0.5rem 0.75rem'
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
      </ControlCenter.NorthWest>
      <ControlCenter.North>
      </ControlCenter.North>
      <ControlCenter.NorthEast>
        <UserCtrl username="Jane Doe"/>
      </ControlCenter.NorthEast>
      <ControlCenter.West style={{ borderWidth: '0 1px 0 0', borderStyle: 'solid', borderColor: '#d8d8d8'}}>
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
                    title: 'Cagegories',
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
      </ControlCenter.West>
      <ControlCenter.Center>
        <DataNavigator
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
        />
      </ControlCenter.Center>
    </ControlCenter>;

const
  content = loginScreen;

ReactDOM.render(
  <Fabric>
    {content}
  </Fabric>,

  document.getElementById('main-content'));
