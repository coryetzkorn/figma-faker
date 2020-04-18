import * as React from "react"
import * as ReactDOM from "react-dom"
import "./ui.css"

declare function require(path: string): any

class App extends React.Component {
  textbox: HTMLInputElement

  countRef = (element: HTMLInputElement) => {
    if (element) element.value = "5"
    this.textbox = element
  }

  onRun = () => {
    //const count = parseInt(this.textbox.value, 10)
    parent.postMessage({ pluginMessage: { type: "run-faker" } }, "*")
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*")
  }

  render() {
    return (
      <div>
        <h2>👻 Faker</h2>
        <p>Generate massive amounts of realistic fake data in Figma</p>
        <select>
          <option value="names">Names</option>
          <option value="numbers">Numbers</option>
        </select>
        <button id="create" onClick={this.onRun}>
          Create
        </button>
        <button onClick={this.onCancel}>Cancel</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"))
