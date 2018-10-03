import React from 'react'
import ReactDOM from 'react-dom'
import Demo from '../src/demo/Demo'

export default class extends React.Component {
  private container: any = null

  componentDidMount() {
    console.clear()
    const body: any = document.body 

    body.style.margin = 0
    body.style.fontFamily = '"Segoe UI", Arial, Helvetica, sans-serif'
    ReactDOM.render(<Demo/>, this.container)
  }

  render() {
    return <div ref={ref => this.container = ref}/>
  }
}