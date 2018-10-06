import React from 'react'
import { defineComponent } from 'js-react-utils'

export default defineComponent({
  displayName: 'AppsIcon',

  render() {
    return (
      <svg width="13" height="13" viewBox="0 0 63 63">
        <g fill="currentColor">
          <path d="M 0 0 L 0 26 L 26 26 L 26 0 Z"/>
          <path d="M 0 37 L 0 63 L 26 63 L 26 37 Z"/>
          <path d="M 37 0 L 37 26 L 63 26 L 63 0 Z"/>
          <path d="M 37 37 L 37 63 L 63 63 L 63 37 Z"/>
        </g>
      </svg>
    )
  }
})
