// external imports
import React, { ReactNode, FormEvent } from 'react'
import { Checkbox, Label, PrimaryButton, Spinner, SpinnerSize, Text } from 'office-ui-fabric-react'
import { IoMdContact as DefaultIcon } from 'react-icons/io'

// internal imports
import LoginFormTextField from './LoginFormTextField'
import LoginFormDropdown from './LoginFormDropdown'
import getLoginFormClasses from './getLoginFormClasses'
import LoginFormViewProps from '../types/LoginFormViewProps'

// derived imports
const { useCallback, useEffect, useState } = React

// --- LoginFormView ------------------------------------------------

function LoginFormView(props: LoginFormViewProps) {
    let
      introColumn: ReactNode | null = null,
      headerBox: ReactNode | null = null,
      footerBox: ReactNode | null = null

    const
      [loading, setLoading] = useState(false),
      [errorMsg, setErrorMsg] = useState(''),
      [forceValidation, setForceValidation] = useState(false),
      [rememberLogin, setRememberLogin] = useState(false), // TODO 
      classes = getLoginFormClasses(Boolean(props.slotIntro)),

      onRememberLoginChange = useCallback((_: any, checked?: boolean) => {
        setRememberLogin(!!checked)
      }, []),

      onSubmit = useCallback((ev: FormEvent) => {
        ev.preventDefault()
        let valid: boolean = true

        const
          data: any = {},

          elems = (ev.target as any)
            .querySelectorAll('input[type=hidden][data-login-field]')

        if (!elems) {
          valid = false
        } else {
          for (let i = 0; i < elems.length; ++i) {
            const elem = elems[i]

            data[elem.name] = elem.value

            if (elem.value === '') {
              valid = false
            }
          }
        }

        if (!valid) {
          setForceValidation(true)
        } else if (props.performLogin && !loading && !errorMsg) {
          setLoading(true)
          
          props.performLogin(data, rememberLogin)
            .then(() => {
              setTimeout(() => {
                setLoading(false)
              }, 1000)
            })
            .catch((reason: any) => {
              let errorMsg = ''

              if (typeof reason === 'string') {
                errorMsg = reason
              } else if (reason && typeof reason === 'object') {
                errorMsg =
                  reason.message === 'string'
                    ? reason.message
                    : String(reason.message)
              }

              errorMsg = errorMsg.trim()

              if (errorMsg === '') {
                errorMsg = 'Could not log in'
              }

              errorMsg = 'Error: ' + errorMsg

              setLoading(false)
              setErrorMsg(errorMsg)
            })
        }
      }, [rememberLogin, loading, errorMsg])

    useEffect(() => {
      if (forceValidation) {
        setForceValidation(false)
      }
    }, [forceValidation])

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
                  {renderFields(props, classes, loading, forceValidation)}
                </div>
              </div>
              <Text className={classes.errorMessage}>{errorMsg}</Text>
              <div className={classes.footer}>
                <Checkbox
                  label="Remember me"
                  checked={rememberLogin}
                  className={classes.rememberLogin}
                  disabled={loading}
                  onChange={onRememberLoginChange}
                />
                <br/>
                <PrimaryButton type={ loading ? 'button' : 'submit' } className={classes.submitButton}>
                  {
                    !loading
                      ? 'Login'
                      : <>
                          Logging in...
                          <Spinner className={classes.spinner} size={SpinnerSize.small}/>
                        </>
                  }
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

function renderFields(
  props: LoginFormViewProps,
  classes: LoginFormCssClasses,
  disableFields: boolean,
  forceValidation: boolean
) {
  const contents: ReactNode[] = [
    <LoginFormTextField
      name="username"
      label="User name"
      disabled={disableFields}
      forceValidation={forceValidation}
    />,
    <LoginFormTextField
      name="password"
      label="Password"
      disabled={disableFields}
      forceValidation={forceValidation}
    />
  ]

  if (props.extraFields && props.extraFields.length > 0) {
    props.extraFields.forEach((extraField, idx) => {
      let field: ReactNode

      switch (extraField.type) {
        case 'text':
          field =
            <LoginFormTextField
              name={extraField.name}
              label={extraField.label}
              disabled={disableFields}
              forceValidation={forceValidation}
            />
          break

        case 'choice':
          field =
            <LoginFormDropdown
              name={extraField.name}
              label={extraField.label}
              options={extraField.options}
              disabled={disableFields}
            />
          break
      }

      contents.push(field)
    })
  }

  return contents
}

// --- exports ------------------------------------------------------

export default LoginFormView
