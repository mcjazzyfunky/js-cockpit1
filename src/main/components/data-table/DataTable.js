import React from 'react';
import { defineComponent } from 'js-widgets';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DefaultButton, IconButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';


import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { loadTheme, getTheme } from 'office-ui-fabric-react/lib/Styling';




// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';
//import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import { AgGridReact } from 'ag-grid-react';


import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { queue } from 'rxjs';

import { registerIcons } from '@uifabric/styling';
//import FontAwesomeIcon from '@fontawesome/react-fontawesome';

//Globalize.locale('en');

//globalizeLocalizer();


const theme = getTheme();

console.log(theme);

/*
loadTheme({
  semanticColors: {
    inputBackground: '#eee',
    inputBorder: '#eee'
  }
});
*/

registerIcons({
  icons: {
    'calendar': <i className="material-icons" style={{ fontSize: '100%' }}>calendar_today</i>,
    //'up': <i className="fa fa-arrow-up"/>,
    //'down': <i className="fa fa-arrow-down"/>,
    'up': <i className="material-icons" style={{ fontSize: '100%' }}>arrow_upward</i>,
    'down': <i className="material-icons" style={{ fontSize: '100%' }}>arrow_downward</i>,
    'chevrondown': <i className="material-icons" style={{ fontSize: '1.8rem' }}>keyboard_arrow_down</i>,
    'chevronup': <i className="material-icons" style={{ fontSize: '100%' }}>keyboard_arrow_up</i>,
    'chevronleft': <i className="material-icons" style={{ fontSize: '100%' }}>keyboard_arrow_left</i>,
    'chevronright': <i className="material-icons" style={{ fontSize: '100%' }}>keyboard_arrow_right</i>,

    'checkmark': <i className="material-icons" style={{ fontSize: '120%', marginTop: '3px' }}>check</i>,
    //'down': <i className="material-icons md-14" style={{ fontSize: 18 }}>arrow_downward</i>,
  }
});

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


//initializeIcons();

export default defineComponent({
  displayName: 'DataTable',

  main: class extends React.Component {
    render() {
      return <div style={{ fontSize: 12 }}>
      <DatePicker onRenderIcon={
        (...args) => {
          console.log('>>>>', args)
        }
      }/>

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



<CommandBar
          items={[
            {
              iconProps: {
                iconName: 'chevronleft'
              },
            },
            {
              name: '1',
            },
            {
              name: '...',
            },
            {
              name: '11',
            },
            {
              name: '12',
            },
            {
              name: '13',
            },
            {
              name: '...',
            },
            {
              name: '27',
            },
            {
              iconProps: {
                iconName: 'chevronright'
              },
            },
          ]}
        />
  <TooltipHost content="This is the tooltip" id="myID" calloutProps={{ gapSpace: 0 }}>
       <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
        />
  </TooltipHost>
        <DefaultButton>...</DefaultButton>
        <DefaultButton>11</DefaultButton>
        <DefaultButton primary>12</DefaultButton>
        <ActionButton>13</ActionButton>
        <ActionButton>14</ActionButton>
        <ActionButton>15</ActionButton>
        <ActionButton>...</ActionButton>
       <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
        />
      </div>;
      //  <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    }
  }
});