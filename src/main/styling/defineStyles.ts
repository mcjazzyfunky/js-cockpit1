import { getTheme, ITheme, mergeStyleSets, IStyleSet, memoizeFunction } from 'office-ui-fabric-react'

export default function defineStyles<A extends any[], S extends IStyleSet<any>>(
  getStyle: (theme: ITheme, ...args: A) => S
): (...args: A) => { [K in keyof S]: string } {
  
  return memoizeFunction((...args: any[]) => {
    const styleSets = getStyle(getTheme(), ...args as any)

    return mergeStyleSets(styleSets) as any
  }) 
}
