import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ChevronDownIcon',

  render() {
    return (
      <svg width="12" height="36" viewBox="0 0 12 36">
        <g>
          <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" strokeMiterlimit="10"
            points="1,16 6,22 11,16"/>
        </g>
      </svg>
    )
  }
})
