// external imports
import { isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- validateLoginFormProps ---------------------------------------

const validateLoginFormProps = Spec.checkProps({
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
        )),
    
    slotHeader: isNode,
    slotAbove: isNode,
    slotBelow: isNode
  }
})

// --- exports ------------------------------------------------------

export default validateLoginFormProps
