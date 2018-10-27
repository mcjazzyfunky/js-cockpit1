// internal import
import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import { DataTableModel, DataTableColumnModel } from './DataTable'
import SortAscIcon from '../../icons/SortAscIcon'
import SortDescIcon from '../../icons/SortDescIcon'

// external imports
import React, { ReactNode } from 'react'

import {
  Checkbox,
  ITheme,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  IDetailsList,
  CheckboxVisibility,
  ConstrainMode,
  classNamesFunction,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  IDetailsHeaderProps,
  IRenderFunction,
  css
} from 'office-ui-fabric-react'

// --- DataTableStyle -----------------------------------------------

const styleDataTable = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexGrow: 1,

    selectors: {
      '& .ms-DetailsRow': {
        borderWidth: '0 0 1px 0',
        borderStyle: 'solid',
        borderColor: theme.palette.neutralLight,
      }
    }
  },

  tableHeadCell: {
    display: 'inline-flex',
    flexWrap: 'nowrap',
    boxSizing: 'border-box',
    padding: '5px',
    verticalAlign: 'center',
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontWeight: 'normal',
    borderWidth: '1px',
    borderColor: theme.palette.neutralTertiaryAlt,
    borderStyle: 'solid',
    color: theme.palette.black,
    backgroundColor:  theme.palette.neutralLighter,
  },

  tableHeadCellContent: {
    display: 'flex',
    flexWrap: 'nowrap',
  },

  sortableColumn: {
    cursor: 'pointer'
  },

  tableHead: {
    display: 'flex',
  },

  tableBodyCell: {
    fontSize: theme.fonts.medium.fontSize,
    borderWidth: '0 0 0 0',
    borderColor: theme.palette.neutralLight,
    borderStyle: 'solid',
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
  },

  detailsList: {
    width: '100%',
  }
}))

type DataTableClasses = ClassesOf<typeof styleDataTable>

// --- DataTableRenderer --------------------------------------------

class DataTableRenderer {
  private _model: DataTableModel
  private _classes: DataTableClasses

  constructor() {
    this._onRenderDetailsHeader = this._onRenderDetailsHeader.bind(this)
    this._onRenderItemColumn = this._onRenderItemColumn.bind(this)
  }

  main(model: DataTableModel) {
    this._model = model

    const
      selectionMode = model.rowSelectionOptions.mode,

      columns: IColumn[] =
        model.columns.map((column, columnIndex) => ({
          key: String(columnIndex),
          name: String(columnIndex), 
          fieldName: String(columnIndex),
          resizable: true,
          //isMultiline: true,
          minWidth: 100,
          maxWidth: 1000,
          constrainMode: ConstrainMode.horizontalConstrained
        }))

    if (selectionMode !== 'none') {
      columns.unshift({
        key: '-1',
        name: '-1',
        fieldName: '-1',
        minWidth: 30,
        maxWidth: 30,
      })
    }
    
    return styleDataTable(
      classes => {
        this._classes = classes

        return (
          <div style={{ minHeight:'100%', position: 'relative', flexGrow: 1 }} className={classes.container}>
            <ScrollablePane >
              <DetailsList
                compact={true}
                isHeaderVisible={true}
                columnReorderOptions={{frozenColumnCountFromStart: 1}}
                constrainMode={ConstrainMode.unconstrained}
                onColumnResize={() => console.log('resizing')}
                layoutMode={DetailsListLayoutMode.justified}
                items={model.data}
                columns={columns}
                checkboxVisibility={CheckboxVisibility.hidden}
                onRenderItemColumn={this._onRenderItemColumn}
                onRenderDetailsHeader={this._onRenderDetailsHeader}
              />
            </ScrollablePane>
          </div>
        )
      }
    )
  }

  private _onRenderDetailsHeader(detailsHeaderProps: IDetailsHeaderProps, defaultRender: IRenderFunction<IDetailsHeaderProps>) {
    const
      columns = detailsHeaderProps.columns,

      cells = columns.map((column: IColumn, index) => {
        const
          columnIndex = parseInt(column.key, 10),
         
          cell =
            columnIndex === -1
              ? <div className={this._classes.tableHeadCell}>{createSelectAllCheckbox(this._model)}</div>
              : createTableHeadCell(columnIndex, this._model.columns[columnIndex], this._model, this._classes)

        return cell
      }) 
 
    return (
      <Sticky stickyPosition={StickyPositionType.Header}>
        <div className={this._classes.tableHead}>{ cells }</div>
      </Sticky>
    )
  }

  private _onRenderItemColumn(item: any, rowIndex: number, column: IColumn): ReactNode {
    const columnIndex = parseInt(column.key, 10)

    return columnIndex === -1
      ? this._createSelectCheckbox(rowIndex)
      : this._createDataCell(rowIndex, columnIndex, this._classes)
  }

  private _createDataCell(rowIndex: number, columnIndex: number, classes: DataTableClasses): ReactNode {
    let content = null
   
    const
      row = this._model.data[rowIndex],
      column = this._model.columns[columnIndex],
      field = column.field,

      className =
        classes.tableBodyCell + ' '
          + (column.align === 'center'
            ? classes.alignCenter
            : column.align === 'end'
            ? classes.alignEnd
            : '')

    if (field) {
      content =
        row[field]
    }

    return (
      <div className={className}>
        {content}
      </div>
    )
  }

  private _createSelectCheckbox(index: number): ReactNode {
    const
      model = this._model,
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
}

// --- locals -------------------------------------------------------

function createTableHeadCell(columnIdx: number, column: DataTableColumnModel, model: DataTableModel, classes: DataTableClasses) {
  const
    sortable = model.columns[columnIdx].sortable,
    sortBy = model.sortBy,
    sortDesc = model.sortDesc,
    isSorted = sortBy !== null && sortBy === column.field,

    className =
      sortable
        ? css(classes.tableHeadCell, classes.sortableColumn)
        : classes.tableHeadCell,

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
    <div key={columnIdx} onClick={onClick} className={className}>
      <div className={classes.tableHeadCellContent}>
        {column.title}
        {sortIcon}
      </div>
    </div>
  )
}

function createTableBodyRow(rowIndex: number, model: DataTableModel, classes: DataTableClasses) {
  const
    row: any = model.data[rowIndex],
    selectionMode = model.rowSelectionOptions.mode,
  
    selectionColumn =
      selectionMode === 'none'
        ? null
        : <td className={classes.rowSelectionColumn}>
            <div>{createSelectCheckbox(rowIndex, model)}
            </div>
          </td>

  return (
    <tr key={rowIndex} className={model.rowSelection.has(rowIndex) ? classes.selectedRow : null }>
      {selectionColumn}
      {
        model.columns.map((column, columnIdx) =>
          createTableBodyCell(columnIdx, model, row, classes))
      }
    </tr>
  )
}

function createTableBodyCell(columnIndex: number, model: DataTableModel, row: any, classes: DataTableClasses) {
  const column = model.columns[columnIndex]

  const className =
    classes.tableBodyCell + ' '
      + (column.align === 'center'
        ? classes.alignCenter
        : column.align === 'end'
        ? classes.alignEnd
        : '')
console.log(888, className)
  return (
    <td key={columnIndex} className={className}>
      {row[column.field]}
    </td>
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
