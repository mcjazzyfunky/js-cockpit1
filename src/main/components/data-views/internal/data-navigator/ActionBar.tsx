import React, { ReactNode } from 'react'
import { defineComponent, isNode } from 'js-react-utils'
import { CommandBar, ITheme } from 'office-ui-fabric-react'
import defineStyle from '../../../../styling/defineStyle'
import { NONAME } from 'dns';

// --- ActionBarStyle --------------------------------------------

const styleActionBar = defineStyle((theme: ITheme) => ({
  commandBar: {
    backgroundColor: 'transparent',
  },

  actionButton: {
    backgroundColor: 'transparent',
    margin: '0 2px',
    //opacity: '0.9',
    //color: theme.palette.themePrimary
  },

  icon: {
    //color: theme.palette.themePrimary,

    selectors: {
      '& *': {
        fontSize: '16px !important',
        marginTop: '4px', 
      }
    }
  }

}))

// --- ActionBar -------------------------------------------------

type ActionBarProps = {
}

const ActionBar = defineComponent<ActionBarProps>({
  displayName: 'ActionBar',

  properties: {
  },

  render(props: ActionBarProps) {
    return styleActionBar(classes =>
      <div>
        <CommandBar
          className={classes.commandBar}
          items={[
            {
              key: 'new',
              name: 'New',
              iconProps: {
                iconName: 'new',
                className: classes.icon
              },
              
              className: classes.actionButton,

              onRenderIcon: () => <div className={classes.icon}><i className="material-icons">add</i></div>
            },
            {
              key: 'edit',
              name: 'Edit',
              iconProps: {
                iconName: 'edit',
                className: classes.icon
              },
              
              className: classes.actionButton,

              onRenderIcon: () => <div className={classes.icon}><i className="material-icons">subject</i></div>
            },
            {
              key: 'delete',
              name: 'Delete',
              iconProps: {
                iconName: 'delete',
                className: classes.icon
              },
              
              className: classes.actionButton,

              onRenderIcon: () => <div className={classes.icon}><i className="material-icons">clear</i></div>
            }
          ]}
        />
      </div>
    )


    //return <i className="material-icons" style={{fontSize: '16px'}}>add</i>
    //return <FontAwesomeIcon icon="coffee" /> 
  }
})

// --- exports---------------------------------------------

export default ActionBar
