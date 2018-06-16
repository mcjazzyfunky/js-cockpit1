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
      display: 'flex',
      flexDirection: 'column',
    },

    top: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: 'red'
    },

    middle: {
      flexGrow: 1,
      display: 'flex',
      flexDiretion: 'row',
    },

    bottom: {
      display: 'flex',
      flexDirection: 'row',
    },

    topStart: {
    },

    topCenter: {
      flexGrow: 1
    },

    topEnd: {
    },

    middleStart: {
    },

    middleCenter: {
      flexGrow: 1,
    },

    bottomStart: {
    },

    bottomCenter: {
      flexGrow: 1
    },

    bottomEnd: {
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
        ControlCenter.TopStart,
        ControlCenter.TopCenter,
        ControlCenter.TopEnd,
        ControlCenter.MiddleStart,
        ControlCenter.MiddleCenter,
        ControlCenter.MiddleEnd,
        ControlCenter.BottomStart,
        ControlCenter.BotttomCenter,
        ControlCenter.BottomEnd
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
              topStart = null,
              topCenter = null,
              topEnd = null,
              middleStart = null,
              middleCenter = null,
              middleEnd = null,
              bottomStart = null,
              bottomCenter = null,
              bottomEnd = null;

            Seq.adjust(children).forEach(({ type, props }) => {
              const content =
                <div className={props.className} style={props.style}>
                  {props.children}
                </div>;

              if (type === ControlCenter.TopStart) {
                topStart = content;
              } else if (type === ControlCenter.TopCenter) {
                topCenter = content;
              } else if (type === ControlCenter.TopEnd) {
                topEnd = content;
              } else if (type === ControlCenter.MiddleStart) {
                middleStart = content; 
              } else if (type === ControlCenter.MiddleCenter) {
                middleCenter = content;
              } else if (type === ControlCenter.MiddleEnd) {
                middleEnd = content;
              } else if (type === ControlCenter.bottomStart) {
                bottomStart = content;
              } else if (type === ControlCenter.bottomCenter) {
                bottomCenter = content;
              } else if (type === ControlCenter.bottomEnd) {
                bottomEnd = content;
              }
            });

            return (
              <div className={classes.controlCenter}>
                <div className={classes.top}>
                  <div className={classes.topStart}>
                    {topStart}
                  </div>
                  <div className={classes.topCenter}>
                    {topCenter}
                  </div>
                  <div className={classes.topEnd}>
                    {topEnd}
                  </div>
                </div>

                <div className={classes.middle}>
                  <div className={classes.middleStart}>
                    {middleStart}
                  </div>
                  <div className={classes.middleCenter}>
                    {middleCenter}
                  </div>
                  <div className={classes.middleEnd}>
                    {middleEnd}
                  </div>
                </div>

                <div className={classes.bottom}>
                  <div className={classes.bottomStart}>
                    {bottomStart}
                  </div>
                  <div className={classes.bottomCenter}>
                    {bottomCenter}
                  </div>
                  <div className={classes.bottomEnd}>
                    {bottomEnd}
                  </div>
                </div>
              </div>
            );
          }
        }
      </Css>
    );
  }
});

ControlCenter.TopStart = defineComponent({
  displayName: 'ControlCenter.TopStart',

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
    throw new Error('Components of type ControlCenter.TopStart can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.TopCenter = defineComponent({
  displayName: 'ControlCenter.TopCenter',

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
    throw new Error('Components of type ControlCenter.TopCenter can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.TopEnd = defineComponent({
  displayName: 'ControlCenter.TopEnd',

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
    throw new Error('Components of type ControlCenter.TopStart can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.MiddleStart = defineComponent({
  displayName: 'ControlCenter.MiddleStart',

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
    throw new Error('Components of type ControlCenter.MiddleStart can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.MiddleCenter = defineComponent({
  displayName: 'ControlCenter.MiddleCenter',

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
    throw new Error('Components of type ControlCenter.MiddleCenter can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.MiddleEnd = defineComponent({
  displayName: 'ControlCenter.MiddleEnd',

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
    throw new Error('Components of type ControlCenter.MiddleEnd can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.BottomStart = defineComponent({
  displayName: 'ControlCenter.BottomStart',

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
    throw new Error('Components of type ControlCenter.BottomStart can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.BottomCenter = defineComponent({
  displayName: 'ControlCenter.BottomCenter',

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
    throw new Error('Components of type ControlCenter.BottomCenter can only be '
      + 'used as children of ControlCenter');
  }
});

ControlCenter.BottomEnd = defineComponent({
  displayName: 'ControlCenter.BottomEnd',

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
    throw new Error('Components of type ControlCenter.BottomEnd can only be '
      + 'used as children of ControlCenter');
  }
});


export default ControlCenter;
