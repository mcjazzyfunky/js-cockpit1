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

      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Values:', values);
        }
      });
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
        <div className="aw-login-form__body">
          {
            !isLoading
              ? null
              : <div className="aw-login-form__spinner-container">
                  <div className="aw-login-form__spinner">
                    <Spin size="large" />
                  </div>
                  <div className="aw-login-form__spinner-text">
                    Logging in, please wait...
                  </div>
                </div>
          }
        <Form
          onSubmit={this.onFormSubmit}
          className={classNames({
            'aw-login-form__form': true,
            'aw-login-form__form--hidden': isLoading
          })}
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
                <Checkbox>
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
            Log in
          </Button>
        </Form>
        </div>
        </Card>
        </div>
      );
    }
  }
});

export default Form.create()(LoginFormComponent);
