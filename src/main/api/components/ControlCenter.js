import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { Spec } from 'js-spec';
import { withStyles } from '@material-ui/core';
import Color from 'color';

const styles = theme => (console.log(theme) || {
  controlCenter: {
    display: 'table',
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
  },

  header: {
    display: 'table-row'
  },

  content: {
    display: 'table-row',
    height: '100%'
  },

  brand: {
    display: 'table-cell',
    color: theme.palette.primary.contrastText,
    backgroundColor: Color(theme.palette.primary.main).darken(0.08).toString(),
    whiteSpace: 'nowrap',
    padding: '2px 5px'
  },

  toolbar: {
    display: 'table-cell',
    backgroundColor: theme.palette.primary.main
  },

  sidebar: {
    display: 'table-cell',
    height: '100%'
  },

  center: {
    display: 'table-cell',
    height: '100%',
    width: '100%'
  }
});

const ControlCenterComponent = defineComponent({
  displayName: 'ControlCenter',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    classes: {
      type: Object
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

    onLogout: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: ({ brand, user, classes, onLogout}) => {
    return (
      <div className={classes.controlCenter}>
        <div className={classes.header}>
          <div className={classes.brand}>{brand}</div>
          <div className={classes.toolbar}>North</div>
        </div>
        <div className={classes.content}>
          <div className={classes.sidebar}>West</div>
          <div className={classes.center}>Center</div>
        </div>
      </div>
    );
  }
});

export default withStyles(styles)(ControlCenterComponent);