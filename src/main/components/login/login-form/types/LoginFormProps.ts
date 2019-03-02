// external imports
import { CSSProperties, ReactNode } from 'react'

// --- LoginFormProps -----------------------------------------------

type LoginFormProps = {
  fullSize?: boolean,
  performLogin?:
    (params: { username: string, password: string, remember: boolean }) =>
      Promise<{ fullName: string }>

  className?: string,
  style?: CSSProperties,
  children?: ReactNode // TODO
}

// --- exports ------------------------------------------------------

export default LoginFormProps
