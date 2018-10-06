import defineRenderer from '../defineRenderer'
import defineStyle from '../../api/styling/defineStyle'
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { css, ITheme, classNamesFunction } from 'office-ui-fabric-react'
import { AgGridReact } from 'ag-grid-react'
import { TabbedLayout } from 'ag-grid-community';
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-balham.css'

// --- DataTableStyle -----------------------------------------------

const DataTableStyle = defineStyle((theme: ITheme) => ({
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

// --- DataTableRenderer --------------------------------------------

const DataTableRenderer = defineRenderer((model: any) => {
  console.log(model)

  return (
    <DataTableStyle>
      {
        (classes: any) => 
          <div className={classes.container}>
            <table cellSpacing={0} cellPadding={0} className={classes.table}>
              {createTableHead(model, classes)}
              {createTableBody(model, classes)}
            </table>
          </div>
      }
    </DataTableStyle>

  )
})

// --- locals -------------------------------------------------------

function createTableHead(model: any, classes: any) {
  return (
    <thead className={classes.tableHead}>
      <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Postal code</th>
        <th>City</th>
        <th>Country</th>
      </tr>
    </thead>
  )
}

function createTableBody(model: any, classes: any) {
  return (
    <tbody className={classes.tableBody}>
      <tr>
        <td>Jane</td>
        <td>Doe</td>
        <td>12345</td>
        <td>New York</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Miller</td>
        <td>7899</td>
        <td>London</td>
        <td>United Kingdom</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>Doe</td>
        <td>12345</td>
        <td>New York</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Miller</td>
        <td>7899</td>
        <td>London</td>
        <td>United Kingdom</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>Doe</td>
        <td>12345</td>
        <td>New York</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Miller</td>
        <td>7899</td>
        <td>London</td>
        <td>United Kingdom</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>Doe</td>
        <td>12345</td>
        <td>New York</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Miller</td>
        <td>7899</td>
        <td>London</td>
        <td>United Kingdom</td>
      </tr>
    </tbody>
  )
}

// --- exports ------------------------------------------------------

export default DataTableRenderer
