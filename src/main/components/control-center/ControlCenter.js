import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { Spec } from 'js-spec';

import { Icon } from 'antd';

import DataNavigator from '../data-navigator/DataNavigator';


import './ControlCenter.less';

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
      <div className="aw-control-center">
        <div className="aw-control-center__header">
          <div className="aw-control-center__brand">{brand}</div>
          <div className="aw-control-center__toolbar">
            {
              !user
                ? null
                : <div className="aw-control-center__user">
                    <div className="aw-control-center__user-icon">
                      <Icon type="user"/>
                    </div>
                    <div className="aw-control-center__user-name">
                      Jane Doe
                    </div>
                    <button className="aw-control-center__logout-button">
                      <Icon type="logout"/>
                      <div className="aw-control-center__logout-text">Logout</div>
                    </button> 
                  </div>
            }
          </div>
        </div>
        <div className="aw-control-center__content" style={{ border: '1px', solid: 'green'}}>
          { sidebar
              ? <div className="aw-control-center__sidebar">{sidebar}</div>
              : null
          }
          {
            sidebar
              ? <div className="aw-control-center__center">
                </div>
              : null
          }
        </div>
      </div>
    );
  }
});

// --- locals -------------------------------------------------------
