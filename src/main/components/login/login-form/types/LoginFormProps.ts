// external imports
import { CSSProperties, ReactNode } from 'react'

// --- LoginFormProps -----------------------------------------------

type LoginFormProps = {
  fullSize?: boolean,

  performLogin?:
    (loginData: Record<string, string>, rememberLogin: boolean) =>
      Promise<any>,

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
