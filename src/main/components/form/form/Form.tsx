import React, { ReactNode } from 'react'
import { defineComponent, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

interface IForm {
  getValue: (fieldName: string) => any,
  setValue: (fieldName: string, value: any) => void,
  getErrorMsg: (fieldName: string) => string | null,
  getRequired: (fieldName: string) => boolean,
  getEnabled: (fieldName: string) => boolean
}

interface IFormFields {
  [fieldName: string]: {
    rules: Array<{
      validate(value: any): boolean | null | Error,
      errorMsg: string
    }>

    defaultValue: any
  }
}

interface IFormProps {
  fields: { 
    [fieldName: string]: {
      rules: Array<{
        validate(value: any): boolean | null | Error,
        errorMsg: string
      }>

      defaultValue: any
    }
  },

  children: ReactNode
}

const Form = defineComponent<IFormProps>({
  displayName: 'Form',

  properties: {
    fields: {
      type: Object,

      validate:
        Spec.and(
          Spec.keysOf(Spec.match(/^[a-z][a-zA-Z0-9]$/)),
          Spec.valuesOf(
            Spec.strictShape({
              rules:
                Spec.arrayOf(
                  Spec.strictShape({
                    validate: Spec.function,
                    errorMsg: Spec.string
                  })),

              defaultValue:
                Spec.any
            })))
    },

    children: {
      validate: isNode
    }
  },

  render(props) {
    const
      formCtrl = new FormCtrl({
        fields: props.fields
      })
    
    return 'TODO'
  }
})

interface IFormCtrlConfig {
  fields: { 
    [fieldName: string]: {
      rules: Array<{
        validate(value: any): boolean | null | Error,
        errorMsg: string
      }>

      defaultValue: any
    }
  }
}

class FormCtrl implements IForm {
  private _config: IFormCtrlConfig

  private _fields: {
    [fieldName: string]: {
      value: any,
      required: boolean,
      disabled: boolean
    }
  }

  constructor(config: IFormCtrlConfig) {
    this._config = config

    this._fields = {}
  }

  getEnabled(fieldName: string): boolean {
    return true // TODO 
  }

  getValue(fieldName: string): any {

  }

  setValue(fieldName: string): void {

  }

  getErrorMsg(fieldName: string): string | null {
    return null 
  }

  getRequired(fieldName: string): boolean {
    return false 
  }

  getDisabled(fieldName: string): boolean {
    return false
  }

  private _getField(fieldName: string) {
    
  }
}

// --- helpers ------------------------------------------------------



// --- exports ------------------------------------------------------

export default Form
