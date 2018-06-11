import React from 'react';
import { defineComponent } from 'js-widgets';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react';


const styles = {
  pageSizeSelector: {
    display: 'table',
    whiteSpace: 'nowrap',
  },

  cell: {
    display: 'table-cell',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle',
  }
};

export default defineComponent({
  displayName: 'PageSizeSelector',

  main: ({  }) => {
    return (
      <div style={styles.pageSizeSelector}>
        <div style={styles.cell}>
          <label>
            Items/Page: &nbsp;
          </label>
        </div>
        <div style={styles.cell}>
          <Dropdown
            selectedKeys={[50]}

            options={[
              { key: 10, text: '10' },
              { key: 25, text: '25' },
              { key: 50, text: '50' },
              { key: 100, text: '100' },
              { key: 250, text: '250' },
              { key: 500, text: '500' },
            ]}
          />
        </div>
      </div>
    );
  }
});
