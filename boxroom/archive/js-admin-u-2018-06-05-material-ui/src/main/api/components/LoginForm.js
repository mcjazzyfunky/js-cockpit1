import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { defineComponent } from 'js-widgets';

const styles = {
  LoginForm: {
    width: 300
  }
};

export default defineComponent({
  displayName: 'LoginForm',

  properties: {
    headline: {
      type: String,
      nullable: true,
      defaultValue: 'Login'
    },

    subheadline: {
      type: String,
      nullable: true,
      defaultValue: 'Please enter user name and password to log in'
    },

    className: {
      type: String,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    render() {
      const
        props = this.props,
        state = this.state;

      return (
        <Card style={styles.LoginForm} className={props.className}>
            <CardContent>
              <div>
                <Typography variant="headline">
                  {props.headline}
                </Typography>
                <Typography variant="body1">
                  {props.subheadline}
                </Typography>
              </div>
              <div>
                <TextField
                  label="User name"
                />
              </div>
              <div>
                <TextField
                  type="password"
                  label="Password"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                    />
                  }
                  label="Remember me"
                >
                </FormControlLabel>
              </div>
              <div>
                <Button variant="raised" color="primary">Log in</Button>
              </div>
            </CardContent>
        </Card>
      );
    }
  }
});

