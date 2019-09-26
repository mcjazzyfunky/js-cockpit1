import { getTheme, ITheme, mergeStyleSets, IStyleSet } from 'office-ui-fabric-react'

export default function defineStyle<P extends Props, D extends any[], S extends IStyleSet<any>>(
  getStyle: (theme: ITheme, ...args: D) => S
): (...args: D) => Record<keyof S, string> {
  
  return function useStyle(...args: D) {
    const
      theme = getTheme(),
      styleSets = getStyle(theme, ...args)

    return mergeStyleSets(styleSets) as any
  } 
}

type Props = Record<string, any>
