import React from 'react';
import { defineComponent, isNode } from 'js-widgets';

import FormMgr from './FormMgr';
import FormCtx from './FormCtx';
import formMgrConfigSpec from './formMgrConfigSpec';

export default defineComponent({
  displayName: 'Form',

  properties: {
    children: {
      constraint: isNode,
      nullable: true,
      defaultValue: null
    },

    validationConfig: {
      type: Object,
      constraint: formMgrConfigSpec,
      nullable: true,
      defaultValue: null
    },

    onSubmit: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.baseFormMgr = new FormMgr(props.validationConfig, () => this.__update());
      this.formMgr = this.baseFormMgr;
    }

    componentDidMount() {
      setInterval(() => this.forceUpdate(), 1000);
    }

    onSubmit(ev) {
      ev.preventDefault();

      if (this.formMgr.validate() && this.props.onSubmit) {
        this.props.onSubmit({
          type: 'submit',

          data: this.formMgr.getData()
        });
      }
    }

    validate() {
      this.formMgr.validate();
    }
    
    __update() {
      const f = () => {};
      f.prototype = this.baseFormMgr;
      this.formMgr = Object.create(f.prototype);
      this.forceUpdate();
    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <FormCtx.Provider value={this.formMgr}>
            {this.props.children}
          </FormCtx.Provider>
        </form>
      );
    }
  }
});
