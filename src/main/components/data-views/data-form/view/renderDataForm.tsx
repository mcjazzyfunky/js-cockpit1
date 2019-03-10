// externals imports
import React from 'react'
import { css, CommandBar, Spinner, SpinnerSize } from 'office-ui-fabric-react'

// internal imports
import styleDataForm from './styleDataForm'
import CssClassesOf from '../../../../styling/types/CssClassesOf'
import DataFormProps from '../types/DataFormProps'

// --- derived imports --------------------------------------------

const { useEffect, useRef,  useState, useCallback } = React

type DataFormClasses = CssClassesOf<typeof styleDataForm>

// --- renderDataForm -----------------------------------------------

function renderDataForm(props: DataFormProps) {
  return styleDataForm(classes => {
    return (
      <div className={classes.container}>
        { renderHeader(props, classes) } 
      </div>
    )
  })
}

// --- locals -------------------------------------------------------

function renderHeader(props: DataFormProps, classes: DataFormClasses) {
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
    </div>
  ) 
}

function renderActionBar(props: DataFormProps, classes: DataFormClasses) {
  const items: any[] = []

  props.actions.forEach((action, idx) => {
      const disabled = action.disabled

    if (idx > 0) {
      items.push({
        key: `separator-${idx}`,
        onRender: () => <div className={classes.actionButtonSeparator}></div>
      })
    }

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
          : null

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

    if (idx > 0) {
      // items.push(<div>x</div>) // TODO xxx
    }
  })

  return (
    <CommandBar
      className={classes.actionBar}
      items={[]}
      farItems={items}
    />
  )
}

// --- exports ------------------------------------------------------

export default renderDataForm
