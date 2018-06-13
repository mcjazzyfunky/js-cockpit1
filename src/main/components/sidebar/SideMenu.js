import React from 'react';
import { defineComponent } from 'js-widgets';
import { Seq } from 'js-seq';
import { Spec } from 'js-spec';

import Css from '../styling/Css';

function getStyles({ theme }) {
  return {
    sideMenu: {
      display: 'grid',
      gridTemplateColumns: '0fr 1fr',
    },

    itemsMenu: {
      display: 'table',
      width: '100%',
      marginTop: '0.5rem',
    },

    itemsMenuItem: {
      cursor: 'pointer',

      selectors: {
        ':hover': {
          color: theme.palette.themePrimary,
          backgroundColor: '#eee',
        }
      }
    },

    'itemsMenuItem:hover': {
    },

    itemsMenuActiveItem: {
      color: theme.palette.themePrimary,
      backgroundColor: '#eee',
      borderWidth: '0 0 0 3px',
      borderColor: theme.palette.themePrimary,
      borderStyle: 'solid',
    },

    itemsMenuIcon: {
      display: 'table-cell',
      padding: '0.5rem 0 0.5em 0.75rem'
    },

    itemsMenuText: {
      display: 'table-cell',
      padding: '0.5rem 0.75rem',
      fontSize: '1rem',
    }
  };
}

const
  specId = Spec.or(Spec.integer, Spec.string),

  specItem =
    Spec.shape({
      id: specId,
      title: Spec.string
    }),

  specItems =
    Spec.shape({
      type: Spec.is('items'),
      items: Spec.nullableOptional(Spec.arrayOf(specItem))
    }),

  specItemGroups =
    Spec.shape({
      type: Spec.is('itemGroups'),
      itemGroups:
        Spec.arrayOf(
          Spec.shape({
            id: Spec.or(Spec.integer, Spec.string),
            title: Spec.string,
            items: Spec.nullableOptional(Spec.arrayOf(specItem))
          }))
    }),

  menuSpec =
    Spec.and(
      Spec.prop('type',
        Spec.oneOf('items', 'itemGroups')),

      Spec.or(
        {
          when: it => it.type === 'items',
          check: specItems
        },
        {
          when: it => it.type === 'itemGroups',
          check: specItemGroups
        },
    ));

export default defineComponent({
  displayName: 'SideMenu',

  properties: {
    title: {
      type: String
    },

    menu: {
      type: Object,
      constraint: menuSpec
    },

    activeItemId: {
      constraint: Spec.or(Spec.integer, Spec.string),
      nullable: true,
      defaultValue: null
    },

    onSelect: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Css getStyles={getStyles}>
          {
            classes => {
              let ret = null;

              const menuType = this.props.menu.type;

              switch (menuType) {
                case 'items':
                  ret = createItemsMenu(this.props, classes);
              }

              return ret;
            }
          }
        </Css>
      );
    }
  }
});

// --- locals -------------------------------------------------------

function createItemsMenu({ title, menu, activeItemId = null, onSelect }, classes) {
  const
    items = Array.from(menu.items),

    hasIcons = items.some(it => !!it.icon),

    createClickHandler =
      !onSelect
        ? () => null
        : id => () => onSelect({ type: 'select', selection: id }),

    itemBoxes =
      items.map(item => {
        const
          className =
            !!activeItemId && item.id === activeItemId
              ? classes.itemsMenuActiveItem
              : classes.itemsMenuItem,

          iconDiv =  
            hasIcons
              ? <div className={classes.itemsMenuIcon}>
                  {item.icon}
                </div>
              : null;
            
        return (
          <div key={item.id} className={className} onClick={createClickHandler(item.id)}>
            {iconDiv}
            <div className={classes.itemsMenuText}>
              {item.title}
            </div>
          </div>
        );
      });

  return (
    <div className={classes.itemsMenu}>
      { itemBoxes }
    </div>
  );
}