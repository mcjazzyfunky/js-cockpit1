import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec  } from 'js-spec'

type CellProps = {
  grow?: number,
  shrink?: number,
  horizontalAlign?: 'start' | 'center' | 'end',
  verticalAlign?: 'top' | 'middle' | 'bottom',
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

const Cell = defineComponent<CellProps>({
  displayName: 'VBox.Cell',

  properties: {
    grow: {
      type: Number,
      validate: Spec.nonnegativeFloat
    },
    
    shrink: {
      type: Number,
      validate: Spec.nonnegativeFloat
    },

    horizontalAlign: {
      type: String,
      validate: Spec.oneOf('start', 'center', 'end'),
    },

    verticalAlign: {
      type: String,
      validate: Spec.oneOf('top', 'middle', 'bottom'),
    },

    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(Spec.all(isNode))
    },
  },

  render() {
    throw new Error('Components of type VBox.Cell can only '
      + 'be used as direct children of VBox components')
  }
})

type VBoxProps = {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode 
}

const VBox = defineComponent<VBoxProps>({
  displayName: 'VBox',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(Spec.all(isElementOfType(Cell)))
    }
  },

  render({ className, style, children }: VBoxProps) {
    const
      cells =
        React.Children.map(children, child => {
          const
            { props } = child as any,
            
            justifyContent =
              props.horizontalAlign === 'start'
                ? 'flex-start'
                : props.horizontalAlign === 'end'
                ? 'flex-end'
                : 'center',

            alignItems =
              props.verticalAlign === 'top'
                ? 'flex-start'
                : props.verticalAlign === 'bottom'
                ? 'flex-end'
                : 'center'

          return (
            <div data-component="VBox.Cell" style={{ display: 'flex', flexDirection: 'column', flexGrow: props.grow, flexShrink: props.shrink }}>
              <div style={{ ...props.style, width: '100%', display: 'flex', alignItems, justifyContent }} className={props.className}>
                <div>
                  {props.children}
                </div>
              </div>
            </div>
          )
        }),

      container: ReactNode =
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {cells}
        </div>

    return (
      <div data-component="VBox" className={className} style={style}>
        {container}
      </div>
    )
  }
})

export default Object.assign(VBox, {
  Cell
})
