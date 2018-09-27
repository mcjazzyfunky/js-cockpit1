import React from 'react';
import { defineComponent } from 'js-scenery/react';
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
      margin: '0.5rem 0 0 0',
    },

    itemsMenuHeader: {
      display: 'block',
      padding: '0.6rem 1rem',
      margin: '-0.5rem 0 0.25rem 0',
      backgroundColor: '#d8d8d8',
      textAlign: 'center',
      fontSize: '0.8125em',
    },

    itemsMenuItem: {
      cursor: 'pointer',

      selectors: {
        ':hover': {
          color: theme.palette.themePrimary,
          backgroundColor: '#eee',
        },
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
    },
    
    itemGroupsMenu: {
      display: 'table',
      width: '100%',
      margin: '0.5rem 0 0 0',
    },

    itemGroupsMenuHeader: {
      display: 'block',
      padding: '0.6rem 1rem',
      margin: '-0.5rem 0 0.25rem 0',
      backgroundColor: '#d8d8d8',
      textAlign: 'center',
      fontSize: '0.8125',
    },

    itemGroupsMenuText: {
      fontSize: '0.8125rem', 
      fontWeight: 'bold',
      margin: '1rem 0.5rem 0.25rem 0.75rem',
      color: '#777',
    },

    itemGroupsMenuItem: {
      padding: '1px 0 1px 0.5rem',
      cursor: 'pointer',

      selectors: {
        ':hover': {
          color: theme.palette.themePrimary,
          backgroundColor: '#eee'
        }
      }
    },
    
    itemGroupsMenuActiveItem: {
      padding: '1px 0 1px 0.5rem',
      color: theme.palette.themePrimary,
      backgroundColor: '#eee',
      borderWidth: '0 0 0 3px',
      borderColor: theme.palette.themePrimary,
      borderStyle: 'solid',
    },
    
    itemGroupsMenuItemText: {
      fontSize: '0.935rem',
      margin: '0.25rem 0 0.25rem 1rem',
      color: '#555',
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
        <Css getStyles={getStyles} props={this.props}>
          {
            classes => {
              let ret = null;

              const menuType = this.props.menu.type;

              switch (menuType) {
                case 'items':
                  ret = createItemsMenu(this.props, classes);
                  break;

                case 'itemGroups':
                  ret = createItemGroupsMenu(this.props, classes);
                  break;
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
    header =
      title
        ? <div className={classes.itemsMenuHeader}>{title}</div> 
        : null,

    items = Array.from(menu.items),

    hasIcons = items.some(it => !!it.icon),

    createClickHandler =
      !onSelect
        ? () => null
        : id => () => onSelect({ type: 'select', selection: id }),

    itemBoxes =
      items.map(item => {
        const
          isActiveItem = !!activeItemId && item.id === activeItemId,
          onClick = isActiveItem ? null : createClickHandler(item.id),

          className =
            isActiveItem
              ? classes.itemsMenuActiveItem
              : classes.itemsMenuItem,

          iconDiv =  
            hasIcons
              ? <div className={classes.itemsMenuIcon}>
                  {item.icon}
                </div>
              : null;
            
        return (
          <div key={item.id} className={className} onClick={onClick}>
            {iconDiv}
            <div className={classes.itemsMenuText}>
              {item.title}
            </div>
          </div>
        );
      });

  return (
    <div className={classes.itemsMenu}>
      { header }
      { itemBoxes }
    </div>
  );
}

function createItemGroupsMenu({ title, menu, activeItemId, onSelect }, classes) {
  const
    header =
      title
        ? <div className={classes.itemGroupsMenuHeader}>{title}</div> 
        : null,

    itemGroups = Array.from(menu.itemGroups),

    hasIcons = itemGroups.some(
      itemGroup => itemGroup && Array.isArray(itemGroup.items)
        && itemGroup.items.some(item => item && item.icon)),

    createClickHandler =
      !onSelect
        ? () => null
        : id => () => onSelect({ type: 'select', selection: id }),

    itemGroupBoxes = itemGroups.map(itemGroup => {
      return (
        <div key={itemGroup.id}>
          <div className={classes.itemGroupsMenuText}>
            {itemGroup.title}
          </div>
          {
            Seq.from(itemGroup.items).map(item => {
              const
                isActive = !!activeItemId && item.id === activeItemId,
                onClick = isActive ? null : createClickHandler(item.id),

                className =
                  isActive 
                    ? classes.itemGroupsMenuActiveItem
                    : classes.itemGroupsMenuItem,

                iconDiv =  
                  hasIcons
                    ? <div className={classes.itemGroupsMenuIcon}>
                        {item.icon}
                      </div>
                    : null;
                  
              return (
                <div key={item.id} className={className} onClick={onClick}>
                  {iconDiv}
                  <div className={classes.itemGroupsMenuItemText}>
                    {item.title}
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    });

  return (
    <div className={classes.itemsMenu}>
      { header }
      { itemGroupBoxes }
    </div>
  );
}