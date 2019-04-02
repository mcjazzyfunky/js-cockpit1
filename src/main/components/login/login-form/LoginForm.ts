// external imports
import { defineComponent, isNode, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderLoginForm from './view/renderLoginForm'
import LoginFormProps from './types/LoginFormProps' 

// --- LoginForm ----------------------------------------------------

const LoginForm = defineComponent<LoginFormProps>({
  displayName: 'LoginForm',

  validate: Spec.exactProps({
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
  }),

  render(props) {
    return renderLoginForm(props)
  }
})

// --- exports ------------------------------------------------------

export default LoginForm
