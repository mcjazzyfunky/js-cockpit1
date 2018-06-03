import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';


export default defineComponent({
  displayName: 'ControlCenter',

  properties: {
    vendor: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    title: {
      type: String,
      defaultValue: 'Control Center'
    },

    logo: {
      constraint:
        Spec.shape({
          icon: Spec.string,
          alt: Spec.optional(Spec.string)
        }),

      nullable: true,
      defaultValue: null
    },

    user: {
      constraint:
        Spec.shape({
          name: Spec.string
        }),

      nullable: true,
      defaultValue: null
    },

    onLogout: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: class extends React.Component {
    render() {
      return <div>Control-Center</div>;
    }
  }
});
