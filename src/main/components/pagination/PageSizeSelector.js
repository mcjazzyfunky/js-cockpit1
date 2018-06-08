import React from 'react';
import { defineComponent } from 'js-widgets';
import { Select } from 'antd';

export default defineComponent({
  displayName: 'PageSizeSelector',

  main: ({  }) => {
    return (
      <div style={{ display: 'inline-block' }}>
        <label>
          Items/Page: &nbsp;
          <Select value={100}>
            <Select.Option key="10">
              10
            </Select.Option>
            <Select.Option key="25">
              25
            </Select.Option>
            <Select.Option key="50">
              50
            </Select.Option>
            <Select.Option key="100">
              100
            </Select.Option>
            <Select.Option key="250">
              250
            </Select.Option>
            <Select.Option key="500">
              500
            </Select.Option>
          </Select>
         </label>
      </div>
    );
  }
});
