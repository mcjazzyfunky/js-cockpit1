import React from 'react'

const { useCallback, useState } = React

export default function useForceUpdate(): () => void {
  const
    [, setValue] = useState(false),
    forceUpdate = useCallback(() => setValue(it => !it), [])

  return forceUpdate
}
