import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { TextField } from 'office-ui-fabric-react';

import FormCtx from './FormCtx';
import FormMgr from './FormMgr';

export default defineComponent({
  displayName: 'TextField',

  properties: {
    name: {
      type: String,
      constraint: Spec.match(/[a-zA-Z][a-zA-Z0-9_-]*/), 
      nullable: true,
      defaultValue: null
    },

    type: {
      type: String,
      constraint: Spec.oneOf('text', 'password'),
      defaultValue: 'text'
    },

    label: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    value: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    defaultValue: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    errorMessage: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    autoComplete: {
      type: String,
      constraint: Spec.oneOf('on', 'off'),
      defaultValue: 'off'
    },

    form: {
      type: FormMgr,
      nullable: true,
      defaultValue: null,
      inject: FormCtx
    }
  },

  main(props) {
    let errorMsg = props.errorMessage || null;

    if (errorMsg === null && props.form && props.name) {
      const formErrorMsg = props.form.getMessageByField(props.name);
      
      if (formErrorMsg) {
        errorMsg = formErrorMsg;
      }
    }

    const
      convertedProps = {
        name: props.name,
        type: props.type,
        label: props.label,
        errorMessage: errorMsg,
        autoComplete: props.autoComplete
      };

    if (props.defaultValue !== undefined && props.defaultValue !== null) {
      convertedProps.defaultValue = props.defaultValue;
    }
    
    if (props.value !== undefined && props.value !== null) {
      convertedProps.value = props.value;
    }

    if (props.form && props.name) {
      convertedProps.onChanged = value => {
        props.form.markTouchedByField(props.name);
        props.form.setValueByField(props.name, value);
      };
    
      convertedProps.onFocus = () => {
        props.form.setSuppressValidationByField(props.name, true);
      },

      convertedProps.onBlur = () => {
        props.form.setSuppressValidationByField(props.name, false);
        props.form.validate(true);
      };
    }

    return (
      <TextField
        {...convertedProps}
      />
    );
  }
});
