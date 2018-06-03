import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { Spec } from 'js-spec';
import { withStyles, Menu, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/icons/AccountCircle';
import Color from 'color';

import DataNavigator from './DataNavigator';

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
    backgroundColor: Color(theme.palette.primary.main).darken(0.08).string(),
    whiteSpace: 'nowrap',
    padding: '4px 8px 2px 8px'
  },

  toolbar: {
    display: 'table-cell',
    backgroundColor: theme.palette.primary.main
  },

  userMenu: {
    position: 'relative',
    float: 'right',
    color: theme.palette.primary.contrastText,
    padding: '2px 12px 2px 30px',
    fontSize: 14,
    vertialAlign: 'middle'
  },

  sidebar: {
    display: 'table-cell',
    height: '100%',
    backgroundColor: Color(theme.palette.background.default).darken(0.03).string(),
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: '#d4d4d4'
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

  main: ({ brand, user, sidebar, classes, onLogout}) => {
    return (
      <div className={classes.controlCenter}>
        <div className={classes.header}>
          <div className={classes.brand}>{brand}</div>
          <div className={classes.toolbar}>
            {
              !user
                ? null
                : <div className={classes.userMenu}>
                    <UserMenu user={user} classes={classes}/>
                  </div>
            }
          </div>
        </div>
        <div className={classes.content}>
          { sidebar
              ? <div className={classes.sidebar}>{sidebar}</div>
              : null
          }
          <div className={classes.center}>
            <DataNavigator />
          </div>
        </div>
      </div>
    );
  }
});

export default withStyles(styles)(ControlCenterComponent);

// --- locals -------------------------------------------------------

const UserMenu = defineComponent({
  displayName: 'UserMenu',

  properties: {
    user: {
      type: Object
    },

    classes: {
      type: Object
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);

      this.onUserLinkClick = this.onUserLinkClick.bind(this);
      this.onMenuClose = this.onMenuClose.bind(this);
      this.userLinkRef = null;
    }

    onUserLinkClick(ev) {
      this.userLinkRef = ev.target;
      this.forceUpdate();
    }

    onMenuClose() {
      this.userLinkRef = null;
      this.forceUpdate();
    }

    render() {
      const { user, classes } = this.props;

      return (
        <div className={classes.userMenu}>
          <div>
            <Avatar style={{ position: 'absolute', bottom: 0, left: 0 }}/>
            <a onClick={this.onUserLinkClick}>{user.name}</a>
            <Menu open={Boolean(this.userLinkRef)} onClose={this.onMenuClose} anchorEl={this.userLinkRef}>
              <MenuItem>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      );
    }
  }
});
