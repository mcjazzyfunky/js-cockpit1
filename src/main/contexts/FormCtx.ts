import React from 'react'
import { defineContext } from 'js-react-utils'
import { Spec } from 'js-spec'

export default defineContext<IForm>({
  displayName: 'FormCtx',
  type: Object,
  nullable: true,

  validate:
    Spec.strictShape({
      getValue: Spec.function,
      setValue: Spec.function,
      getErrorMsg: Spec.function,
      getRequired: Spec.function,
      getDisabled: Spec.function
    }),

  defaultValue: null 
})
