import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import React from 'react'
import { Checkbox, ITheme } from 'office-ui-fabric-react'
import { DataTableModel, DataTableColumnModel } from './DataTable'
import SortAscIcon from '../../icons/SortAscIcon'
import SortDescIcon from '../../icons/SortDescIcon'
import { throttleTime } from 'rxjs/operators';

// --- DataTableStyle -----------------------------------------------

const styleDataTable = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexGrow: 1,
    borderWidth: '1px 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternary,
  },

  table: {
    width: '100%',
  },

  tableHead: {
    color: theme.palette.black,
    backgroundColor: '#f0f0f0', 

    selectors: {
      '& > tr > th': {
        boxSizing: 'border-box',
        padding: '0.5rem',
        verticalAlign: 'center',
        fontSize: theme.fonts.mediumPlus.fontSize,
        fontWeight: 'normal',
        borderWidth: '0 0 1px 1px',
        borderLeftColor: theme.palette.neutralQuaternary,
        borderBottomColor: theme.palette.neutralQuaternary,
        borderStyle: 'solid',
      },

      '& > tr > th:first-child': {
        borderLeftWidth: 0
      },

      '& > tr > th[data-sortable=true]': {
        cursor: 'pointer',
        
        selectors: {
          ':hover': {
            //borderBottomWidth: '1px',
            //borderBottomStyle: 'solid',
            //borderBottomColor: theme.palette.themePrimary,
            backgroundColor: theme.palette.neutralQuaternaryAlt,
          },

          ':active': {
            backgroundColor: theme.palette.neutralQuaternary,
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
       backgroundColor: theme.palette.neutralLighterAlt,
      },

      '& > tr:nth-child(even)': {
        backgroundColor: 'white'
      },

      '& > tr > td': {
        boxSizing: 'border-box',
        padding: '0.375rem',
        fontSize: theme.fonts.medium.fontSize,
        borderWidth: '0 0 0.5px 0.5px',
        borderLeftColor: theme.palette.neutralLight,
        borderBottomColor: theme.palette.neutralLight,
        borderStyle: 'solid',
      },
      
      '& > tr > td:first-child': {
        borderLeftWidth: 0
      }
    }
  },

  alignCenter: {
    textAlign: 'center'
  },

  alignEnd: {
    textAlign: 'right'
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
    backgroundColor: theme.palette.themeLighter + ' !important',
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
            createColumnHeader(columnIdx, column, model, classes))
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
                  model.columns.map((column, columnIdx) => {
                    const className =
                      column.align === 'center'
                        ? classes.alignCenter
                        : column.align === 'end'
                        ? classes.alignEnd
                        : null

                    return (
                      <td key={columnIdx} className={className}>
                        {row[column.field]}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
    </tbody>
  )
}

function createColumnHeader(columnIdx: number, column: DataTableColumnModel, model: DataTableModel, classes: DataTableClasses) {
  const
    sortable = model.columns[columnIdx].sortable,
    sortBy = model.sortBy,
    sortDesc = model.sortDesc,
    isSorted = sortBy !== null && sortBy === column.field,

    sortIcon = // TODO
      <div style={{ width: '20px', height: '20px' }}>
        {
          sortable && isSorted
            ? (sortDesc ? <SortDescIcon/> : <SortAscIcon/>)
            : null
        }
      </div>,

    onClick = 
      !sortable && column.field
        ? null
        : () => {
          model.api.changeSort(column.field, isSorted ? !sortDesc : false)
        } 

  return (
    <th key={columnIdx} data-sortable={String(sortable)} onClick={onClick}>
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

      model.api.changeRowSelection(selectedRows)
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

      model.api.changeRowSelection(selectedRows)
    }

  return (
    <Checkbox checked={checked} onChange={onChange}/>
  ) 
}

// --- exports ------------------------------------------------------

export default DataTableRenderer
