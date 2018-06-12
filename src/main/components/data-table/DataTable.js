import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import { AgGridReact } from 'ag-grid-react';


import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

const
  columnsSpec =
    Spec.arrayOf(
      Spec.and(
        Spec.object,
        Spec.prop('type', Spec.oneOf('column', 'columnGroup')),
        Spec.or(
          {
            when: it => it.type === 'column',

            check:
              Spec.shape({
                type: Spec.is('column'),
                title: Spec.string,
                field: Spec.string,
                align: Spec.optional(Spec.oneOf('start', 'end')),
                renderer: Spec.optional(Spec.function)
              })
          },
          {
            when: it => it.type === 'columnGroup',

            check:
              Spec.shape({
                type: Spec.is('columnGroup'),
                title: Spec.string,
                columns: Spec.optional(Spec.lazy(() => columnsSpec))
              })
          })));

export default defineComponent({
  displayName: 'DataTable',

  properties: {
    columns: {
      type: Array,
      constraint: columnsSpec
    },

    data: {
      type: Array,
      nullable: true,
      defaultValue: null
    },

    selectionMode: {
      type: String,
      constraint: Spec.oneOf('single', 'multi', 'off'),
      defaultValue: 'off'
    },

    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    onSelectionChanged: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);
      this.gridRef = null;
    }

    componentDidMount() {
      this.gridRef.api.sizeColumnsToFit();
    }

    render() {
      const
        columnDefs = convertColumnsConfig(this.props.columns),

        rowData = this.props.data,

        rowSelection =
          { single: 'single', 'multi': 'multiple'}[this.props.selectionMode]
            || null,

        selectionChanged =
          this.props.onSelectionChanged
            ? ({ api }) => this.props.onSelectionChanged({
              type: 'selectionChanged',
              selectedRows: api.getSelectedRows()
            })
            : null;

      if (rowSelection === 'multiple') {
        columnDefs.unshift({
          width: 32,
          checkboxSelection: true, 
          headerCheckboxSelection: true,
          suppressResize: true,
          suppressSizeToFit: true
        });
      }

      return <div className="ag-theme-balham" style={{ height: '100%', padding: '0 0 0.5rem 0', boxSizing: 'border-box' }}>

                    <AgGridReact ref={ ref => this.gridRef = ref}
                        sizeColumnsToFit={true}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        rowSelection={rowSelection}
                        onSelectionChanged={selectionChanged}
                    >
                    </AgGridReact>
      </div>;
    }
  }
});

function convertColumnsConfig(config) {
  const ret = 
    Seq.from(config)
      .map(
        it => it.type === 'columnGroup'
          ? convertColumnGroupConfig(it)
          : convertColumnConfig(it))
      .toArray();

  return ret;
}

function convertColumnConfig(config) {
  const ret = {
    headerName: config.title,
  };

  if (config.field) {
    ret.field = config.field;
  }

  if (config.align === 'end') {
    ret.type = 'numericColumn';
  }

  if (config.renderer) {
    ret.cellRendererFramework = (params) => {
      const
        field = params.colDef.field || null,
        data = params.data | [],
        value = params.value;

      return config.renderer({ value, data, field });
    };
  }

  return ret;
}

function convertColumnGroupConfig(config) {
  const ret = {
    headerName: config.title,
    children: convertColumnsConfig(config.columns)
  };

  return ret;
}
