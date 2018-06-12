import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';

import HBox from '../layout/HBox';
import Paginator from '../pagination/Paginator';
import PageSizeSelector from '../pagination/PageSizeSelector';
import PaginationInfo from '../pagination/PaginationInfo';
import DataTable from '../data-table/DataTable';

import Css from '../styling/Css';

function getStyles({ theme }) {
  return {
    dataNavigator: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    },

    paginationBar: {
      backgroundColor: '#eee',
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

export default defineComponent({
  displayName: 'DataNavigator',

  properties: {
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
    render() {
      const
        pageIndex = 3,
        pageSize = 100,
        totalItemCount = 1235;

      return (
        <Css getStyles={getStyles}>
          {
            classes => {
              return (
                <div className={this.props.className} style={{ boxSizing: 'border-box', height: '100%', ...this.props.style}}>
                  <div className={classes.dataNavigator}>
                    <div className={classes.header}>
                      <div style={{ fontSize: '18px', margin: '10px' }}>Customers</div>
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

                        selectionMode="multi"
                        onSelectionChanged={ (...args) => console.log(...args) }
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