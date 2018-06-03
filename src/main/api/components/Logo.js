import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  logo: {
    display: 'grid',
    gridTemplateAreas: `
      "icon vendor"
      "icon title"
    `,
    gridTemplateColumns: '40px',
    gridGap: '0 0',
    width: 200,
    height: 40
  },

  icon: {
    gridArea: 'icon',
    alignSelf: 'center'
  },

  vendor: {
    gridArea: 'vendor',
    fontSize: '12px',
    padding: 0
  },

  title: {
    gridArea: 'title',
    fontSize: '16px',
    padding: 0
  }
};

const LogoComponent = defineComponent({
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

    classes: {
      type: Object
    }
  },

  main: ({ icon, vendor, title, classes }) => {
    const
      cells = [];

    if (icon) {
      cells.push(
        <div key="icon" className={classes.icon}>
          {icon}
        </div>);
    }

    if (vendor) {
      cells.push(
        <div key="vendor" className={classes.vendor}>
          {vendor}
        </div>);
    }

    if (title) {
      cells.push(
        <div key="title" className={classes.title}>
          {title}
        </div>);
    }

    return (
      <div className={classes.logo}>
        {cells}
      </div>
    );
  }
});

export default withStyles(styles)(LogoComponent);
