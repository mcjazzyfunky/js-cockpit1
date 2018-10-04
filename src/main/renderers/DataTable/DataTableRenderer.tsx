import defineRenderer from '../defineRenderer'
import React from 'react'
import { defineComponent } from 'js-react-utils'

import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-balham.css'

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
    <div
      className="ag-theme-balham"
      style={{ width: '100%', flexGrow: 1, display: 'table', height: '400px' }}
    >
      <AgGridReact
        columnDefs ={columnDefs}
        rowData={rowData}>
      </AgGridReact>
    </div>
  )
})

// --- exports ------------------------------------------------------

export default DataTableRenderer
