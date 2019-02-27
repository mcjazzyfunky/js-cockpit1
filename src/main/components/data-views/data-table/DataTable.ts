// external imports
import { Ref } from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataTableProps from './DataTableProps'
import DataTableMethods from './DataTableMethods'
import DataTableView from './DataTableView'

// --- DataTable ----------------------------------------------------

const DataTable = defineComponent<DataTableProps, DataTableMethods>({
  displayName: 'DataTable',

  properties: {
    title: {
      type: String
    },

    rowSelectionOptions: {
      type: Object,

      validate:
        Spec.strictShape({
          mode: Spec.oneOf('none', 'single', 'multi')
        }),

      defaultValue: { mode:  'none' }
    },

    sortBy: {
      type: String,
      nullable: true
    },

    sortDesc: {
      type: Boolean
    },

    data: {
      type: Array,
      validate: Spec.arrayOf(Spec.object)
    },

    columns: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.strictShape({
            title: Spec.string, 
            field: Spec.optional(Spec.string),
            align: Spec.optional(Spec.oneOf('start', 'center', 'end')),
            width: Spec.optional(Spec.positiveFloat),
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
    return DataTableView(props, ref)
  }
})

// --- exports ------------------------------------------------------

export default DataTable
