// external imports
import React, { ReactNode, ReactElement, FormEvent } from 'react'
import { Checkbox, Label, PrimaryButton, Spinner, SpinnerSize, TextField, Dropdown } from 'office-ui-fabric-react'
import { IoMdContact as DefaultIcon } from 'react-icons/io'

// internal imports
import styleLoginForm from './styleLoginForm'
import LoginFormViewProps from '../types/LoginFormViewProps'
//import LoginFormStore from '../types/LoginFormStore' // TODO!!!
import CssClassesOf from '../../../../styling/types/CssClassesOf';

// derived imports
const { useCallback } = React

// --- LoginFormView ------------------------------------------------

function renderLoginForm(props: LoginFormViewProps) {
    let
      headerBox: ReactNode | null = null,
      aboveBox: ReactNode | null = null,
      belowBox: ReactNode | null = null

    const store = {} as any // props.store // TODO!!!

    const onSubmit = useCallback((ev: FormEvent) => {
      ev.preventDefault()
      store.performLogin(null as any)
    }, [])

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

      const
        loginButtonText = store.isLoading() ? 'Logging in...' : 'Login',
  
        loadingIndicator =
          store.isLoading()
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
                        field="username"
                        label="User name"
                        store={store}
                        isPassword={false}
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <Label>Password</Label>
                    </div>
                    <div>
                      <LoginFormTextField
                        field="password"
                        label="Password"
                        store={store}
                        isPassword={true}
                      />
                    </div>
                  </div>
                  {renderExtraFields(props, classes)}
                </div>
                <div className={classes.generalError}>
                    {store.getGeneralErrorMsg()}
                </div>
              </div>
              <div className={classes.footer}>
                <Checkbox
                  name="remember"
                  label="Remember me"
                  className={classes.remember}
                  disabled={store.isLoading()}

                  /*
                  onChange={
                    event => setState({
                      ...state,
                      remember: (event!.target as any).checked
                    })
                  }
                  */
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

function renderExtraFields(
  props: LoginFormViewProps,
  classes: LoginFormCssClasses
) {
  let ret: ReactNode = null

  const store = {} as any // props.store // TODO!!!

  if (props.extraFields && props.extraFields.length > 0) {
    const fields = props.extraFields.map((extraField, idx) => {
      let field: ReactNode | undefined

      switch (extraField.type) {
        case 'text':
          field =
            <LoginFormTextField
              field={extraField.key}
              label={extraField.label}
              store={store}
              isPassword={false}
            />
          break

        case 'choice':
          field =
            <LoginFormChoice
              field={extraField.key}
              label={extraField.label}
              store={store}
              options={extraField.options}
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

type LoginFormTextFieldProps = {
  field: string,
  label: string,
  isPassword: boolean,
  store: any // LoginFormStore // TODO!!!
}

function LoginFormTextField(props: LoginFormTextFieldProps) {
  const
    value = props.store.getValue(props.field),

    onChange = useCallback(
      (ev: any) => props.store.setValue(props.field, ev.target.value),
      [props.store, props.field]),

    errorMsg =
      props.store.isValidationActivated() && value === ''
        ? `Please fill field "${props.label}"`
        : ''

  return (
     <TextField
       value={props.store.getValue(props.field)}
       disabled={props.store.isLoading()}
       type={props.isPassword ? 'password' : 'text'}
       errorMessage={errorMsg}
       onChange={onChange}
     />
  )
}

type LoginFormChoiceProps = {
  field: string,
  label: string,
  options: any, // TODO
  store: any // LoginFormStore // TODO!!!
}

function LoginFormChoice(props: LoginFormChoiceProps) {
  const
    selectedKey = props.store.getValue(props.field),

    errorMsg =
      props.store.isValidationActivated()
        && (selectedKey === null || selectedKey === undefined)
        ? `Please select "${props.label}"`
        : ''

  return (
    <Dropdown
      selectedKey={props.store.getValue(props.field)}
      disabled={props.store.isLoading()}
      errorMessage={errorMsg}
      
      options={
        props.options.map((option: any) => ({
          key: option.value,
          text: option.text
        }))
      }
    />
  )
}

// --- exports ------------------------------------------------------

export default renderLoginForm
