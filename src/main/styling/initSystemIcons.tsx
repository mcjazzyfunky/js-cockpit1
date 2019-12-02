import React from 'react'
import { registerIcons } from '@uifabric/styling'
import CheckMarkIcon from '../system-icons/CheckMarkIcon'
import ChevronDownIcon from '../system-icons/ChevronDownIcon'
import ChevronRightIcon from '../system-icons/ChevronRightIcon'
import SearchIcon from '../system-icons/SearchIcon'
import ClearIcon from '../system-icons/ClearIcon'

export default function initSystemIcons() {
  if (alreadyRegistered) {
    return
  }

  registerIcons({
    icons: {
      'Add': '[add]',
      'Delete': '[delete]',
      'Download': '[download]',
      'Calendar': '[calendar]',
      'Clear': <ClearIcon/>,
      'Up': '[up]',
      'Down': '[down]', 
      'ChevronDown': <ChevronDownIcon/>,
      'ChevronUp': '[chevronup]', 
      'ChevronLeft': '[chevronleft]', 
      'ChevronRight': <ChevronRightIcon/>,
      'CheckMark': <CheckMarkIcon/>,
      'Remove': '[remove]',
      'Search': <SearchIcon/>
    }
  })
}

// --- locals --------------------------------------------------------

let alreadyRegistered = false
