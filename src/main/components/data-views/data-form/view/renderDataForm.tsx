// externals imports
import React from 'react'
import { css, CommandBar, Spinner, SpinnerSize } from 'office-ui-fabric-react'

// internal imports
import styleDataForm from './styleDataForm'
import DataFormProps from '../types/DataFormProps'

// --- derived imports --------------------------------------------

const { useEffect, useRef,  useState, useCallback } = React

// --- renderDataForm -----------------------------------------------

function renderDataForm(props: DataFormProps) {
  return styleDataForm(classes => {
    return (
      <div className={classes.container}>
        [Data Form]
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default renderDataForm
