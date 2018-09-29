import React, { ReactNode } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

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

type ColumnGroupProps = {
  title?: string,
  children?: ReactNode
}

const ColumnGroup = defineComponent<ColumnGroupProps>({
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

  base: class extends React.Component<DataTableProps, DataTableState> {
    private _tableInfo: TableInfo = null
    private _tableInfoSource: DataTableProps = null

    constructor(props: DataTableProps) {
      super(props)

      this._tableInfo = null,
      this._tableInfoSource = null
    }

    render() {
      this._prepareTableInfo()

      return (
        <table>
          <thead>
            <tr>
              {
                this._tableInfo.columns.map((column, idx) => {
                    return <th key={idx}>{column.title}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this._tableInfo.data.map((row: any, rowIdx) => 
                <tr key={rowIdx}>
                  {
                    this._tableInfo.columns.map(({ field }, columnIdx) => {
                      const value: any = row && field ? row[field] : null

                      return <td key={`${rowIdx}-${columnIdx}`} >{ value }</td>
                    })
                  }
                </tr>)
            }
          </tbody>
        </table>
      )
    }
    
    private _prepareTableInfo() {
      if (this.props !== this._tableInfoSource) {
        const children = this.props.children

        const columns = React.Children.map(children, (child: any) => {
          const { title, field } = child.props

          return { title, field }
        })

        this._tableInfo = { columns, data: this.props.data || [] }
        this._tableInfoSource = this.props
      }
    }
  }
})


export default Object.assign(DataTable, {
  Column
});
