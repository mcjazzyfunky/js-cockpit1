type Notifier = {
  notify(): void,
  subscribe(subscriber: Subscriber): Unsubscribe,
  clear(): void
}

type Subscriber = () => void
type Unsubscribe = () => void

export default function createNotifier(): Notifier {
  let
    subscriptions: ([Subscriber, Unsubscribe] | null)[] = [],
    isNotifying = false,
    changedWhileNotifying = false
    
  return {
    notify: () => {
      isNotifying = true

      try {
        subscriptions.forEach(subscription => {
          subscription && subscription[0]()
        })
      } finally {
        isNotifying = false

        if (changedWhileNotifying) {
          changedWhileNotifying = false
          subscriptions = subscriptions.filter(it => it !== null)
        }
      }
    },

    subscribe(subscriber: Subscriber) {
      let listener: (Subscriber | null) = subscriber.bind(null)

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
        subscriptions.forEach(it => it && it[1]())
      } finally {
        subscriptions = []
      }
    }
  }
}