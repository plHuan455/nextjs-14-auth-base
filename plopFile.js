/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
const { transform } = require("@svgr/core")
const SVG_FOLDER = "components/atoms/svg"

const exportIcon = (iconName, fileName) => {
  const path = `${SVG_FOLDER}/index.ts`
  const fileData = fs.readFileSync(path, "utf-8")
  const result = fileData + `\nexport { default as ${fileName} } from './${iconName}'`
  fs.writeFileSync(path, result)
}

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
    const width = Number(fileData.match(/(?<=width\=\")\d+(?=\")/).at(0) ?? "")
    const height = Number(fileData.match(/(?<=height\=\")\d+(?=\")/).at(0) ?? "")
    const str = `
      import { SvgIconProps } from "types/index.d"
      export default function Icon${componentName}(props: SvgIconProps){
        return (
          ${jsCode}
        )
      }
      `
      .replace(/(?<=width\=\")\d+(?=\")/, (data) => {
        if (isNaN(width) || isNaN(height)) return data
        return width > height ? "1em" : `${(width / height).toFixed(3)}em`
      })
      .replace(/(?<=height\=\")\d+(?=\")/, (data) => {
        if (isNaN(width) || isNaN(height)) return data
        return height > width ? "1em" : `${(height / width).toFixed(3)}em`
      })
    const result = str
      .replace(/(?<=<svg.*)>/i, " {...props} >")
      .replace(/(\="#[0-9a-fA-F]+\")|(=\"white\")|(=\"black\")/g, '="currentColor"')
    fs.writeFileSync(`${SVG_FOLDER}/${fileName}/index.tsx`, result)

    // EXPORT GLOBAL
    exportIcon(fileName, `Icon${componentName}`)
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
