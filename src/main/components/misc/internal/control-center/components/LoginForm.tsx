// internal imports
import defineStyle from '../../../../../styling/defineStyle'

// external imports
import React, { ReactNode, ReactElement, CSSProperties } from 'react'
import { defineComponent, isNode, withChildren, isElementOfType } from 'js-react-utils'
import { Checkbox, PrimaryButton, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react'
import { Spec } from 'js-spec'

// --- LoginForm.Header ---------------------------------------------

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

// --- LoginForm ----------------------------------------------------

const styleLoginForm = defineStyle(theme => ({
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

  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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

  generalError: {
    marginTop: '2rem',
    color: theme.semanticColors.errorText
  },

  submitButton: {
    width: '100%'
  },

  loadingIndicator: {
    display: 'inline-block',
    margin: '0 0 0 0.75rem',
  }
}))

type LoginFormProps = {
  performLogin?:
    (params: { username: string, password: string, remember: boolean }) =>
      Promise<{ fullName: string }>

  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

type LoginFormState = {
  username: string,
  password: string,
  remember: boolean,
  usernameErrorMsg: string,
  passwordErrorMsg: string,
  generalErrorMsg: string
  loading: boolean,
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
      validate:
        withChildren(Spec.all(isElementOfType(Header)))
    }
  },

  render: class extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
      super(props)

      this.state = {
        username: '',
        password: '',
        remember: false,
        usernameErrorMsg: '',
        passwordErrorMsg: '',
        generalErrorMsg: '',
        loading: false
      }

      this._onSubmit = this._onSubmit.bind(this)
    }

    private _onSubmit(ev: any) { // TODO
      ev.preventDefault()

      const
        usernameGiven = this.state.username.trim().length > 0,
        passwordGiven = this.state.password.trim().length > 0

      if (!usernameGiven || !passwordGiven) {
        this.setState({
          usernameErrorMsg:
            usernameGiven ? '' : 'Please enter username',

          passwordErrorMsg:
            passwordGiven ? '' : 'Please enter password',

          generalErrorMsg: ''
        })
      } else if (typeof this.props.performLogin === 'function' && !this.state.loading) {
        this.setState({
          generalErrorMsg: '',
          loading: true
        })

        const loginParams = {
          username: this.state.username,
          password: this.state.password,
          remember: this.state.remember
        }

        setTimeout(() => {
          try {
            this.props.performLogin(loginParams)
              .then(result => {
                if (result
                  && typeof result.fullName === 'string'
                  && result.fullName.trim() !== '') {
                  
                  this.setState(
                    { loading: false },
                    () => setTimeout(
                      () => alert(result.fullName + ' has been logged in successfully'), 100))
                } else {
                  this.setState({
                    loading: false,
                    generalErrorMsg: 'Error: Could not log in'
                  })
                }
              })
              .catch(error => {
                let errorMsg = ''

                if (error instanceof Error) {
                  errorMsg = 'Error: ' + String(error.message).trim()
                } else if (typeof error === 'string' && error.trim() !== '') {
                  errorMsg = 'Error: ' + error 
                } else {
                  errorMsg = 'Error: Could not log in'
                }

                this.setState({
                  loading: false,
                  generalErrorMsg: errorMsg
                })
              })
          } catch (e) {
            this.setState({
              loading: false,
              generalErrorMsg: 'Error: Could not log in'
            })
          }
        }, 1000)
      }
    }

    render() {
      const
        loginButtonText =
          this.state.loading
            ? 'Logging in...'
            : 'Log in'

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
            : null

        return (
          <div className={classes.container}>
            { headerBox }
            <form onSubmit={this._onSubmit} className={classes.form}>
              <div className={classes.content}>
                <TextField
                  name="username"
                  label="User name"
                  autoComplete="off"
                  disabled={this.state.loading}
                  value={this.state.username}
                  errorMessage={this.state.usernameErrorMsg}

                  onChange={
                    event => this.setState({
                      username: (event.target as any).value,
                      usernameErrorMsg: '',
                      passwordErrorMsg: '',
                      generalErrorMsg: ''
                    })
                  }
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  disabled={this.state.loading}
                  value={this.state.password}
                  errorMessage={this.state.passwordErrorMsg}
                  
                  onChange={
                    event => this.setState({
                      password: (event.target as any).value,
                      usernameErrorMsg: '',
                      passwordErrorMsg: '',
                      generalErrorMsg: ''
                    })
                  }
                />
                <Checkbox
                  name="remember"
                  label="Remember me"
                  className={classes.remember}
                  disabled={this.state.loading}

                  onChange={
                    event => this.setState({
                      remember: (event.target as any).checked
                    })
                  }
                />
                <div className={classes.generalError}>
                    {this.state.generalErrorMsg}
                </div>
              </div>
              <div className={classes.footer}>
                <PrimaryButton type="submit" className={classes.submitButton}>
                  {loginButtonText}
                  {loadingIndicator}
                </PrimaryButton>
              </div>
            </form>
          </div>
        )
      })
    }
  } as any // TODO
})

export default Object.assign(LoginForm, {
  Header
})
