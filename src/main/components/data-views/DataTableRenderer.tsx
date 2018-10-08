import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import React from 'react'
import { Checkbox, ITheme } from 'office-ui-fabric-react'
import { DataTableModel, DataTableColumnModel } from './DataTable'
import SortAscIcon from '../../icons/SortAscIcon'
import SortDescIcon from '../../icons/SortDescIcon'

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
        verticalAlign: 'center',
        ...theme.fonts.medium,
      },

      '& > tr > th:first-child': {
        borderLeftWidth: 0
      },

      '& > tr > th[data-sortable=true]': {
        cursor: 'pointer',
        
        selectors: {
          ':hover': {
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: theme.palette.themePrimary,
            backgroundColor: '#e8e8e8',
          },

          ':active': {
            backgroundColor: '#e0e0e0',
          }
        }
      },
      
      '& > tr > th > div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    color: 'black !important',
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
            <div>
              {
                selectionMode === 'multi'
                  ? createSelectAllCheckbox(model)
                  : null
              }
            </div>
          </th>

  return (
    <thead className={classes.tableHead}>
      <tr>
        {selectionColumn}
        {
          model.columns.map((column, columnIdx) =>
            createColumnHeader(columnIdx, column, model))
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
                    <div>{createSelectCheckbox(rowIdx, model)}
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

function createColumnHeader(columnIdx: number, column: DataTableColumnModel, model: DataTableModel) {
  const
    sortable = model.columns[columnIdx].sortable,
    sortBy = model.sortBy,
    sortDescending = model.sortDescending,
    isSorted = sortBy !== null && sortBy === column.field,

    sortIcon =
      isSorted
        ? (sortDescending ? <SortDescIcon/> : <SortAscIcon/>)
        : null

  return (
    <th key={columnIdx} data-sortable={String(sortable)}>
      <div>
        {column.title}

        {sortIcon}
      </div>
    </th>
  )
}


function createSelectCheckbox(index: number, model: DataTableModel) {
  const
    selectionMode = model.rowSelectionOptions.mode,
    checked = model.rowSelection.has(index),

    onChange =() => {
      let selectedRows: Set<number>
      
      if (selectionMode === 'single') {
        selectedRows = new Set([index])
      } else {
        selectedRows = new Set(model.rowSelection)

        if (checked) {
          selectedRows.delete(index)
        } else {
          selectedRows.add(index)
        }
      }

      model.api.setRowSelection(selectedRows)
    }

  return (
    <Checkbox checked={checked} onChange={onChange}/>
  ) 
}

function createSelectAllCheckbox(model: DataTableModel) {
  const
    rowSelectionSize = model.rowSelection.size,
    checked = rowSelectionSize > 0 && rowSelectionSize === model.data.length,

    onChange =() => {
      const selectedRows: Iterable<number> =
        checked
          ? []
          : model.data.keys()

      model.api.setRowSelection(selectedRows)
    }

  return (
    <Checkbox checked={checked} onChange={onChange}/>
  ) 
}

// --- exports ------------------------------------------------------

export default DataTableRenderer
