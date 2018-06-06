import React from 'react';
import { defineComponent, isNode, isNodeOfType } from 'js-widgets';
import { Spec } from 'js-spec';

import './VBox.less';

const VBox = defineComponent({
  displayName: 'VBox',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

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
        Spec.valid(it => isNodeOfType(VBox.Cell, it))
          .usingHint('Must be children of type HBox'),

      nullable: true,
      defaultValue: null
    }
  },

  main: ({ width, height, className, children }) => {
    let sumFlex = 0;

    React.Children(children).forEach(cell => {
      const flex = cell.flex;

      sumFlex += flex === undefined ? 1 : flex;
    });

    return (
      <div
        className={'vbox ' + className}
        style={{ width, height }}
      >
        {
          React.Children(children).map((cell, key) => { 
            const
              flex = cell.flex === undefined ? 1 : cell.flex,
              height = Math.floor(100 * flex / sumFlex) + '%',
              textAlign = cell.align === undefined ? 'auto' : cell.align,
              verticalAlign = cell.valign === undefined ? 'auto' : cell.valign,
              className = cell.className,
              children = cell.children;

            return (
              <div
                className={'vbox__row ' + className}
                key={key}
                style={{ height }}
              >
                <div
                  className="vbox-cell"
                  style={{ textAlign, verticalAlign, height }}
                >
                  {children}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
});

VBox.Cell = defineComponent({
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
    throw new Error('VBox.Cell can only be used as a child of VBox');
  } 
});

export default VBox;
