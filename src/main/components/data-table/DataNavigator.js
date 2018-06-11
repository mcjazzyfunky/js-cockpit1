import React from 'react';
import { defineComponent } from 'js-widgets';
import HBox from '../layout/HBox';
import VBox from '../layout/VBox';
import Paginator from '../pagination/Paginator';
import PageSizeSelector from '../pagination/PageSizeSelector';
import PaginationInfo from '../pagination/PaginationInfo';
import DataTable from '../data-table/DataTable';

import Css from '../styling/Css';

function getStyles({ theme }) {
  return {
    paginationBar: {
      backgroundColor: '#eee',
      padding: '0.4rem 0.75rem'
    },

    pageSizeSelector: {
      padding: '0 3rem'
    }
  };
}

export default defineComponent({
  displayName: 'DataNavigator',

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
                <VBox height="100%">
                  <VBox.Cell flex={1}>
                    <DataTable />
                  </VBox.Cell>
                  <VBox.Cell flex={0}>
                    {createPaginationBar(pageIndex, pageSize, totalItemCount, classes)}
                  </VBox.Cell>
                </VBox>
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
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItemCount={totalItemCount}
        />
      </HBox.Cell>
    </HBox>
  );
}