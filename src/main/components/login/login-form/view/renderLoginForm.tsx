// external imports
import React, { ReactNode, ReactElement } from 'react'
import { Checkbox, Label, PrimaryButton, Spinner, SpinnerSize, TextField, Dropdown } from 'office-ui-fabric-react'
//import { IoIosContact as DefaultIcon } from 'react-icons/io'
import { IoMdContact as DefaultIcon } from 'react-icons/io'

// internal imports
import styleLoginForm from './styleLoginForm'
import LoginFormProps from '../types/LoginFormProps'
import CssClassesOf from '../../../../styling/types/CssClassesOf';

// --- renderLoginForm ----------------------------------------------

function renderLoginForm(props: LoginFormProps) {
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

        if (props.performLogin) {
          setTimeout(() => {
            try {
              (props as any).performLogin(loginParams)
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
      }
    }, []),

    loginButtonText =
      state.loading
        ? 'Logging in...'
        : 'Log in'

    let
      headerBox: ReactNode | null = null,
      aboveBox: ReactNode | null = null,
      belowBox: ReactNode | null = null

    return styleLoginForm(classes => { // TODO
      if (props.slotHeader) {
        headerBox =
          <div className={classes.header}>
            { props.slotHeader }
          </div>
      } else {
        headerBox =
          <div className={classes.defaultHeader}>
            <div><DefaultIcon className={classes.defaultIcon}/></div>
            <div>User Login</div> 
          </div>
      }

      if (props.slotAbove) {
        aboveBox = 
          <div className={classes.above}>
            {props.slotAbove} 
          </div>
      }
      
      if (props.slotBelow) {
        belowBox = 
          <div className={classes.below}>
            {props.slotBelow}
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
          {aboveBox}
          <div className={classes.card}>
            {headerBox}
            <form onSubmit={onSubmit} className={classes.form}>
              <div className={classes.content}>
                <div className={!props.extraFields || props.extraFields.length < 2 ? classes.fields : classes.fieldsWithHorizontalLabel }>
                  <div>
                    <div>
                      <Label>User name</Label>
                    </div>
                    <div>
                      <LoginFormTextField
                        name="username"
                        disabled={state.loading}
                        value={state.username}
                        errorMsg={state.usernameErrorMsg}

              /*
                        onChange={
                          (event: any) => setState({
                            ...state,
                            username: (event.target as any).value,
                            usernameErrorMsg: '',
                            passwordErrorMsg: '',
                            generalErrorMsg: ''
                          })
            */
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <Label>Password</Label>
                    </div>
                    <div>
                      <LoginFormTextField
                        name="password"
                        label="Password"
                        isPassword={true}
                        disabled={state.loading}
                        value={state.password}
                        errorMsg={state.passwordErrorMsg}

              /*
                        onChange={
                          event => setState({
                            ...state,
                            password: (event.target as any).value,
                            usernameErrorMsg: '',
                            passwordErrorMsg: '',
                            generalErrorMsg: ''
                          })
                        }
            */
                      />
                    </div>
                  </div>
                  {renderExtraFields(props, classes)}
                </div>
                <div className={classes.generalError}>
                    {state.generalErrorMsg}
                </div>
              </div>
              <div className={classes.footer}>
                <Checkbox
                  name="remember"
                  label="Remember me"
                  className={classes.remember}
                  disabled={state.loading}

                  onChange={
                    event => setState({
                      ...state,
                      remember: (event!.target as any).checked
                    })
                  }
                />
                <br/>
                <PrimaryButton type="submit" className={classes.submitButton}>
                  {loginButtonText}
                  {loadingIndicator}
                </PrimaryButton>
              </div>
            </form>
          </div>
          {belowBox}
          </div>
        </div>
      )
    })
}

// --- locals -------------------------------------------------------

type LoginFormCssClasses = CssClassesOf<typeof styleLoginForm>

function renderExtraFields(props: LoginFormProps, classes: LoginFormCssClasses) {
  let ret: ReactNode = null

  if (props.extraFields && props.extraFields.length > 0) {
    const fields = props.extraFields.map((extraField, idx) => {
      let field: ReactNode | undefined

      switch (extraField.type) {
        case 'text':
          field =
            <LoginFormTextField />
          break

        case 'choice':
          field =
            <LoginFormChoice
              options={extraField.options}
              defaultValue={extraField.defaultValue}
            />
          break
      }

      return (
        <div>
          <div>
            <Label>{extraField.label}</Label>
          </div>
          <div>
            {field}
          </div>
        </div>
      ) 
    })

    ret = <>{...fields}</>
  }

  return ret
}

function LoginFormTextField({
  name = '',
  label = '',
  value = '',
  disabled = false,
  errorMsg = '',
  isPassword = false,
  onChange = null as any
}) {
  return (
     <TextField/>
  )
}

function LoginFormChoice({
  name = '',
  label = '',
  value = '',
  disabled = false,
  errorMsg = '',
  defaultValue = '',
  onChange = null as any,
  options = null as any
}) {
  return (
    <Dropdown
      defaultSelectedKey={defaultValue}
      options={
        options.map((option: any) => ({
          key: option.value,
          text: option.text
        }))
      }
    />
  )
}


// --- exports ------------------------------------------------------

export default renderLoginForm
