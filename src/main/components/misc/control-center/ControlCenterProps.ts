// external imports
import { ReactElement } from 'react'

// --- ControlCenterProps -------------------------------------------

type ControlCenterProps = {
  vendor?: string,
  title: string,
  logo?: ReactElement<any>,
  children?: ReactElement<LoginProps | AppsProps>
}

// --- exports ------------------------------------------------------

export default ControlCenterProps
