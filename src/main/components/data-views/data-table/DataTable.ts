// external imports
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataTableProps from './DataTableProps'
import DataTableMethods from './DataTableMethods'
import DataTableColumnProps from './DataTableColumnProps'
import DataTableView from './DataTableView'

// --- DataTable.Column ---------------------------------------------

const Column = defineComponent<DataTableColumnProps>({
  displayName: 'DataTable.Column',

  properties: {
    title: {
      type: String,
      required: true
    },

    field: {
      type: String
    },

    align: {
      type: String,
      validate: Spec.oneOf('start', 'center', 'end')
    },

    sortable: {
      type: Boolean
    },

    width: {
      type: Number,
      defaultValue: 200
    }
  },

  render() {
    throw new Error(
      'Components of type DataTable.Column can only be used as children of '
        + 'DataTable components'
    )
  }
})

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
      validate: Spec.arrayOf(isElementOfType('Column'))
    },

    onRowSelectionChange: {
      type: Function
    },

    onSortChange: {
      type: Function
    }
  },

  methods: ['unselectAllRows'],

  render: DataTableView
})

// --- exports ------------------------------------------------------

export default Object.assign(DataTable, {
  Column
})
