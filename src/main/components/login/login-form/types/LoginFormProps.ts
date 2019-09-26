// external imports
import { CSSProperties, ReactNode } from 'react'

// --- LoginFormProps -----------------------------------------------

type LoginFormProps = {
  fullSize?: boolean,

  performLogin?:
    (params: { username: string, password: string, remember: boolean }) =>
      Promise<{ fullName: string }> | null,

  slotIntro?: ReactNode,
  slotHeader?: ReactNode,
  slotFooter?: ReactNode,

  extraFields?: (
    {
      type: 'text',
      name: string,
      label: string,
      defaultValue?: string
    }
    |
    {
      type: 'choice',
      name: string,
      label: string,
      defaultValue?: string
      
      options: {
        value: string,
        text: string
      }[]
    }
  )[],
}

// --- exports ------------------------------------------------------

export default LoginFormProps
