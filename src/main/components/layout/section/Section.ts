// external imports 
import { Spec } from 'js-spec'
import { defineComponent, isNode, withChildren } from 'js-react-utils'

// internal imports
import SectionProps from './types/SectionProps'
import renderSection from './view/renderSection'

// --- Section ---------------------------------------------------------

const Section = defineComponent<SectionProps>({
  displayName: 'Section',

  properties: {
    title: {
      type: String
    },

    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(isNode)
    }
  },

  render(props) {
    return renderSection(props)
  }
})

// --- exports ------------------------------------------------------

export default Section
