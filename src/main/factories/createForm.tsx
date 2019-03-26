import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

type FormConfig = {
  fields: {
    [name: string]: {
        rules?: Array<{
          (validate: any): boolean | null | Error,
          errorMsg: string
        }>
    }
  }
}

type FormFieldCtrl<T extends FormConfig> = {
  getValue: () => any,
  setValue: (value: any) => void,
  getErrorMsg: () => string | null,
  getForm: () => FormCtrl<T>,
  isRequired: () => boolean
}

type FormCtrl<T extends FormConfig> = {
  fields: {
    [name in keyof T['fields']]: FormFieldCtrl<T>
  },

  submit: () => void
}

export default function createForm<T extends FormConfig>(config: T, f: (formCtrl: FormCtrl<T>) => ReactNode): void {
}


const formConfig = {
  fields: {
    firstName: {
    },

    lastName: {
    }
  }
}

const myForm = createForm(formConfig, form =>
  <div>
    <TextField label="First name:" field={form.fields.firstName}/>
    <TextField label="Last name:" field={form.fields.lastName}/>
  </div>
)

type TextFieldProps = {
  label?: string,
  field?: FormFieldCtrl<any>
}

const TextField = defineComponent<TextFieldProps>({
  displayName: 'TextField',

  properties: {
    label: {
      type: String
    },

    field: {
      type: Object
    }
  },

  render() {
    // not really important here
    return null
  }
})


type FormProps<T extends FormConfig> = {
  fields: {
    [name in keyof FormConfig['fields']]: FormFieldCtrl<T> 
  },
  children: FormCtrl<T>
}

const Form = defineComponent<FormProps<FormConfig>>({
  displayName: 'Form',
  
  properties: {
    fields: {
      type: Object,

      validate:
        Spec.and(
          Spec.keysOf(Spec.match(/^[a-z][a-zA-Z0-9]$/)),
          Spec.valuesOf(
              Spec.exact({
                rules:
                  Spec.arrayOf(
                    Spec.exact({
                      validate: Spec.function,
                      errorMsg: Spec.string
                    })),

                defaultValue:
                  Spec.any
              })))
    },

    children: {
      validate: Spec.function
    }
  },

  render(props: FormProps<any>) {
    return null
  }
})
/*
void(
  <Form
    fields={{
      firstName: {
      },

      lastName: {
      }
    }}
  >
    {
      ctrl => {
        return <div>Juhu</div>
      }
    }
  </Form>)
*/