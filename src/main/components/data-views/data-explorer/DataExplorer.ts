// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { useStore } from 'js-react-store'
import { Spec } from 'js-spec'

// internal imports
import DataExplorerProps from './DataExplorerProps'
import DataExplorerView from './DataExplorerView'
import createStore from './createStore'

// --- DataExplorer ------------------------------------------------

const DataExplorer = defineComponent<DataExplorerProps>({
  displayName: 'DataExplorer',

  properties: {
    title: {
      type: String
    },

    loadData: {
      type: Function,
      required: true
    },

    columns: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.strictShape({
            kind: Spec.is('column'),
            title: Spec.string,
            field: Spec.optional(Spec.string),
            align: Spec.optional(Spec.oneOf('start', 'center', 'end')),
            sortable: Spec.optional(Spec.boolean),
            width: Spec.optional(Spec.integer)
          })
        )
    },

    actions: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.and(
            Spec.strictShape({
              kind: Spec.oneOf('general', 'singleRow', 'multiRow'),
              title: Spec.string,
              icon: Spec.optional(isNode)
            })))
    }
  },

  render(props) {
    const store = useStore(createStore)

    return DataExplorerView(props, store)
  }
}) 

// --- exports ------------------------------------------------------

export default DataExplorer
