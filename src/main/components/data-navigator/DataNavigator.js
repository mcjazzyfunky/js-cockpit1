import React from 'react';
import { defineComponent } from 'js-widgets';

import Paginator from '../pagination/Paginator';

import './DataNavigator.less';

export default defineComponent({
  displayName: 'DataNavigator',

  main: class extends React.Component {
    render() {
      return <Paginator type="advanced" pageIndex={2} totalItemCount={1234} pageSize={25}/>;
    }
  }
});
