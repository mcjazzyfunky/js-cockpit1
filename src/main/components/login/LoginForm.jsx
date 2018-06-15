import React from 'react';
import { defineComponent } from 'js-widgets';
import Logo from '../misc/Logo';
import Card from '../card/Card';
import Form from '../form/Form';
import { Checkbox, PrimaryButton } from 'office-ui-fabric-react';
import TextField from '../form/TextField';
import Css from '../styling/Css';
import Icon from 'svg-react-loader?name=Icon!../../../../node_modules/material-design-icons/file/svg/production/ic_cloud_queue_24px.svg';

function getStyles({ theme }) {
  return {
    container: {
      width: '20rem',
      textAlign: 'left'
    },

    logo: {
      marginLeft: '0.75rem'
    },

    icon: {
      fill: theme.palette.themePrimary
    },

    remember: {
      margin: '1.25rem 0 0 0'
    }
  };
}

const formConfig = {
  fields: [
    {
      name: 'login'
    },
    {
      name: 'password'
    }
  ]
};

export default defineComponent({
  displayName: 'LoginForm',

  properties: {
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
      return (
        <Css getStyles={getStyles}>
          {classes =>
            <Form config={formConfig}>
              <Card className={classes.container}>
                <Card.Header>
                  <Logo
                    vendor="meet+greet"
                    title="Back Office - Login"
                    icon={<Icon className={classes.icon}/>}
                    className={classes.logo}
                  />
                </Card.Header>
                <Card.Body>
                    <TextField
                      name="username"
                      label="User name"
                      autoComplete="off"
                    />
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                    />
                    <Checkbox label="Remember me" onChange={this._onCheckboxChange} ariaDescribedBy={'descriptionID'} className={classes.remember} />
                  </Card.Body>
                  <Card.Footer>
                    <PrimaryButton type="submit" style={{width: '100%' }}>Log in</PrimaryButton>
                  </Card.Footer>
              </Card>
            </Form>
          }
        </Css>
      );
    }
  }
});
