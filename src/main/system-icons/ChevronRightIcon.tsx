import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ChevronDownIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 0 64 64">
        <g>
          <polyline stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10"
            points="27,29 44,46 27,63"/>
        </g>
      </svg>
    )
  }
})
