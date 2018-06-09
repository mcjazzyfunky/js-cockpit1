import React from 'react';
import { defineComponent, isNode, isNodeOfType } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import './VBox.scss';

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
          .usingHint('Must be children of type VBox'),

      nullable: true,
      defaultValue: null
    }
  },

  main: ({ width, height, className, children }) => {
    let sumFlex = 0;

    Seq.adjust(children).forEach(cell => {
      const flex = cell.props.flex;

      sumFlex += flex === undefined ? 1 : flex;
    });

    return (
      <div
        className={'vbox ' + className}
        style={{ width, height }}
      >
        {
          Seq.adjust(children).map((cell, key) => {
            const
              flex = cell.props.flex === undefined ? 1 : cell.props.flex,
              height = Math.floor(100 * flex / sumFlex) + '%',
              textAlign = cell.props.align === undefined ? 'auto' : cell.align,
              verticalAlign = cell.props.valign === undefined ? 'auto' : cell.valign,
              className = cell.props.className;

            return (
              <div
                className={'vbox__row ' + className}
                key={key}
                style={{ height }}
              >
                <div
                  className="vbox__cell"
                  style={{ textAlign, verticalAlign, height }}
                >
                  {cell.props.children}
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
