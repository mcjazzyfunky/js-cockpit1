import React from 'react'
import isStore from './isStore'
import observeStore from './observeStore'

const { useEffect, useState } = React

export default function useStore<T>(create: () => T): T {
  if (process.env.NODE_ENV === 'development' as any) {
    if (typeof create !== 'function') {
      throw new TypeError(
        '[useStore] First argument store "create" must be a function')
    }
  }

  const [{ store }, set] = useState(() => {
    const store = create()
    
    if (process.env.NODE_ENV === 'development' as any) {
      if (!isStore(store)) {
        throw new TypeError(
          '[useStore] Return value of function "create" must be a valid store')
      }
    }

    return { store }
  })

  useEffect(() => {
    return observeStore(store, () => set({ store }))
  }, [])

  return store
}
