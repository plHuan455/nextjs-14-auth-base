/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
const { transform } = require("@svgr/core")
const SVG_FOLDER = "components/atoms/svg"

const createSVGComp = ({ fileName }) => {
  const toUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const fileData = fs.readFileSync(`${SVG_FOLDER}/${fileName}/index.svg`, "utf-8")

  const componentName = fileName
    .split("-")
    .map((value) => toUpperCase(value))
    .join("")
  transform(fileData, { icon: true }, { componentName: "MyComponent" }).then((jsCode) => {
    const result = `
      import { SvgIconProps } from "../types"
      export default function Icon${componentName} = (props: SvgIconProps) => {
        return (
          ${jsCode}
        )
      }
      `
      .replace(/(?<=<svg.*)>/i, " {...props} >")
      .replace(/(\="#[0-9a-fA-F]+\")|(=\"white\")|(=\"black\")/g, '="currentColor"')
    fs.writeFileSync(`${SVG_FOLDER}/${fileName}/index.tsx`, result)
  })
}

module.exports = function (plop) {
  plop.setGenerator("GENERATE SVG", {
    description: "UPDATE vi & dev language",
    prompts: [
      {
        type: "input",
        name: "fileName",
        message: "File Name",
      },
    ],
    actions: [
      function (data) {
        createSVGComp(data)
        return "SVG COMPONENT HAS BEEN CREATED"
      },
    ],
  })
}
