import React, { ReactNode } from 'react'
import { defineComponent, isNode } from 'js-react-utils'

// --- ActionBar -------------------------------------------------

type ActionBarProps = {
}

const ActionBar = defineComponent<ActionBarProps>({
  displayName: 'ActionBar',

  properties: {
  },

  render(props: ActionBarProps) {
    return '[ActionBar]'
  }
})

// --- exports---------------------------------------------

export default ActionBar
