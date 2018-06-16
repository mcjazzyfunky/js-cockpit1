import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import Css from '../styling/Css';

function getStyles() {
  return {
    container: {
      display: 'table',
      margin: 0,
      padding: 0
    },

    icon: {
      fontSize: '1rem'
    },

    vendor: {
      fontSize: '0.75rem',
      padding: 0,
      margin: 0
    },

    title: {
      fontSize: '1.125rem',
      padding: 0,
      lineHeight: '1.25rem'
    },

    cells: {
      display: 'table-row'
    },

    cellLeft: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '0.25rem 0.5rem 0 0',
      overflow: 'hidden'
    },

    cellRight: {
      display: 'table-cell',
      padding: '0.125rem 0',
      textAlign: 'left',
      verticalAlign: 'middle'
    }
  };
}

export default defineComponent({
  displayName: 'Logo',

  properties: {
    icon: {
      constraint: isNode, 
      nullable: true,
      defaultValue: null
    },

    vendor: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    title: {
      type: String,
      nullable: true,
      defaultValue: null
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
    }
  },

  main: ({ icon, vendor, title, className, style }) => {
    return (
      <Css getStyles={getStyles}>
        {
          classes => {
            let
              leftContent = null,
              rightContent = null;

            if (vendor) {
              rightContent =
                <div key="vendor" className={classes.vendor}>
                  {vendor}
                </div>;
            }

            if (title) {
              const titleContent =
                <div key="title" className={classes.title}>
                  {title}
                </div>;

              if (!rightContent) {
                rightContent = titleContent;
              } else {
                rightContent =
                  <React.Fragment>
                    {rightContent}
                    {titleContent}
                  </React.Fragment>;
              }
            }
            
            if (icon) {
              leftContent =
                <div className={classes.icon}>
                  {icon}
                </div>;
            }

            return (
              <div className={className} style={style}>
                <div className={classes.container}>
                  <div className={classes.cells}>
                    <div className={classes.cellLeft}>
                      {leftContent}
                    </div>
                    <div className={classes.cellRight}>
                      {rightContent}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
      </Css>
    );
  }
});
