import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import React from 'react'
import { Checkbox, ITheme } from 'office-ui-fabric-react'
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
        boxSizing: 'border-box',
        padding: '0.5rem',
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
        boxSizing: 'border-box',
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
  },

  rowSelectionColumn: {
    width: '38px',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,

    selectors: {
      '& > div': {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }
    }
  },

  selectedRow: {
    backgroundColor: 'lemonChiffon !important',
  }
}))

type DataTableClasses = ClassesOf<typeof styleDataTable>

// --- DataTableRenderer --------------------------------------------

class DataTableRenderer {
  private selectedRows: [2]

  render(model: DataTableModel)  {
    const rowSelectionMode = model.rowSelectionOptions.mode

    return styleDataTable(classes => {
      return (
        <div className={classes.container}>
          <table cellSpacing={0} cellPadding={0} className={classes.table}>
            {createTableHead(model, classes)}
            {createTableBody(model, classes)}
          </table>
        </div>
      )
    })
  }
}

// --- locals -------------------------------------------------------

function createTableHead(model: DataTableModel, classes: DataTableClasses) {
  const
    selectionMode = model.rowSelectionOptions.mode,

    selectionColumn =
      selectionMode === 'none'
        ? null
        : <th className={classes.rowSelectionColumn}>
            <div>{ createSelectionCheckbox(-1, model) }</div>
          </th>

  return (
    <thead className={classes.tableHead}>
      <tr>
        {selectionColumn}
        {
          model.columns.map((column, columnIdx) =>
            <th key={columnIdx}>
              {column.title}
            </th>)
        }
      </tr>
    </thead>
  )
}

function createTableBody(model: DataTableModel, classes: DataTableClasses) {
  const
    selectionMode = model.rowSelectionOptions.mode

  return (
    <tbody className={classes.tableBody}>
        {
          model.data.map((row, rowIdx) => {
            const selectionColumn =
              selectionMode === 'none'
                ? null
                : <td className={classes.rowSelectionColumn}>
                    <div>{createSelectionCheckbox(rowIdx, model)}
                    </div>
                  </td>

            return (
              <tr key={rowIdx} className={model.rowSelection.has(rowIdx) ? classes.selectedRow : null }>
                {selectionColumn}
                {
                  model.columns.map((column, columnIdx) =>
                    <td key={columnIdx}>
                      {row[column.field]}
                    </td>
                  )
                }
              </tr>
            )
          })
        }
    </tbody>
  )
}

function createSelectionCheckbox(index: number, model: DataTableModel) {
  const
    checked = model.rowSelection.has(index),

    onChange =() => {
      const selectedRows = new Set(model.rowSelection)

      if (selectedRows.has(index)) {
        selectedRows.delete(index)
      } else {
        selectedRows.add(index)
      }

      model.api.setRowSelection(selectedRows)
    }

  return (
    <Checkbox checked={checked} onChange={onChange}/>
  ) 
}

// --- exports ------------------------------------------------------

export default DataTableRenderer
