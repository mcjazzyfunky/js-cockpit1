import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'ChevronDownIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 6 58 64">
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10">
          <line x1="18" y1="18" x2="46" y2="46"/>
          <line x1="18" y1="46" x2="46" y2="18"/>
        </g>
      </svg>
    )
  }
})
