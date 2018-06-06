import React from 'react';
import { defineComponent } from 'js-widgets';
import { Card, Checkbox, Form, Icon, Input, Button } from 'antd';
import Logo from '../misc/Logo';

import './LoginForm.less';

const LoginFormComponent = defineComponent({
  displayName: 'LoginForm',

  properties: {
    form: {
      type: Object
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);

      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(ev) {
      ev.preventDefault();

      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Values:', values);
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
    
      return (
        <div className="aw-login-screen">
        <Card
          title={
            <div className="aw-login-form__header">
              <Logo
                vendor="meet+greet"
                title="Back Office - Login"
                
                icon={
                  <Icon type="cloud" className="aw-login-form__icon"/>
                }
              />
            </div>
          }

          className="aw-login-form"
        >
        <Form onSubmit={this.onFormSubmit}>
          <Form.Item>
            {
              getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: 'Please enter your username'
                }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                  placeholder="Username"
                />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'Please enter your password'
                }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )
            }
          </Form.Item>
          <Form.Item >
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>Remember me</Checkbox>
              )
            }
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

export default Form.create()(LoginFormComponent);
