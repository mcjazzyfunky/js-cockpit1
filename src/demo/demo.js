import React from 'react';
import ReactDOM from 'react-dom';
import LoginScreen from '../main/components/login/LoginScreen';
import ControlCenter from '../main/components/control-center/ControlCenter';
import Logo from '../main/components/misc/Logo';
import SideMenu from '../main/components/sidebar/SideMenu';

import initSystem from '../main/system/initSystem';

import { Fabric } from 'office-ui-fabric-react';

initSystem();

ReactDOM.render(
  <Fabric>
  <ControlCenter
    brand={
      <Logo
        icon={<i className="icon ion-ios-cloud-outline" style={{ fontSize: '1.5rem' }}/>}
        vendor="meet+greet"
        title="Back Office"
      />
    }

    user={{
      name: 'Jane Doe'
    }}

    sidebar={
      <SideMenu
        title="Mein menu"

        menu={[
          {
            title: 'Catalog data'
          },
          {
            title: 'Content managment'
          },
          {
            title: 'Document managment'
          },
          {
            title: 'Assets'
          },
          {
            title: 'User managment'
          }
        ]}
      />
    }
  />
  </Fabric>,
  document.getElementById('main-content'));
