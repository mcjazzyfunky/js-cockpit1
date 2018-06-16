import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import Card from '../card/Card';
import Form from '../form/Form';
import { PrimaryButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import TextField from '../form/TextField';
import CheckBox from '../form/CheckBox';
import Css from '../styling/Css';

function getStyles({ theme }) {
  return {
    container: {
      width: '20rem',
      minHeight: '22rem',
      textAlign: 'left',
    },

    remember: {
      margin: '1.25rem 0 0 0',
    },

    loadingIndicator: {
      display: 'inline-block',
      margin: '0 0 0 0.75rem',
    }
  };
}

const validationConfig = {
  fields: [
    {
      name: 'username',

      rules: [
        {
          condition: it => !!it,
          errorMsg: 'Please enter your username'
        }
      ]
    },
    {
      name: 'password',

      rules: [
        {
          condition: it => !!it,
          errorMsg: 'Please enter your password'
        }
      ]
    },
    {
      name: 'remember',
      rules: []
    }
  ]
};

export default defineComponent({
  displayName: 'LoginForm',

  properties: {
    header: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    },

    performLogin: {
      type: Function,
      nullable: true,
      defaultValue: null
    },

    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);

      this.state = { loading: false };
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(ev) {
      if (!this.state.loading) {
        this.setState({ loading: true });

        if (this.props.performLogin) {
          try {
            this.props.performLogin(ev.data)
              .then(data => {
                console.log('Login data: ', data);
                this.setState({ loading: false },
                  () => setTimeout(() => alert('Logged in successfully'), 100));
              });
          } catch (e) {
            throw e;
          }
        }
      }
    }

    render() {
      const
        loginButtonText =
          this.state.loading
            ? 'Logging in...'
            : 'Log in';

      return (
        <Css getStyles={getStyles}>
          {
            classes => {
              const loadingIndicator =
                this.state.loading
                  ? <div className={classes.loadingIndicator}>
                      <Spinner
                        size={SpinnerSize.small}
                      />
                    </div>
                  : null;
   
              return (
                <Form validationConfig={validationConfig} onSubmit={this.onSubmit}>
                  <Card className={classes.container}>
                    <Card.Header>
                      {this.props.header}
                    </Card.Header>
                    <Card.Body>
                        <TextField
                          name="username"
                          label="User name"
                          autoComplete="off"
                          disabled={this.state.loading}
                        />
                        <TextField
                          name="password"
                          label="Password"
                          type="password"
                          disabled={this.state.loading}
                        />
                        <CheckBox
                          name="remember"
                          label="Remember me"
                          className={classes.remember}
                          disabled={this.state.loading}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <PrimaryButton type="submit" style={{width: '100%' }}>
                          {loginButtonText}
                          {loadingIndicator}
                        </PrimaryButton>
                      </Card.Footer>
                  </Card>
                </Form>
              );
            }
          }
        </Css>
      );
    }
  }
});
