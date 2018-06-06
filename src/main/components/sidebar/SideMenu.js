import React from 'react';
import { defineComponent } from 'js-widgets';
import { Icon, List } from 'antd';

import { Seq } from 'js-seq';
import { Spec } from 'js-spec';

import './SideMenu.less';

export default defineComponent({
  displayName: 'SideMenu',

  properties: {
    title: {
      type: String
    },

    menu: {
      type: Object,
      constraint:
        Spec.arrayOf(
          Spec.shape({
            title:
              Spec.string
          }))
    },

    activeId: {
      type: String,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    render() {
      const { title: mainMenuTitle, menu: mainMenu } = this.props;

      return (
        <div className="aw-side-menu">
          <div className="aw-side-menu__category-selector">
            <div className="aw-side-menu__category-back-icon"><Icon type="left"/></div>
            <div className="aw-side-menu__category-title">{mainMenuTitle}</div>
          </div>
          <div className="aw-side-menu__list-container">
            {
              Seq.from(mainMenu).map(item => 
                <div className="aw-side-menu__main-category">
                  <div>
                      {item.title}
                  </div>
                  <div className="aw-side-menu__main-category-arrow">
                    <Icon type="right"/>
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