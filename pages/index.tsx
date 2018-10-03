import React from 'react'
import ReactDOM from 'react-dom'
//import Demo from '../src/demo/Demo'

export default class extends React.Component {
  private container: any = null

  componentDidMount() {
    if (typeof document !== 'undefined') {
      const Demo: any = require('../src/demo/Demo').default
      console.clear()
      const body: any = document.body 

      body.style.margin = 0
      body.style.fontFamily = '"Segoe UI", Arial, Helvetica, sans-serif'
      ReactDOM.render(
        <div>
           <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
           <Demo/>
        </div>,
        this.container)
    }
  }

  render() {
    return <div ref={ref => this.container = ref}/>
  }
}