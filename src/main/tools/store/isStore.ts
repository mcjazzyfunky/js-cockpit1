export default function isStore(obj: any) {
  return obj !== null
    && typeof obj === 'object'
    && typeof obj.constructor === 'function'
    && typeof (obj.constructor as any).__subscribe__ === 'function'
}
