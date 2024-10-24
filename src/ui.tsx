import { faker } from "@faker-js/faker"
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
    const optionsHeight = 260
    return (
      <div style={{ height: optionsHeight, overflowX: "scroll" }}>
        <div style={{ margin: "-10px 0" }}>
          {options.length ? (
            options.map((optionGroup) => renderOptionGroup(optionGroup))
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

  const renderOptionGroup = (optionGroup: IFakerOptionGroup) => {
    return (
      <div
        style={{
          textAlign: "left",
          fontSize: figmaStyles.fontSize.base,
          margin: "5px 0",
        }}
      >
        <div style={headerStyle}>{optionGroup.name}</div>
        <ul style={{ margin: 0, padding: "5px 0" }}>
          {optionGroup.children.map((option) => {
            return (
              <li
                className="hoverable"
                style={itemStyle}
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

  React.useEffect(() => {
    console.log("--- faker ----", faker)
  }, [])

  return (
    <div
      style={{
        fontFamily: "Inter",
        cursor: "default",
      }}
    >
      <div style={{ position: "relative", width: "100%", marginBottom: 10 }}>
        <input
          ref={searchInputRef}
          style={{ width: "100%" }}
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

const figmaStyles = {
  border: "1px solid #e5e5e5",
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
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

const headerStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 6,
  fontWeight: figmaStyles.fontWeight.bold,
  position: "sticky",
  top: 0,
  background: "#FFF",
}

const itemStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 6,
  borderRadius: 6,
}
