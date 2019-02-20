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
  header?: ReactNode,
  above?: ReactNode,
  below?: ReactNode
}

// --- exports ------------------------------------------------------

export default LoginFormProps
