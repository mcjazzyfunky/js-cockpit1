// external imports
import React from 'react'

// derived imports
const { useRef } = React

// --- useWithDefaultProps -------------------------------------------

function useWithDefaultProps<P extends Props, D extends Partial<P>>(
  props: P,
  defaultProps: D
) {
  const
    lastDefaultPropsRef = React.useRef(defaultProps),
    lastPropsRef = React.useRef(props),
    lastResultRef = React.useRef<P & D>()

  if (!lastResultRef.current || lastPropsRef.current !== props || lastDefaultPropsRef.current !== defaultProps) {
    lastResultRef.current = {...defaultProps, ...props}
    lastDefaultPropsRef.current = defaultProps
    lastPropsRef.current = props
  }
  
  return lastResultRef.current
}

// --- locals --------------------------------------------------------

type Props = Record<string, any>

// --- exports -------------------------------------------------------

export default useWithDefaultProps
