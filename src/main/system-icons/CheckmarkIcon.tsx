import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ChevronDownIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 0 64 64">
        <g>
          <polyline fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10"
            points="13,33 25,48 49,21"/>
        </g>
      </svg>
    )
  }
})
