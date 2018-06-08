import React from 'react';
import { defineComponent } from 'js-widgets';
import HBox from '../layout/HBox';
import VBox from '../layout/VBox';
import Paginator from '../pagination/Paginator';
import PageSizeSelector from '../pagination/PageSizeSelector';
import PaginationInfo from '../pagination/PaginationInfo';
import DataTable from '../data-table/DataTable';

import './DataNavigator.less';


export default defineComponent({
  displayName: 'DataNavigator',

  main: class extends React.Component {
    render() {
      const
        pageIndex = 3,
        pageSize = 100,
        totalItemCount = 1235;

      return (
        <VBox height="400px">
          <VBox.Cell flex={1}>
            <DataTable />
          </VBox.Cell>
          <VBox.Cell flex={0}>
            <HBox>
              <HBox.Cell flex={0}>
                <Paginator
                  type="advanced"
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  totalItemCount={totalItemCount}
                />
              </HBox.Cell>
              <HBox.Cell flex={1} align="left">
                 <PageSizeSelector />
              </HBox.Cell>
              <HBox.Cell flex={0} align="right">
                <PaginationInfo
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  totalItemCount={totalItemCount}
                />
              </HBox.Cell>
            </HBox>
          </VBox.Cell>
        </VBox>
      );
    }
  }
});
