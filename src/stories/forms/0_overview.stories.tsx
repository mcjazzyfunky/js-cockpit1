// external imports
import React from 'react'

// internal imports
import { TextInput, SelectBox } from '../js-cockpit'

// derived imports
const { useState } = React

// --- stories ------------------------------------------------------

export default {
  title: 'Forms'
}

export const overview = () => {

  return (
    <div>
      <TextInput/>
      <SelectBox/>
    </div>
  )
}
