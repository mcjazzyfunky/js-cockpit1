import DataTableRenderer from '../../../renderers/DataTable/DataTableRenderer'

import React, { ComponentType, ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'


// --- DataTable.Column ---------------------------------------------

type ColumnProps = {
  title?: string,
  field?: string,
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
        + 'DataTable or DataTable.ColumnGroup components'
    )
  }
})

// --- DataTable.ColumnGroup ----------------------------------------

type ColumnGroupProps = {
  title?: string,
  children?: ReactNode
}

const ColumnGroup: ComponentType<ColumnGroupProps> = defineComponent<ColumnGroupProps>({
  displayName: 'ColumnGroup',

  properties: {
    title: {
      type: String
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType([ColumnGroup, Column]))))
    }
  },

  render() {
    throw new Error(
      'Components of type DataTable.Column only be used as children of '
        + 'DataTable or DataTable.ColumnGroup components')
  }
})

type DataTableProps = {
  data: object[],
  children?: ReactNode
}

type DataTableState = {
  tableInfo: TableInfo
}

type ColumnInfo = {
  title?: string,
  field?: string
}

type TableInfo = {
  data: any[],
  columns: ColumnInfo[]
}


const DataTable = defineComponent<DataTableProps>({
  displayName: 'DataTable',

  properties: {
    data: {
      type: Array,
      validate: Spec.arrayOf(Spec.object)
    },

    children: {
      validate: withChildren(Spec.all(isElementOfType(Column)))
    }
  },

  base: class Base extends React.Component<DataTableProps, DataTableState> {
    constructor(props: DataTableProps) {
      super(props)
    }

    render() {
      return DataTableRenderer.render(Base.getDataTableModel(this.props))
    }

    // --- private --------------------------------------------------

    private static getDataTableModel(props: DataTableProps): Model_DataTable {
      const model: Model_DataTable = {
        kind: 'Model_DataTable',
        columns: []
      }

      React.Children.forEach(props.children, (child: ReactElement<Model_DataTable_Column | Model_DataTable_ColumnGroup>) => {
        model.columns.push(
          child.type === Column
            ? Base.getColumnModel(child.props)
            : Base.getColumnGroupModel(child.props))
      })

      return model
    }

    private static getColumnModel(props: ColumnProps): Model_DataTable_Column {
      let ret: Model_DataTable_Column = {
        kind: 'Model_DataTable_Column'
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
    
    private static getColumnGroupModel(props: ColumnGroupProps): Model_DataTable_ColumnGroup {
      let ret: Model_DataTable_ColumnGroup

      return ret
    }
  }
})

// --- models ------------------------------------------------------

type Model_DataTable = {
  kind: 'Model_DataTable',
  columns: (Model_DataTable_Column | Model_DataTable_ColumnGroup)[]
}

type Model_DataTable_Column = {
  kind: 'Model_DataTable_Column',
  title?: string,
  field?: string,
  sortable?: boolean
}

type Model_DataTable_ColumnGroup = {
  kind: 'Model_DataTable_ColumnGroup',
  title: string,
  columns: (Model_DataTable_Column | Model_DataTable_ColumnGroup)[]
}

// --- exports ------------------------------------------------------

export default Object.assign(DataTable, {
  Column,
  ColumnGroup
})
