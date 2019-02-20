// external imports
import React, { ReactNode, ReactElement, CSSProperties } from 'react'
import { defineComponent, isNode, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import LoginFormProps from './LoginFormProps' 
import LoginFormView from './LoginFormView'

const LoginForm = defineComponent<LoginFormProps>({
  displayName: 'LoginForm',

  properties: {
    performLogin: {
      type: Function
    },

    fullSize: {
      type: Boolean
    },

    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    header: {
      validate: isNode
    },

    above: {
      validate: isNode
    },

    below: {
      validate: isNode
    }
  }, 

  render(props) {
    return LoginFormView(props)
  }
})

// --- exports ------------------------------------------------------

export default LoginForm
