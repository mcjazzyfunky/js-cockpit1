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

// --- DataNaviator.Actions -----------------------------------------

type ActionsProps = {
  children?: ReactNode // TODO
}

const Actions = defineComponent<ActionsProps>({
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

// --- DataNaviator.Column ------------------------------------------

type ColumnProps = {
  title: string,
  field?: string,
  sortable?: boolean
}

const Column = defineComponent<ColumnProps>({
  displayName: 'DataNavigator.Columns',

  properties: {
    title: {
      type: String,
      required: true
    },

    field: {
      type: String
    },

    sortable: {
      type: Boolean
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.Column must be children of '
        + 'DataNavigator.Columns components')
  }
})


// --- DataNaviator.Columns -----------------------------------------

type ColumnsProps = {
  children?: ReactNode // TODO
}

const Columns = defineComponent<ColumnsProps>({
  displayName: 'DataNavigator.Columns',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Column])))
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.Columns must be children of '
        + 'DataNavigator components')
  }
})


// --- DataNavigator ------------------------------------------------

type DataNavigatorProps = {
  title?: string,
  children?: ReactNode // TODO
}

type DataNavigatorState = {
  rowSelection: number[]
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
          Spec.all(isElementOfType([Actions, Columns])))
    }
  },

  base: class extends React.Component<DataNavigatorProps, DataNavigatorState> {
    private renderer = new DataNavigatorRenderer()
  
    constructor(props: DataNavigatorProps) {
      super(props)

      this.state = {
        rowSelection: []
      }
    }

    render() {
      return this.renderer.render(this._getDataNavigatorModel())
    }

    private _getDataNavigatorModel() {
      const model: DataNavigatorModel = {
        $kind: 'DataNavigatorModel',
        title: this.props.title || null,
        rowSelection: this.state.rowSelection,
        data: [], // TODO
        actions: [],
        columns: [],

        api: {
          changeRowSelection: (rowSelection: number[]) => {
            this.setState({ rowSelection })
          }
        }
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

          case Columns:
            React.Children.forEach(child.props.children, (child2: any) => {
              model.columns.push({
                $kind: 'DataNavigatorColumnModel',
                title: child2.props.title,
                field: child2.props.field || null,
                sortable: child2.props.sortable || false
              })
            })

            break
          
          default:
            throw new Error('This should never happen')
          }
        })

        return model
    }
  } 
}) 

// --- models -------------------------------------------------------

type DataNavigatorModel = {
  $kind: 'DataNavigatorModel',
  title: string | null,
  rowSelection: number[],
  data: any[],

  actions:
    (DataNavigatorGeneralActionModel
      | DataNavigatorSingleRowActionModel
      | DataNavigatorMultiRowActionModel)[],

  columns: {
    $kind: 'DataNavigatorColumnModel'
    title: string,
    field: string | null,
    sortable: boolean
  }[],

  api: {
    changeRowSelection: (rowSelection: number[]) => void
  }
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
  MultiRowAction,
  Columns,
  Column
})

export {
  DataNavigatorModel
}
