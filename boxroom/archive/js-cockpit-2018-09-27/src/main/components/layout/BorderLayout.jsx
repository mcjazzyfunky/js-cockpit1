import React from 'react';
import { defineComponent, isNode, isElementsOf } from 'js-scenery/react';
import { Seq } from 'js-seq';
import { Spec } from 'js-spec';

import Css from '../styling/Css';

function getStyles({ theme }) {
  return {
    borderLayout: {
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

const BorderLayout = defineComponent({
  displayName: 'BorderLayout',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: Spec.lazy(() => isElementsOf([
        BorderLayout.TopStart,
        BorderLayout.TopCenter,
        BorderLayout.TopEnd,
        BorderLayout.MiddleStart,
        BorderLayout.MiddleCenter,
        BorderLayout.MiddleEnd,
        BorderLayout.BottomStart,
        BorderLayout.BotttomCenter,
        BorderLayout.BottomEnd
      ])),

      nullable: true,
      defaultValue: null
    }
  },

  render: ({ children }) => {
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

              if (type === BorderLayout.TopStart) {
                topStart = content;
              } else if (type === BorderLayout.TopCenter) {
                topCenter = content;
              } else if (type === BorderLayout.TopEnd) {
                topEnd = content;
              } else if (type === BorderLayout.MiddleStart) {
                middleStart = content; 
              } else if (type === BorderLayout.MiddleCenter) {
                middleCenter = content;
              } else if (type === BorderLayout.MiddleEnd) {
                middleEnd = content;
              } else if (type === BorderLayout.bottomStart) {
                bottomStart = content;
              } else if (type === BorderLayout.bottomCenter) {
                bottomCenter = content;
              } else if (type === BorderLayout.bottomEnd) {
                bottomEnd = content;
              }
            });

            return (
              <div className={classes.borderLayout}>
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

BorderLayout.TopStart = defineComponent({
  displayName: 'BorderLayout.TopStart',

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

  render() {
    throw new Error('Components of type BorderLayout.TopStart can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.TopCenter = defineComponent({
  displayName: 'BorderLayout.TopCenter',

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

  render() {
    throw new Error('Components of type BorderLayout.TopCenter can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.TopEnd = defineComponent({
  displayName: 'BorderLayout.TopEnd',

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

  render() {
    throw new Error('Components of type BorderLayout.TopStart can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.MiddleStart = defineComponent({
  displayName: 'BorderLayout.MiddleStart',

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

  render() {
    throw new Error('Components of type BorderLayout.MiddleStart can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.MiddleCenter = defineComponent({
  displayName: 'BorderLayout.MiddleCenter',

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

  render() {
    throw new Error('Components of type BorderLayout.MiddleCenter can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.MiddleEnd = defineComponent({
  displayName: 'BorderLayout.MiddleEnd',

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

  render() {
    throw new Error('Components of type BorderLayout.MiddleEnd can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.BottomStart = defineComponent({
  displayName: 'BorderLayout.BottomStart',

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

  render() {
    throw new Error('Components of type BorderLayout.BottomStart can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.BottomCenter = defineComponent({
  displayName: 'BorderLayout.BottomCenter',

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

  render() {
    throw new Error('Components of type BorderLayout.BottomCenter can only be '
      + 'used as children of BorderLayout');
  }
});

BorderLayout.BottomEnd = defineComponent({
  displayName: 'BorderLayout.BottomEnd',

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

  render() {
    throw new Error('Components of type BorderLayout.BottomEnd can only be '
      + 'used as children of BorderLayout');
  }
});


export default BorderLayout;
