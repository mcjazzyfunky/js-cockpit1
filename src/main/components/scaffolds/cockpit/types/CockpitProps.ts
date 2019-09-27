// external imports
import { ReactNode } from 'react'

// --- CockpitProps -------------------------------------------

type CockpitProps = {
  look?: 'default' | 'bright',
  slotBrand?: ReactNode,
  slotTopNav?: ReactNode,
  slotUserNav?: ReactNode,
  slotMenu?: ReactNode,
  slotSidebar?: ReactNode,
  slotCenter?: ReactNode
}

// --- exports ------------------------------------------------------

export default CockpitProps
