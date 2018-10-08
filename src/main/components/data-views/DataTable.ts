import DataTableRenderer from './DataTableRenderer'

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
  
  rowSelection?: {
    mode: 'none' | 'single' | 'multi'
  },

  data: object[],
  children?: ReactNode
}

type DataTableState = {
}

const DataTable = defineComponent<DataTableProps>({
  displayName: 'DataTable',

  properties: {
    title: {
      type: String
    },

    rowSelection: {
      type: Object,

      validate:
        Spec.strictShape({
          mode: Spec.oneOf('none', 'single', 'multi')
        }),

      defaultValue: { mode:  'none' }
    },

    data: {
      type: Array,
      validate: Spec.arrayOf(Spec.object)
    },

    children: {
      validate: withChildren(Spec.all(isElementOfType(Column)))
    }
  },

  base: class extends React.Component<DataTableProps, DataTableState> {
    private renderer = new DataTableRenderer()

    constructor(props: DataTableProps) {
      super(props)
    }

    render() {
      return this.renderer.render(this.getDataTableModel())
    }

    // --- private --------------------------------------------------

    private getDataTableModel(): DataTableModel {
      const model: DataTableModel = {
        $kind: 'DataTableModel',
        rowSelection: this.props.rowSelection,
        columns: [],
        data: this.props.data
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

  rowSelection: {
    mode: 'none' | 'single' | 'multi',
  },

  columns: (DataTableColumnModel)[]
  data: any[]
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
