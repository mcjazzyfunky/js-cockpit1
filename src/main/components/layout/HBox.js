
import React from 'react';
import { defineComponent, isNode, isNodeOfType } from 'js-widgets';
import { Spec } from 'js-spec';
import classNames from 'classnames';

import './HBox.less';

const HBox = defineComponent({
  displayName: 'HBox',

  properties: {
    width: {
      type: String,
      nullable: true,
      defaultValue: '100%'
    },

    height: {
      type: String,
      nullable: true,
      defaultValue: '100%'
    },

    children: {
      constraint:
        Spec.valid(it => isNodeOfType(HBox.Cell, it))
          .usingHint('Must be children of type HBox'),

      nullable: true,
      defaultValue: null
    }
  },

  main: ({ height, width, children, className }) => {
    let sumFlex = 0;

    React.Children(children).forEach(cell => {
      const flex = cell.flex;

      sumFlex += flex === undefined ? 1 : flex;
    });

    return (
      <div
        className={classNames('aw-hbox', className)}
        style={{ width, height }}
      >
        <div
          className="aw-hbox__row"
          style={{ width, height }}
        >
          {
            React.Children(children).map((cell, key) => { 
              const
                flex = cell.flex === undefined ? 1 : cell.flex,
                width = Math.floor(100 * flex / sumFlex) + '%',
                height = cell.height === undefined ? '100%' : cell.height,
                textAlign = cell.align === undefined ? 'auto' : cell.align,
                verticalAlign = cell.valign === undefined ? 'auto' : cell.valign,
                className = cell.className,
                children = cell.children;

              return (
                <div
                  className={'aw-hbox__cell ' + className }
                  key={key}
                  style={{ textAlign, verticalAlign, width, height }}
                >
                  {children}
                </div>);
            })
          }
        </div>
      </div>
    );
  }
});

HBox.Cell = defineComponent({
  displayName: 'HBox.Cell',

  properties: {
    flex: {
      type: Number,
      constraint: Spec.optional(Spec.nonnegativeInteger),
      nullable: true,
      defaultValue: null 
    },
  
    align: {
      type: String,

      constraint:
        Spec.optional(
          Spec.oneOf('left', 'center', 'right')),
      defaultValue: 'center'
    },
    
    valign: {
      type: String,

      constraint:
        Spec.optional(
          Spec.oneOf('top', 'middle', 'bottom')),
      
      defaultValue: 'middle'
    },

    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },
    
    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    }
  },

  main: () => {
    throw new Error('HBox.Cell can only be used as a child of HBox');
  } 
});

export default HBox;
