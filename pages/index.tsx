import React from 'react'
import ReactDOM from 'react-dom'
import Demo from '../src/demo/Demo'

export default class extends React.Component {
  private container: any = null

  componentDidMount() {
    ReactDOM.render(<Demo/>, this.container)
  }

  render() {
    return <div ref={ref => this.container = ref}/>
  }
}