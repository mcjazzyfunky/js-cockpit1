// internal imports
import PageSizeSelectorRenderer from './PageSizeSelectorRenderer'
import ActionEvent from '../../events/ActionEvent'

// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'
import { emitKeypressEvents } from 'readline';

// --- constants ----------------------------------------------------

const PAGE_SIZE_OPTIONS = [25, 50, 100, 250, 500]

// --- PageSizeSelector ---------------------------------------------

type PageSizeSelectorProps = {
  pageSize: number,
  onAction?: (event: ActionEvent<number>) => void
}

const PageSizeSelector = defineComponent<PageSizeSelectorProps>({
  displayName: 'PageSizeSelector',

  properties: {
    pageSize: {
      type: Number,
      required: true,
      validate: Spec.in(PAGE_SIZE_OPTIONS)
    },

    onAction: {
      type: Function
    }
  },

  render(props: PageSizeSelectorProps) {
    return PageSizeSelectorRenderer.render(props)

  }
})

// --- data models --------------------------------------------------

type PageSizeSelectorData = PageSizeSelectorProps

// --- exports ------------------------------------------------------

export default PageSizeSelector

export {
  PAGE_SIZE_OPTIONS,
  PageSizeSelectorData
}
