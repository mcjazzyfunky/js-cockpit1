// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import defineStyles from '../../../styling/defineStyles'
import usePagination from '../hooks/usePagination'
import useForceUpdate from '../../shared/hooks/useForceUpdate'

// derived imports
const { useEffect } = React

// --- components ----------------------------------------------------

const PaginationInfo = component<PaginationInfoProps>({
  displayName: 'PaginationInfo',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePaginationInfoProps) },

  
  render: PaginationInfoView
})

// --- types ---------------------------------------------------------

type PaginationInfoProps = {
  about: 'items'
}

// --- validation ----------------------------------------------------

const validatePaginationInfoProps = Spec.checkProps({
  required: {
    about: Spec.oneOf('items')
  }
})

// --- views ---------------------------------------------------------

function PaginationInfoView({
  about
}: PaginationInfoProps) {
  let content: ReactNode = null

  const
    forceUpdate = useForceUpdate(),
    ctrl = usePagination(),
    classes = getPaginationInfoClasses(),
    pageIndex = ctrl.getPageIndex(),
    pageSize = ctrl.getPageSize(),
    totalItemCount = ctrl.getTotalItemCount(),
    itemNumberStart = pageIndex * pageSize + 1,
    itemNumberEnd = Math.min(totalItemCount, (pageIndex + 1) * pageSize),
    valuesValid = pageIndex >= 0 && pageSize >= 0 && totalItemCount >= 0

  useEffect(() => {
    const unsubscribe = ctrl.subscribe(() => {
      forceUpdate()
    })

    return unsubscribe
  }, [ctrl, forceUpdate])

  switch (about) {
    case 'items':
      content =
        valuesValid
          ? <div>
              Items {itemNumberStart} - {itemNumberEnd} of {totalItemCount}
            </div>
          : <div>Items ? - ? of ?</div>
    break
  }

  return (
    <div className={classes.container}>
      { content }
    </div>
  ) 
}

// ---- styles -------------------------------------------------------

const getPaginationInfoClasses = defineStyles(theme => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- exports -------------------------------------------------------

export default PaginationInfo
