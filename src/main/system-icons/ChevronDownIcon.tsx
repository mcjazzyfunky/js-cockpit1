import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ChevronDownIcon',

  render() {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12">
        <g>
          <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" strokeMiterlimit="10"
            points="1,5 6,11 11,5"/>
        </g>
      </svg>
    )
  }
})
