import React from 'react';
import { defineComponent, isNodeOfType } from 'js-widgets';
import { Seq } from 'js-seq';
import { classNamesFunction, customizable } from 'office-ui-fabric-react';

const getClassNames = classNamesFunction();

function getStyles({ theme }) {
  const themePrimary = theme.palette.themePrimary;

  return {
    x: {
      border: `1px solid ${themePrimary}`
    }
  };
}

const CardBase = defineComponent({
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
    },

    theme: {
    }
  },

  main(props) {
    const { children, theme } = props;
    console.log('>>>>>>>>>>>>', theme)
    const classes = getClassNames(getStyles, { theme });

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
        <div className={classes.x}>
          <div>
            {header}
          </div>
          <div>
            {body}
          </div>
          <div>
            {footer} 
          </div>
        </div>
    );
  }
});

CardBase.propTypes.x = props => {
  console.log('!!!!!!!!!', props)
}

const Card = customizable('Card', ['theme'])(CardBase);
console.log(11111, Object.entries(CardBase))
console.log(22222, Object.entries(Card))
Card.propTypes = null;

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
