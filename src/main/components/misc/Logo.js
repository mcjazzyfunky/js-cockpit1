import React from 'react';
import { defineComponent, isNode } from 'js-widgets';

import './Logo.scss';

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

  main: ({ icon, vendor, title }) => {
    let content = [];

    if (vendor) {
      content.push(
        <div key="vendor" className="aw-logo__vendor">
          {vendor}
        </div>);
    }

    if (title) {
      content.push(
        <div key="title" className="aw-logo__title">
          {title}
        </div>);
    }
    
    if (icon) {
      content =
        <div className="aw-logo__cells">
          <div className="aw-logo__cell-left">
            <div className="aw-logo__icon">
              {icon}
            </div>
          </div>
          <div className="aw-logo__cell-right">
            {content}
          </div>
        </div>;
    }


    return (
      <div className="aw-logo">
        {content}
      </div>
    );
  }
});
