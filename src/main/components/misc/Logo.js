import React from 'react';
import { defineComponent, isNode } from 'js-widgets';

import './Logo.less';

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
    const
      cells = [];

    if (icon) {
      cells.push(
        <div key="icon" className="logo__icon">
          {icon}
        </div>);
    }

    if (vendor) {
      cells.push(
        <div key="vendor" className="logo__vendor">
          {vendor}
        </div>);
    }

    if (title) {
      cells.push(
        <div key="title" className="logo__title">
          {title}
        </div>);
    }

    return (
      <div className="logo">
        {cells}
      </div>
    );
  }
});
