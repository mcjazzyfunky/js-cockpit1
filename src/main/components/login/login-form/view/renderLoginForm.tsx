// external imports
import React, { ReactNode, ReactElement, CSSProperties} from 'react'
import { isElementOfType } from 'js-react-utils'
import { Checkbox, PrimaryButton, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react'
import { IoIosContact as DefaultIcon } from 'react-icons/io'

// internal imports
import LoginForm from '../LoginForm'
import LoginFormProps from '../types/LoginFormProps'
import defineStyle from '../../../../styling/defineStyle'

// --- styleLoginForm -----------------------------------------------

const styleLoginForm = defineStyle(theme => ({
  container: {
    backgroundColor: theme.palette.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralSecondary,
    position: 'relative',
  },

  containerFullSize: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.neutralLight,
    position: 'absolute',

    selectors: {
      '& > *': {
        borderRadius: '6px'
      }
    }
  },

  inner: {
    position: 'relative',
    backgroundColor: theme.palette.white,
    display: 'flex',
    width: '350px',
    flexDirection: 'column',
    minHeight: '430px',
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
    borderColor: theme.palette.neutralQuaternaryAlt,
    padding: '1rem 1.5rem',
  },

  defaultHeader: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,
    padding: '0.5rem 1.5rem',
    textAlign: 'center',
    fontSize: theme.fonts.large.fontSize,
  },

  defaultIcon: {
    height: '50px',
    width: '50px',
    color: theme.palette.neutralQuaternary
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
  },

  above: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    color: theme.palette.neutralSecondaryAlt,
    padding: '1.25rem 0',
    textAlign: 'center',
  },

  below: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    color: theme.palette.neutralSecondaryAlt,
    padding: '0.75rem 0',
    textAlign: 'center',
  }
}))

// --- renderView ---------------------------------------------------

function renderView(props: LoginFormProps) {
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
      above: ReactElement<any> = null, // TODO
      below: ReactElement<any> = null, // TODO
      headerBox: ReactNode = null,
      aboveBox: ReactNode = null,
      belowBox: ReactNode = null

    React.Children.forEach(props.children, (child: any) => {
      if (isElementOfType(LoginForm.Header, child)) {
        header = child
      }

      if (isElementOfType(LoginForm.Above, child)) {
        above = child
      }
      
      if (isElementOfType(LoginForm.Below, child)) {
        below = child
      }
    })

    return styleLoginForm(classes => { // TODO
      if (header) {
        headerBox =
          <div className={classes.header}>
            { header.props.children }
          </div>
      } else {
        headerBox =
          <div className={classes.defaultHeader}>
            <div><DefaultIcon className={classes.defaultIcon}/></div>
            <div>User Login</div> 
          </div>
      }

      if (above) {
        aboveBox = 
          <div className={classes.above}>
            {above.props.children} 
          </div>
      }
      
      if (belowBox) {
        belowBox = 
          <div className={classes.below}>
            {below.props.children} 
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
          {aboveBox}
          <div className={classes.inner}>
            {headerBox}
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
          {belowBox}
        </div>
      )
    })
}

// --- exports ------------------------------------------------------

export default renderView
