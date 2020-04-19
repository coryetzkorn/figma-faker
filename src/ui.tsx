import * as React from "react"
import { CSSProperties } from "react"
import * as ReactDOM from "react-dom"
import fakerOptions from "./fakerOptions"
import * as _ from "lodash"
import { IFakerOption, IFakerOptionGroup, IPluginMessage } from "./faker"

import "./ui.css"
import { string } from "prop-types"

declare function require(path: string): any

interface IProps {}

interface IState {
  searchString: string | null
  recentOptions: Array<IFakerOption>
}

const initialState: IState = { searchString: null, recentOptions: [] }

class App extends React.Component<IProps, IState> {
  // ===========================================================================
  // Lifecyle.
  // ===========================================================================

  readonly state: IState = initialState
  private static searchInputRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    this.setSearchFocus()
    this.getLsRecents()
    onmessage = (event: MessageEvent) => {
      if (event && event.data) {
        const pluginMessage = event.data.pluginMessage as IPluginMessage
        if (pluginMessage.type === "ls-recents-ready") {
          this.setInitialRecents(pluginMessage.data as Array<IFakerOption>)
        }
      }
    }
  }

  // ===========================================================================
  // Render.
  // ===========================================================================

  render() {
    return (
      <div
        style={{
          fontFamily: App.figmaStyles.fontFamily,
          webkitFontSmoothing: "antialiased",
          cursor: "default",
        }}
      >
        <div style={{ position: "relative", width: "100%", marginBottom: 10 }}>
          <input
            ref={App.searchInputRef}
            style={{ width: "100%" }}
            placeholder="Search"
            onChange={this.handleSearch}
          ></input>
          <img
            style={{ display: "block", position: "absolute", top: 7, right: 7 }}
            src={require("./icons/search.svg")}
          />
        </div>
        <div>{this.renderOptions()}</div>
      </div>
    )
  }

  private renderOptions() {
    const options = this.getFilteredOptions()
    const optionsHeight = 260
    return (
      <div style={{ height: optionsHeight, overflowX: "scroll" }}>
        <div style={{ margin: "-10px 0" }}>
          {options.length ? (
            options.map((optionGroup) => this.renderOptionGroup(optionGroup))
          ) : (
            <div
              style={{
                height: optionsHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>No Results 😢</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  private renderOptionGroup(optionGroup: IFakerOptionGroup) {
    return (
      <div
        style={{
          textAlign: "left",
          fontSize: App.figmaStyles.fontSize.base,
          margin: "10px 0",
        }}
      >
        <div style={App.headerStyle}>{optionGroup.name}</div>
        <ul style={{ margin: 0, padding: "5px 0" }}>
          {optionGroup.children.map((option) => {
            return (
              <li
                className="hoverable"
                style={App.itemStyle}
                onClick={() => this.runFaker(option)}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // ===========================================================================
  // Helpers.
  // ===========================================================================

  private setSearchFocus = () => {
    App.searchInputRef.current.focus()
  }

  private clearSearchString = () => {
    this.setState({
      searchString: "",
    })
    App.searchInputRef.current.value = ""
  }

  private clone = (obj: object) => {
    return JSON.parse(JSON.stringify(obj))
  }

  private getOptionsWithRecents = () => {
    const allFakerOptions = this.clone(fakerOptions)
    if (this.state.recentOptions.length) {
      const recentGroup: IFakerOptionGroup = {
        name: "Recent",
        children: this.clone(this.state.recentOptions),
      }
      return [recentGroup, ...allFakerOptions]
    } else {
      return allFakerOptions
    }
  }

  private getFilteredOptions = () => {
    const searchString = this.state.searchString
    if (searchString) {
      const cleanSearchString = searchString.toLowerCase()
      const allFakerOptions = this.getOptionsWithRecents()
      const filteredGroups = allFakerOptions.map((group) => {
        if (group.name.toLowerCase().includes(cleanSearchString)) {
          return group
        } else {
          const filteredGroup = group
          const filteredChildren = group.children.filter((child) =>
            child.name.toLowerCase().includes(cleanSearchString)
          )
          if (filteredChildren.length) {
            filteredGroup.children = filteredChildren
            return filteredGroup
          }
        }
      })
      return filteredGroups.filter(Boolean)
    } else {
      return this.getOptionsWithRecents()
    }
  }

  private setInitialRecents = (recentOptions: Array<IFakerOption>) => {
    this.setState({
      recentOptions: recentOptions,
    })
  }

  private addToRecents = (fakerOption: IFakerOption) => {
    const recentOptionMethodNames = this.state.recentOptions.map(
      (item) => item.methodName
    )
    if (!recentOptionMethodNames.includes(fakerOption.methodName)) {
      const recents = [fakerOption, ...this.state.recentOptions].slice(0, 3)
      this.setState({
        recentOptions: recents,
      })
      this.setLsRecents(recents)
    }
  }

  // ===========================================================================
  // Events.
  // ===========================================================================

  private handleSearch = (e) => {
    this.setState({
      searchString: e.target.value,
    })
  }

  private setLsRecents = (fakerOptions: Array<IFakerOption>) => {
    const pluginMessage: IPluginMessage = {
      type: "set-ls-recents",
      data: fakerOptions,
    }
    parent.postMessage(
      {
        pluginMessage: pluginMessage,
      },
      "*"
    )
  }

  private getLsRecents = () => {
    const pluginMessage: IPluginMessage = {
      type: "get-ls-recents",
    }
    parent.postMessage(
      {
        pluginMessage: pluginMessage,
      },
      "*"
    )
  }

  private runFaker = (fakerOption: IFakerOption) => {
    const pluginMessage: IPluginMessage = {
      type: "run-faker",
      data: fakerOption,
    }
    parent.postMessage(
      {
        pluginMessage: pluginMessage,
      },
      "*"
    )
    this.addToRecents(fakerOption)
    this.clearSearchString()
  }

  private onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*")
  }

  // ==========================================================================
  // Styles.
  // ===========================================================================

  private static figmaStyles = {
    border: "1px solid #e5e5e5",
    fontFamily: "Inter, sans-serif",
    fontSize: {
      base: 11,
    },
    fontWeight: {
      bold: 600,
    },
    color: {
      hover: "rgba(0,0,0,.06)",
    },
    borderRadius: 3,
  }

  private static headerStyle: CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: "8px 0",
    fontWeight: App.figmaStyles.fontWeight.bold,
    position: "sticky",
    top: 0,
    background: "#FFF",
    borderBottom: App.figmaStyles.border,
  }

  private static itemStyle: CSSProperties = {
    listStyle: "none",
    padding: 6,
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"))
