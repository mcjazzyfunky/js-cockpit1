// external imports
import { ComponentType } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataFormProps from './DataFormProps'
import DataFormActionProps from './DataFormActionProps'
import DataFormActionMenuProps from './DataFormActionMenuProps'
import DataFormActionsProps from './DataFormActionsProps'
import DataFormView from './DataFormView'

// --- DataForm.Action ----------------------------------------------

const Action = defineComponent<DataFormActionProps>({
  displayName: 'DataForm.Action',

  properties: {
    text: {
      type: String,
      required: true
    }
  },

  render() {
    throw new Error(
      'Components of type DataForm.Action can only be used as children '
        + 'of DataForm components')
  }
})

// --- DataForm.ActionMenu ------------------------------------------

const ActionMenu: ComponentType<DataFormActionMenuProps> = defineComponent<DataFormActionMenuProps>({
  displayName: 'DataForm.ActionMenu',

  properties: {
    text: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.all(
            Spec.lazy(() => isElementOfType([Action, ActionMenu]))))
    }
  },

  render() {
    throw new Error(
      'Components of type DataForm.ActionMenu can only be used as children '
        + 'of DataForm.Actions or DataForm.ActionMenu components')
  }
})


// --- DataForm.Actions ---------------------------------------------

const Actions = defineComponent<DataFormActionsProps>({
  displayName: 'DataForm.Actions',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(Spec.any))
    }
  },

  render() {
    throw new Error(
      'Components of type DataForm.Actions can only be used as children '
        + 'of DataForm components')
  }
})

// --- DataForm -----------------------------------------------------

const DataForm = defineComponent<DataFormProps>({
  displayName: 'DataForm',

  properties: {
    headline: {
      type: String,
      required: true
    },

    onAction: {
      type: Function
    },

    children: {
      validate:
        withChildren(
          Spec.all(
            isElementOfType([Action, ActionMenu])
          ))
    }
  },

  render(props) {
    return DataFormView(props)
  }
})

// --- exports ------------------------------------------------------

export default DataForm
