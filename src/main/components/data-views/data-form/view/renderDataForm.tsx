// externals imports
import React, { ReactNode } from 'react'
import { css, CommandBar, Button, TooltipHost } from 'office-ui-fabric-react'
import { IoMdClose as CloseIcon } from 'react-icons/io'

// internal imports
import styleDataForm from './styleDataForm'
import CssClassesOf from '../../../../styling/types/CssClassesOf'
import DataFormProps from '../types/DataFormProps'
import DataFormCtrl from '../ctrl/DataFormCtrl'
import FormCtrlCtx from '../../../../contexts/form-ctx/FormCtrlCtx'
import ViewModesCtx from '../../../../contexts/view-modes/ViewModesCtx'
import useForceUpdate from '../../../../hooks/useForceUpdate'

// --- derived imports --------------------------------------------

const { useContext } = React

type DataFormClasses = CssClassesOf<typeof styleDataForm>

// --- renderDataForm -----------------------------------------------

function renderDataForm(props: DataFormProps, ctrl: DataFormCtrl) {
    let ret: ReactNode = styleDataForm(classes =>
      <FormCtrlCtx.Provider value={ctrl}>
        <div>
          <div className={classes.container}>
            { renderHeader(props, classes) } 
          </div>
          <div className={classes.content}>
            { props.children }
          </div>
        </div>
      </FormCtrlCtx.Provider>
    )

  const
    viewModes = useContext(ViewModesCtx),
    compact = props.compact === true

  if (viewModes.compact !== compact) {
    const newViewModes = { ...viewModes, compact }

    ret =
      <ViewModesCtx.Provider value={newViewModes}>
        {ret}
      </ViewModesCtx.Provider>
  }

  return ret
}

// --- locals -------------------------------------------------------

function renderHeader(props: DataFormProps, classes: DataFormClasses) {
  const closeButton =
    props.onClose
      ? <TooltipHost content="Close" calloutProps={{ gapSpace: 20 }}>
          <Button className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon className={classes.closeIcon}/>
          </Button>
        </TooltipHost>
      : null

  return (
    <div className={classes.header}>
      <div className={classes.headerStart}>
        <div className={classes.title}>
          {props.title} 
        </div>
      </div>
      <div className={classes.headerCenter}>
         { renderActionBar(props, classes) }
      </div>
      <div className={classes.headerEnd}>
        {closeButton}
      </div>
    </div>
  ) 
}

function renderActionBar(props: DataFormProps, classes: DataFormClasses) {
  const
    items: any[] = []

  if (props.actions) {
    props.actions.forEach((action, idx) => {
        const disabled = action.disabled

      /*
      if (idx > 0) {
        items.push({
          key: `separator-${idx}`,
          onRender: () => <div className={classes.actionButtonSeparator}></div>
        })
      }
      */

      const
        hasIcon = !!action.icon,
        iconProps = hasIcon ? { iconName: 'icon' } : null,

        actionButtonClassName =
          disabled
            ? css(classes.actionButton, classes.actionButtonDisabled)
            : classes.actionButton,
        
        iconClassName =
          hasIcon
            ? (disabled ? classes.actionIconDisabled : classes.actionIcon)
            : undefined

      items.push({
        key: String(idx),
        text: action.text,
        iconProps,
        disabled,
        className: actionButtonClassName,
        onRenderIcon: action.icon ?
          () => <div className={iconClassName}>{action.icon}</div>
          : undefined
      })
    })
  }

  return (
    <CommandBar
      className={classes.actionBar}
      items={items}
    />
  )
}

// --- exports ------------------------------------------------------

export default renderDataForm
