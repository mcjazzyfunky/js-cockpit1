import React from 'react';
import { defineComponent, isNodeOfType } from 'js-widgets';
import { Seq } from 'js-seq';
import Css from '../styling/Css';
import classNames from 'classnames';

function getStyles({ theme }) {
  const
    { palette } = theme,
    padding = '0.75rem 1rem';

  return {
    container: {
      backgroundColor: palette.white,
      border: `1px solid ${palette.neutralTertiary}`
    },

    header: {
      padding,
    },

    body: {
      padding,
    },

    footer: {
      padding,
    }
  };
}

const Card = defineComponent({
  displayName: 'Card',

  properties: {
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    children: {
      constraint: it => isNodeOfType([Card.Header, Card.Body, Card.Footer], it),
      nullable: true,
      defaultValue: null
    }
  },

  main({ children, className }) {
    const
      header = [],
      body = [],
      footer = [];

    Seq.adjust(children).forEach(child => {
      if (child) {
        switch (child.type) {
          case Card.Header:
            header.push(child.props.children || null );
            break;

          case Card.Body:
            body.push(child.props.children || null);
            break;

          case Card.Footer:
            footer.push(child.props.children || null);
            break;
        }
      }
    });

    return (
      <Css getStyles={getStyles}>
        {classes =>
          <div className={classNames(classes.container, className)}>
            <div className={classes.header}>
              {header}
            </div>
            <hr/>
            <div className={classes.body}>
              {body}
            </div>
            <div className={classes.footer}>
              {footer} 
            </div>
          </div>
        }
      </Css>
    );
  }
});

Card.Header = defineComponent({
  displayName: 'Card.Header',

  main() {
    throw new Error('Card.Header can only be used as child of component Card');
  }
});

Card.Body = defineComponent({
  displayName: 'Card.Body',

  main() {
    throw new Error('Card.Body can only be used as child of component Card');
  }
});

Card.Footer = defineComponent({
  displayName: 'Card.Footer',

  main() {
    throw new Error('Card.Footer can only be used as child of component Card');
  }
});

export default Card;


