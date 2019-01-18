// external imports
import React, { ReactNode, ReactElement, CSSProperties} from 'react'
import { isElementOfType } from 'js-react-utils'
import { Checkbox, PrimaryButton, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react'

// internal imports
import LoginForm from './LoginForm'
import LoginFormProps from './LoginFormProps'
import defineStyle from '../../../styling/defineStyle'

// --- style of LoginForm -------------------------------------------

const styleLoginForm = defineStyle(theme => ({
  container: {
    width: '320px',
    backgroundColor: theme.palette.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralSecondary,
    position: 'relative',
  },

  containerFullSize: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.neutralLighter,
    position: 'absolute'
  },

  inner: {
    position: 'relative',
    top: '-10%',
    display: 'flex',
    width: '320px',
    flexDirection: 'column',
    minHeight: '405px',
    textAlign: 'left',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },

  header: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralTertiaryAlt,
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

// --- LoginFormView ------------------------------------------------

function LoginFormView(props: LoginFormProps) {
  const
    [state, setState] = React.useState(() => ({
      username: '',
      password: '',
      remember: false,
      usernameErrorMsg: '',
      passwordErrorMsg: '',
      generalErrorMsg: '',
      loading: false
    })),

    onSubmit = React.useCallback((ev: any) => {
      ev.preventDefault()

      const
        usernameGiven = state.username.trim().length > 0,
        passwordGiven = state.password.trim().length > 0

      if (!usernameGiven || !passwordGiven) {
        setState({
          ...state,
          usernameErrorMsg:
            usernameGiven ? '' : 'Please enter username',

          passwordErrorMsg:
            passwordGiven ? '' : 'Please enter password',

          generalErrorMsg: ''
        })
      } else if (typeof props.performLogin === 'function' && !state.loading) {
        setState({
          ...state,
          generalErrorMsg: '',
          loading: true
        })

        const loginParams = {
          username: state.username,
          password: state.password,
          remember: state.remember
        }

        setTimeout(() => {
          try {
            props.performLogin(loginParams)
              .then((result: any) => {
                if (result
                  && typeof result.fullName === 'string'
                  && result.fullName.trim() !== '') {
                  
                  setState(
                    { ...state, loading: false })
// TODO                () => setTimeout(
// TODO                      () => alert(result.fullName + ' has been logged in successfully'), 100))
                } else {
                  setState({
                    ...state,
                    loading: false,
                    generalErrorMsg: 'Error: Could not log in'
                  })
                }
              })
              .catch((error: Error | string) => {
                let errorMsg = ''

                if (error instanceof Error) {
                  errorMsg = 'Error: ' + String(error.message).trim()
                } else if (typeof error === 'string' && error.trim() !== '') {
                  errorMsg = 'Error: ' + error 
                } else {
                  errorMsg = 'Error: Could not log in'
                }

                setState({
                  ...state,
                  loading: false,
                  generalErrorMsg: errorMsg
                })
              })
          } catch (e) {
            setState({
              ...state,
              loading: false,
              generalErrorMsg: 'Error: Could not log in'
            })
          }
        }, 1000)
      }
    }, []),

    loginButtonText =
      state.loading
        ? 'Logging in...'
        : 'Log in'

    let
      header: ReactElement<any> = null, // TODO
      headerBox: ReactNode = null

    React.Children.forEach(props.children, (child: any) => {
      if (isElementOfType(LoginForm.Header, child)) {
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
        state.loading
          ? <div className={classes.loadingIndicator}>
              <Spinner
                size={SpinnerSize.small}
              />
            </div>
          : null

      return (
        <div className={props.fullSize ? classes.containerFullSize : classes.container}>
          <div className={classes.inner}>
          { headerBox }
          <form onSubmit={onSubmit} className={classes.form}>
            <div className={classes.content}>
              <TextField
                name="username"
                label="User name"
                autoComplete="off"
                disabled={state.loading}
                value={state.username}
                errorMessage={state.usernameErrorMsg}

                onChange={
                  event => setState({
                    ...state,
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
                disabled={state.loading}
                value={state.password}
                errorMessage={state.passwordErrorMsg}
                
                onChange={
                  event => setState({
                    ...state,
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
                disabled={state.loading}

                onChange={
                  event => setState({
                    ...state,
                    remember: (event.target as any).checked
                  })
                }
              />
              <div className={classes.generalError}>
                  {state.generalErrorMsg}
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
        </div>
      )
    })
}

// --- export -------------------------------------------------------

export default LoginFormView
