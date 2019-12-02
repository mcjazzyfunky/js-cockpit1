// external imports
import React from 'react'

// derived imports
const { useState } = React

// --- useForceUpdate ------------------------------------------------

function useForceUpdate() {
  const [, setState] = useState(true)

  return () => setState(state => !state)
}

// --- exports -------------------------------------------------------

export default useForceUpdate
