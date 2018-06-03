import React from 'react';
import { defineComponent } from 'js-widgets';
import Paginator from './Paginator';

export default defineComponent({
  displayName: 'DataNavigator',

  main: class extends React.Component {
    render() {
      return (
        <div style={{ padding: '14px'}}>
          <Paginator type="simple" pageIndex={24} pageSize={50} totalItemCount={1234} />
         </div>
      );
    }
  }
});
