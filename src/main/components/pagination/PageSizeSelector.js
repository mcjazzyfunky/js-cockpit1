import React from 'react';
import { defineComponent } from 'js-widgets';
import { DefaultButton } from 'office-ui-fabric-react';


const styles = {
  pageSizeSelector: {
    display: 'table',
  },

  pageText: {
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
  },

  cell: {
    display: 'table-cell',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
};

export default defineComponent({
  displayName: 'PageSizeSelector',

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

  main: ({ className, style }) => {
    return (
      <div className={className} style={style}>
        <div style={styles.pageSizeSelector}>
          <div style={styles.cell}>
            <label>
              Items/Page: &nbsp;
            </label>
          </div>
          <div style={styles.cell}>
            <DefaultButton
              text={
                <div style={styles.pageText}>
                  50
                </div>
              } 

              menuProps={{
                items: [
                  { key: 10, text: '10' },
                  { key: 25, text: '25' },
                  { key: 50, text: '50' },
                  { key: 100, text: '100' },
                  { key: 250, text: '250' },
                  { key: 500, text: '500' },
                ]
              }}
            />
          </div>
        </div>
      </div>
    );
  }
});
