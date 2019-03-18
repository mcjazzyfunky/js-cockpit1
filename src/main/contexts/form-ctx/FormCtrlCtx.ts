// external imports
import React from 'react'
import { defineContext } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import FormCtrl from './types/FormCtrl'

// --- FormCtrlCtx --------------------------------------------------

const FormCtrlCtx = defineContext<FormCtrl | null>({
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

// --- exports ------------------------------------------------------

export default FormCtrlCtx
