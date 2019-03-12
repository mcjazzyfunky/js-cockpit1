// external imports
import { CSSProperties, ReactNode } from 'react'

// --- LoginFormProps -----------------------------------------------

type LoginFormProps = {
  fullSize?: boolean,
  performLogin?:
    (params: { username: string, password: string, remember: boolean }) =>
      Promise<{ fullName: string }> | null

  className?: string | null,
  style?: CSSProperties | null,
  children?: ReactNode // TODO
}

// --- exports ------------------------------------------------------

export default LoginFormProps
