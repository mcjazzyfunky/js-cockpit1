import React from 'react';
import { defineComponent } from 'js-widgets';
import { CommandBar, DefaultButton, IconButton, ActionButton } from 'office-ui-fabric-react';


import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

import Paginator from '../pagination/Paginator';

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
      return <div style={{ fontSize: 12 }}>
      <DatePicker showWeekNumbers />

<Dropdown
          label="Disabled uncontrolled example with defaultSelectedKey:"
          defaultSelectedKey="D"
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' }
          ]}
        />

<Paginator type="default" pageIndex={13} pageSize={25} totalItemCount={1234} />

      </div>;
    }
  }
});