import React from 'react';
import { defineComponent } from 'js-widgets';

import HBox from './HBox';
import Paginator from './Paginator';

export default defineComponent({
  displayName: 'DataNavigator',

  main: class extends React.Component {
    render() {
      return (
        <div style={{ padding: '14px', width: '100%', height: '100%' }}>

          <HBox>
            <HBox.Cell key={3}>
              AAA
            </HBox.Cell>
            <HBox.Cell>
              BBB
            </HBox.Cell>
          </HBox>

          { // <Paginator type="simple" pageIndex={24} pageSize={50} totalItemCount={1234} />
          }
         </div>
      );
    }
  }
});
