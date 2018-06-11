import React from 'reacrt';
import { defineComponent, isNodeOfType } from 'js-surface';

const Paper = defineComponent({
  displayName: 'Page',
  
  properties: {
    children: {
      constraint: it => isNodeOfType([Paper.Header, Paper.Body, Paper.Footer], it),
      nullable: true,
      defaultValue: null
    }
  },

  main({ children }) {
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

Paper.Header = defineComponent({
  displayName: 'Paper.Header',

  main() {
    throw new Error('Paper.Header can only be used as child of component Paper');
  }
});

Paper.Body = defineComponent({
  displayName: 'Paper.Body',

  main() {
    throw new Error('Paper.Body can only be used as child of component Paper');
  }
});

Paper.Footer = defineComponent({
  displayName: 'Paper.Footer',

  main() {
    throw new Error('Paper.Footer can only be used as child of component Paper');
  }
});

export default Paper;
