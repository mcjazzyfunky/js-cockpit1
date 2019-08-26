// external imports 
import { component, isNode, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import TabsProps from './types/TabsProps'
import TabsPageProps from './types/TabsPageProps'
import renderTabs from './view/renderTabs'

// --- Tabs.Page ----------------------------------------------------

const Page = component<TabsPageProps>('Tabs.Page')
  .validate(
    Spec.checkProps({
      optional: {
        title: Spec.string,
        type: Spec.string,
        className: Spec.string,
        style: Spec.object,
        children: withChildren(isNode)
      }
    })
  )  
  .render(props => {
    return 'Page'
  })

// --- Tabs ---------------------------------------------------------

const Tabs = component<TabsProps>('Tabs')
  .validate(
    Spec.checkProps({
      optional: {
        className: Spec.string,
        style: Spec.object,
        children: withChildren(Spec.all(isNode))
      }
    })
  )
 . render(renderTabs)

// --- exports ------------------------------------------------------

export default Object.assign(Tabs, {
  Page
})
