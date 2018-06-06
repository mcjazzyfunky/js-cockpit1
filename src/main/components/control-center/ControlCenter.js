import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { Spec } from 'js-spec';

import { Icon } from 'antd';

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
      <div className="control-center">
        <div className="control-center__header">
          <div className="control-center__brand">{brand}</div>
          <div className="control-center__toolbar">
            {
              !user
                ? null
                : <div className="control-center__user">
                    <div className="control-center__user-icon">
                      <Icon type="user"/>
                    </div>
                    <div className="control-center__user-name">
                      Jane Doe
                    </div>
                    <button className="control-center__logout-button">
                      <Icon type="logout"/>
                    </button> 
                  </div>
            }
          </div>
        </div>
        <div className="control-center__content">
          { sidebar
              ? <div className="control-center__sidebar">{sidebar}</div>
              : null
          }
          {
            sidebar
              ? <div className="control-center__center">
                  DataNavigator
                </div>
              : null
          }
        </div>
      </div>
    );
  }
});

// --- locals -------------------------------------------------------
