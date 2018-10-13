// inteernal imports
import DataExplorerRenderer from './DataExplorerRenderer'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent, withChildren, isElementOfType, isNode } from 'js-react-utils'
import { Spec } from 'js-spec/dev-only'
import { Observable } from 'rxjs'
import { take  } from 'rxjs/operators'

// --- DataExplorer.GeneralAction ----------------------------------

type GeneralActionProps = {
  title: string,
  icon?: ReactNode
}

const GeneralAction = defineComponent<GeneralActionProps>({
  displayName: 'DataExplorer.GeneralAction',

  properties: {
    title: {
      type: String,
      required: true
    },

    icon: {
      validate: isNode
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.GeneralAction must be children of '
        + 'DataExplorer.Actions components')
  }
})

// --- DataExplorer.SingleRowAction --------------------------------

type SingleRowActionProps = {
  title: string,
  icon?: ReactNode
}

const SingleRowAction = defineComponent<SingleRowActionProps>({
  displayName: 'DataExplorer.SingleRowAction',

  properties: {
    title: {
      type: String,
      required: true
    },

    icon: {
      validate: isNode
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.SingleRowAction must be children of '
        + 'DataExplorer.Actions components')
  }
})

// --- DataExplorer.MultiRowAction ---------------------------------

type MultiRowActionProps = {
  title: string
}

const MultiRowAction = defineComponent<GeneralActionProps>({
  displayName: 'DataExplorer.MultiRowAction',

  properties: {
    title: {
      type: String,
      required: true
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.MultiRowAction must be children of '
        + 'DataExplorer.Actions components')
  }
})

// --- DataNaviator.Actions -----------------------------------------

type ActionsProps = {
  children?: ReactNode // TODO
}

const Actions = defineComponent<ActionsProps>({
  displayName: 'DataExplorer.Actions',

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
        + 'DataExplorer.Actions components')
  }
})

// --- DataNaviator.Column ------------------------------------------

type ColumnProps = {
  title: string,
  field?: string,
  align?: 'start' | 'center' | 'end'
  sortable?: boolean,
  width?: number
}

const Column = defineComponent<ColumnProps>({
  displayName: 'DataExplorer.Columns',

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
    },

    width: {
      type: Number,
      defaultValue: 200
    }
  },

  render() {
    throw new Error(
      'Components of type DataNaviator.Column must be children of '
        + 'DataExplorer.Columns components')
  }
})


// --- DataNaviator.Columns -----------------------------------------

type ColumnsProps = {
  children?: ReactNode // TODO
}

const Columns = defineComponent<ColumnsProps>({
  displayName: 'DataExplorer.Columns',

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
        + 'DataExplorer components')
  }
})


// --- DataExplorer ------------------------------------------------

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

type DataExplorerProps = {
  title?: string,
  loadData: (params: QueryParams) => Observable<QueryResult>, // TODO
  children?: ReactNode // TODO
}

type DataExplorerState = {
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

const DataExplorer = defineComponent<DataExplorerProps, DataExplorerState>({
  displayName: 'DataExplorer',

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

  base: class extends React.Component<DataExplorerProps, DataExplorerState> {
    private _renderer = new DataExplorerRenderer()
    private _timeout: any = null
  
    constructor(props: DataExplorerProps) {
      super(props)

      this.state = {
        isInitialized: false,
        isLoading: false, 
        errorMessage: null,
        pageIndex: 1,
        pageSize: 50,
        sortBy: null,
        sortDesc: false,
        totalItemCount: 0,
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
      return this._renderer.render(this._getDataExplorerModel())
    }

    private _getDataExplorerModel() {
      const model: DataExplorerModel = {
        $kind: 'DataExplorerModel',
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
                  const actionModel: DataExplorerGeneralActionModel = {
                    $kind: 'DataExplorerGeneralActionModel',
                    title: child2.props.title || null,
                    icon: child2.props.icon || null
                  }

                  model.actions.push(actionModel)
                  break
                }
        
                case SingleRowAction: {
                  const actionModel: DataExplorerSingleRowActionModel = {
                    $kind: 'DataExplorerSingleRowActionModel',
                    title: child2.props.title || null,
                    icon: child2.props.icon || null
                  }

                  model.actions.push(actionModel)
                  break
                }
                
                case MultiRowAction: {
                  const actionModel: DataExplorerMultiRowActionModel = {
                    $kind: 'DataExplorerMultiRowActionModel',
                    title: child2.props.title || null,
                    icon: child2.props.icon || null
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
                $kind: 'DataExplorerColumnModel',
                title: child2.props.title,
                field: child2.props.field || null,
                align: child2.props.align || null,
                sortable: child2.props.sortable || false,
                width: child2.props.width
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

type DataExplorerModel = {
  $kind: 'DataExplorerModel',
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
    (DataExplorerGeneralActionModel
      | DataExplorerSingleRowActionModel
      | DataExplorerMultiRowActionModel)[],

  columns: {
    $kind: 'DataExplorerColumnModel'
    title: string,
    field: string | null,
    align: 'start' | 'center' | 'end' | null,
    sortable: boolean,
    width: number
  }[],

  api: {
    changeRowSelection: (rowSelection: number[]) => void,
    changePage: (pageIndex: number, onSuccess?: () => void) => void,
    changePageSize: (pageSize: number, onSuccess?: () => void) => void,
    changeSort: (sortBy: string, sortDesc: boolean, onSuccess?: () => void) => void
  }
}

type DataExplorerGeneralActionModel = {
  $kind: 'DataExplorerGeneralActionModel',
  title: string | null,
  icon: ReactNode | null
}

type DataExplorerSingleRowActionModel = {
  $kind: 'DataExplorerSingleRowActionModel',
  title: string | null,
  icon: ReactNode | null
}

type DataExplorerMultiRowActionModel = {
  $kind: 'DataExplorerMultiRowActionModel',
  title: string,
  icon: ReactNode | null
}

// --- exports ------------------------------------------------------

export default Object.assign(DataExplorer, {
  Actions,
  GeneralAction,
  SingleRowAction,
  MultiRowAction,
  Columns,
  Column
})

export {
  DataExplorerModel
}
