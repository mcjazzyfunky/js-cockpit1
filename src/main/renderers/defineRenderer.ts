import { ReactNode } from 'react'

export default function defineRenderer<Model>(render: (model: Model) => ReactNode) {
  let renderFunction = render

  return Object.freeze({
    render(model: Model) {
      return renderFunction(model)
    },

    setRenderFunction(render: (model: Model) => ReactNode) {
      renderFunction = render
    }
  })
}