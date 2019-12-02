// --- PickOptionalProps ---------------------------------------------

type PickOptionalProps<T> = Pick<T, {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T]>;

// --- exports -------------------------------------------------------

export default PickOptionalProps
