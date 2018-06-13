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

ReactDOM.render(
  <Fabric>
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
          title={'Modules'}

          menu={{
            type: 'items',

            items: [
              {
                title: 'Users',
                id: 1 
              },
              {
                title: 'User groups',
                id: 2 
              },
              {
                title: 'Content management',
                id: 3 
              },
              {
                title: 'File management',
                id: 3 
              },
            ]
          }}
        />
      </ControlCenter.West>
      <ControlCenter.Center>
        <DataNavigator
          style={{ padding: '0.5rem 0.75rem' }}

          commands={[
            {
              text: 'New',
              type: 'general',
              icon: 'add',
            },
            {
              text: 'Delete',
              type: 'multi',
              icon: 'delete',
            },
            {
              text: 'Download',
              type: 'menu',
              icon: 'download',

              items: [
                {
                  text: 'Download1',
                },
                {
                  text: 'Download2',
                }
              ]
            }
          ]}
        />
      </ControlCenter.Center>
    </ControlCenter>
  </Fabric>,

  document.getElementById('main-content'));
