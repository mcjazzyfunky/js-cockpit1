// external imports
import React from 'react'

import { CommandBar, CommandBarButton, ICommandBarItemProps, IComponentAs, IButtonProps }
  from 'office-ui-fabric-react'

// internal imports
import getMenuBarClasses from './getMenuBarClasses'
import MenuBarViewProps from '../types/MenuBarViewProps'
import MenuBarIcon from './MenuBarIcon'
import ActionEvent from '../../../../events/ActionEvent'

// --- MenuBarView ---------------------------------------------------

function MenuBarView({
  items,
  onAction
}: MenuBarViewProps) {
  let
    ret = null,
    buttonAs: IComponentAs<IButtonProps>

  const itemCount = items.length

  buttonAs = props => 
    <CommandBarButton 
      {...props}

      menuProps={{
        ...props.menuProps,
        isBeakVisible: true,
        gapSpace: -6
      } as any}
    />

  if (itemCount > 0) {
    const classes = getMenuBarClasses()

    ret =
      <div data-component="MenuBar" className={classes.root}>
        <div className={classes.inner}>
          <div data-component="MenuBar:icon" className={classes.icon}>
            <MenuBarIcon/>
          </div>
          <CommandBar
            className={classes.commandBar}
            items={getItemProps(items, onAction)}
            buttonAs={buttonAs}
          />
        </div>
      </div>
  }

  return ret
}

// --- locals --------------------------------------------------------

type Item = MenuBarViewProps['items'] extends (infer I)[] ? I : never

function getItemProps(
  items: Item[],
  baseOnAction?: (ev: ActionEvent) => void
): ICommandBarItemProps[] {
  const ret: ICommandBarItemProps[] = []

  for (let i = 0; i < items.length; ++i) {
    const
      child = items[i],
      type = child.type

    let item: ICommandBarItemProps

    switch (child.type) {
      case 'divider':
        item = {
          key: `[divider-${i}]`,
          text: '-'
        }
        break

      case 'menu':
        item = {
          key: `[menu-${i}]`,
          text: child.text,

          subMenuProps: {
            items: getItemProps(child.items, baseOnAction)
          }
        }
        break
      
      case 'item': {
        const
          id = child.id,
          childOnAction = child.onAction

        let onClick: (() => void) | undefined

        if (childOnAction || baseOnAction) {
          const event: ActionEvent = {
            type: 'action',
            kind: 'command',
            id
          }
  
          onClick = () => {
            if (childOnAction) {
              childOnAction(event)
            }

            if (baseOnAction) {
              baseOnAction(event)
            }
          }
        }

        item = {
          key: child.id,
          text: child.text,
          onClick
        }

        break
      }

      default:
        throw new Error('This should never happen')
    }

    ret.push(item)
  }

  return ret
}

// --- exports -------------------------------------------------------

export default MenuBarView
