type ActionsOf<T>
  = T extends ActionsInitializer<infer S, infer H>
    ? { [K in keyof H]: (...args: ArgTypesWithoutFirst<H[K]>) => ReturnType<H[K]> }
    : never

type State = Record<string, any>
type StateGetter<S extends State> = () => S
type StateSetter<S extends State> = (newState: Partial<S>) => void

type ArgTypesWithoutFirst<F extends (...args: any[]) => any> =
  F extends (first: any, ...rest: infer R) => any ? R : never

type ActionHandlers<S extends State> = 
  { [name: string]: (state: S, ...args: any[]) => Partial<S> | null | void }

type ActionsInitializer<S extends State, H extends ActionHandlers<S>> =
  (getState: StateGetter<S>, setState: StateSetter<S>) => H

export default ActionsOf
