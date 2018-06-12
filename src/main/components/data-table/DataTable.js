import React from 'react';
import { defineComponent } from 'js-widgets';

import { AgGridReact } from 'ag-grid-react';


import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

/*
import 'ag-grid/dist/styles/ag-theme-material.css';
import 'ag-grid/dist/styles/ag-theme-fresh.css';
import 'ag-grid/dist/styles/ag-theme-bootstrap.css';
import 'ag-grid/dist/styles/ag-theme-blue.css';
*/

const
  columnDefs = [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model'},
      {headerName: 'Price', field: 'price'}

  ],

  rowData = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000},
  ];

export default defineComponent({
  displayName: 'DataTable',

  main: class extends React.Component {
    constructor(props) {
      super(props);
      this.gridRef = null;
    }

    componentDidMount() {
      this.gridRef.api.sizeColumnsToFit();
    }

    render() {
      return <div className="ag-theme-balham" style={{ height: '100%', padding: '0 0 0.5rem 0', boxSizing: 'border-box' }}>

                    <AgGridReact ref={ ref => this.gridRef = ref}
                        sizeColumnsToFit={true}
                        columnDefs={columnDefs}
                        rowData={rowData}>
                    </AgGridReact>
      </div>;
    }
  }
});