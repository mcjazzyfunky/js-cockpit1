import React from 'react'
import { defineContext } from 'js-react-utils'
import { Spec } from 'js-spec'

type ViewModes = {
  compact: boolean,
  readOnly: boolean
}

export default defineContext<ViewModes>({
  displayName: 'ViewModesCtx',
  type: Object,

  validate:
    Spec.exact({
      compact: Spec.boolean,
      readOnly: Spec.boolean
    }),

  defaultValue: {
    compact: false,
    readOnly: false
  }
})
