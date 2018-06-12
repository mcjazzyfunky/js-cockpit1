import React from 'react';
import { defineComponent, isNode, isNodeOfType } from 'js-widgets';
import { Seq } from 'js-seq';
import { Spec } from 'js-spec';
import Color from 'color';

import Css from '../styling/Css';

function getStyles({ theme }) {
  const
    /*
    bgColor1 = theme.palette.themePrimary,

    bgColor2 =
      Color(theme.palette.themePrimary).lighten(0.1).string();
    */

    bgColor1 = Color(theme.palette.themePrimary).darken(0.05),
    bgColor2 = Color(theme.palette.themePrimary).darken(0.15);

  return {
    controlCenter: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '0fr 1fr 0fr',
      gridTemplateRows: '0fr 1fr 0fr',

      gridTemplateAreas: `
        'north-west north north-east'
        'west center center'
      `,
    },

    northWest: {
      gridArea: 'north-west',
      backgroundColor: 'purple',
      whiteSpace: 'nowrap',
      color: 'white',
      fill: 'white',
      background: bgColor1,
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center',
    },

    north: {
      gridArea: 'north',
      backgroundColor: 'green',
      whiteSpace: 'nowrap',
      color: 'white',
      fill: 'white',
      background: bgColor2,
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center',
    },

    northEast: {
      gridArea: 'north-east',
      backgroundColor: 'yellow',
      whiteSpace: 'nowrap',
      color: 'white',
      fill: 'white',
      background: bgColor2,
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center',
    },

    west: {
      gridArea: 'west',
      whiteSpace: 'nowrap',
      minWidth: '12rem',
      display: 'grid',
      width: '100%',
      height: '100%',
    },

    center: {
      gridArea: 'center',
      display: 'flex',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      boxSizing: 'border-box',
    }
  };
}

const ControlCenter = defineComponent({
  displayName: 'ControlCenter',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: Spec.lazy(() => isNodeOfType([
        ControlCenter.NorthWest,
        ControlCenter.North,
        ControlCenter.West,
        ControlCenter.center
      ])),

      nullable: true,
      defaultValue: null
    }
  },

  main: ({ children }) => {
    return (
      <Css getStyles={getStyles}>
        {
          classes => {
            let
              northWest = null,
              north = null,
              northEast = null,
              west = null,
              center = null;

            Seq.adjust(children).forEach(({ type, props }) => {
              const content =
                <div className={props.className} style={props.style}>
                  {props.children}
                </div>;

              if (type === ControlCenter.NorthWest) {
                northWest = content;
              } else if (type === ControlCenter.North) {
                north = content;
              } else if (type === ControlCenter.NorthEast) {
                northEast = content;
              } else if (type === ControlCenter.West) {
                west = content; 
              } else if (type === ControlCenter.Center) {
                center = content;
              }
            });

            return (
              <div className={classes.controlCenter}>
                <div className={classes.northWest}>
                  {northWest}
                </div>
                <div className={classes.north}>
                  {north}
                </div>
                <div className={classes.northEast}>
                  {northEast}
                </div>
                <div className={classes.west}>
                  {west} 
                </div>
                <div className={classes.center}>
                  {center}
                </div>
              </div>
            );
          }
        }
      </Css>
    );
  }
});

ControlCenter.NorthWest = defineComponent({
  displayName: 'ControlCenter.NorthWest',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    }
  },

  main() {
    throw new Error('Components of type ControlCenter.NorthWest can only be '
      + 'used as children of ControllCentral');
  }
});

ControlCenter.North = defineComponent({
  displayName: 'ControlCenter.North',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    }
  },

  main() {
    throw new Error('Components of type ControlCenter.North can only be '
      + 'used as children of ControllCentral');
  }
});

ControlCenter.NorthEast = defineComponent({
  displayName: 'ControlCenter.NorthEast',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    }
  },

  main() {
    throw new Error('Components of type ControlCenter.NorthWest can only be '
      + 'used as children of ControllCentral');
  }
});

ControlCenter.West = defineComponent({
  displayName: 'ControlCenter.West',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    }
  },

  main() {
    throw new Error('Components of type ControlCenter.West can only be '
      + 'used as children of ControllCentral');
  }
});

ControlCenter.Center = defineComponent({
  displayName: 'ControlCenter.Center',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    styles: {
      type: Object,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    }
  },

  main() {
    throw new Error('Components of type ControlCenter.Center can only be '
      + 'used as children of ControllCentral');
  }
});

export default ControlCenter;
