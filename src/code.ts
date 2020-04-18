import * as Faker from "faker"

figma.showUI(__html__)

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

function traverseSelection() {
  const selection = figma.currentPage.selection
  for (const selectedNode of selection) {
    traverseNodes(selectedNode)
  }
}

function replaceText() {
  if (textNodes.length) {
    for (const textNode of textNodes) {
      const fakeName = Faker.name.findName()
      figma
        .loadFontAsync({
          family: "Roboto",
          style: "Regular",
        })
        .then(() => {
          textNode.characters = fakeName
        })
    }
  } else {
    alert("No text nodes selected.")
  }
}

figma.ui.onmessage = (msg) => {
  console.log(msg)
  if (msg.type === "run-faker") {
    traverseSelection()
    replaceText()
    // figma.currentPage.selection = textNodes
    // figma.viewport.scrollAndZoomIntoView(textNodes)
  }

  figma.closePlugin()
}
