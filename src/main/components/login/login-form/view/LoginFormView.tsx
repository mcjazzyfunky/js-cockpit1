// external imports
import React, { ReactNode, ReactElement, FormEvent } from 'react'
import { Checkbox, Label, PrimaryButton, Spinner, SpinnerSize, TextField, Dropdown } from 'office-ui-fabric-react'
import { IoMdContact as DefaultIcon } from 'react-icons/io'

// internal imports
import getLoginFormClasses from './getLoginFormClasses'
import useLoginFormStore from '../store/useLoginFormStore'
import LoginFormViewProps from '../types/LoginFormViewProps'

// derived imports
const { useCallback } = React

// --- LoginFormView ------------------------------------------------

function LoginFormView(props: LoginFormViewProps) {
    let
      introColumn: ReactNode | null = null,
      headerBox: ReactNode | null = null,
      footerBox: ReactNode | null = null

    const
      classes = getLoginFormClasses(Boolean(props.slotIntro)),
      store = useLoginFormStore() 

    const onSubmit = useCallback((ev: FormEvent) => {
      ev.preventDefault()
      store.performLogin(null as any)
    }, [])


    if (props.slotIntro) {
      introColumn =
        <div className={classes.introColumn}>
          <div className={classes.intro}>
            {props.slotIntro}
          </div>
        </div>
    }

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

    if (props.slotFooter) {
      footerBox = 
        <div className={classes.footer}>
          {props.slotFooter}
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
          {introColumn}
          <div className={classes.formColumn}>
            {headerBox}
            <form onSubmit={onSubmit} className={classes.form}>
              {
                !props.slotHeader
                  ? null
                  : <div className={classes.headline}>
                      User Login
                    </div>
              }
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
                  {renderExtraFields(props, classes, store)}
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
            {footerBox}
          </div>
        </div>
      </div>
    )
}

// --- locals -------------------------------------------------------

type LoginFormCssClasses = ReturnType<typeof getLoginFormClasses>

function renderExtraFields(
  props: LoginFormViewProps,
  classes: LoginFormCssClasses,
  store: any // TODO
) {
  let ret: ReactNode = null

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

export default LoginFormView
