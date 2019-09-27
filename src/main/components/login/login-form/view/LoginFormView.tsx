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
const { useCallback, useEffect, useRef, useState } = React

// --- LoginFormView ------------------------------------------------

function LoginFormView({
  extraFields,
  fullSize,
  slotFooter,
  slotHeader,
  slotIntro,
  performLogin
}: LoginFormViewProps) {
    let
      introColumn: ReactNode | null = null,
      headerBox: ReactNode | null = null,
      footerBox: ReactNode | null = null

    const
      data = useRef<Record<string, string>>({}).current,
      [loading, setLoading] = useState(false),
      [generalErrorMsg, setGeneralErrorMsg] = useState(''),
      [forceValidation, setForceValidation] = useState(false),
      [rememberLogin, setRememberLogin] = useState(false), // TODO 
      classes = getLoginFormClasses(Boolean(slotIntro)),

      onValueChanged = useCallback((ev: { value: string, name: string }) => {
        // WHY IS THIS NOT WORKING????
        //console.log('2222', generalErrorMsg)
        //if (generalErrorMsg) {
          setGeneralErrorMsg('')
        //}
  
        data[ev.name] = ev.value
      }, [data, generalErrorMsg]),

      onRememberLoginChange = useCallback((_: any, checked?: boolean) => {
        setRememberLogin(!!checked)
      }, []),

      onSubmit = useCallback((ev: FormEvent) => {
        ev.preventDefault()
        const loginData: Record<string, string> = {}

        let valid: boolean = Boolean(data.username && data.password)

        if (valid && extraFields) {
          for (let i = 0; i < extraFields.length; ++i) {
            const extraField = extraFields[i]

            if (data[extraField.name] === undefined) {
              if (extraField.defaultValue) {
                loginData[extraField.name] = extraField.defaultValue
              } else {
                valid = false
                break
              }
            } else if (!data[extraField.name]) {
              valid = false
              break
            } else {
              loginData[extraField.name] = data[extraField.name]
            }
          }
        }

        if (!valid) {
          setForceValidation(true)
        } else if (performLogin && !loading && !generalErrorMsg) {
          loginData['username'] = data['username'],
          loginData['password'] = data['password']

          setLoading(true)

          performLogin(loginData, rememberLogin)
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
              setGeneralErrorMsg(errorMsg)
            })
        }
      }, [rememberLogin, loading, generalErrorMsg, data, extraFields]) // TODO

/*
    useEffect(() => {
      loginData['username'] = '',
      loginData['password'] = ''

      if (extraFields) {
        for (let i = 0; i < extraFields.length; ++i) {
          const field = extraFields[i]

          loginData[field.name] = field.defaultValue || ''
        }
      }
    }, [loginData])
*/

    useEffect(() => {
      if (forceValidation) {
        setForceValidation(false)
      }
    }, [forceValidation])

    if (slotIntro) {
      introColumn =
        <div className={classes.introColumn}>
          <div className={classes.intro}>
            {slotIntro}
          </div>
        </div>
    }

    if (slotHeader) {
      headerBox =
        <div className={classes.header}>
          { slotHeader }
        </div>
    } else {
      headerBox =
        <div className={classes.defaultHeader}>
          <div><DefaultIcon className={classes.defaultIcon}/></div>
          <div>User Login</div> 
        </div>
    }

    if (slotFooter) {
      footerBox = 
        <div className={classes.footer}>
          {slotFooter}
        </div>
    }

    return (
      <div className={fullSize ? classes.containerFullSize : classes.container}>
        <div className={classes.inner}>
          {introColumn}
          <div className={classes.formColumn}>
            {headerBox}
            <form onSubmit={onSubmit} className={classes.form}>
              {
                !slotHeader
                  ? null
                  : <div className={classes.headline}>
                      User Login
                    </div>
              }
              <div className={classes.content}>
                <div className={!extraFields || extraFields.length < 2 ? classes.fields : classes.fieldsWithHorizontalLabel }>
                  {renderFields(extraFields, classes, loading, forceValidation, onValueChanged)}
                </div>
              </div>
              <Text className={classes.errorMessage}>{generalErrorMsg}</Text>
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
  extraFields: LoginFormViewProps['extraFields'],
  classes: LoginFormCssClasses,
  disableFields: boolean,
  forceValidation: boolean,
  onValueChanged: any // TODO!!!
) {
  const contents: ReactNode[] = [
    <LoginFormTextField
      name="username"
      label="User name"
      disabled={disableFields}
      forceValidation={forceValidation}
      onValueChanged={onValueChanged}
    />,
    <LoginFormTextField
      name="password"
      label="Password"
      disabled={disableFields}
      forceValidation={forceValidation}
      onValueChanged={onValueChanged}
    />
  ]

  if (extraFields && extraFields.length > 0) {
    extraFields.forEach((extraField, idx) => {
      let field: ReactNode

      switch (extraField.type) {
        case 'text':
          field =
            <LoginFormTextField
              name={extraField.name}
              label={extraField.label}
              disabled={disableFields}
              forceValidation={forceValidation}
              onValueChanged={onValueChanged}
            />
          break

        case 'choice':
          field =
            <LoginFormDropdown
              name={extraField.name}
              label={extraField.label}
              options={extraField.options}
              disabled={disableFields}
              forceValidation={forceValidation}
              onValueChanged={onValueChanged}
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
