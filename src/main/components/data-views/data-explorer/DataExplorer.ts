// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { useStore } from 'js-stores/react'
import { Spec } from 'js-spec'

// internal imports
import DataExplorerProps from './types/DataExplorerProps'
import renderDataExplorer from './view/renderDataExplorer'
import createDataExplorerStore from './store/createDataExplorerStore'

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
          Spec.exact({
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
            Spec.exact({
              type: Spec.oneOf('default', 'singleRow', 'multiRow'),
              text: Spec.string,
              icon: Spec.optional(isNode)
            })))
    },

    search: {
      type: Object,
      validate: Spec.nullable(
        Spec.lazy(() =>
          Spec.or(
            {
              when: Spec.prop('type', Spec.is('default')),
              then: specDefaultSearch 
            },
            {
              when: Spec.prop('type', Spec.is('sections')),
              then: specFilterSections
            })))
    }
  },

  render(props) {
    const store = useStore(createDataExplorerStore)

    return renderDataExplorer(props, store)
  }
}) 

// --- locals -------------------------------------------------------

const specDefaultSearch = 
  Spec.exact({
    type: Spec.is('default'),
    
    basic:
      Spec.exact({
        type: Spec.is('fullText'),
        name: Spec.match(REGEX_NAME)
      }),
    
    advanced:
      Spec.exact({
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

const specFilterSections =
  Spec.exact({
    type: Spec.is('sections'),
    sections:
      Spec.arrayOf(
        Spec.exact({
          type: Spec.is('section'),
          title: Spec.string,
          contents: 
            Spec.arrayOf(
              Spec.exact({
                type: Spec.is('fieldSet'),
                title: Spec.string,
                fields: Spec.arrayOf(Spec.lazy(() => specTextFilter))
              }))
        })
      )
  })

const specTextFilter =
  Spec.exact({
    type: Spec.is('text'),
    name: Spec.match(REGEX_NAME),
    label: Spec.string
  })

// --- exports ------------------------------------------------------

export default DataExplorer
