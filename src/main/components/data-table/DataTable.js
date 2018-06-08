import React from 'react';
import { defineComponent } from 'js-widgets';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

const
  columnDefs = [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model'},
      {headerName: 'Price', field: 'price'}

  ],

  rowData = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000}
  ];


export default defineComponent({
  displayName: 'DataTable',

  main: class extends React.Component {
    render() {
      return <div>DataTable...</div>;
      //  <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    }
  }
});