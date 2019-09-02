import isStore from './isStore'

export default function observeStore<T>(store: T, observer: (store: T) => void): () => void {
  if (process.env.NODE_ENV === 'development' as any) {
    if (!isStore(store)) {
      throw new TypeError('[observeStore] First argument store must be a valid store')
    }
  }

  return (store as any).constructor.__subscribe__(observer)
}
