import DataTableRenderer from './DataTableRenderer'
import RowSelectionChangeEvent from '../../events/RowSelectionChangeEvent'
import SortChangeEvent from '../../events/SortChangeEvent'

import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'


// --- DataTable.Column ---------------------------------------------

type ColumnProps = {
  title?: string, 
  field?: string,
  align?: 'start' | 'center' | 'end',
  width?: number,
  sortable?: boolean
}

const Column = defineComponent<ColumnProps>({
  displayName: 'DataTable.Column',

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
      'Components of type DataTable.Column can only be used as children of '
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
  rowSelection: Set<number>,
  data: any[]
}

type DataTableMethods = {
  unselectAllRows: () => void
}

const DataTable = defineComponent<DataTableProps, {}, DataTableMethods>({
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
      type: String,
      nullable: true
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

  methods: ['unselectAllRows'],

  render: class extends React.Component<DataTableProps, DataTableState> {
    private renderer = new DataTableRenderer()

    constructor(props: DataTableProps) {
      super(props)

      this.state = {
        rowSelection: new Set(),
        data: [] 
      }
    }

    unselectAllRows() {
      this.setState({ rowSelection: new Set() })
    }

    render() {
      return this.renderer.render(this._getDataTableModel())
    }

    // --- private --------------------------------------------------

    private _getDataTableModel(): DataTableModel {
      const model: DataTableModel = {
        $kind: 'DataTableModel',
        rowSelectionOptions : this.props.rowSelectionOptions,
        columns: [],
        data: this.props.data || [],
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
            this._getColumnModel(child.props))
      })

      return model
    }

    private _getColumnModel(props: ColumnProps): DataTableColumnModel {
      return {
        $kind: 'DataTableColumnModel',
        title: props.title,
        field: props.field || null,
        align: props.align || null,
        sortable: props.sortable || false,
        width: props.width
      }
    }
  }
})

// --- data models --------------------------------------------------

type DataTableModel = {
  $kind: 'DataTableModel',

  rowSelectionOptions: {
    mode: 'none' | 'single' | 'multi',
  },

  columns: (DataTableColumnModel)[],
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
  title: string,
  field: string | null,
  align: 'start' | 'center' | 'end' | null,
  sortable: boolean,
  width: number
}

// --- exports ------------------------------------------------------

export default Object.assign(DataTable, {
  Column
})

export {
  DataTableProps,
  DataTableModel,
  ColumnProps as DataTableColumnProps,
  DataTableColumnModel
}
