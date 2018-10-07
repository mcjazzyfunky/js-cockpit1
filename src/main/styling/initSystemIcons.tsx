import React from 'react'
import { registerIcons } from '@uifabric/styling'
import ChevronDownIcon from '../system-icons/ChevronDownIcon'
import ChevronRightIcon from '../system-icons/ChevronRightIcon'
import SearchIcon from '../system-icons/SearchIcon'

export default function initSystemIcons() {
  registerIcons({
    icons: {
      'add': '[add]',
      'delete': '[delete]',
      'download': '[download]',
      'calendar': '[calendar]',
      'up': '[up]',
      'down': '[down]', 
      'chevrondown': <ChevronDownIcon/>,
      'chevronup': '[chevronup]', 
      'chevronleft': '[chevronleft]', 
      'chevronright': <ChevronRightIcon/>,
      'checkmark': '[checkmark]',
      'remove': '[remove]',
      'search': <SearchIcon/>
    }
  })
}
