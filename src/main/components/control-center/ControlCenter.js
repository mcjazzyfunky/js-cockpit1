import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { Spec } from 'js-spec';
import Color from 'color';

import Css from '../styling/Css';
import DataNavigator from '../data-table/DataNavigator';

function getStyles({ theme }) {
  console.log(theme);

  return {
    controlCenter: {
      position: 'absolute',
      display: 'table',
      width: '100%',
      height: '100%',
      top: '0',
      bottom: '0',
      padding: '0',
      margin: '0'
    },

    header: {
      display: 'table-row',
      padding: 0,
      height: '2.75rem',
      overflow: 'hidden'
    },

    brand: {
      display: 'table-cell',
      color: 'white',
      background: theme.palette.themePrimary,
      whiteSpace: 'nowrap',
      textAlign: 'left',
      verticalAlign: 'middle',
      padding: '0 1rem 0 1rem',
    },

    toolbar: {
      display: 'table-cell',
      padding: 0,
      height: '2.75rem',
      width: '100%',
      overflow: 'hidden',
      color: 'white',
      background: Color(theme.palette.themePrimary).lighten(0.1).string(),
      textAlign: 'right',
      verticalAlign: 'middle',
    },

    user: {
      display: 'table',
      padding: 0,
      float: 'right'
    },

    userAvatar: {
      display: 'table-cell',
      padding: '2px 5px',
      verticalAlign: 'middle',
      fontSize: '1.25rem'
    },

    userName: {
      display: 'table-cell',
      fontSize: '1rem',
      padding: '0 1rem 0 0.5rem',
      verticalAlign: 'middle'
    },

    logout: {
      display: 'table-cell',
      color: 'white',
      height: '2.75rem',
      padding: '0 1rem',
      background: 'none',
      fontSize: '1.25rem',
      verticalAlign: 'middle',
      borderStyle: 'solid',
      borderWidth: '0 0 0 1px',
    },

    content: {
      display: 'table-row',
      width: '100%',
      height: '100%',
      border: '2px solid white'
    },

    sidebar: {
      display: 'table-cell',
      position: 'relative',
      verticalAlign: 'top'
    },

    center: {
      display: 'table-cell',
      padding: '1rem 2rem',
      verticalAlign: 'top'
    }
  };
}

export default defineComponent({
  displayName: 'ControlCenter',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    brand: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    },

    user: {
      constraint:
        Spec.shape({
          name: Spec.string
        }),

      nullable: true,
      defaultValue: null
    },

    sidebar: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    },

    onLogout: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: ({ brand, user, sidebar, onLogout}) => {
    return (
      <Css getStyles={getStyles}>
        {classes => 
          <div className={classes.controlCenter}>
            <div className={classes.header}>
              <div className={classes.brand}>{brand}</div>
              <div className={classes.toolbar}>
                {
                  !user
                    ? null
                    : <div className={classes.user}>
                        <div className={classes.userAvatar}>
                          <i className="icon ion-md-person"/>
                        </div>
                        <div className={classes.userName}>
                          Jane Doe
                        </div>
                        <div className={classes.logout}>
                          <i className="icon ion-md-power"></i>
                        </div>
                      </div>
                }
              </div>
            </div>
            <div className={classes.content}>
              { sidebar
                  ? <div className={classes.sidebar}>{sidebar}</div>
                  : null
              }
              {
                sidebar
                  ? <div className={classes.center}>
                      <DataNavigator/>
                    </div>
                  : null
              }
            </div>
          </div>
        }
      </Css>
    );
  }
});

// --- locals -------------------------------------------------------
