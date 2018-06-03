import React from 'react';
import { defineComponent } from 'js-widgets';
import { withStyles } from '@material-ui/core';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

const styles = {
  sideMenu: {
  },

  menuLevel1: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },

  titleLevel1: {
    fontSize: 14,
    backgroundColor: '#d8d8d8',
    padding: '10px 12px',
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: '#c8c8c8'
  },

  menuLevel2: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },

  itemLevel2: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: '#d4d4d4',
    padding: '8px 12px'
  },

  titleLevel2: {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.7
  },

  menuLevel3: {
    listStyleType: 'none',
    margin: 0,
    padding: '5px 10px'
  },

  titleLevel3: {
    fontSize: 12,
    padding: 2,
    opacity: 0.9
  }
};

const SideMenuComponent = defineComponent({
  displayName: 'SideMenu',

  properties: {
    menu: {
      type: Object,

      constraint:
        Spec.arrayOf(
          Spec.shape({
            title:
              Spec.string,

            items:
              Spec.arrayOf(
                Spec.shape({
                  title:
                    Spec.string,

                  items:
                    Spec.optional(
                      Spec.arrayOf(
                        Spec.shape({
                          id: Spec.or(Spec.string, Spec.number),
                          title: Spec.string
                        })))
                }))
          }))
    },

    classes: {
      type: Object
    }
  },

  main: class extends React.Component {
    render() {
      const { classes, menu } = this.props;

      return (
        <div className={classes.sideMenu}>
          <ul className={classes.menuLevel1}>
            <div className={classes.titleLevel1}>{menu[0].title}</div>
            {
              Seq.from(menu[0].items).map(menu => {
                return (
                  <li key={menu.title} className={classes.itemLevel2}>
                    <div className={classes.titleLevel2}>{menu.title}</div>
                    <ul className={classes.menuLevel3}>
                      {
                        Seq.from(menu.items).map(item =>
                          <li key={item.id} className={classes.itemLevel3}>
                            <div className={classes.titleLevel3}>
                              {item.title}
                            </div>
                          </li>)
                      }
                    </ul>
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    }
  }
});

export default withStyles(styles)(SideMenuComponent);