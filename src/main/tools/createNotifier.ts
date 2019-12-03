export default function createNotifier<T = null>() {
  let
    subscriptions: ([Subscriber<T>, Unsubscribe]|null)[] = [],
    isNotifying = false,
    changedWhileNotifying = false
    
  return {
    notify: (value: T) => {
      isNotifying = true

      try {
        subscriptions.forEach(subscription => {
          subscription && subscription[0](value)
        })
      } finally {
        isNotifying = false

        if (changedWhileNotifying) {
          changedWhileNotifying = false
          subscriptions = subscriptions.filter(it => it !== null)
        }
      }
    },

    subscribe(subscriber: Subscriber<T>) {
      let listener: Subscriber<T> | null = subscriber.bind(null)

      const unsubscribe = () => {
        if (listener !== null) {
          const index = subscriptions.findIndex(it => it && it[0] === listener)
          
          listener = null

          if (isNotifying) {
            subscriptions[index] = null
            changedWhileNotifying = true
          } else {
            subscriptions.splice(index, 1)
          }
        }
      }

      subscriptions.push([listener, unsubscribe])
      return unsubscribe
    },

    clear() {
      try {
        subscriptions.forEach((it: any) => it && it[1]())
      } finally {
        subscriptions = []
      }
    }
  }
}

type Unsubscribe = () => void
type Subscriber<T> = (value: T) => void
