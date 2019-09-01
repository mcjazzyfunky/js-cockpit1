// external imports
import { component, isNode, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec'
import { initStore } from 'js-stores'
import { useStore } from 'js-stores/with-react'

// internal imports
import LoginFormProps from './types/LoginFormProps' 
import LoginFormView from './view/LoginFormView'
import LoginFormStore from './types/LoginFormStore'
import validateLoginFormProps from './validation/validateLoginFormProps'

// --- LoginForm ----------------------------------------------------

const LoginForm = component<LoginFormProps>({
  displayName: 'LoginForm',
  validate: validateLoginFormProps,

  render(props) {
    const initialValues: Record<string, any> = {
      username: '',
      password: ''
    }

    if (props.extraFields) {
      props.extraFields.forEach(extraField => {
        initialValues[extraField.key] =
          extraField.hasOwnProperty('defaultValue')
            ? extraField.defaultValue
            : null
      })
    }

    const store = useStore(() => createLoginFormStore(initialValues))

    return LoginFormView({ ...props, store })
  }
})

// --- locals -------------------------------------------------------

function createLoginFormStore(initialValues: Record<string, any> = {}): LoginFormStore {
  let
    loading = false,
    values = initialValues,
    errorMsgs: Record<string, string | null> = {},
    generalErrorMsg: string | null = null,
    validationActivated = false

  const [self, update] = initStore({
    getValue(field: string): any {
      return values[field]
    },
    
    setValue(field: string, value: any): void {
      values[field] = value
      errorMsgs[field] = null
      generalErrorMsg = null
      validationActivated = false
      update()
    },

    getErrorMsg(field: string) {
      return errorMsgs[field] || null
    },

    getGeneralErrorMsg() {
      return generalErrorMsg
    },

    isValidationActivated() {
      return validationActivated
    },

    isLoading() {
      return loading
    },

    performLogin(todo: any) {
      let hasErrors = false

      for (let field in values) {
        if (values.hasOwnProperty(field)) {
          if (!values[field]) {
            hasErrors = true
          }
        }
      }

      if (hasErrors) {
        validationActivated = true
        update()
      } else {
         console.log('Loading data: ', values, errorMsgs)
      }
    }
  })

  return self
}

// --- exports ------------------------------------------------------

export default LoginForm
