import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import React from 'react'
import { ITheme } from 'office-ui-fabric-react'
import { DataTableModel } from './DataTable'

// --- DataTableStyle -----------------------------------------------

const styleDataTable = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexGrow: 1,
    border: '1px solid #ddd',
  },

  table: {
    width: '100%',
  },

  tableHead: {
    backgroundColor: '#f2f2f2', 

    selectors: {
      '& > tr > th': {
        padding: '0.25rem',
        borderCollapse: 'collapse',
        borderWidth: '0 0 1px 1px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        ...theme.fonts.medium,
      },

      '& > tr > th:first-child': {
        borderLeftWidth: 0
      }
    }
  },

  tableBody: {
    selectors: {
      '& > tr': {
        backgroundColor: '#fafafa',
      },

      '& > tr:nth-child(even)': {
        backgroundColor: 'white'
      },

      '& > tr > td': {
        padding: '0.375rem',
        borderCollapse: 'collapse',
        borderWidth: '0 1px 1px 0',
        borderStyle: 'solid',
        borderColor: 'transparent #ddd #eee transparent',
        ...theme.fonts.medium,
      },
      
      '& > tr > td:first-child': {
        borderLeftWidth: 0
      }
    }
  }
}))

type DataTableClassNames = ClassesOf<typeof styleDataTable>

// --- DataTableRenderer --------------------------------------------

const DataTableRenderer = {
  render(model: DataTableModel)  {
    console.log(model)

    return styleDataTable(classes => 
      <div className={classes.container}>
        <table cellSpacing={0} cellPadding={0} className={classes.table}>
          {createTableHead(model, classes)}
          {createTableBody(model, classes)}
        </table>
      </div>
    )
  }
}

// --- locals -------------------------------------------------------

function createTableHead(model: DataTableModel, classes: DataTableClassNames) {
  console.log(model)

  const
    selectionMode = model.selectionOptions.mode,

    selectionColumn =
      selectionMode === 'none'
        ? null
        : <th>x</th>

  return (
    <thead className={classes.tableHead}>
      <tr>
        {selectionColumn}
        {
          model.columns.map(column =>
            <th>
              {column.title}
            </th>)
        }
      </tr>
    </thead>
  )
}

function createTableBody(model: DataTableModel, classes: DataTableClassNames) {
  const
    selectionMode = model.selectionOptions.mode,

    selectionColumn =
      selectionMode === 'none'
        ? null
        : <td>x</td>

  return (
    <tbody className={classes.tableBody}>
      <tr>
        {selectionColumn}
        {
          model.columns.map(column =>
            <td>
              {column.title}
            </td>)
        }
      </tr>
    </tbody>
  )
}

// --- exports ------------------------------------------------------

export default DataTableRenderer
