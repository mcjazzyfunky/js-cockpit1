import DataTableRenderer from './DataTableRenderer'
import RowSelectionChangeEvent from '../../events/RowSelectionChangeEvent'
import SortChangeEvent from '../../events/SortChangeEvent'

import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'


// --- DataTable.Column ---------------------------------------------

type ColumnProps = {
  title?: string,  field?: string,
  sortable?: boolean
}

const Column = defineComponent<ColumnProps>({
  displayName: 'DataTable.Column',

  properties: {
    title: {
      type: String
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
      'Components of type DataTable.Column only be used as children of '
        + 'DataTable components'
    )
  }
})

// --- DataTable ----------------------------------------------------

type DataTableProps = {
  title?: string,
  
  rowSelectionOptions?: {
    mode: 'none' | 'single' | 'multi'
  },

  sortBy?: string,
  sortDesc?: boolean,

  data: object[],
  children?: ReactNode,

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void
}

type DataTableState = {
  rowSelection: Set<number>
}

const DataTable = defineComponent<DataTableProps>({
  displayName: 'DataTable',

  properties: {
    title: {
      type: String
    },

    rowSelectionOptions: {
      type: Object,

      validate:
        Spec.strictShape({
          mode: Spec.oneOf('none', 'single', 'multi')
        }),

      defaultValue: { mode:  'none' }
    },

    sortBy: {
      type: String
    },

    sortDesc: {
      type: Boolean
    },

    data: {
      type: Array,
      validate: Spec.arrayOf(Spec.object)
    },

    children: {
      validate: withChildren(Spec.all(isElementOfType(Column)))
    },

    onRowSelectionChange: {
      type: Function
    },

    onSortChange: {
      type: Function
    }
  },

  base: class extends React.Component<DataTableProps, DataTableState> {
    private renderer = new DataTableRenderer()

    constructor(props: DataTableProps) {
      super(props)

      this.state = {
        rowSelection: new Set() 
      }
    }

    render() {
      return this.renderer.render(this.getDataTableModel())
    }

    // --- private --------------------------------------------------

    private getDataTableModel(): DataTableModel {
      const model: DataTableModel = {
        $kind: 'DataTableModel',
        rowSelectionOptions : this.props.rowSelectionOptions,
        columns: [],
        data: this.props.data,
        rowSelection: this.state.rowSelection,
        sortBy: this.props.sortBy  || null,
        sortDesc: this.props.sortDesc || false,

        api: {
          changeRowSelection: (rowIds: Iterable<number>) => {
            const rowSelection = new Set(rowIds)

            this.setState({ rowSelection }, () => {
              if (this.props.onRowSelectionChange) {
                this.props.onRowSelectionChange({
                  type: 'rowSelectionChange',
                  selection: Array.from(rowSelection).sort()
                })
              }
            })
          },

          changeSort: (sortBy: string, sortDesc: boolean) => {
            if (this.props.onSortChange) {
              this.props.onSortChange({
                type: 'sortChange',
                sortBy,
                sortDesc
              })
            }
          }
        }
      }

      React.Children.forEach(this.props.children, (child: ReactElement<DataTableColumnModel>) => {
        model.columns.push(
            this.getColumnModel(child.props))
      })

      return model
    }

    private getColumnModel(props: ColumnProps): DataTableColumnModel {
      let ret: DataTableColumnModel = {
        $kind: 'DataTableColumnModel'
      }

      if (props.title !== undefined) {
        ret.title = props.title
      }

      if (props.field !== undefined) {
        ret.field = props.field
      }

      if (props.sortable !== undefined) {
        ret.sortable = props.sortable
      }

      return ret
    }
  }
})

// --- data models --------------------------------------------------

type DataTableModel = {
  $kind: 'DataTableModel',

  rowSelectionOptions: {
    mode: 'none' | 'single' | 'multi',
  },

  columns: (DataTableColumnModel)[]
  data: any[],

  sortBy: string | null,
  sortDesc: boolean,

  rowSelection: Set<number>,

  api: {
    changeRowSelection: (rowIds:  Iterable<number>) => void,
    changeSort: (sortBy: string, sortDesc: boolean) => void
  }
}

type DataTableColumnModel = {
  $kind: 'DataTableColumnModel',
  title?: string,
  field?: string,
  sortable?: boolean
}

// --- exports ------------------------------------------------------

export default Object.assign(DataTable, {
  Column
})

export {
  DataTableModel,
  DataTableColumnModel
}
