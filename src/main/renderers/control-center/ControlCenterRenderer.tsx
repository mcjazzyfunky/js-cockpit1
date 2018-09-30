import React from 'react'
import defineRenderer from '../defineRenderer'
import { ControlCenterModel } from '../../api/components/control-center/ControlCenter'
import HBox from '../../api/components/layout/HBox'
import VBox from '../../api/components/layout/VBox'
import defineStyle from '../../api/styling/defineStyle'

const Style: React.ComponentType<any> = defineStyle((): any => ({
  xxx: {
    backgroundColor: 'blue'
  }
}))

function render(model: ControlCenterModel) {
  return (
    <Style props={{ a: 1, b: 2 }}>
      {
        (classes: any) =>
          <VBox className={classes.xxx} style={{ position: 'absolute', width: '100%', 'height': '100%' }}>
            <VBox.Cell>
              <HBox style={{ width: '100%' }}>
                <HBox.Cell style={{ border: '1px solid red' }}>
                  Start
                </HBox.Cell>
                <HBox.Cell>
                  Center
                </HBox.Cell>
                <HBox.Cell>
                  End
                </HBox.Cell>
              </HBox>
            </VBox.Cell>
            <VBox.Cell grow={2}>

            </VBox.Cell>
          </VBox>
      }
    </Style>
  )
}

export default defineRenderer(render)
