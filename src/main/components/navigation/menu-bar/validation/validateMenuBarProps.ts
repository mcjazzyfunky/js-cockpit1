// external imports
import { Spec } from 'js-spec'

// --- validateMenuBarProps -----------------------------------------

const validateMenuBarProps = Spec.checkProps({
  optional: {
    onAction: Spec.function,
    items: Spec.lazy(() => validateItems)
  }
})

// --- locals -------------------------------------------------------

const validateItems =
  Spec.lazy(() =>
    Spec.arrayOf(
      Spec.and(
        Spec.prop('type', Spec.oneOf('menu', 'item', 'divider')),

        Spec.or(
          {
            when: Spec.prop('type', Spec.is('menu')),

            then:
              Spec.exact({
                type: Spec.is('menu'),
                id: Spec.string,
                text: Spec.string,
                items: validateItems
              })
          },
          {
            when: Spec.prop('type', Spec.is('item')),

            then:
              Spec.exact({
                type: Spec.is('item'),
                id: Spec.string,
                text: Spec.string,
                disabled: Spec.optional(Spec.boolean),
                onAction: Spec.optional(Spec.function)
              })
          },
          {
            when: Spec.prop('type', Spec.is('divider')),

            then:
              Spec.exact({
                type: Spec.is('divider')
              })
          }
        ))))

// --- exports ------------------------------------------------------

export default validateMenuBarProps
