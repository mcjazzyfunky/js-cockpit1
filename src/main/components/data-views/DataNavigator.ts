// inteernal imports
import DataNavigatorRenderer from './DataNavigatorRenderer'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent, withChildren, isElementOfType } from 'js-react-utils'
import { Spec } from 'js-spec/dev-only'
import { Observable } from 'rxjs'
import { take  } from 'rxjs/operators'

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
  align?: 'start' | 'center' | 'end'
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

    align: {
      type: String,
      validate: Spec.oneOf('start', 'center', 'end')
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

type QueryParams = {
  offset: number,
  count: number,
  sortBy: string | null,
  sortDesc: boolean,
}

type QueryResult = {
  data: any[],
  totalItemCount: number
}

type DataNavigatorProps = {
  title?: string,
  loadData: (params: QueryParams) => Observable<QueryResult>, // TODO
  children?: ReactNode // TODO
}

type DataNavigatorState = {
  isInitialized: boolean,
  isLoading: boolean,
  errorMessage: string | null,
  pageIndex: number | null,
  pageSize: number,
  sortBy: string | null,
  sortDesc: boolean,
  totalItemCount: number | null,
  rowSelection: number[],
  data: any[]
}

const DataNavigator = defineComponent<DataNavigatorProps, DataNavigatorState>({
  displayName: 'DataNavigator',

  properties: {
    title: {
      type: String
    },

    loadData: {
      type: Function,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Actions, Columns])))
    }
  },

  base: class extends React.Component<DataNavigatorProps, DataNavigatorState> {
    private _renderer = new DataNavigatorRenderer()
    private _timeout: any = null
  
    constructor(props: DataNavigatorProps) {
      super(props)

      this.state = {
        isInitialized: false,
        isLoading: false, 
        errorMessage: null,
        pageIndex: 1,
        pageSize: 50,
        sortBy: null,
        sortDesc: false,
        totalItemCount: 100,
        rowSelection: [],
        data: []
      }
    }

    componentDidMount() {
      this._fetchData({
        pageIndex: 0,
        pageSize: this.state.pageSize,
        sortBy: this.state.sortBy,
        sortDesc: this.state.sortDesc
      })
    }

    render() {
      return this._renderer.render(this._getDataNavigatorModel())
    }

    private _getDataNavigatorModel() {
      const model: DataNavigatorModel = {
        $kind: 'DataNavigatorModel',
        title: this.props.title || null,
        pageIndex: this.state.pageIndex,
        pageSize: this.state.pageSize,
        sortBy: this.state.sortBy,
        sortDesc: this.state.sortDesc,

        isLoading: this.state.isLoading,
        errorMessage: this.state.errorMessage,

        totalItemCount: this.state.totalItemCount,
        data: this.state.data,
        rowSelection: this.state.rowSelection,

        actions: [],
        columns: [],

        api: {
          changeRowSelection: (rowSelection: number[]) => {
            this.setState({ rowSelection })
          },

          changePage: (pageIndex: number, onSuccess?: () => void) => {
            this._fetchData({
              pageIndex,
              pageSize: this.state.pageSize,
              sortBy: this.state.sortBy,
              sortDesc: this.state.sortDesc,
              onSuccess
            })
          },

          changePageSize: (pageSize: number, onSuccess?: () => void) => {
            this._fetchData({
              pageIndex: 0,
              pageSize,
              sortBy: this.state.sortBy,
              sortDesc: this.state.sortDesc,
              onSuccess
            })
          },

          changeSort: (sortBy: string, sortDesc: boolean, onSuccess?: () => void) => {
            this._fetchData({
              pageIndex: 0,
              pageSize: this.state.pageSize,
              sortBy: sortBy,
              sortDesc: sortDesc,
              onSuccess
            })
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
                align: child2.props.align || null,
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

    private _fetchData(params: { pageIndex: number, pageSize: number, sortBy: string | null, sortDesc: boolean, onSuccess?: () => void }) {
      const observer = this.props.loadData({
        offset: params.pageIndex * params.pageSize,
        count: params.pageSize,
        sortBy: params.sortBy,
        sortDesc: params.sortDesc 
      }).pipe(take(1))

      this._timeout = setTimeout(() => {
        clearTimeout(this._timeout)
        this.setState({ isLoading: true })
      }, 100)

      const subscription = observer.subscribe({
        next: result => {
          this.setState({
            isLoading: false,
            errorMessage: null,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            sortBy: params.sortBy,
            sortDesc: params.sortDesc,
            isInitialized: true,
            data: result.data,
            totalItemCount: result.totalItemCount,
            rowSelection: []
          })

          if (params.onSuccess) {
            params.onSuccess()
          }
        },
        complete: () => {
          if (this._timeout) {
            clearTimeout(this._timeout)
            this._timeout = null
          }
        },
        error: e => {
          this.setState({
            isLoading: false,
            errorMessage: String(e) // TODO
          })
        }
      })
    }
  } 
}) 

// --- models -------------------------------------------------------

type DataNavigatorModel = {
  $kind: 'DataNavigatorModel',
  title: string | null,
  pageIndex: number | null,
  pageSize: number | null,
  sortBy: string | null,
  sortDesc: boolean,
  isLoading: boolean,
  errorMessage: string | null,
  totalItemCount: number | null,
  data: any[],
  rowSelection: number[],

  actions:
    (DataNavigatorGeneralActionModel
      | DataNavigatorSingleRowActionModel
      | DataNavigatorMultiRowActionModel)[],

  columns: {
    $kind: 'DataNavigatorColumnModel'
    title: string,
    field: string | null,
    align: 'start' | 'center' | 'end' | null,
    sortable: boolean
  }[],

  api: {
    changeRowSelection: (rowSelection: number[]) => void,
    changePage: (pageIndex: number, onSuccess?: () => void) => void,
    changePageSize: (pageSize: number, onSuccess?: () => void) => void,
    changeSort: (sortBy: string, sortDesc: boolean, onSuccess?: () => void) => void
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
