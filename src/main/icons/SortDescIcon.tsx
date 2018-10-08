
import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'SortDescIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10">
          <polyline strokeLinejoin="bevel" points="20,50 32,66 44,50 "/>
          <polyline strokeMiterlimit="10" points="32,26 32,66"/>
        </g>
      </svg>
    )
  }
})
