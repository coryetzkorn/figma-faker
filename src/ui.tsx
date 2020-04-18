import * as React from "react"
import * as ReactDOM from "react-dom"
import fakerOptions, { FakerOptionGroup, FakerOption } from "./fakerOptions"

import "./ui.css"

declare function require(path: string): any

interface IProps {}

const initialState = { selectedMethod: null }

type IState = Readonly<typeof initialState>

class App extends React.Component<IProps, IState> {
  /** Lifecycle */

  readonly state: IState = initialState

  /** Render */

  render() {
    return (
      <div>
        {this.state.selectedMethod && (
          <div>
            Selected state:
            <br />
            {this.state.selectedMethod}
          </div>
        )}
        {fakerOptions.map((optionGroup) => this.renderOptionGroup(optionGroup))}
        <button id="create" onClick={this.onRun}>
          Create
        </button>
        <button onClick={this.onCancel}>Cancel</button>
      </div>
    )
  }

  private renderOptions(optionGroup: FakerOptionGroup) {
    return (
      <select>
        <option value="names">Test</option>
        <option value="numbers">Numbers</option>
      </select>
    )
  }

  private renderOptionGroup(optionGroup: FakerOptionGroup) {
    return (
      <div>
        <p>{optionGroup.name}</p>
        <select onChange={this.onChange}>
          {optionGroup.children.map((option) => {
            return <option value={option.methodName}>{option.name}</option>
          })}
        </select>
      </div>
    )
  }

  /** Events */

  private onChange = (event) => {
    this.setState({
      selectedMethod: event.target.value,
    })
  }

  private onRun = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "run-faker",
          fakerMethod: this.state.selectedMethod,
        },
      },
      "*"
    )
  }

  private onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*")
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"))
