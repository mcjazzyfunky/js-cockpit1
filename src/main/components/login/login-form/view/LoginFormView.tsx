// external imports
import React, { ReactNode, FormEvent } from 'react'
import { Checkbox, Label, PrimaryButton, Spinner, SpinnerSize, TextField, Dropdown } from 'office-ui-fabric-react'
import { IoMdContact as DefaultIcon } from 'react-icons/io'

// internal imports
import LoginFormTextField from './LoginFormTextField'
import LoginFormDropdown from './LoginFormDropdown'
import getLoginFormClasses from './getLoginFormClasses'
import LoginFormViewProps from '../types/LoginFormViewProps'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormView ------------------------------------------------

function LoginFormView(props: LoginFormViewProps) {
    let
      introColumn: ReactNode | null = null,
      headerBox: ReactNode | null = null,
      footerBox: ReactNode | null = null

    const
      [loading, setLoading] = useState(false),
      classes = getLoginFormClasses(Boolean(props.slotIntro)),

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
          alert('Please check input')
        } else {
          setLoading(true)
          performLogin(data)
        }
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
                  {renderFields(props, classes, loading)}
                </div>
              </div>
              <div className={classes.footer}>
                <Checkbox
                  name="remember"
                  label="Remember me"
                  className={classes.remember}
                  disabled={loading}

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
  disableFields: boolean
) {
  const contents: ReactNode[] = [
    <LoginFormTextField
      name="username"
      label="User name"
      disabled={disableFields}
    />,
    <LoginFormTextField
      name="password"
      label="Password"
      disabled={disableFields}
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

function performLogin(data: Record<string, string>) {
  console.log('Loading', data)
}

// --- exports ------------------------------------------------------

export default LoginFormView
