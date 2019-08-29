import React from 'react'

const { useRef, useState } = React

type State = Record<string, any>
type StateGetter<S extends State> = () => S
type StateSetter<S extends State> = (newState: Partial<S>) => void

type Actions<S extends State> = 
  { [name: string]: (state: S, ...args: any[]) => Partial<S> | null | void }

type SecondArgType<T> = T extends (arg1: any, arg2: infer A, ...args: any[]) => any ? A : never

type ArgTypesWithoutFirst<F extends (...args: any[]) => any> =
  F extends (first: any, ...rest: infer R) => any ? R : never


export default function useActions<S extends State, A extends Actions<S>>(initActions: (getState: StateGetter<S>, setState: StateSetter<S>) => A, initState: () => S):
  [{ [K in keyof A]: (...args: ArgTypesWithoutFirst<A[K]>) => void }, S] {

  const
    actionsRef = useRef(null as any),
    stateRef = useRef(null as any as S),
    [state, setState] = useState(initState)

  if (!actionsRef.current) {
    const
      actions = {} as any,
      getter = () => stateRef.current,
      setter = (newState: Partial<S>) => setState({...getter(), ...newState}),
      result = initActions(getter, setter)

    for (let key of Object.keys(result)) {
      actions[key] = (...args: any[]) => {
        const newState = result[key](stateRef.current, ...args)

        if (newState) { 
          setter(newState)
        }
      }
    }

    actionsRef.current = actions
  }

  stateRef.current = state

  return [actionsRef.current, state] as any
}
