// external imports
import React from 'react'
import { Dropdown, Label } from 'office-ui-fabric-react'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormDropdown --------------------------------------------

function LoginFormDropdown(props: LoginFormDropdownProps) {
  return (
    <div>
      <div>
        <Label disabled={props.disabled}>{props.label}</Label>
      </div>
      <Dropdown
        selectedKey=""
        disabled={props.disabled}
        
        options={
          props.options.map((option: any) => ({
            key: option.value,
            text: option.text
          }))
        }
      />
    </div>
  )
}

// --- locals -------------------------------------------------------

type LoginFormDropdownProps = {
  name: string,
  label: string,
  options: any, // TODO
  disabled?: boolean
}

// --- exports ------------------------------------------------------

export default LoginFormDropdown
