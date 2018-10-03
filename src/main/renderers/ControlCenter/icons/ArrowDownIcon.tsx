import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ArrowDownIcon',

  render() {
    return (
      <svg width="18px" height="18px" viewBox="0 0 64 64">
        <g>
          <polyline fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="15,24 32,41 49,24"/>
        </g>
      </svg>
    )
  }
})
