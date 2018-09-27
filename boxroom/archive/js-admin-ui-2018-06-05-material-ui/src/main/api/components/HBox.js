import React from 'react';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import { defineComponent, isNode, isNodeOfType } from 'js-widgets';

const styles = {
};

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

  main: ({ children }) => {
    const cells = React.Children.toArray(children);

    return (
      Seq.from(cells).map(cell => cell.props.children)
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
    throw new Error('HBox.Cell can only be used as child of HBox');
  } 
});

export default HBox;
