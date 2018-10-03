import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ChevronDownIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 0 64 64" transform="translate(0, 5)">
        <g>
          <polyline stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="27,15 44,32 
             27,49"/>
        </g>
      </svg>
    )
  }
})
