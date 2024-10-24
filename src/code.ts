import * as faker from "faker"
import { IFakerOption, IPluginMessage } from "./faker"

figma.showUI(__html__, { height: 340, width: 240 })

const textNodes: TextNode[] = []

function traverseNodes(parentNode: SceneNode) {
  if (parentNode.type === "TEXT") {
    textNodes.push(parentNode)
  } else if ("children" in parentNode) {
    for (const child of parentNode.children) {
      if (
        child.type === "GROUP" ||
        child.type === "FRAME" ||
        child.type === "INSTANCE" ||
        child.type === "COMPONENT" ||
        child.type === "TEXT"
      ) {
        traverseNodes(child)
      }
    }
  }
}

function clearTextNodes() {
  textNodes.length = 0
}

function traverseSelection() {
  const selection = figma.currentPage.selection
  for (const selectedNode of selection) {
    traverseNodes(selectedNode)
  }
}

async function replaceText(fakerOption: IFakerOption) {
  if (textNodes.length) {
    const fakerMethodArray = fakerOption.methodName.split(".")
    const fakerMethod = faker[fakerMethodArray[0]][fakerMethodArray[1]]
    for (const textNode of textNodes) {
      figma.loadFontAsync(textNode.fontName as FontName).then(() => {
        textNode.characters = fakerMethod().toString()
      })
    }
  } else {
    figma.closePlugin("Select at least one text node before using Faker")
  }
}

const lsKey = "figma-faker"

async function setLsRecents(fakerOptions: Array<IFakerOption>) {
  await figma.clientStorage.setAsync(lsKey, fakerOptions)
}

async function getLsRecents() {
  figma.clientStorage.getAsync(lsKey).then((lsRecentOptions) => {
    if (lsRecentOptions) {
      const pluginMessage: IPluginMessage = {
        type: "ls-recents-ready",
        data: lsRecentOptions,
      }
      figma.ui.postMessage(pluginMessage)
    }
  })
}

figma.ui.onmessage = (pluginMessage: IPluginMessage) => {
  if (pluginMessage.type === "run-faker") {
    console.log("faker", faker)
    clearTextNodes()
    traverseSelection()
    replaceText(pluginMessage.data as IFakerOption)
  }
  if (pluginMessage.type === "set-ls-recents") {
    setLsRecents(pluginMessage.data as Array<IFakerOption>)
  }
  if (pluginMessage.type === "get-ls-recents") {
    getLsRecents()
  }
}
