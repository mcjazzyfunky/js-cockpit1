import defineStyle from '../../../../styling/defineStyle'
import React, { ReactNode, ReactElement, CSSProperties } from 'react';
import { defineComponent, isNode, withChildren, isElementOfType } from 'js-react-utils';
import { Checkbox, ITheme, PrimaryButton, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';
import { Spec } from 'js-spec'

const styleLoginForm = defineStyle(({ theme }: { theme: ITheme}) => { // TODO
  return {
    container: {
      padding: '1rem 0.8rem',
      width: '20rem',
      minHeight: '23rem',
      textAlign: 'left',
      backgroundColor: 'white',
      border: '1px solid #888',
    },

    remember: {
      margin: '1.25rem 0 0 0',
    },

    loadingIndicator: {
      display: 'inline-block',
      margin: '0 0 0 0.75rem',
    }
  };
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

      if (header) {
        headerBox =
          <div>
            { header.props.children }
          </div>
      }

      return styleLoginForm(classes => { // TODO
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
            <div>
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
              <div>
                <PrimaryButton type="submit" style={{width: '100%' }}>
                  {loginButtonText}
                  {loadingIndicator}
                </PrimaryButton>
              </div>
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
