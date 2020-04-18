import * as React from "react"
import { CSSProperties } from "react"
import * as ReactDOM from "react-dom"
import fakerOptions, { FakerOptionGroup, FakerOption } from "./fakerOptions"
import * as _ from "lodash"

import "./ui.css"

declare function require(path: string): any

interface IProps {}

const initialState = { selectedMethod: null, searchString: null }

type IState = Readonly<typeof initialState>

class App extends React.Component<IProps, IState> {
  /** Lifecycle */

  readonly state: IState = initialState

  /** Render */

  render() {
    return (
      <div style={{ fontFamily: App.figmaStyles.border }}>
        {this.state.selectedMethod && (
          <div>
            Selected state:
            <br />
            {this.state.selectedMethod}
          </div>
        )}
        <div style={{ position: "relative", width: "100%", marginBottom: 20 }}>
          <input
            style={{ width: "100%", border: App.figmaStyles.border }}
            placeholder="Search"
            onChange={this.handleSearch}
          ></input>
          <img
            style={{ display: "block", position: "absolute", top: 7, right: 7 }}
            src={require("./icons/search.svg")}
          />
        </div>
        <div>{this.renderOptions()}</div>
        <button id="create" onClick={this.onRun}>
          Run
        </button>
        <button onClick={this.onCancel}>Cancel</button>
      </div>
    )
  }

  private renderOptions() {
    const options = this.getFilteredOptions()
    console.log(options)
    return (
      <div style={{ height: 280, overflowX: "scroll" }}>
        <div style={{ margin: "-10px 0" }}>
          {options.length ? (
            options.map((optionGroup) => this.renderOptionGroup(optionGroup))
          ) : (
            <div style={{ padding: "30px 0" }}>No Results 😢</div>
          )}
        </div>
      </div>
    )
  }

  private renderOptionGroup(optionGroup: FakerOptionGroup) {
    return (
      <div
        style={{
          textAlign: "left",
          fontSize: App.figmaStyles.fontSize.base,
          margin: "10px 0",
        }}
      >
        <div
          style={{
            ...App.itemStyle,
            fontWeight: App.figmaStyles.fontWeight.bold,
          }}
        >
          {optionGroup.name}
        </div>
        <ul style={{ margin: 0, padding: 0 }}>
          {optionGroup.children.map((option) => {
            return (
              <li
                style={{ ...App.itemStyle, paddingLeft: "2em" }}
                onClick={() => this.onChange(option.methodName)}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  /** Helpers */

  private getFilteredOptions = () => {
    const searchString = this.state.searchString
    if (searchString) {
      const cleanSearchString = searchString.toLowerCase()
      const allFakerOptions = _.cloneDeep(fakerOptions)
      const filteredGroups = allFakerOptions.map((group) => {
        const filteredGroup = group
        const filteredChildren = group.children.filter((child) =>
          child.name.toLowerCase().includes(cleanSearchString)
        )
        if (filteredChildren.length) {
          filteredGroup.children = filteredChildren
          return filteredGroup
        }
      })
      return filteredGroups.filter(Boolean)
    } else {
      return fakerOptions
    }
  }

  /** Events */

  private handleSearch = (e) => {
    this.setState({
      searchString: e.target.value,
    })
  }

  private onChange = (method) => {
    this.setState({
      selectedMethod: method,
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

  /** Styles */

  private static figmaStyles = {
    border: "1px solid #e5e5e5",
    fontFamily: "Inter, sans-serif",
    fontSize: {
      base: 11,
    },
    fontWeight: {
      bold: 600,
    },
  }

  private static itemStyle: CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: "5px 0",
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"))
