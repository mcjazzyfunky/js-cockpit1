import React from 'react'
import ReactDOM from 'react-dom'
//import Demo from '../src/demo/Demo'

export default class extends React.Component {
  private container: any = null

  componentDidMount() {
    if (typeof document !== 'undefined') {
      const Demo: any = require('../src/demo/demo').default
      console.clear()
      const head: any = document.head
      const body: any = document.body
      const html: any = document.body.parentNode 

      html.style.fontSize = '14px'

      const linkElem1 = document.createElement('link')
      const linkElem2 = document.createElement('link')

      linkElem1.rel = 'stylesheet'
      linkElem2.rel = 'stylesheet'

      linkElem1.type = 'text/css'
      linkElem2.type = 'text/css'

      linkElem1.href = '//unpkg.com/ag-grid-community/dist/styles/ag-grid.css'
      linkElem2.href = '//unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css'

      head.appendChild(linkElem1)
      head.appendChild(linkElem2)

      body.style.margin = 0
      body.style.fontFamily = '"Segoe UI", Arial, Helvetica, sans-serif'
      ReactDOM.render(
        <div>
           <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
           <link rel="stylesheet" href="//unpkg.com/react-virtualized/styles.css"/>
           <Demo/>
        </div>,
        this.container)
    }
  }

  render() {
    return <div ref={ref => this.container = ref}/>
  }
}