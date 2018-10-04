import defineRenderer from '../defineRenderer'
import defineStyle from '../../api/styling/defineStyle'
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { css, ITheme } from 'office-ui-fabric-react'
import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-balham.css'

// --- DataTableStyle -----------------------------------------------

const DataTableStyle = defineStyle((theme: ITheme) => ({
  container: {
    width: '100%',
    height: '400px',

    selectors: {
      '& .ag-cell': {
        ...theme.fonts.smallPlus,
      },

      '& .ag-header-cell-text': {
        ...theme.fonts.medium,
        color: theme.semanticColors.bodyText
      }
    }
  }
}))

// --- DataTableRenderer --------------------------------------------

const DataTableRenderer = defineRenderer((model: any) => {
    const columnDefs: any = [
      {
        headerName: 'First name',
        field: 'firstName'
      },
      {
        headerName: 'Last name',
        field: 'lastName'
      },
      {
        headerName: 'Postal code',
        field: 'postalCode'
      },
      {
        headerName: 'City',
        field: 'city'
      }
    ]

    const rowData: any = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        postalCode: '12345',
        city: 'New York'
      },
      {
        firstName: 'Mary',
        lastName: 'Miller',
        postalCode: '89977',
        city: 'Florida'
      }
    ]


    console.log(model)
  return (
    <DataTableStyle>
      {
        (classes: any) => 
          <div
            className={ css(classes.container, 'ag-theme-balham') }
          >
            <AgGridReact
              columnDefs ={columnDefs}
              rowData={rowData}>
            </AgGridReact>
          </div>
      }
    </DataTableStyle>

  )
})

// --- exports ------------------------------------------------------

export default DataTableRenderer
