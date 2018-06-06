import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';
import LoginForm from '../main/components/login/LoginForm';
import ControlCenter from '../main/components/control-center/ControlCenter';
import Logo from '../main/components/misc/Logo';
import SideMenu from '../main/components/sidebar/SideMenu';

import './demo.less';

ReactDOM.render(
  /*
  <ControlCenter
    brand={
      <Logo
        icon={
          <Icon type="cloud-o"/>
        }
        vendor="meet+greet"
        title="Back Office"
      />
    }

    user={{
      name: 'Jane Doe'
    }}

    sidebar={
      <SideMenu/>
    }
  />,
  */
  <LoginForm/>,
  document.getElementById('main-content'));
