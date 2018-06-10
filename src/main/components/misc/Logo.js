import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import Css from '../styling/Css';

function getStyles() {
  return {
    icon: {
      fontSize: '2rem',
      marginRight: '0.5rem',
      marginTop: '0.25rem'
    },

    vendor: {
      fontSize: '0.75rem',
      padding: 0,
      margin: 0
    },

    title: {
      fontSize: '1rem',
      padding: 0,
      lineHeight: '0.9rem'
    },

    cells: {
      display: 'table-row'
    },

    cellLeft: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle'
    },

    cellRight: {
      display: 'table-cell',
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
    }
  },

  main: ({ className, icon, vendor, title }) => {
    return (
      <Css getStyles={getStyles}>
        {classes => {
          let content = [];

          if (vendor) {
            content.push(
              <div key="vendor" className={classes.vendor}>
                {vendor}
              </div>);
          }

          if (title) {
            content.push(
              <div key="title" className={classes.title}>
                {title}
              </div>);
          }
          
          if (icon) {
            content =
              <div className={classes.cells}>
                <div className={classes.cellLeft}>
                  <div className={classes.icon}>
                    {icon}
                  </div>
                </div>
                <div className={classes.cellRight}>
                  {content}
                </div>
              </div>;
          }

          return (
            <div className={classes.container + ' ' + className}>
              {content}
            </div>
          );
        }
      }
    </Css>
    );
  }
});
