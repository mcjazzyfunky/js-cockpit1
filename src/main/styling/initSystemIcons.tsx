import React from 'react'
import { registerIcons } from '@uifabric/styling'
import CheckmarkIcon from '../system-icons/CheckmarkIcon'
import ChevronDownIcon from '../system-icons/ChevronDownIcon'
import ChevronRightIcon from '../system-icons/ChevronRightIcon'
import SearchIcon from '../system-icons/SearchIcon'

import ClearIcon from '../system-icons/ClearIcon'

export default function initSystemIcons() {
  registerIcons({
    icons: {
      'add': '[add]',
      'delete': '[delete]',
      'download': '[download]',
      'calendar': '[calendar]',
      'clear': <ClearIcon/>,
      'up': '[up]',
      'down': '[down]', 
      'chevrondown': <ChevronDownIcon/>,
      'chevronup': '[chevronup]', 
      'chevronleft': '[chevronleft]', 
      'chevronright': <ChevronRightIcon/>,
      'checkmark': <CheckmarkIcon/>,
      'remove': '[remove]',
      'search': <SearchIcon/>
    }
  })
}
