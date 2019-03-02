// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { useStore } from 'js-react-store'
import { Spec } from 'js-spec'

// internal imports
import DataExplorerProps from './types/DataExplorerProps'
import renderView from './view/renderDataExplorer'
import createStore from './store/createStore'

// --- constants ---------------------------------------------------

const REGEX_NAME = /^[a-z][a-zA-Z0-9]+/

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
      required: true,

      validate:
        Spec.arrayOf(
          Spec.strictShape({
            type: Spec.is('column'),
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
      required: true,

      validate:
        Spec.arrayOf(
          Spec.and(
            Spec.strictShape({
              type: Spec.oneOf('general', 'singleRow', 'multiRow'),
              title: Spec.string,
              icon: Spec.optional(isNode)
            })))
    },

    search: {
      type: Object,

      validate:
        Spec.strictShape({
          type: Spec.is('default'),
          
          basic:
            Spec.strictShape({
              type: Spec.is('fullText'),
              name: Spec.match(REGEX_NAME)
            }),
          
          advanced:
            Spec.strictShape({
              type: Spec.is('filters'),
              
              filters:
                Spec.arrayOf(
                  Spec.and(
                    Spec.prop('type', Spec.oneOf('text')),
                  
                    Spec.or({
                      when: Spec.prop('type', Spec.is('text')),
                      then: Spec.lazy(() => specTextFilter)
                    })))
            })
        })
    }
  },

  render(props) {
    const store = useStore(createStore)

    return renderView(props, store)
  }
}) 

// --- specs of search filter ---------------------------------------

const specTextFilter =
  Spec.strictShape({
    type: Spec.is('text'),
    name: Spec.match(REGEX_NAME),
    label: Spec.string
  })

// --- exports ------------------------------------------------------

export default DataExplorer
