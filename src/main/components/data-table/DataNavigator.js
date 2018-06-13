import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import { CommandBar } from 'office-ui-fabric-react';

import HBox from '../layout/HBox';
import Paginator from '../pagination/Paginator';
import PageSizeSelector from '../pagination/PageSizeSelector';
import PaginationInfo from '../pagination/PaginationInfo';
import DataTable from '../data-table/DataTable';

import Css from '../styling/Css';

const
  data = [
      {make: 'Toyota sdfd sfdasjkl sdfa ', model: 'Celica', price: 35000},
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


function getStyles({ theme }) {
  return {
    dataNavigator: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    },

    commandBar: {
      margin: '0.5rem 0'
    },

    paginationBar: {
      backgroundColor: 'rgb(244, 244, 244)',
      padding: '0.4rem 0.75rem',
      boxSizing: 'border-box',
    },

    pageSizeSelector: {
      padding: '0 3rem'
    },

    body: {
      flexGrow: 1,
      height: '100%'
    }
  };
}


const commandsSpec =
  Spec.arrayOf(
    Spec.and(
      Spec.prop('type', Spec.oneOf('general', 'single', 'multi', 'menu')),

      Spec.or(
        {
          when:
            it => it.type !== 'menu',
          
          check:
            Spec.shape({
              type: Spec.oneOf('general', 'single', 'multi'),
              text: Spec.string,
              icon: Spec.optional(Spec.string)
            })
        },
        {
          when: it => it.type === 'menu',
          
          check: 
            Spec.shape({
              type: Spec.is('menu'),
              text: Spec.string,
              icon: Spec.optional(Spec.string),
              items:
                Spec.optional(
                  Spec.arrayOf(
                    Spec.shape({
                      type: Spec.oneOf('general', 'single', 'multi'),
                      text: Spec.string,
                      icon: Spec.optional(Spec.string),
                    })))
            })
        })));

export default defineComponent({
  displayName: 'DataNavigator',

  properties: {
    commands: {
      type: Array,
      constraint: commandsSpec,
      nullable: true,
      defaultValue: null
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
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);

      this.state = { selectedRows: [] };
      this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    onSelectionChange({ selectedRows }) {
      this.setState({ selectedRows });
    }
    
    createCommandBar(classes) {
      const
        selectedCount = this.state.selectedRows.length,

        items =
          Seq.from(this.props.commands)
            .map((it, key) => {
              let ret;

              if (it.type !== 'menu') {
                const enabled =
                  it.type === 'general' || it.type === 'menu'
                    || (selectedCount > 0 && it.type === 'multi'
                    || it.type === 'single' && selectedCount === 1);
    
                ret = {
                  name: it.text,
                  key,
                  iconProps: { iconName: it.icon },
                  disabled: !enabled
                };

              } else {
                ret = {
                  key,
                  name: it.text,
                  iconProps: { iconName: it.icon },
                  isSubMenu: true,

                  subMenuProps: {
                    items:
                      Seq.from(it.items).map((item, key) => {
                        const enabled =
                          item.type === 'general' || item.type === 'menu'
                            || (selectedCount > 0 && item.type === 'multi'
                            || item.type === 'single' && selectedCount === 1);
                    
                        return {
                          key,
                          name: item.text,
                          disabled: !enabled
                        };
                      })
                      .toArray()
                  }
                };
              }

              return ret;
            })
            .toArray();

      return (
        <CommandBar
          items={items}
          className={classes.commandBar}
        />
      );
    }

    render() {
      return (
        <Css getStyles={getStyles}>
          {
            classes => {
              const
                pageIndex = 3,
                pageSize = 100,
                totalItemCount = 1235,
                
                commandBar =
                  this.props.commands && this.props.commands.length > 0  
                    ? this.createCommandBar(classes)
                    : null;

              return (
                <div className={this.props.className} style={{ boxSizing: 'border-box', height: '100%', ...this.props.style}}>
                  <div className={classes.dataNavigator}>
                    <div className={classes.header}>
                      <div style={{ fontSize: '18px', margin: '10px 10px 0 10px' }}>Customers</div>
                      <div>
                        {commandBar}
                      </div>
                    </div>
                    <div className={classes.body}>
                      <DataTable
                        columns={[
                          {
                            type: 'column',
                            title: 'Make',
                            field: 'make'
                          },
                          {
                            type: 'column',
                            title: 'Model',
                            field: 'model',
                          },
                          {
                            type: 'column',
                            title: 'Price',
                            field: 'price',
                            align: 'end'
                          }
                        ]}

                        data={data}
                        selectionMode="multi"
                        onSelectionChange={ this.onSelectionChange }
                      />
                    </div>
                    <div className={classes.footer}>
                      {createPaginationBar(pageIndex, pageSize, totalItemCount, classes)}
                    </div>
                  </div>
                </div>
              );
            }
          }
        </Css>
      );
    }
  }
});

// --- locals -------------------------------------------------------

function createPaginationBar(pageIndex, pageSize, totalItemCount, classes) {
  return (
    <HBox className={classes.paginationBar}>
      <HBox.Cell flex={0} align="left" valign="middle">
        <Paginator
          type="advanced"
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItemCount={totalItemCount}
        />
      </HBox.Cell>
      <HBox.Cell flex={1} align="left" valign="middle" className={classes.pageSizeSelector}>
          <PageSizeSelector />
      </HBox.Cell>
      <HBox.Cell flex={0} align="right" valign="middle">
        <PaginationInfo
          type="info-about-items"
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItemCount={totalItemCount}
        />
      </HBox.Cell>
    </HBox>
  );
}
