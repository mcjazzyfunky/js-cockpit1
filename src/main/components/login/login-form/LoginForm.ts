// external imports
import React, { ReactNode, ReactElement, CSSProperties } from 'react'
import { defineComponent, isNode, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import LoginFormProps from './LoginFormProps' 
import LoginFormHeaderProps from './LoginFormHeaderProps'
import LoginFormAboveProps from './LoginFormAboveProps'
import LoginFormBelowProps from './LoginFormBelowProps'
import LoginFormView from './LoginFormView'

// --- LoginForm.Header ---------------------------------------------

const Header = defineComponent<LoginFormHeaderProps>({
  displayName: 'LoginForm.Header',

  properties: {
    children: {
      validate: isNode
    }
  },

  render() {
    throw new Error(
      'Components of type LoginForm.Header can only be used as children '
        + 'of LoginForm components')
  }
})

// --- LoginForm.Above ----------------------------------------------

const Above = defineComponent<LoginFormAboveProps>({
  displayName: 'LoginForm.Above',

  properties: {
    children: {
      validate: isNode
    }
  },

  render() {
    throw new Error(
      'Components of type LoginForm.Above can only be used as children '
        + 'of LoginForm components')
  }
})

// --- LoginForm.Below ----------------------------------------------

const Below = defineComponent<LoginFormBelowProps>({
  displayName: 'LoginForm.Below',

  properties: {
    children: {
      validate: isNode
    }
  },

  render() {
    throw new Error(
      'Components of type LoginForm.Below can only be used as children '
        + 'of LoginForm components')
  }
})

// --- LoginForm ----------------------------------------------------

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

    children: {
      validate:
        withChildren(Spec.all(isElementOfType([Header, Above, Below])))
    }
  }, 

  render(props) {
    return LoginFormView(props)
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(LoginForm, {
  Header,
  Above,
  Below
})
