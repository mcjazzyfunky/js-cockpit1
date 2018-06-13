import React from 'react';
import ReactDOM from 'react-dom';
import LoginScreen from '../main/components/login/LoginScreen';
import ControlCenter from '../main/components/control-center/ControlCenter';
import Logo from '../main/components/misc/Logo';
import UserCtrl from '../main/components/misc/UserCtrl';
import SideMenu from '../main/components/sidebar/SideMenu';
import DataNavigator from '../main/components/data-table/DataNavigator';

import initSystem from '../main/system/initSystem';

import { Fabric } from 'office-ui-fabric-react';

initSystem();

const
  loginScreen =
    <LoginScreen/>,

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
  content = controlCenter;

ReactDOM.render(
  <Fabric>
    {content}
  </Fabric>,

  document.getElementById('main-content'));
