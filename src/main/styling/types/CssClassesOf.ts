type FirstArgumentType<T> = T extends (firstArg: infer A, ...otherArgs: any[]) => any ? A : never;

type CssClassesOf<T> = {
  [key in keyof FirstArgumentType<FirstArgumentType<T>>]: string
}

// --- exports ------------------------------------------------------

export default CssClassesOf
