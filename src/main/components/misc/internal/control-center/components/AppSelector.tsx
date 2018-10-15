// internal imports
import defineStyle from '../../../../../styling/defineStyle'
import AppsIcon from '../icons/AppsIcon'
import ChevronDownIcon from '../../../../../system-icons/ChevronDownIcon'

// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { ITheme } from 'office-ui-fabric-react'

// --- AppSelector --------------------------------------------------

const styleAppSelector = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    borderColor: 'white',
    borderWidth: '0 0 0 1px',
    paddingLeft: '1rem',
    cursor: 'pointer',
  },

  icon: {
    display: 'inline-block',
    color: theme.palette.themePrimary,
  },

  label: {
    margin: '0 0.5rem',
  }
}))

type AppSelectorProps = {
}

const AppSelector = defineComponent<AppSelectorProps>({
  displayName: 'AppSelector',

  render() {
    return styleAppSelector(classes =>
      <div>
        <div className={classes.container}>
          <div className={classes.icon}>
            <AppsIcon/>
          </div>
          <label className={classes.label}>Content Management</label>
          <ChevronDownIcon/>
        </div>
      </div>
    )
  }
})

// --- experts ------------------------------------------------------

export default AppSelector
