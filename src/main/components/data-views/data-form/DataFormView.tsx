// external imports
import React from 'react'
import { css } from 'office-ui-fabric-react' 

// internal imports
import DataFormProps from './DataFormProps'
import defineStyle from '../../../styling/defineStyle'

// --- styles of DataForm -------------------------------------------

const styleDataForm = defineStyle(theme => ({
  container: {
  },
}))

// --- DataFormView -------------------------------------------------

function DataFormView(props: DataFormProps) {
  return styleDataForm(classes => {
    return (
      <div className={classes.container}>
        [DataForm]
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default DataFormView
