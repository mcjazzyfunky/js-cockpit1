import Subscriber from './Subscriber'
import Unsubscribe from './Unsubscribe'

type Subscribe<T = undefined> = (subscriber: Subscriber<T>) => Unsubscribe

export default Subscribe
