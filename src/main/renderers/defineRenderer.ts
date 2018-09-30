import { ReactNode } from 'react'
import { resetIds } from '@uifabric/utilities';

export default function defineRenderer<Model>(render: (model: Model) => ReactNode) {
  const originalRender = render
  
  let renderFunction = originalRender

  return Object.freeze({
    render(model: Model) {
      return renderFunction(model)
    },

    reset(render?: (model: Model) => ReactNode) {
      renderFunction = render || originalRender
    },
  })
}