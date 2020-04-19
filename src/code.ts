import * as Faker from "faker"
import { IFakerMethod } from "./ui"

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

function replaceText(fakerMethods: IFakerMethod) {
  const fakerMethod = Faker[fakerMethods.parentMethod][fakerMethods.childMethod]
  if (textNodes.length) {
    for (const textNode of textNodes) {
      figma
        .loadFontAsync({
          family: "Roboto",
          style: "Regular",
        })
        .then(() => {
          textNode.characters = fakerMethod().toString()
        })
    }
  }
}

figma.ui.onmessage = (msg) => {
  console.log(msg)
  if (msg.type === "run-faker") {
    clearTextNodes()
    traverseSelection()
    replaceText(msg.fakerMethods)
  }
}
