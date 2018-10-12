// internal imports
import defineStyle from '../../../../../styling/defineStyle'

// external imports
import React, { ReactNode, ReactElement, CSSProperties } from 'react';
import { defineComponent, isNode, withChildren, isElementOfType } from 'js-react-utils';
import { Checkbox, PrimaryButton, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';
import { Spec } from 'js-spec'

// --- LoginForm ----------------------------------------------------

const styleLoginForm = defineStyle(theme => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '320px',
      minHeight: '380px',
      textAlign: 'left',
      backgroundColor: theme.palette.white,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralSecondary,
    },

    header: {
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralTertiary,
      padding: '1rem 1.5rem',
    },

    content: {
      flexGrow: 1,
      padding: '1rem 1.5rem',
    },

    footer: {
      padding: '1rem 1.5rem',
    },

    remember: {
      margin: '1.25rem 0 0 0',
    },

    loadingIndicator: {
      display: 'inline-block',
      margin: '0 0 0 0.75rem',
    }
  }
})

const validationConfig = {
  fields: [
    {
      name: 'username',

      rules: [
        {
          condition: (it: string) => !!it,
          errorMsg: 'Please enter your username'
        }
      ]
    },
    {
      name: 'password',

      rules: [
        {
          condition: (it: string) => !!it,
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

type HeaderProps = {
  children: ReactNode
}

const Header = defineComponent<HeaderProps>({
  displayName: 'LoginForm.Header',

  properties: {
    children: {
      validate: isNode
    }
  },

  render() {
    throw new Error(
      'Components of type LoginForm.Header can only be used as children '
        + 'of LoginForm components')
  }
})

type LoginFormProps = {
  performLogin?: Function,
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

type LoginFormState = {
  loading: boolean
}

const LoginForm = defineComponent<LoginFormProps>({
  displayName: 'LoginForm',

  properties: {
    performLogin: {
      type: Function
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
    },

    children: {
      validate: withChildren(Spec.all(isElementOfType(Header)))
    }
  },

  base: class extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
      super(props);

      this.state = { loading: false };
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(ev: any) { // TODO
      if (!this.state.loading) {
        this.setState({ loading: true });

        if (this.props.performLogin) {
          try {
            this.props.performLogin(ev.data)
              .then((data: any) => { // TODO
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

      let
        header: ReactElement<any> = null, // TODO
        headerBox: ReactNode = null

      React.Children.forEach(this.props.children, (child: any) => {
        if (isElementOfType(Header, child)) {
          header = child
        }
      })

      return styleLoginForm(classes => { // TODO
        if (header) {
          headerBox =
            <div className={classes.header}>
              { header.props.children }
            </div>
        }

        const loadingIndicator =
          this.state.loading
            ? <div className={classes.loadingIndicator}>
                <Spinner
                  size={SpinnerSize.small}
                />
              </div>
            : null;

        return (
          <div className={classes.container}>
            { headerBox }
            <div className={classes.content}>
              <div>
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
                <Checkbox
                  name="remember"
                  label="Remember me"
                  className={classes.remember}
                  disabled={this.state.loading}
                />
              </div>
            </div>
            <div className={classes.footer}>
              <PrimaryButton type="submit" style={{width: '100%' }}>
                {loginButtonText}
                {loadingIndicator}
              </PrimaryButton>
            </div>
          </div>
        )
      })
    }
  }
})

export default Object.assign(LoginForm, {
  Header
})
