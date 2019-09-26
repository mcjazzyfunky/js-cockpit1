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

        console.log(data)
        alert(valid)
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
                  <div>
                    <div>
                      <Label>User name</Label>
                    </div>
                    <div>
                      <LoginFormTextField
                        field="username"
                        label="User name"
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
                        isPassword={true}
                      />
                    </div>
                  </div>
                  {renderExtraFields(props, classes)}
                </div>
              </div>
              <div className={classes.footer}>
                <Checkbox
                  name="remember"
                  label="Remember me"
                  className={classes.remember}

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
                  Login (TODO')
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
  classes: LoginFormCssClasses
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
              isPassword={false}
            />
          break

        case 'choice':
          field =
            <LoginFormDropdown
              field={extraField.key}
              label={extraField.label}
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

// --- exports ------------------------------------------------------

export default LoginFormView
