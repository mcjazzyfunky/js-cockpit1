import React from 'react';
import { defineComponent } from 'js-widgets';

import { Seq } from 'js-seq';
import { Spec } from 'js-spec';

import './SideMenu.scss';

const
  specItem =
    Spec.shape({
      id: Spec.or(Spec.integer, Spec.string),
      title: Spec.string
    }),

  specItems =
    Spec.shape({
      type: Spec.is('items'),
      items: Spec.arrayOf(specItem)
    }),

  specItemGroups =
    Spec.shape({
      type: Spec.is('itemGroups'),
      itemGroups:
        Spec.arrayOf(
          Spec.shape({
            title: Spec.string,
            items: Spec.arrayOf(specItem)
          }))
    }),

  specCategories =
    Spec.shape({
      type: Spec.is('categories'),
      title: Spec.string,

      categories:
        Spec.arrayOf(
          Spec.shape({
            title: Spec.string,

            submenu:
              Spec.and(
                Spec.prop(['submenu', 'item'],
                  Spec.oneOf('item', 'itemsGroup')),
                
                  Spec.or(
                    {
                      when: submenu => submenu && submenu.type === 'items',
                      check: specItems
                    },
                    {
                      when: submenu => submenu && submenu.type === 'itemGroups',
                      check: specItemGroups
                    }))
          }))
    }),

  specCategoryGroups =
    Spec.shape({
      type: Spec.is('categoryGroups'),
      title: Spec.string,

      categories:
        Spec.arrayOf(
          Spec.shape({
            title: Spec.string,

            categoryGroups:
              Spec.arrayOf(
                Spec.shape({
                  title: Spec.string,

                  submenu:
                    Spec.or(
                      {
                        when:
                          submenu => submenu && submenu.type === 'items',

                        check:
                          specItems
                      },
                      {
                        when:
                          submenu => submenu && submenu.type === 'itemGroups',

                        check:
                          specItemGroups
                      })
                }))
          }))
    }),

  menuSpec =
    Spec.and(
      Spec.prop('type',
        Spec.oneOf('items', /*'itemGroups', 'categories', 'categoryGroups'*/)),

      Spec.or(
        {
          when: it => it.type === 'items',
          check: specItems
        },
        /*
        {
          when: it => it.type === 'itemGroups',
          check: specItemGroups
        },
        {
          when: it => it.type === 'categories',
          check: specCategories
        },
        {
          when: it => it.type === 'categoryGroups',
          check: specCategoryGroups
        }
        */
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
    }
  },

  main: class extends React.Component {
    render() {
      const { title: mainMenuTitle, menu } = this.props;

      return (
        <div className="aw-side-menu">
          <div className="aw-side-menu__category-selector">
            <div className="aw-side-menu__category-back-icon"></div>
            <div className="aw-side-menu__category-title">{mainMenuTitle}</div>
          </div>
          <div className="aw-side-menu__list-container">
            {
              Seq.from(menu.items).map((item, idx) => 
                <div key={idx} className="aw-side-menu__main-category">
                  <div>
                      {item.title}
                  </div>
                  <div className="aw-side-menu__main-category-arrow">
                    <i type="right"/>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      );
    }
  }
});