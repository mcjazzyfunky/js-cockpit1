// external imports
import { Ref } from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataTableProps from './types/DataTableProps'
import DataTableMethods from './types/DataTableMethods'
import renderDataTable from './view/renderDataTable'

// --- DataTable ----------------------------------------------------

const DataTable = defineComponent<DataTableProps, DataTableMethods>({
  displayName: 'DataTable',

  properties: {
    title: {
      type: String,
      validate: Spec.nullable(Spec.string)
    },

    rowSelectionOptions: {
      type: Object,

      validate:
        Spec.nullable(
          Spec.exact({
            mode: Spec.oneOf('none', 'single', 'multi')
          })),

      defaultValue: { mode:  'none' }
    },

    sortBy: {
      type: String,
      nullable: true
    },

    sortDir: {
      type: String,
      validate: Spec.oneOf('asc', 'desc') 
    },

    data: {
      type: Array,
      required: true,
      validate: Spec.arrayOf(Spec.object),
    },

    columns: {
      type: Array,
      required: true,

      validate:
        Spec.arrayOf(
          Spec.exact({
            title: Spec.string, 
            field: Spec.nullableOptional(Spec.string),
            align: Spec.optional(Spec.oneOf('start', 'center', 'end')),
            width: Spec.nullableOptional(Spec.positiveFloat),
            sortable: Spec.optional(Spec.boolean)
          })
        ) 
    },

    onRowSelectionChange: {
      type: Function
    },

    onSortChange: {
      type: Function
    }
  },

  methods: ['unselectAllRows'],

  render(props, ref) {
    return renderDataTable(props, ref)
  }
})

// --- exports ------------------------------------------------------

export default DataTable
