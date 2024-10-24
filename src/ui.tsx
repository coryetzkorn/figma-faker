import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { IFakerOption, IFakerOptionGroup, IPluginMessage } from "./faker"
import fakerOptions from "./fakerOptions"

import "./ui.css"

interface IState {
  searchString: string
  recentOptions: Array<IFakerOption>
}

const initialState: IState = { searchString: "", recentOptions: [] }

function App() {
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const [state, setState] = React.useState<IState>(initialState)

  const setSearchFocus = () => {
    searchInputRef.current.focus()
  }

  const clearSearchString = () => {
    setState((prev) => {
      return {
        ...prev,
        searchString: "",
      }
    })
    searchInputRef.current.value = ""
  }

  const clone = (obj: object) => {
    return JSON.parse(JSON.stringify(obj))
  }

  const getOptionsWithRecents = () => {
    const allFakerOptions = clone(fakerOptions)
    if (state.recentOptions.length) {
      const recentGroup: IFakerOptionGroup = {
        name: "Recent",
        children: clone(state.recentOptions),
      }
      return [recentGroup, ...allFakerOptions]
    } else {
      return allFakerOptions
    }
  }

  const getFilteredOptions = () => {
    const searchString = state.searchString
    if (searchString) {
      const cleanSearchString = searchString.toLowerCase()
      const allFakerOptions = getOptionsWithRecents()
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
      return getOptionsWithRecents()
    }
  }

  const setInitialRecents = (recentOptions: Array<IFakerOption>) => {
    setState((prev) => ({
      ...prev,
      recentOptions,
    }))
  }

  const addToRecents = (fakerOption: IFakerOption) => {
    const recentOptionMethodNames = state.recentOptions.map(
      (item) => item.methodName
    )
    if (!recentOptionMethodNames.includes(fakerOption.methodName)) {
      const recents = [fakerOption, ...state.recentOptions].slice(0, 3)
      setState((prev) => ({
        ...prev,
        recentOptions: recents,
      }))
      setLsRecents(recents)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchString: e.target.value,
    }))
  }

  const setLsRecents = (fakerOptions: Array<IFakerOption>) => {
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

  const getLsRecents = () => {
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

  const runFaker = (fakerOption: IFakerOption) => {
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
    addToRecents(fakerOption)
    clearSearchString()
  }

  React.useEffect(() => {
    setSearchFocus()
    getLsRecents()
    const messageHandler = (event: MessageEvent) => {
      if (event && event.data) {
        const pluginMessage = event.data.pluginMessage as IPluginMessage
        if (pluginMessage.type === "ls-recents-ready") {
          setInitialRecents(pluginMessage.data as Array<IFakerOption>)
        }
      }
    }
    window.addEventListener("message", messageHandler)
    return () => {
      window.removeEventListener("message", messageHandler)
    }
  }, [])

  const renderOptions = () => {
    const options = getFilteredOptions()
    return (
      <div className="scroller">
        <div>
          {options.length ? (
            options.map((optionGroup) => renderOptionGroup(optionGroup))
          ) : (
            <div className="no-results">
              <div>No Results 😢</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderOptionGroup = (optionGroup: IFakerOptionGroup) => {
    return (
      <div className="option-group">
        <div className="option-group-header">{optionGroup.name}</div>
        <ul
          className="option-group-list"
          style={{ margin: 0, padding: "5px 0" }}
        >
          {optionGroup.children.map((option) => {
            return (
              <li
                key={option.methodName}
                className="option-group-item"
                onClick={() => runFaker(option)}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div style={{ position: "relative", width: "100%", marginBottom: 10 }}>
        <input
          ref={searchInputRef}
          placeholder="Search"
          onChange={handleSearch}
        />
        <img
          style={{ display: "block", position: "absolute", top: 7, right: 7 }}
          src={require("./icons/search.svg")}
          alt="Search icon"
        />
      </div>
      <div>{renderOptions()}</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />)
