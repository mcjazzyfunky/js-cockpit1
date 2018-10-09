// inteernal imports
import DataNavigatorRenderer from './DataNavigatorRenderer'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec/dev-only'

// --- DataNavigator.GeneralAction ----------------------------------

type GeneralActionProps = {
  title: string
}

const GeneralAction = defineComponent<GeneralActionProps>({
  displayName: 'DataNavigator.GeneralAction',

  properties: {
    title: {
      type: String,
      required: true
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.GeneralAction must be children of '
        + 'DataNavigator.Actions components')
  }
})

// --- DataNavigator.SingleRowAction --------------------------------

type SingleRowActionProps = {
  title: string
}

const SingleRowAction = defineComponent<SingleRowActionProps>({
  displayName: 'DataNavigator.SingleRowAction',

  properties: {
    title: {
      type: String,
      required: true
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.SingleRowAction must be children of '
        + 'DataNavigator.Actions components')
  }
})

// --- DataNavigator.MultiRowAction ---------------------------------

type MultiRowActionProps = {
  title: string
}

const MultiRowAction = defineComponent<GeneralActionProps>({
  displayName: 'DataNavigator.MultiRowAction',

  properties: {
    title: {
      type: String,
      required: true
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.MultiRowAction must be children of '
        + 'DataNavigator.Actions components')
  }
})

// --- DataNaviator.Actions --------------------------------------------------

type ActionsProps = {
  children?: ReactNode // TODO
}

const Actions = defineComponent({
  displayName: 'DataNavigator.Actions',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([GeneralAction, SingleRowAction, MultiRowAction])))
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.MultiRowAction must be children of '
        + 'DataNavigator.Actions components')
  }
})

// --- DataNavigator ------------------------------------------------

type DataNavigatorProps = {
  title?: string,
  children?: ReactNode // TODO
}

const DataNavigator = defineComponent<DataNavigatorProps>({
  displayName: 'DataNavigator',

  properties: {
    title: {
      type: String
    },

    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Actions])))
    }
  },

  base: class Base extends React.PureComponent<DataNavigatorProps> {
    private renderer = new DataNavigatorRenderer()

    render() {
      const model: DataNavigatorModel = {
        $kind: 'DataNavigatorModel',
        title: this.props.title || null,
        actions: []
      }
      
      React.Children.forEach(this.props.children, (child: any) => {
        switch (child.type) {
          case Actions:
            React.Children.forEach(child.props.children, (child2: any) => {
              switch (child2.type) {
                case GeneralAction: {
                  const actionModel: DataNavigatorGeneralActionModel = {
                    $kind: 'DataNavigatorGeneralActionModel',
                    title: child2.props.title || null
                  }

                  model.actions.push(actionModel)
                  break
                }
        
                case SingleRowAction: {
                  const actionModel: DataNavigatorSingleRowActionModel = {
                    $kind: 'DataNavigatorSingleRowActionModel',
                    title: child2.props.title || null
                  }

                  model.actions.push(actionModel)
                  break
                }
                
                case MultiRowAction: {
                  const actionModel: DataNavigatorMultiRowActionModel = {
                    $kind: 'DataNavigatorMultiRowActionModel',
                    title: child2.props.title || null
                  }

                  model.actions.push(actionModel)
                  break
                }

                default:
                  throw new Error('This should never happen')
              }
            })

            break
          
          default:
            throw new Error('This should never happen')
          }
        })

      return this.renderer.render(model)
    }
  } 
}) 

// --- models -------------------------------------------------------

type DataNavigatorModel = {
  $kind: 'DataNavigatorModel',
  title: string | null,

  actions:
    (DataNavigatorGeneralActionModel
      | DataNavigatorSingleRowActionModel
      | DataNavigatorMultiRowActionModel)[]
}

type DataNavigatorGeneralActionModel = {
  $kind: 'DataNavigatorGeneralActionModel',
  title: string | null
}

type DataNavigatorSingleRowActionModel = {
  $kind: 'DataNavigatorSingleRowActionModel',
  title: string | null
}

type DataNavigatorMultiRowActionModel = {
  $kind: 'DataNavigatorMultiRowActionModel',
  title: string
}

// --- exports ------------------------------------------------------

export default Object.assign(DataNavigator, {
  Actions,
  GeneralAction,
  SingleRowAction,
  MultiRowAction
})

export {
  DataNavigatorModel
}
