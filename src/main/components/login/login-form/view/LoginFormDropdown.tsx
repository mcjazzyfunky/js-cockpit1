// external imports
import React from 'react'
import { Dropdown } from 'office-ui-fabric-react'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormDropdown --------------------------------------------

function LoginFormDropdown(props: LoginFormDropdownProps) {
  return (
    <Dropdown
      selectedKey=""
      disabled={false}
      
      options={
        props.options.map((option: any) => ({
          key: option.value,
          text: option.text
        }))
      }
    />
  )
}

// --- locals -------------------------------------------------------

type LoginFormDropdownProps = {
  field: string,
  label: string,
  options: any, // TODO
}

// --- exports ------------------------------------------------------

export default LoginFormDropdown
