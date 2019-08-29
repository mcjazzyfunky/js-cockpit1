import React from 'react'
import { context } from 'js-react-utils'
import { Spec } from 'js-spec'

type ViewModes = {
  compact: boolean,
  readOnly: boolean
}

export default context<ViewModes>({
  displayName: 'ViewModesCtx',

  validate: Spec.exact({
    compact: Spec.boolean,
    readOnly: Spec.boolean
  }),

  defaultValue: {
    compact: false,
    readOnly: false
  }
})
