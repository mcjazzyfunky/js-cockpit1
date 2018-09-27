import React from 'react';
import { defineComponent } from 'js-scenery/react';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import { CommandBar, SearchBox } from 'office-ui-fabric-react';

import HBox from '../layout/HBox';
import Paginator from '../pagination/Paginator';
import PageSizeSelector from '../pagination/PageSizeSelector';
import PaginationInfo from '../pagination/PaginationInfo';
import DataTable from './DataTable';

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

    title: {
      fontSize: '1.125rem',
      margin: '0.5rem 1.5rem 0.5rem 0.25rem', 
    },

    search: {
      width: '14rem',
      margin: '3px 0 0 0'
    },

    paginationBar: {
      backgroundColor: theme.palette.neutralLighter,
      padding: '0 0.75rem',
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
    title: {
      type: String,
      nullable: true,
      defaultValue: null
    },

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

      this.state = {
        pageIndex: 24,
        pageSize: 50,
        totalItemCount: 1234,
        selectedRows: []
      };
  
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
                const items = [];

                let menuEnabled = false;

                Seq.from(it.items).forEach((item, key) => {
                  const enabled =
                    item.type === 'general' || item.type === 'menu'
                      || (selectedCount > 0 && item.type === 'multi'
                      || item.type === 'single' && selectedCount === 1);

                  menuEnabled = menuEnabled || enabled;
              
                  items.push({
                    key,
                    name: item.text,
                    disabled: !enabled
                  });
                });

                ret = {
                  key,
                  name: it.text,
                  iconProps: { iconName: it.icon },
                  disabled: !menuEnabled,
                  isSubMenu: true,
                  subMenuProps: { items }
                };
              }

              return ret;
            })
            .toArray(),

        farItems = [
          {
            key: 'search',

            onRender: () => <div><SearchBox placeholder="Search" className={classes.search}/></div>
          }
        ];
      

      if (this.props.title) {
        items.unshift({
          key: '_title_',

          onRender: () =>
            <div className={classes.title}>
              {this.props.title}
            </div>
        });
      }

      return (
        <CommandBar
          items={items}
          farItems={farItems}
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
                pageIndex = this.state.pageIndex,
                pageSize = this.state.pageSize,
                totalItemCount = this.state.totalItemCount,
                
                commandBar =
                  this.props.commands && this.props.commands.length > 0  
                    ? this.createCommandBar(classes)
                    : null;

              return (
                <div className={this.props.className} style={{ boxSizing: 'border-box', height: '100%', ...this.props.style}}>
                  <div className={classes.dataNavigator}>
                    <div className={classes.header}>
                      {commandBar}
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
          onChange={ev => alert(JSON.stringify(ev))}
        />
      </HBox.Cell>
      <HBox.Cell flex={1} align="left" valign="middle" className={classes.pageSizeSelector}>
          <PageSizeSelector value={pageSize} onChange={ev => alert(JSON.stringify(ev))}/>
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
