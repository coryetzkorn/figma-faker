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
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  const optionRefs = React.useRef<(HTMLLIElement | null)[]>([])

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
    setSelectedIndex(null) // Reset selectedIndex when search changes
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

  const getAllOptions = () => {
    return getFilteredOptions().flatMap((group) => group.children)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allOptions = getAllOptions()
    if (allOptions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) => {
          if (prevIndex === null || prevIndex === allOptions.length - 1) {
            return 0
          }
          return prevIndex + 1
        })
        break
      case "ArrowUp":
        setSelectedIndex((prevIndex) => {
          if (prevIndex === null || prevIndex === 0) {
            return allOptions.length - 1
          }
          return prevIndex - 1
        })
        break
      case "Enter":
        if (selectedIndex !== null) {
          const selectedOption = allOptions[selectedIndex]
          runFaker(selectedOption)
        }
        break
      default:
        break
    }
  }

  React.useEffect(() => {
    const handleKeyDownWrapper = (e: KeyboardEvent) =>
      handleKeyDown(e as unknown as React.KeyboardEvent)
    window.addEventListener("keydown", handleKeyDownWrapper)
    return () => {
      window.removeEventListener("keydown", handleKeyDownWrapper)
    }
  }, [selectedIndex, state.searchString])

  React.useEffect(() => {
    if (selectedIndex !== null) {
      const selectedElement = optionRefs.current[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", inline: "start" })
      }
    }
  }, [selectedIndex])

  const renderOptions = () => {
    const options = getFilteredOptions()
    let optionIndex = 0
    optionRefs.current = []
    return (
      <div className="scroller">
        <div className="scroller-inner">
          {options.length ? (
            options.map((optionGroup) => {
              const groupElement = renderOptionGroup(optionGroup, optionIndex)
              optionIndex += optionGroup.children.length
              return groupElement
            })
          ) : (
            <div className="no-results">
              <div>No Results 😢</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderOptionGroup = (
    optionGroup: IFakerOptionGroup,
    startIndex: number
  ) => {
    return (
      <div className="option-group" key={optionGroup.name}>
        <div className="option-group-header">{optionGroup.name}</div>
        <ul className="option-group-list">
          {optionGroup.children.map((option, index) => {
            const globalIndex = startIndex + index
            const isSelected = selectedIndex === globalIndex
            return (
              <li
                key={option.methodName}
                ref={(el) => (optionRefs.current[globalIndex] = el)}
                className={`option-group-item ${isSelected ? "selected" : ""}`}
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

  const handleResetIconClick = () => {
    clearSearchString()
  }

  const hasQuery = state.searchString.length > 0

  return (
    <div className="app-container">
      <div className="search-input-container">
        <div className="search-input-relative">
          <input
            className="search-input-input"
            ref={searchInputRef}
            placeholder="Search"
            onChange={handleSearch}
          />
          <button
            onClick={handleResetIconClick}
            className={`search-input-icon ${
              hasQuery ? "search-input-icon-active" : ""
            }`}
          >
            <img
              style={{ display: hasQuery ? "none" : "block" }}
              src={require("./icons/search.svg")}
              alt="Search icon"
            />
            <img
              style={{ display: hasQuery ? "block" : "none" }}
              src={require("./icons/close.svg")}
              alt="Close icon"
            />
          </button>
        </div>
      </div>
      <div className="options-container">{renderOptions()}</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />)
