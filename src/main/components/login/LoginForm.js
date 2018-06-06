import React from 'react';
import { defineComponent } from 'js-widgets';
import { Card, Checkbox, Form, Icon, Input, Button } from 'antd';
import Logo from '../misc/Logo';

import './LoginForm.less';

export default defineComponent({
  displayName: 'LoginForm',

  main: class extends React.Component {
    render() {
      return (
        <div className="aw-login-screen">
        <Card
        /*
          title={
            <div>
              <div className="aw-login-form__vendor">Meet &amp; Greet - Back Office</div>
              <div className="aw-login-form__title">Login</div>
            </div>
          }
  */


          title={
            <div className="aw-login-form__header">
              <Logo
                vendor="meet+greet"
                title="Back Office - Login"
                
                icon={
                  <Icon type="login" className="aw-login-form__icon"/>
                }
              />
            </div>
          }

          className="aw-login-form"
        >
        <Form>
          <Form.Item
          >
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
              placeholder="User name"
            />
          </Form.Item>
          <Form.Item
          >
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
          >
            <Checkbox>Remeber me</Checkbox>
            <Button
              type="primary"
              htmlType="submit"
              className="aw-login-form__button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        </Card>
        </div>
      );
    }
  }
});
