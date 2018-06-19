import React from 'react';
import { defineComponent, isNode } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import { CommandBar, Pivot, PivotItem } from 'office-ui-fabric-react';

import Css from '../styling/Css';


function getStyles({ theme }) {
  return {
    dataForm: {
    },

    part: {
      margin: '1rem 2rem 1rem 2rem',
    },

    partTitle: {
      fontWeight: 'bold',
      margin: '0 0 0.5rem 0',
    },

    tabContent: {
      margin: '1.5rem 1.5rem',
    },

    section: {
      width: '30rem',
      margin: '0 0 1rem 0',
    },

    sectionTitle: {
      fontWeight: 'bold',
      margin: '0 0 0.5rem 0',
    },

    field: {
      selectors: {
        '& > label': {
          width: '6rem',
          float: 'left',
          textAlign: 'end',
          padding: '0.5rem 0.5rem'
        },

        '& > div': {
          display: 'inline-block',
          margin: '0.25rem',
        }
      }
    }
  };
}

export default defineComponent({
  displayName: 'DataForm',

  properties: {
    title: {
      type: String,
      nullable: true,
      defaultValue: null
    },
    
    subtitle: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    commands: {
      type: Array,

      constraint:
        Spec.arrayOf(
          Spec.shape({
            key: Spec.string,
            text: Spec.string,
            icon: isNode
          })),

      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Css getStyles={getStyles}>
          {
            classes =>
              <div>
                {this.__createToolbar(classes)}
                {this.__createBody(classes)}
              </div>
          }
        </Css>
      );
    }

    __createToolbar() {
      let ret = null;

      const { title, subtitle, commands } = this.props;
   
      if (title || subtitle || commands && commands.length > 0) {

        const items = [];

        if (title) {
          items.push({
            key: '_title_',

            onRender() {
              return (
                <div>{title}</div>
              );
            }
          });
        }
        
        if (subtitle) {
          items.push({
            key: '_subtitle_',

            onRender() {
              return (
                <div>{subtitle}</div>
              );
            }
          });
        }

        if (commands) {
          commands.forEach(command => {
            items.push({
              key: command.key,
              text: command.text,
              icon: 'add'
            });
          });
        }

        ret =
          <CommandBar
            items={items}
          />;
      }

      return ret;
    }

    __createBody(classes) {
      let ret = null;
    
      const { parts } = this.props;

      if (parts && parts.length > 0) {
        const contents = [];

        for (let i = 0; i < parts.length; ++i) {
          const
            part = parts[i],
            partType = part.type;

          switch (partType) {
            case 'default':
              contents.push(this.__createDefaultPart(part, classes));
              break;

            case 'tabbed':
              contents.push(this.__createTabbedPart(part, classes));
              break;

            default:
              throw new Error('[DataForm] Illegal part type: ' + partType);
          }
        }


        ret = <div>{contents}</div>;
      }

      return ret;
    }

    __createDefaultPart(part, classes) {
      const
        { title, sections } = part,
        contents = [];

      if (sections) {
        for (let i = 0; i < sections.length; ++i) {
          const
            section = sections[i],
            sectionType = section.type;

          switch (sectionType) {
            case 'default':
              contents.push(this.__createDefaultSection(section, classes));
              break;

            default:
              throw new Error('[DataForm] Illegal section type: ' + sectionType);
          }
        }
      }


      return (
        <div className={classes.part}>
          <div className={classes.partTitle}>
            {title}
          </div>
          {contents}
        </div>
      );
    }

    __createTabbedPart(part, classes) {
      const pivotItems = [];

      for (let i = 0; i < part.tabs.length; ++i) {
        const
            tab = part.tabs[i],
            sections = tab.sections,
            contents = [];

        if (sections) {
          for (let i = 0; i < sections.length; ++i) {
            const
              section = sections[i],
              sectionType = section.type;

            switch (sectionType) {
              case 'default':
                contents.push(this.__createDefaultSection(section, classes));
                break;

              default:
                throw new Error('[DataForm] Illegal section type: ' + sectionType);
            }
          }
        }

        pivotItems.push(
          <PivotItem headerText={tab.title} className={classes.tabContent}>
            {contents}
          </PivotItem>
        );
      }

      return (
        <Pivot>{pivotItems}</Pivot>
      );
    }

    __createDefaultSection(section, classes) {
      const contents = [];

      if (section.fields) {
        for (let i = 0; i < section.fields.length; ++i) {
          const
            field = section.fields[i],
            fieldType = field.type;

          switch (fieldType) {
            case 'default':
              contents.push(this.__createDefaultField(field, classes));
              break;

            default:
              throw new Error('[DataField] Illegal field type: ' + fieldType);
          }
        }
      }
      
      return (
        <div className={classes.section}>
          <div className={classes.sectionTitle}>
            {section.title}
          </div>

          {contents}
        </div>
      );
    }

    __createDefaultField(field, classes) {
      return (
        <div className={classes.field}>
          <label>
            {field.label}
          </label>
          <div>
            {field.component}
          </div>
        </div>
      );
    }
  }
});
