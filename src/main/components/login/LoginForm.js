import React from 'react';
import { defineComponent } from 'js-widgets';
import { Button, Card, Checkbox, Form, Icon, Input, Spin } from 'antd';
import classNames from 'classnames';
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

      this.state = { loading: false };

      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(ev) {
      ev.preventDefault();

      if (!this.state.loading) {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Values:', values);
            this.setState(({ loading: true}));
          }
        });
      }
    }

    render() {
      const
        { getFieldDecorator } = this.props.form,
        isLoading = this.state.loading;
    
      return (
        <div className="aw-login-screen">
        <Card
          className="aw-login-form"

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
        >
        <Form
          onSubmit={this.onFormSubmit}
        >
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
                  autocomplete="off"
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                <Checkbox disabled={isLoading}>
                  Remember me
                </Checkbox>
              )
            }
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="aw-login-form__submit-button"
          >
            {
              !isLoading
                ? 'Log in'
                : ['Logging in...',
                  <Spin
                    key="0"
                    size="small"
                    indicator={
                      <Icon
                        type="loading-3-quarters"
                        className="aw-login-form__spin"
                        spin
                      />
                    }
                  />]
            }
          </Button>
        </Form>
        </Card>
        </div>
      );
    }
  }
});

export default Form.create()(LoginFormComponent);
