import React from 'react';
import { defineComponent } from 'js-widgets';
import { Card, Checkbox, Form, Icon, Input, Button } from 'antd';
import './LoginForm.less';

export default defineComponent({
  displayName: 'LoginForm',

  main: class extends React.Component {
    render() {
      return (
        <div className="login-screen">
        <Card title={
          <div>
            <div className="login-form-vendor">Meet &amp; Greet - Back Office</div>
            <div className="login-form-title">Login</div>
          </div>
        } className="login-form">
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
              className="login-form-button"
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
