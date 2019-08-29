// external imports
import { Ref } from 'react'
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataTableProps from './types/DataTableProps'
import DataTableMethods from './types/DataTableMethods'
import renderDataTable from './view/renderDataTable'

// --- DataTable ----------------------------------------------------

const DataTable = component<DataTableProps, DataTableMethods>({
  displayName: 'DataTable',
  
  validate: Spec.checkProps({
    required: {
      data: Spec.arrayOf(Spec.object),

      columns:
        Spec.arrayOf(
          Spec.exact({
            title: Spec.string, 
            field: Spec.nullableOptional(Spec.string),
            align: Spec.optional(Spec.oneOf('start', 'center', 'end')),
            width: Spec.nullableOptional(Spec.positiveFloat),
            sortable: Spec.optional(Spec.boolean)
          }))
    },

    optional: {
      title: Spec.nullable(Spec.string),
      sortBy: Spec.nullable(Spec.string),
      sortDir: Spec.oneOf('asc', 'desc'),

      rowSelectionOption:
        Spec.nullable(
          Spec.exact({
            mode: Spec.oneOf('none', 'single', 'multi')
          })),

      onRowSelectionChange: Spec.function,
      onSortChange: Spec.function
    },
  }),

  render(props, ref) {
    return renderDataTable(props, ref)
  }
})

// --- exports ------------------------------------------------------

export default DataTable
