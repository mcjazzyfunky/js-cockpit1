import React from 'react';
import { defineComponent } from 'js-widgets';
import Logo from '../misc/Logo';
import Card from '../card/Card';
import { Checkbox, PrimaryButton, TextField } from 'office-ui-fabric-react';

const LoginFormComponent = defineComponent({
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
        <div className="aw-login-screen">
        <Card>
          <Card.Body>
            <TextField label="User name" autoComplete="off" />
            <TextField label="Password" type="password" xerrorMessage="Please enter your password"/>
            <Checkbox label="Remember me" onChange={this._onCheckboxChange} ariaDescribedBy={'descriptionID'} className='xxx' />
            <PrimaryButton type="submit" style={{width: '100%' }}>Log in</PrimaryButton>
          </Card.Body>
        </Card>
        </div>
      );
    }
  }
});

export default LoginFormComponent;
