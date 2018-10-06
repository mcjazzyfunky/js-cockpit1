import { ReactNode } from 'react'
import { resetIds } from '@uifabric/utilities';

export default function defineSingletonRenderer<Data>(render: (data: Data) => ReactNode) {
  const originalRender = render
  
  let renderFunction = originalRender

  return Object.freeze({
    render(data: Data) {
      return renderFunction(data)
    },

    reset(render?: (data: Data) => ReactNode) {
      renderFunction = render || originalRender
    },
  })
}
