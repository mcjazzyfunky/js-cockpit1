import Publish from '../../../modules/shared/types/Publish'
import Subscribe from '../../../modules/shared/types/Subscribe'
import Subscriber from '../../../modules/shared/types/Subscriber'

function createPubSub<T = undefined>(): [Publish<T>, Subscribe<T>] {
  let
    subscribers: (Subscriber<T> | null)[] = [],
    isCurrentlyPublishing = false,
    hadUnsubscriptionWhilePublishing = false,

    publish: Publish<T> = (value: T) => {
      isCurrentlyPublishing = true

      try {
        subscribers.forEach(subscriber => {
          if (subscriber) {
            subscriber(value)
          }
        })
      } finally {
        if (hadUnsubscriptionWhilePublishing) {
          subscribers = subscribers.filter(Boolean)
        }

        isCurrentlyPublishing = false
        hadUnsubscriptionWhilePublishing = false
      }
    },

    subscribe: Subscribe<T> = subscriber => {
      let sub: Subscriber<T> | null = subscriber.bind(null)

      subscribers.push(sub)

      return () => {
        if (sub) {
          const index = subscribers.findIndex(it => it === sub)

          if (isCurrentlyPublishing) {
            subscribers[index] = null
            hadUnsubscriptionWhilePublishing = true
          } else {
             subscribers.splice(index, 1)
          }

          sub = null
        }
      }
    }

  return [publish, subscribe]
}

export default createPubSub
