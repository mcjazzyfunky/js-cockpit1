import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

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
  }
};

export default defineComponent({
  displayName: 'PageSizeSelector',

  properties: {
    value: {
      type: Number,

      constraint:
        Spec.positiveInteger
    },

    options: {
      type: Array,

      constraint:
        Spec.and(
          Spec.arrayOf(Spec.positiveInteger),
          Spec.unique),

      defaultValue:
        [10, 25, 50, 100, 250, 500]
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
    },

    onChange: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: ({ value, options, className, style, onChange }) => {
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
                  {value}
                </div>
              } 

              menuProps={{
                items:
                  Seq.from(options)
                    .map(it => ({
                      key: it,
                      text: String(it),
  
                      onClick:
                        !onChange
                          ? null
                          : () => onChange({ type: 'change', value: it })
                    }))
                    .toArray()
              }}
            />
          </div>
        </div>
      </div>
    );
  }
});
