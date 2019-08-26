// external imports
import { component, isNode, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec'
import { initStore } from 'js-stores'
import { useStore } from 'js-stores/with-react'

// internal imports
import LoginFormStore from './types/LoginFormStore'
import renderLoginForm from './view/renderLoginForm'
import LoginFormProps from './types/LoginFormProps' 

// --- LoginForm ----------------------------------------------------

const LoginForm = component<LoginFormProps>('LoginForm')
  .validate(
    Spec.checkProps({
      optional: {
        performLogin:
          Spec.nullable(Spec.function),
        
        fullSize:
          Spec.boolean,

        extraFields:
          Spec.arrayOf(
            Spec.and(
              Spec.prop('type', Spec.oneOf('text', 'choice')),

              Spec.or(
                {
                  when: Spec.prop('type', Spec.is('text')),
    
                  then:
                    Spec.exact({
                      type: Spec.is('text'),
                      key: Spec.string,
                      label: Spec.string,
                      defaultValue: Spec.optional(Spec.string)
                    })
                },
                {
                  when: Spec.prop('type', Spec.is('choice')),

                  then:
                    Spec.exact({
                      type: Spec.is('choice'),
                      key: Spec.string,
                      label: Spec.string,
                      defaultValue: Spec.string,

                      options: Spec.arrayOf(
                        Spec.exact({
                          value: Spec.string,
                          text: Spec.string
                        })
                      )
                    })
                })
            )
          ),
        
        className:
          Spec.nullable(Spec.string),
        
        style:
          Spec.nullable(Spec.object),

        slotHeader: isNode,
        slotAbove: isNode,
        slotBelow: isNode
      }
    })
  )
  .render(props => {
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

    return renderLoginForm(props, store)
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
