// external imports
import React from 'react'
import { context } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import FormCtrl from './types/FormCtrl'

// --- FormCtrlCtx --------------------------------------------------

const FormCtrlCtx = context<FormCtrl | null>('FormCtx')
  .validate(
    Spec.exact({
      getValue: Spec.function,
      setValue: Spec.function,
      getErrorMsg: Spec.function,
      getRequired: Spec.function,
      getDisabled: Spec.function
    })
  )
  .defaultValue(null)

// --- exports ------------------------------------------------------

export default FormCtrlCtx
