type Updater<T extends object> = Partial<T> |  (() => void) 

function initStore<T extends object>(base: T):
  [T, (updater?: Updater<T> | null) => void] {

  const
    [self, emit] = createEmptyStore(),

    update = (updater?: Updater<T> | null) => {
      if (process.env.NODE_ENV === 'development' as any) {
        if (updater !== undefined && updater !== null
          && typeof updater !== 'object' && typeof updater !== 'function') {
          
          throw new TypeError('Illegal first argument for update function '
            + '- must be a function, an object or empty')
        }
      }

      if (typeof updater === 'function') {
        updater()
      } else {
        Object.assign(self, updater)
      }

      emit()
    }

  Object.assign(self, base)
  
  return [self, update]
}

function createEmptyStore(): [any, () => void] {
  const
    observers = [] as any[],
    constructor = function Store () {} as any,
    store = new constructor
    
  constructor.__subscribe__ = (subscriber: any) => {
    const observer = subscriber.bind(null)
        
    observers.push(observer)

    return () => {
      const idx = observers.indexOf(observer)
      observers.splice(idx, 1)
    }
  }

  let timeout: any = null

  function emit() {
    if (!timeout || observers.length > 0) {
      timeout = setTimeout(() => {
        timeout = null

        if (observers.length === 1) {
          observers[0]()
        } else {
          const obs = [...observers]

          for (let i = 0; i < obs.length; ++i) {
            obs[i]()
          }
        }
      }, 0)
    }
  }

  return [store, emit] 
}

export default initStore
