import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Checkbox } from 'office-ui-fabric-react';

import FormCtx from '../form/FormCtx';
import FormMgr from '../form/FormMgr';

export default defineComponent({
  displayName: 'CheckBox',

  properties: {
    name: {
      type: String,
      constraint: Spec.match(/[a-zA-Z][a-zA-Z0-9_-]*/), 
      nullable: true,
      defaultValue: null
    },

    label: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    checked: {
      type: Boolean,
      defaultValue: undefined
    },

    defaultChecked: {
      type: Boolean,
      defaultValue: undefined
    },

    disabled: {
      type: Boolean,
      defaultValue: false
    },

    form: {
      type: FormMgr,
      nullable: true,
      defaultValue: null,
      inject: FormCtx
    },

    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    style: {
      type: Object,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);

      this.__onChange = this.__onChange.bind(this);

      if (props.name && props.form) {
        const value =
          typeof props.checked === 'boolean'
            ? props.checked
            : Boolean(props.defaultChecked);

        props.form.setValueByField(props.name, value);
      }
    }

    __onChange(_, value) {
      if (this.props.name && this.props.form) {
        this.props.form.setValueByField(this.props.name, value);
      }
    }

    render() {
      return (
        <div className={this.props.className} style={this.props.style}>
          <Checkbox
            label={this.props.label}
            onChange={this.__onChange}
            disabled={this.props.disabled}
          />
        </div>
      );
    }
  }
});
