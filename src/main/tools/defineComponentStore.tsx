// external imports
import React from 'react'

// derived imports
const { useState, useRef } = React

// --- defineComponentStore -----------------------------------------

function defineComponentStore<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }
>(config: StoreConfig<S, A, M>): (...args: A) => [S, M] {
  
  return (...args: A) => {
    const
      [state, setState] = useState(() => config.initState.apply(null, args)),

      stateRef = useRef(state),

      getState = () => stateRef.current,
     
      [actions] = useState(() => config.initActions(
        createStateProxy(stateRef),
        newState => setState(oldState => Object.assign({}, oldState, newState)),
        getState
      ))
      
    stateRef.current = state

    return [state, actions]
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type StoreConfig<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }> =
{
  initState: (...args: A) => S,
  
  initActions(
    state: S,
    setState: (state: Partial<S>) => void,
    getState: () => S
  ): M
}

function createStateProxy<S extends State>(stateRef: { current: S }): S {
  const ret: any = {}
  
  for (const k of Object.keys(stateRef.current)) {
    Object.defineProperty(ret, k, {
      get: () => stateRef.current[k]
    })
  }

  return ret
}

// --- exports ------------------------------------------------------

export default defineComponentStore
