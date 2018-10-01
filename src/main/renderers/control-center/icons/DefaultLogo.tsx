// Icon is a modified version of icon "basic-gear" by Dario Ferrando
// Thank you very much Dario :-)

import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'DefaultLogo',

  render() {
    return ( 
      <svg width="26" height="26" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10">
          <path d="M32 1h-6v9l-6 2-6-6-8 8 6 6-2 6H1v12h9l2 6-6 6 8 8 6-6 6 2v9h12v-9l6-2 6 6 8-8-6-6 2-6h9V26h-9l-2-6 6-6-8-8-6 6-6-2V1z"/>
          <circle cx="32" cy="32" r="6"/>
        </g>
      </svg>
    )
  }
})
